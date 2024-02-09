<script>
    export let exp_checked =true;
	export let subject = "";
	export let note = "";
	export let email_primary = "";
	export let email_secondary = "";
	export let inactivity = "7";
	export let exp_date = "";
  export let view = "start2";
   
</script>

<main class="container"  style="background-color: #CAD1D8;">
  <div class="row align-items-center min-content-height">
    <div class="col">
      <div class="pb-3 pt-3 pt-md-5 mx-auto text-center">
        <h1 class="display-3">Just to be Sure</h1>
      </div>
      <div class="pb-3">
        <div class="row">
          <div class="col-12 col-md-8 offset-md-2 mt-3 text-break">
            <ul>
              <li><p>The subject of your emergency note is <b>'{subject}'</b>.</p></li>
              <li><p>The content of your emergency note is <b>'{note}'</b>.</p></li>
              <li>
                {#if email_secondary != ""}
                  <p>As soon as your trusted contact tries to access this note, AfterNomie will send you an email 
                    notification to <b>{email_primary}</b> and <b>{email_secondary}</b>.</p>
                {:else}
                  <p>As soon as your trusted contact tries to access this note, AfterNomie will send you an email 
                    notification to <b>{email_primary}</b>.</p>
                {/if}
              </li>
              <li>
                {#if inactivity == "1"}
                  <p>If no action is taken by you within <b>1 day</b>, your trusted contact will then be able to read the content of the note.</p>
                {:else}
                  <p>If no action is taken by you within <b>{inactivity} days</b>, your trusted contact will then be able to read the content of the note.</p>
                {/if}
              </li>
              {#if !exp_checked}
                <li><p>This Note will never expire</p></li>
              {:else}
                <li><p>This Note expires on <b>{exp_date}</b></p></li>
              {/if}
              <li><p>This note can't be edited in the future.</p></li>
              <li><p>You accept our terms of service.</p></li>
            </ul>
          </div>
        </div>
        <div class="row pt-5 text-center">
          <div class="col">
              <button class="btn btn-secondary btn-lg" on:click={()=>{view="start1"}}>Return</button>
          </div>
          <div class="col">
            <button class="btn btn-primary btn-lg" on:click={()=>{view="start3"}}>Confirm</button>
        </div>
        </div>
      </div>
    </div>
  </div>
</main>
