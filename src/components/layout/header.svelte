<script>
	import { page } from '$app/stores'; 

	var currentpage = "index";
	var refresh = false;

	$: if ($page.url.pathname) {
		console.log("check", $page.url.pathname)
	if ($page.url.pathname == "/") {
		currentpage = "index"
	}
	else if ($page.url.pathname == "/done") {
		currentpage = "done"
	}
	else if ($page.url.pathname == "/note") {
		currentpage = "note"
	}
	else {currentpage = "none"}
	refresh = true;
		setTimeout(function() {
      refresh = false
   }, 1)
}
</script>

<header class="d-print-none d-flex flex-column flex-md-row align-items-center pt-5 pb-2 p-md-3 px-md-3 mb-3 sticky-md-top">
	<p class="my-0 me-md-auto fw-normal"><a href="/"><img src="../img/logo_grey_beta.svg" class="logo" alt="AfterNomie"></a></p>
	{#if !refresh}
	{#if currentpage == "index"}
	<a class="btn btn-primary btn-lg d-none d-md-inline-block" href="/start">Get Started</a>
	{/if}
	{#if currentpage == "done"}
	<a class="btn btn-outline-primary btn-lg d-none d-md-inline-block" href="/start">Create Another One</a>
	{/if}
	{#if currentpage == "note"}
	<a class="btn btn-outline-primary btn-lg d-none d-md-inline-block" href="/start">Create your Emergency Note</a>
	{/if}
	{/if}
</header>

<style>
	.logo {
	height: 50px;
	width: auto;
	padding: 4px;
}
</style>