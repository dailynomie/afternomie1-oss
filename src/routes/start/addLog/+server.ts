import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */;
import {addLog} from '$lib/server/db';

export async function POST({ request }) { 
    const data = await request.json();
    addLog(data.uniqueid,data.lastrequest,data.lastreset)
    const response = new Response(JSON.stringify({"succes":true}));
    response.headers.append('Access-Control-Allow-Origin', '*');
    return response;
} 