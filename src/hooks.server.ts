// Allow the preflight options call to return a 200-ok response

// This way our API can function as a backend API

import type { Handle } from '@sveltejs/kit';

const securityHeaders = {
    'Access-Control-Allow-Origin': '*',
}


export const corsHeaders = {
	'Access-Control-Allow-Credentials': 'true',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,POST',
	'Access-Control-Allow-Headers':
		'authorization, x-client-info, apikey, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
};


export const handle: Handle = async ({ event, resolve }) => {
	if (event.request.method !== 'OPTIONS') {
		const response = await resolve(event);
		for (const [key, value] of Object.entries(corsHeaders)) {
			response.headers.set(key, value);
		}
		return response;
	}

	return new Response('ok', { headers: corsHeaders });
};