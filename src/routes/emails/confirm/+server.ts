
import { render } from 'svelte-email';
import Ownerconfirmation from '$lib/emails/Ownerconfirmation.svelte';
import nodemailer from 'nodemailer';
import type { RequestHandler } from './$types';


async function sendMail(domain="",primary="",secondary="",uniqueid="",subject=""){
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'dailynomie@gmail.com',
      pass: 'pzdsfxcsahurmgjw'
    }
  });
  
  const emailHtml = render({
      template: Ownerconfirmation,
      props: {
          "uniqueid": uniqueid,
          "subject": subject,
          "domain":domain
      }
  });
  
  const options = {
    from: 'dailynomie@gmail.com',
    to: primary+";"+secondary,
    subject: 'Message from AfterNomie',
    html: emailHtml
  };

  transporter.sendMail(options);
}



export const POST = (async ({ request }) => {
    var result;
    const data = await request.json();
    result = sendMail("https://www.afternomie.com",data.primaryemail,data.secondaryemail,data.uniqueid,data.subject)

    return new Response(JSON.stringify(result), {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
  }) satisfies RequestHandler;

