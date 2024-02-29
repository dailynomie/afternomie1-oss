<script>
	import { Button, Hr, Html, Text } from 'svelte-email';

	export let uniqueid = "";
    export let subject = "";
    export let domain = "";
    var endpoint = domain+ "/confirm/"+uniqueid;


</script>

<Html lang="en">
	<Text>
        <p>Hi,</p>
		<p>You just created an emergency note with the following subject: <b>{subject}</b></p>
                  <p>Please confirm this emergency note by clicking on below link:</p>
                  <p><b><a href={endpoint} target='_blank'>Yes, I want to make use of the AfterNomie Service</a></b></p>
                  <p>If you did not create an emergency note on the AfterNomie platform, you can ignore this email.</p>
                  <hr>
                  <p>Have questions or need help? Just write us at <a href='mailto:dailynomie@gmail.com'>dailynomie@gmail.com</a></p>
    </Text>
	<Hr />
    
</Html>