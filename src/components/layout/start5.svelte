<script>
  export let view = "start5";
   
</script>

<main class="container"  style="background-color: #CAD1D8;">
  <div class="row align-items-center min-content-height">
    <div class="col">
      <div class="pb-3 pt-3 pt-md-5 mx-auto text-center">
        <h1 class="display-3">That's it!</h1>
      </div>
      <div class="pb-3">
        <div class="row">
          <div class="col-12 col-md-8 offset-md-2 mt-3 text-break text-center">
           
                  <p>Thanks for using our service! Hopefully the encrypted note will not be needed. If you would like to create another note, please do not hesitate to make use of our service again. Take care, team AfterNomie</p>
                  <b>Very important!</b> Add the email address dailynomie@gmail.com 
                to your email provider's safe senders list to prevent any notification from us regarding the note you just created from mistakenly ending up in spam.
          </div>
        </div>
        <div class="row pt-5 text-center">
          <div class="col">
              <button class="btn btn-primary btn-lg" on:click={()=>{view="start4"}}>Print Again</button>
          </div>
          <div class="col">
						<a class="btn btn-primary btn-lg" href="/">GoTo Home</a>
					</div>
        </div>
      </div>
    </div>
  </div>
</main>
