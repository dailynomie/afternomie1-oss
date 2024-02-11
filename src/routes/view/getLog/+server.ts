import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */;
import {getLog} from '$lib/server/db';
import type { RequestHandler } from './$types';


export const POST = (async ({ request }) => {
    var result;
    var success = false;
    const data = await request.json();
    result = getLog(data.uniqueid);
    

    return new Response(JSON.stringify(result), {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
  }) satisfies RequestHandler;
