<script lang="ts">
	import Start1 from "../../components/layout/start1.svelte"
	import Start2 from "../../components/layout/start2.svelte"
	import Start3 from "../../components/layout/start3.svelte"
	import Start4 from "../../components/layout/start4.svelte"
	import Start5 from "../../components/layout/start5.svelte"
	import type { PageData } from './$types';
    export let data: PageData;


	var exp_checked = false;
	var subject = "";
	var note = "";
	var email_primary = "";
	var email_secondary = "";
	var inactivity = "7";
	var exp_date = "";
    var view = "start1"
	var refresh = false;

	$: if(view){
		refresh = true;
		setTimeout(function() {
      refresh = false
   }, 10)}

   const saveLog = async (event)=>{
	console.log("savelog triggered")
	var lastrequest = new Date().getTime();
	var lastvalidated = new Date().getTime();
	const response = await fetch('/start/addLog', {
			method: 'POST',
			body: JSON.stringify({ "uniqueid":event.detail,"lastrequest":lastrequest,"lastreset":lastvalidated }),
			headers: {
				'content-type': 'application/json'
			}
		});
		
   }
</script>

<body style="background-color: #CAD1D8;">
	{#if !refresh}
	{#if view=="start1"}
	<Start1 bind:view={view} bind:exp_checked={exp_checked} bind:subject={subject} bind:note={note} bind:email_primary={email_primary} bind:email_secondary={email_secondary} bind:inactivity={inactivity} bind:exp_date={exp_date}></Start1>
	{:else if view=="start2"}
	<Start2 bind:view={view} bind:exp_checked={exp_checked} bind:subject={subject} bind:note={note} bind:email_primary={email_primary} bind:email_secondary={email_secondary} bind:inactivity={inactivity} bind:exp_date={exp_date}></Start2>
	{:else if view=="start3"}
	<Start3 bind:view={view} bind:exp_checked={exp_checked} bind:subject={subject} bind:note={note} bind:email_primary={email_primary} bind:email_secondary={email_secondary} bind:inactivity={inactivity} bind:exp_date={exp_date}></Start3>
	{:else if view=="start4"}
	<Start4 on:savelog={saveLog} bind:view={view} bind:exp_checked={exp_checked} bind:subject={subject} bind:note={note} bind:email_primary={email_primary} bind:email_secondary={email_secondary} bind:inactivity={inactivity} bind:exp_date={exp_date}></Start4>
	{:else if view=="start5"}
	<Start5 bind:view={view}></Start5>
	
	{/if}
	{/if}

</body>

  
