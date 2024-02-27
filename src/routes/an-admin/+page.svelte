<script lang="ts">
	import { onMount } from 'svelte';

	var user = '';
	var pw = '';
	var loggedin = false;
	var totallogs = 0;
	var totalexpirelogs = 0;

	async function runQuery(query:string){
		const response = await fetch('/an-admin/runquery', {
			method: 'POST',
			body: JSON.stringify({ query: query }),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(function (response) {
				// The response is a Response instance.
				// You parse the data into a useable format using `.json()`
				return response.json();
			})
			.then(function (data) {
				// `data` is the parsed version of the JSON returned from the above endpoint.
				//console.log(data); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
				return data;
			});

		return response
	}

	async function deleteRows(query:string){
		const response = await fetch('/an-admin/deleterows', {
			method: 'POST',
			body: JSON.stringify({ query: query }),
			headers: {
				'content-type': 'application/json'
			}
		})
	}

	async function loadData() {
		var query = 'SELECT * FROM LOG';
		var countlogs = await runQuery(query)
		console.log(countlogs)
		console.log("checkpoint")
		totallogs = countlogs.length;
		query = 'SELECT * FROM LOG where EXPIRES = TRUE and EXPIREDATE < '+new Date().getTime();
		//query = 'SELECT * FROM LOG where EXPIRES = TRUE'
		countlogs = await runQuery(query)
		totalexpirelogs = countlogs.length;

		
	}

	async function deleteExpired() {
		var query = 'DELETE FROM LOG where EXPIRES = TRUE and EXPIREDATE < '+new Date().getTime();
		await deleteRows(query)
		await loadData()
	}

	onMount(async () => {
		loadData();
	});
</script>

<body style="background-color: #CAD1D8;">
	{#if user == 'admin' && pw == 'dus0208l' && loggedin}
		<main class="container" style="background-color: #CAD1D8;">
			<div class="row align-items-center min-content-height">
				<div class="col">
					<div class="pb-3 pt-3 pt-md-5 mx-auto text-center">
						<h1 class="display-3">Admin Panel</h1>
					</div>
					<div class="pb-3">
						<div class="row">
							<div class="col-12 col-md-8 offset-md-2 mt-3 mb-3 text-break">
								<p>ALL LOGS:</p>
								<button
									class="btn btn-primary btn-lg"
									on:click={() => {
										console.log('Placeholder');
									}}>Flush all {totallogs} Logs</button
								>
							</div>
							<div class="col-12 col-md-8 offset-md-2 mt-3 mb-3 text-break">
								<p>EXPIRATION:</p>
								<button
									class="btn btn-primary btn-lg"
									on:click={() => {
										deleteExpired();
									}}>Flush {totalexpirelogs} expired Messages</button
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	{:else}
		<main class="container" style="background-color: #CAD1D8;">
			<div class="row align-items-center min-content-height">
				<div class="col">
					<div class="pb-3 pt-3 pt-md-5 mx-auto text-center">
						<h1 class="display-3">Admin Login</h1>
					</div>
					<div class="pb-3">
						<div class="row">
							<div class="col-12 col-md-8 offset-md-2 mt-3 mb-3 text-break">
								<label class="form-label">User</label>
								<input class="form-control" type="text" name="user" required bind:value={user} />
								<span class="form-text"> UserName </span>
							</div>
							<div class="col-12 col-md-8 offset-md-2 mt-3 mb-3 text-break">
								<label class="form-label">Password</label>
								<input class="form-control" type="text" name="pw" required bind:value={pw} />
								<span class="form-text"> Password </span>
							</div>
							<div class="row pt-5 text-center">
								<div class="col">
									<button
										class="btn btn-primary btn-lg"
										on:click={() => {
											loggedin = true;
										}}>Login</button
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	{/if}
</body>

<style>
	body {
		cursor: default;
	}

	::-moz-selection {
		color: #ffffff;
		background: #000000;
	}

	::selection {
		color: #ffffff;
		background: #000000;
	}

	h1,
	.container {
		max-width: 960px;
	}

	.btn {
		border-radius: 30px;
		text-transform: uppercase;
		font-weight: 700;
	}

	.form-label {
		font-weight: 800;
	}
</style>
