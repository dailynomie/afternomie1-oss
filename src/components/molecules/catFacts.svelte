<script>
	// @ts-nocheck
	const getCatFacts = async () => {
		return await fetch(
			'https://cat-fact.herokuapp.com/facts/'
		)
			.then((response) => response.json())
			.then((payload) => {
				//console.debug(payload);
				//console.debug(payload.items);
				return payload;
			});
	};

	let promise = getCatFacts();
</script>

{#await promise}
	<div class="loader" />
{:then catFact}
	{#each catFact as catFact}
		<p>{catFact.text}</p>
	{/each}
{:catch error}
	<p>{error.message}</p>
{/await}


