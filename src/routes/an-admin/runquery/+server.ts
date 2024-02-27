import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */;
import {runQuery} from '$lib/server/db';
import type { RequestHandler } from './$types';


export const POST = (async ({ request }) => {
    var result;
    const data = await request.json();
    result = await runQuery(data.query);
    

    return new Response(JSON.stringify(result), {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
  }) satisfies RequestHandler;
