import type { PageServerLoad } from './$types';
import {getLogs, updateLog} from '$lib/server/db'

export const load = (({ params, locals }) => {
	const encnote = (params.note);
	const logs = getLogs();

    return {
		"encnote":encnote,"logs":logs
	};
}) satisfies PageServerLoad;



