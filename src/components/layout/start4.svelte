<script>
  import { encryptObject } from '../../services/encrypt';
  import { QRCodeImage } from "svelte-qrcode-image";
  import { onMount } from 'svelte';
  import {createEventDispatcher} from 'svelte';
  export let exp_checked =true;
	export let subject = "";
	export let note = "";
	export let email_primary = "";
	export let email_secondary = "";
	export let inactivity = "7";
	export let exp_date = "";
  export let view = "start4";
  export let stored = false;
  export let txt = "dummy";
  export let enckey = "no valid key"

  var qrwidth = 0;
  var refreshqr = false;
  var lockwidth = false;
  

  $: innerWidth = 0

  $: if (innerWidth && !lockwidth) {
    qrwidth = innerWidth*0.93;
    if (qrwidth > 700){qrwidth = 700}

    //refreshqr
    refreshqr = true;
		setTimeout(function() {
      refreshqr = false
      
   }, 10)

  }

  const dispatch = createEventDispatcher();
   var domain = window.location.hostname;
   var port = window.location.port;
   if (port !="") {domain = domain +":"+port}
   var viewprint = true;
   var refresh = false;

  

   function encryptobject(){
    if (stored == false) {
    var uniqueid = key(15);
    //// INCLUDE NOMIE FOR TEST
    var url = "https://sync.dailynomie.com/"
    var db = "dn_d0ig1qkc55zhh4l"
    var user = "nomieuser_pr6qd276ku"
    var pw = "uwVi5AeI6pCnG_u!H!"
    var nomie = { url: url, db: db, user: user, pw: pw };
    var data = {"subject":subject,"note":note,"email_primary":email_primary,"email_secondary":email_secondary,"inactivity":inactivity,"exp_checked":exp_checked,"exp_date":exp_date,"uniqueid":uniqueid,"nomiedata":nomie}
    //// INCLUDE NOMIE FOR TEST END
    
    //var data = {"subject":subject,"note":note,"email_primary":email_primary,"email_secondary":email_secondary,"inactivity":inactivity,"exp_checked":exp_checked,"exp_date":exp_date,"uniqueid":uniqueid}
    
    enckey = key(15);
    var encryptednote = encryptObject(data, enckey)
    txt = domain+"/view/"+encryptednote;
    if (txt.includes("localhost") || txt.includes("192.168.178")) {
      txt = "http://"+txt
    }
    else {txt = "https://"+txt}
    storeindb(uniqueid);
    stored = true;
  }
   }

   function key(length){
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var charLength = chars.length;
   var result = '';
   for ( var i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
   }
   return result;
   }

   function storeindb(uniqueid=""){
    dispatch('savelog',uniqueid);
   }
   
   function printscreen() {
    lockwidth = true;
    qrwidth = 500;
    //viewprint = false;
    refreshqr = true;
		setTimeout(function() {
      refreshqr = false
      
   }, 1)

  setTimeout(function() {
   window.print() 
}, 100)

setTimeout(function() {
  lockwidth = false; 
}, 3000)

 }

   onMount (()=>{
    encryptobject();
   })

</script>

<svelte:window bind:innerWidth />

{#if !refresh}
<main class="container"  style="background-color:#CAD1D8">
  <div class="row align-items-center min-content-height">
    <div class="col">
      <div class="pb-3 pt-3 pt-md-5 mx-auto text-center">
        <h1 class="display-3">The AfterNomie QR Code</h1>
      </div>
      <div class="pb-3">
        
        <div  style="text-align:center">
          {#if !refreshqr}
          <QRCodeImage bind:text={txt} scale={8} displayType="canvas" bind:width={qrwidth}/> 
          {/if}
        </div>
          
        
        <div class="row">
          <div class="col-12 col-md-8 offset-md-2 mt-3 text-break text-center">
            This document was created on AfterNomie.com, a platform for
                    creating emergency notes that can only be read by trusted contacts
                    after being dead or severely injured.
                    In order to read the following emergency note, scan the QR code
                    and then enter this access code: {enckey}
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-8 offset-md-2 mt-3 text-break text-center not-printable">
            <p>Beta Feature: <b><a href={txt} target='_blank'>link to note</a></b></p>
            <p><b>Very important!</b> Add the email address dailynomie@gmail.com 
                to your email provider's safe senders list to prevent any notification from us regarding the note you just created from mistakenly ending up in spam.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-8 offset-md-2 mt-3 text-break text-center">
            This Note was created on: {new Date()}
          </div>
        </div>
        {#if viewprint}
        <div class="row pt-5 text-center not-printable">
          <div class="col">
            <button class="btn btn-primary btn-lg" on:click={()=>{printscreen()}}>Print</button>
        </div>
         </div>
         {/if}
      </div>
    </div>
  </div>
</main>
{/if}

<style>
  @media print {
      .not-printable { display: none; }
  }
</style>
