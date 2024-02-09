import type { PageServerLoad } from './$types';

export const load = (({ params, locals }) => {
	const id = (params.id);

    return {
		"uniqueid":id
	};
}) satisfies PageServerLoad;



