
import { render } from 'svelte-email';
import Ownerconfirmation from '$lib/emails/Ownerconfirmation.svelte';
import nodemailer from 'nodemailer';
import type { RequestHandler } from './$types';
import { config } from '../../../../src/secrets.json'


async function sendMail(domain="",primary="",secondary="",uniqueid="",subject=""){
  const transporter = nodemailer.createTransport({
    host: config.secrets.emailhost,
    //host: 'smtp.gmail.com',
    port: config.secrets.emailport,
    //port: 465,
    secure:config.secrets.emailsecure,
    //secure: true,
    auth: {
      user: config.secrets.emailuser,
      pass: config.secrets.emailpw
    }
   // auth: {
   //   user: 'dailynomie@gmail.com',
   //   pass: 'pzdsfxcsahurmgjw'
   // }
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
    //from: 'dailynomie@gmail.com',
    from: config.secrets.emailuser,
    to: primary+";"+secondary,
    subject: 'Message from AfterNomie',
    html: emailHtml
  };

  transporter.sendMail(options);
}



export const POST = (async ({ request }) => {
    var result;
    const data = await request.json();
    //result = sendMail("https://www.afternomie.com",data.primaryemail,data.secondaryemail,data.uniqueid,data.subject)
    result = sendMail(data.domain,data.primaryemail,data.secondaryemail,data.uniqueid,data.subject)

    return new Response(JSON.stringify(result), {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
  }) satisfies RequestHandler;

