<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { decryptObject } from '../../../services/encrypt';
	import { page } from '$app/stores';
	import { getNomieData } from '../../../services/nomiedata';
	var domain = $page.url.hostname;
	var invalidaccesscode = true;
	var txtfieldclass = 'form-control is-invalid';
	var key = '';
	var view = 'accesscode';
	var statusmessage = '';
	var port = $page.url.port;
	if (port != '') {
		domain = domain + ':' + port;
	}

	var encnote = data.encnote;
	var subject = '';
	var note = '';
	var expdate = '';
	var expcheck = false;
	var nomie = { url: 'notdefined', db: '', user: '', pw: '' };

	$: if (key) {
		try {
			invalidaccesscode = false;
			txtfieldclass = 'form-control is-valid';
		} catch (error) {
			invalidaccesscode = true;
			txtfieldclass = 'form-control is-invalid';
		}
	}

	async function getdata() {
		var url = nomie.url;
		var db = nomie.db;
		var user = nomie.user;
		var pw = nomie.pw;
		var result = await getNomieData(url, db, user, pw);
		console.log(result)
		var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result));
		var dlAnchorElem = document.getElementById('downloadAnchorElem');
		if (dlAnchorElem != null) {
			dlAnchorElem.setAttribute('href', dataStr);
			dlAnchorElem.setAttribute('download', 'dailynomie_db.json');
			dlAnchorElem.click();
		}
	}

	async function accessNote() {
		var outcome = 0;
		var noteLog = await getNoteLog();
		if (noteLog.length == 0) {
			view = 'oops';
			outcome = 0;
		} else {
			var message = decryptObject(encnote, key);
			//validate log status
			// outcome 1: still within waiting period
			// outcome 2: outside waiting period
			// outcome 3: reset in the mean time => action to alignlastrequest date with reset date

			var d = new Date();
			//temp settings for testing:
			noteLog[0].LASTRESET = d.setDate(d.getDate())-(7*(1000 * 3600 * 24));
			//noteLog[0].LASTREQUEST = d.setDate(d.getDate())-(7*(1000 * 3600 * 24));
			//noteLog[0].LASTREQUEST = d.setDate(d.getDate());
			//temp settings end
			let daydifference = Math.round(
				(d.setDate(d.getDate()) - noteLog[0].LASTREQUEST) / (1000 * 3600 * 24)
			);

			//first validate if expired
			if (message.exp_checked && new Date(message.exp_date) < d) {
				statusmessage =
					'The access code for this note has been successfully verified. However, the creator of the note has set an expiration date for the note of ' +
					message.exp_date +
					'. This means that the note already expired and will not be revealed anymore.';
				view = 'expired';
				outcome = -1;
			} else {
				if (noteLog[0].LASTREQUEST >= noteLog[0].LASTRESET) {
					if (noteLog[0].LASTREQUEST == noteLog[0].LASTRESET) {
						var newlastreset = noteLog[0].LASTRESET - 1;
						var query =
							"UPDATE LOG SET LASTRESET = '" +
							newlastreset +
							"' WHERE UNIQUEID = '" +
							noteLog[0].UNIQUEID +
							"'";
						updateNoteLog(query);
						sendEmail();
					}
					if (noteLog[0].LASTRESET > d.setDate(d.getDate() - message.inactivity)) {
						outcome = 1;
						statusmessage =
							'The access code for this note has been successfully verified. The QR code has been scanned ' +
							daydifference +
							' days ago for the first time. However, the defined period of time to wait before revealing the note has been set by the creator of the note to ' +
							message.inactivity.toString() +
							' days. This means that you still have to wait ' +
							(message.inactivity - daydifference).toString() +
							' days before the message will come available to you. Please return later to access the message.';
						view = 'inactivityperiod';
					} else {
						outcome = 2;
						subject = message.subject;
						note = message.note;
						expdate = message.exp_date;
						expcheck = message.exp_checked;
						try {
							if (message.nomiedata) {
								nomie = message.nomiedata;
							}
						} catch {
							nomie = { url: 'notdefined', db: '', user: '', pw: '' };
						}
						view = 'reveal';
						//BELOW ONLY EXCLUDED FOR TESTING
						//var query = "DELETE FROM LOG WHERE UNIQUEID = '" + noteLog[0].UNIQUEID + "'";
						//updateNoteLog(query);
					}
				} else {
					if (noteLog[0].LASTRESET > noteLog[0].LASTREQUEST) {
						outcome = 3;
						var query =
							"UPDATE LOG SET LASTREQUEST = '" +
							noteLog[0].LASTRESET +
							"' WHERE UNIQUEID = '" +
							noteLog[0].UNIQUEID +
							"'";
						updateNoteLog(query);
						statusmessage =
							'The access code for this note has been successfully verified. The QR code has been scanned ' +
							daydifference +
							' days ago for the last time. However, the creator of this note has responded to the request after this date, meaning that the creator is still alive/consious and does not want to have the message revealed yet. So there is no need to worry. Thanks for making use of our service, make sure to store the QR code in a save place so you can use it next time when needed.';

						view = 'reset';
					}
				}
			}
		}
	}

	async function getNoteLog() {
		var message = decryptObject(encnote, key);
		var uniqueid = message.uniqueid;
		const response = await fetch('/view/getLog', {
			method: 'POST',
			body: JSON.stringify({ uniqueid: uniqueid }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const data = await response.json();
		return data;
	}

	async function sendEmail() {
		var message = decryptObject(encnote, key);
		var uniqueid = message.uniqueid;
		if (domain.includes('localhost')) {
			domain = 'http://' + domain;
		} else {
			domain = 'https://' + domain;
		}
		const response = await fetch('/emails/validateowner', {
			method: 'POST',
			body: JSON.stringify({
				domain: domain,
				uniqueid: uniqueid,
				primaryemail: message.email_primary,
				secondaryemail: message.email_secondary,
				subject: message.subject
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	async function updateNoteLog(query = '') {
		const response = await fetch('/view/updateLog', {
			method: 'POST',
			body: JSON.stringify({ query: query }),
			headers: {
				'content-type': 'application/json'
			}
		});
	}
</script>

<a id="downloadAnchorElem" style="display:none"><button></button></a>
{#if view == 'accesscode'}
	<main class="container" style="background-color: #CAD1D8;">
		<div class="row align-items-center min-content-height">
			<div class="col">
				<div class="pb-3 pt-3 pt-md-5 mx-auto text-center">
					<h1 class="display-3">Request to Access a Message</h1>
				</div>
				<div class="pb-3">
					<div class="row">
						<div class="col-12 col-md-4 offset-md-4 mt-4">
							<label class="form-label">Access Code</label>
							<input
								type="text"
								name="access_code"
								class={txtfieldclass}
								maxlength="1000"
								bind:value={key}
							/>
							{#if invalidaccesscode}
								<div class="invalid-feedback">Invalid Access Code</div>
							{/if}
						</div>
					</div>
					<div class="row pt-5 text-center">
						<div class="col">
							{#if invalidaccesscode}
								<button class="btn btn-primary btn-lg" disabled>Next</button>
							{:else}
								<button
									class="btn btn-primary btn-lg"
									on:click={() => {
										accessNote();
									}}>Next</button
								>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
{/if}
{#if view == 'inactivityperiod' || view == 'reset' || view == 'expired'}
	<main class="container" style="background-color: #CAD1D8;">
		<div class="row align-items-center min-content-height">
			<div class="col">
				<div class="pb-3 pt-3 pt-md-5 mx-auto text-center">
					<h1 class="display-3">The Emergency Note</h1>
				</div>
				<div class="pb-3">
					<div class="row">
						<div class="col-12 col-md-8 offset-md-2 mt-3 text-break">
							{statusmessage}
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
{/if}
{#if view == 'reveal'}
	<main class="container" style="background-color: #CAD1D8;">
		<div class="row align-items-center min-content-height">
			<div class="col">
				<div class="pb-3 pt-3 pt-md-5 mx-auto text-center">
					<h1 class="display-3">The Emergency Note</h1>
				</div>
				<div class="pb-3">
					<div class="row">
						<div class="col-12 col-md-8 offset-md-2 mt-3 text-break">
							{#if expcheck}
								<p>Be aware that this message access will permanently expire on {expdate}.</p>
							{:else}
								<p>Be aware that this message has no expiration date.</p>
							{/if}
							<p>
								Please save or print this note. Once you close this page this note will become
								permanentely unaccessable in order prevent unauthorized access in the future.
							</p>
							<p><b>Subject:</b> {subject}</p>
							<p><b>Message:</b> {note}</p>
							<br />
							{#if nomie.url != 'notdefined'}
								<div class="row pt-5 text-center">
									<div class="col">
										<button
											class="btn btn-primary btn-lg"
											on:click={() => {
												getdata();
											}}>Download NOMIE DATA</button
										>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
{/if}
{#if view == 'oops'}
	<main class="container" style="background-color: #CAD1D8;">
		<div class="row align-items-center min-content-height">
			<div class="col">
				<div class="pb-3 pt-3 pt-md-5 mx-auto text-center">
					<h1 class="display-3">Oops....</h1>
				</div>
				<div class="pb-3">
					<div class="row">
						<div class="col-12 col-md-8 offset-md-2 mt-3 text-break">
							<p>
								Oops.... the note you are looking for is not accessable anymore. The most likely
								reasons are that 1) the creator has set an expiration date for accessing the note
								and the note has expired for that reason or 2) that the note has been revealed
								previously and as a result further access was immediately blocked.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
{/if}
