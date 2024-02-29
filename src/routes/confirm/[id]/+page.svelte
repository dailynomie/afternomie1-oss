<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    export let data: PageData;

    var uniqueid = data.uniqueid;
   
    async function updateNoteLog(query=""){
        
        const response = await fetch('/view/updateLog', {
			method: 'POST',
			body: JSON.stringify({ "query":query}),
			headers: {
				'content-type': 'application/json'
			}
		});
    }

    onMount (()=>{
      var d = new Date();
      var dd = d.setDate(d.getDate());
      var query = "UPDATE LOG SET CONFIRMED= '1' WHERE UNIQUEID = '" + uniqueid+"'";
    updateNoteLog(query);
   })

</script>

<main class="container" style="background-color: #CAD1D8;">
    <div class="row align-items-center min-content-height">
      <div class="col">
        <div class="pb-3 pt-3 pt-md-5 mx-auto text-center">
          <h1 class="display-3">yes....confirmed!</h1>
        </div>
        <div class="pb-3">
          <div class="row">
            <div class="col-12 col-md-8 offset-md-2 mt-3 text-break">
              You just confirmed that you created a message.
              The process has now become fully active.
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  
  