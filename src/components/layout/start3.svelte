<script>
  export let exp_checked =true;
	export let subject = "";
	export let note = "";
	export let email_primary = "";
	export let email_secondary = "";
	export let inactivity = "7";
	export let exp_date = "";
  export let view = "start3";

  async function CreatePDF() {
   view="start4"
    //window.print()
    //const pdf = await genNotePdf(data);
    //console.log(pdf)
  }
   
</script>

<main class="container"  style="background-color: #CAD1D8;">
  <div class="row align-items-center min-content-height">
    <div class="col">
      <div class="pb-3 pt-3 pt-md-5 mx-auto text-center">
        <h1 class="display-3">All Done</h1>
      </div>
      <div class="pb-3">
        <div class="row">
          <div class="col-12 col-md-8 offset-md-2 mt-3 text-break text-center">
            Your emergency note has been created. You can download it by clicking the button below, 
            then print it and deliver it to your trusted person.
            <br><br>
            <b>Very important!</b> Add the email address dailynomie@gmail.com 
            to your email provider's safe senders list to prevent any notification from us regarding the note you just created from mistakenly ending up in spam.
          </div>
        </div>
        <div class="row pt-5 text-center">
        <div class="col">
          <button class="btn btn-primary btn-lg" on:click={()=>{CreatePDF()}}>GET EMERGENCY NOTE</button>
      </div>
       </div>
      </div>
    </div>
  </div>
</main>
