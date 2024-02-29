import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */;
import {addLog} from '$lib/server/db';

export async function POST({ request }) { 
    const data = await request.json();
    try {if (data.confirmed) {data.confirmed = data.confirmed}}
    catch {data.confirmed = 0}
    addLog(data.uniqueid,data.lastrequest,data.lastreset,data.expiredate,data.expires,data.confirmed)
    const response = new Response(JSON.stringify({"succes":true}));
    response.headers.append('Access-Control-Allow-Origin', '*');
    return response;
} 