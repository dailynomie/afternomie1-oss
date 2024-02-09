<script>
	import Image from '../components/atoms/image.svelte';
</script>

<style>
	body {
		cursor: default;
	}
	
	::-moz-selection {
	  color: #FFFFFF;
	  background: #000000;
	}
	
	::selection {
	  color: #FFFFFF;
	  background: #000000;
	}
	
	h1,
	
	
	.container {
		max-width: 960px;
	}
	
	
	
	.btn {
		border-radius: 30px;
		text-transform: uppercase;
		font-weight: 700;
	}
	</style>


<section>
	
	<div>
		<body style="background-color: #CAD1D8;">
			<main class="container">
			  <div class="row align-items-center min-content-height">
				<div class="col">
				  <div class="pb-3 pt-3 pt-md-5 pb-5 mx-auto text-center">
					<h1 class="display-3">A Message for the Future.</h1>
					<p class="lead"><b>AfterNomie is an opensource tool for creating emergency notes that can be read by your trusted contacts only after your death or if you are seriously injured.
										When used in conjunction with the <a href="https://www.dailynomie.com/" target="_blank">DailyNomie</a> app & Sync Service it also enables you to disclose your Nomie tracking history.
					</b></p>
					<a class="btn btn-primary btn-lg d-inline-block d-md-none mt-4" href="/start">Get Started</a>
				  </div>
				  <div class="pb-3">
					<div class="row mt-4 mb-4 mt-sm-5 mb-sm-5">
					  <div class="col-12 col-md-8 offset-md-2">
						<h1>How it works</h1>
						<p>Directly after you created your note, it will be encrypted and converted into a QR code which you can give to a person you trust. 
							When this person tries to access your message, AfterNomie will try to contact you via email as soon as possible; 
							if you do not reply within the period of time you previously defined, your note will become visible to your trusted person.
							When you use AfterNomie in combination with <b>DailyNomie & Sync Service</b> it will enable you to reveal your Nomie tracking
							history in conjunction with your note.</p>
					  </div>
					</div>
					<div class="row mt-4 mb-4 mt-sm-5 mb-sm-5">
					  <div class="col-12 col-md-8 offset-md-2">
						<h1>Why should I use it?</h1>
						<p>Regardless of age, health, social status, or geographical location, one day we will all die or be severely ill. 
							Leaving a note to the people you trust will allow you to give them your last message and possibly fulfill your last wills.</p>
					  </div>
					</div>
					<div class="row mt-4 mb-4 mt-sm-5 mb-sm-5">
					  <div class="col-12 col-md-8 offset-md-2">
						<h1>We don't store your data</h1>
						<p>There is no need to register an account on AfterNomie. 
							In fact, your data stays only in the QR code that is generated and eventually printed. 
							You always have a look into the source code if you would like to validate our statement .</p>
					  </div>
					</div>
					<div class="row mt-4 mb-4 mt-sm-5 mb-sm-5">
					  <div class="col-12 col-md-8 offset-md-2">
						<h1>Safe</h1>
						<p>Your note is securely encrypted and its access code is randomly generated. 
							Even if AfterNomie gets hacked, your notes cannot be accessed because once they are generated they are not stored on AfterNomie. 
							Your notes are only stored in the generated QR code you share with your trusted friend</p>
					  </div>
					</div>
					<div class="row mt-4 mb-4 mt-sm-5">
					  <div class="col-12 col-md-8 offset-md-2">
						<h1>Fast</h1>
						<p>On AfterNomie you can create your emergency note in less than 3 minutes.
							It takes just 2 steps to create your message and print the QR code containing your encrypted message.
						</p>
					  </div>
					</div>
					<div class="row mt-4 mb-4 mt-sm-5">
						<div class="col-12 col-md-8 offset-md-2">
						  <h1>DailyNomie</h1>
						  <p>AfterNomie also gives you the opportunity to reveal your DailyNomie tracking data. In order to make use of
							this functionality, you should create your note directly from the <a href="https://www.dailynomie.com/" target="_blank">DailyNomie</a> app.
						  </p>
						</div>
					  </div>
					<div class="row mt-4 mt-sm-5 d-inline d-md-none text-center">
					  <div class="col-12 col-md-8 offset-md-2 text-center">
						<a class="btn btn-primary btn-lg" href="/start">Get Started</a>
					  </div>
					</div>
				  </div>
				</div>
			  </div>
			</main>
		  </body>
	</div>
	
</section>


