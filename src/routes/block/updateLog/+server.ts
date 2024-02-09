import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */;
import {getLog,updateLog} from '$lib/server/db';
import type { RequestHandler } from './$types';


export const POST = (async ({ request }) => {
    var result;
    var success = false;
    const data = await request.json();
    result = updateLog(data.query);
    

    return new Response(JSON.stringify(result), {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
  }) satisfies RequestHandler;
