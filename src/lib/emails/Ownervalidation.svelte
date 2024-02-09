<script>
	import { Button, Hr, Html, Text } from 'svelte-email';

	export let uniqueid = "";
    export let subject = "";
    export let domain = "";
    console.log("UniqueId: ",uniqueid)
    var endpoint = domain+ "/block/"+uniqueid;
    console.log(endpoint);


</script>

<Html lang="en">
	<Text>
        <p>Hi,</p>
		<p>Someone is trying to access your emergency note that has the following subject: <b>{subject}</b></p>
                  <p>If you want to block the access of this note you must hit the button below:</p>
                  <p><b><a href={endpoint} target='_blank'>Yes, I want to block the access of this note</a></b></p>
                  <p>After blocking this access, you will receive a new notification if someone tries to access your emergency note again.</p>
                  <hr>
                  <p>Have questions or need help? Just write us at <a href='mailto:dailynomie@gmail.com'>dailynomie@gmail.com</a></p>
    </Text>
	<Hr />
    
</Html>