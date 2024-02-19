<script>
  export let exp_checked =true;
	export let subject = "";
	export let note = "";
	export let email_primary = "";
	export let email_secondary = "";
	export let inactivity = "7";
	export let exp_date = "";
  export let view = "start2";
    
  var date = new Date(new Date().setDate(new Date().getDate() + 7))
	var dayst = "";
	var monthst = ""
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
  var validprimary = false;
  var validsecondary = false;
  var validsubject = false;
  var validnote = false;
  var txtfieldclasspri = "form-control is-invalid";
  var txtfieldclasssec = "form-control is-invalid";
  var txtfieldclasssub = "form-control is-invalid";
  var txtfieldclassnote = "form-control is-invalid";

	if (month < 10) {monthst = "0" + month;}
    else {monthst = month.toString()}
	if (day < 10) {dayst = "0" + day;}
    else {dayst = day.toString()}
    var default_exp = year + "-" + monthst + "-" + dayst; 
    if (exp_date == null || exp_date =="") {exp_date=default_exp;}

$: if (email_primary) {
  validprimary = checkemail(email_primary);
  if (validprimary) {txtfieldclasspri = "form-control is-valid";}
  else {txtfieldclasspri = "form-control is-invalid";}
  
}

$: if (email_secondary) {
  validsecondary = checkemail(email_secondary);
  if (validsecondary) {txtfieldclasssec = "form-control is-valid";}
  else {txtfieldclasssec = "form-control is-invalid";}
  
}

$: if (subject) {
  if (subject.length >5) {validsubject = true}
  else {validsubject = false}
  if (validsubject) {txtfieldclasssub = "form-control is-valid";}
  else {txtfieldclasssub = "form-control is-invalid";}
  
}

$: if (note) {
  if (note.length >99 && note.length <1001) {validnote = true}
  else {validnote = false}
  if (validnote) {txtfieldclassnote = "form-control is-valid";}
  else {txtfieldclassnote = "form-control is-invalid";}
}

function checkemail(enteredEmail=""){
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(enteredEmail);
}


</script>

<main class="container"  style="background-color: #CAD1D8;">
    <div class="row align-items-center min-content-height">
      <div class="col">
        <div class="pb-3 pt-3 pt-md-5 mx-auto text-center">
          <h1 class="display-3">Create your Emergency Note</h1>
        </div>
        <div class="pb-3">
            <div class="row">
              <div class="col-12 col-md-8 offset-md-2 mt-3 mb-3 text-break">
                <label class="form-label">Subject</label>
                <input type="text" name="subject" class={txtfieldclasssub} maxlength="100" required bind:value={subject}>
                <span class="form-text">
                  Don't write sensitive data in this field but only a summary of your note, minimum 6 characters
                </span>
              </div>
              <div class="col-12 col-md-8 offset-md-2 mt-3 mb-3">
                <label class="form-label">Emergency note</label>
                <textarea name="note" class={txtfieldclassnote} rows="10" maxlength="1000" required bind:value={note}></textarea>
                <span class="form-text">
                  You can write up to a maximum of 1000 characters, minimum 100 characters
                </span>
              </div>
              <div class="col-12 col-md-8 offset-md-2 mt-3 mb-3">
                <label class="form-label">Your primary email address</label>
                <input type="email" name="primary_email" class={txtfieldclasspri} maxlength="254" required id="primary_email_input" bind:value={email_primary}>
                <span class="form-text">
                  Make sure this is the email address you use every day 
                </span>
              </div>
              <div class="col-12 col-md-8 offset-md-2 mt-3 mb-3">
                <label class="form-label">Your secondary email address (optional)</label>
                <input type="email" name="secondary_email" class={txtfieldclasssec} maxlength="254" id="secondary_email_input" bind:value={email_secondary}>
                <span class="form-text">
                  This email address can come in handy in case your primary address is compromised or becomes inaccessible 
                </span>
              </div>
              <div class="col-12 col-md-8 offset-md-2 mt-3 mb-3">
                <label class="form-label">Inactivity time</label>
                <select name="inactivity_time" class="form-select" aria-label="Inactivity time" id="inactivity_time_select" bind:value={inactivity}>
                  <option value="1">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                  <option value="6">6 Days</option>
                  <option value="7" selected>7 Days</option>
                  <option value="8">8 Days</option>
                  <option value="9">9 Days</option>
                  <option value="10">10 Days</option>
                  <option value="11">11 Days</option>
                  <option value="12">12 Days</option>
                  <option value="13">13 Days</option>
                  <option value="14">14 Days</option>
                  <option value="15">15 Days</option>
                  <option value="16">16 Days</option>
                  <option value="17">17 Days</option>
                  <option value="18">18 Days</option>
                  <option value="19">19 Days</option>
                  <option value="20">20 Days</option>
                  <option value="21">21 Days</option>
                  <option value="22">22 Days</option>
                  <option value="23">23 Days</option>
                  <option value="24">24 Days</option>
                  <option value="25">25 Days</option>
                  <option value="26">26 Days</option>
                  <option value="27">27 Days</option>
                  <option value="28">28 Days</option>
                  <option value="29">29 Days</option>
                  <option value="30">30 Days (1 Month)</option>
                  <option value="60">60 Days (2 Months)</option>
                  <option value="90">90 Days (3 Months)</option>
                  <option value="120">120 Days (4 Months)</option>
                  <option value="150">150 Days (5 Months)</option>
                  <option value="180">180 Days (6 Months)</option>
                </select>
                <span class="form-text">
                  How long after your inactivity shall your trusted contact be able to access your note? 
                </span>
              </div>
              <div class="col-12 col-md-8 offset-md-2 mt-3 mb-md-4">
                <div class="row g-0">
                  <div class="col-auto">
                    <div class="form-check form-switch">
                      <input name="expiration_date_switch" class="form-check-input" type="checkbox" role="switch" id="expiration_date_switch" bind:checked={exp_checked}>
                    </div>
                  </div>
                  <div class="col-auto">
                    <label for="expiration_date_switch" class="form-label">Note expiration date (optional)</label>
                  </div>
                </div>
                <input name="expiration_date" type="date" id="expiration_date" class="form-control" bind:value={exp_date} min={default_exp} max="3000-12-31" disabled={!exp_checked} required>
                <span class="form-text">
                  When should this note expire and become totally inaccessible? 
                </span>
              </div>
            </div>
            <div class="row pt-5 text-center">
              <div class="col">
                {#if !validsubject || !validnote || !validprimary}
                <button class="btn btn-primary btn-lg" disabled on:click={()=>{view="start2"}}>Continue</button>
                {:else}
                <button class="btn btn-primary btn-lg" on:click={()=>{view="start2"}}>Continue</button>
                {/if}
              </div>
            </div>
        </div>
      </div>
    </div>
  </main>

  <style>
	.form-label {
	font-weight: 800;
}
  </style>