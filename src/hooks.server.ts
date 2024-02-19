// Allow the preflight options call to return a 200-ok response

// This way our API can function as a backend API

import type { Handle } from '@sveltejs/kit';

const securityHeaders = {
    'Access-Control-Allow-Origin': '*',
}




export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);
    Object.entries(securityHeaders).forEach(
        ([header, value]) => response.headers.set(header, value)
    );

    return response;
}