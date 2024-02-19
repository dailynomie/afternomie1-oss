// Allow the preflight options call to return a 200-ok response

// This way our API can function as a backend API

import type { Handle } from '@sveltejs/kit';




export const handle : Handle = async ({event, resolve}) => 

{

    if (event.request.method !== "OPTIONS") 

        return await resolve(event)


    return new Response(null, {status: 200})

}