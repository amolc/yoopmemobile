<?php
include("Connections/db_connection.php");
include("Connections/functions.php");
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
	<title>Login</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- stylesheets -->
	<link rel="stylesheet" type="text/css" href="css/compiled/theme.css" />
	<link rel="stylesheet" type="text/css" href="css/vendor/brankic.css" />
	<link rel="stylesheet" type="text/css" href="css/vendor/ionicons.min.css" />
	<link rel="stylesheet" type="text/css" href="css/vendor/font-awesome.min.css" />

	<!-- javascript -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
	<script src="js/bootstrap/bootstrap.min.js"></script>
	<script src="js/theme.js"></script>

	<!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <style type="text/css">
	.emailerror,.passworderror{
		display:none;
	}
	</style>
	
</head>
<body id="signin" class="clear">

	<div class="signup-switcher">
		<a href="#" class="active" data-class="clear">
			<i class="fa fa-check"></i>
			Clear
		</a>
		<a href="#" data-class="">
			<i class="fa fa-check"></i>
			Dark
		</a>
	</div>

	<p class="logo">
		<i class="brankic-pen"></i>
	</p>

	<h3>Welcome back!</h3>

	<div class="content">
		<form name="login_form" id="login_form" method="post" class="login_form" action="<?php echo $baseurl;?>checklogin.php">
			<div class="fields">
				<strong>Email address</strong>
				<input class="form-control" type="text" name="email" id="email" placeholder="Your email" />
                <label for="customer[email]" id="errortext" onClick="$('.emailerror').hide();"  class="emailerror">This field is required.</label>
			</div>
			<div class="fields">
				<strong>Password</strong>
				<input class="form-control" type="password" name="password" id="password" placeholder="Password" />
                <label for="customer[email]" id="errortext" onClick="$('.passworderror').hide();" class="passworderror">This field is required.</label>
			</div>
			<div class="info">
				<label>
					<input type="checkbox" name="remember" checked />
					Remember me
				</label>
			</div>
			<div class="actions">
				<a href="javascript:;" onClick="submitbutton();" class="btn btn-primary btn-lg">Sign in to your account</a>
			</div>
		</form>
	</div>

	<div class="bottom-wrapper">
		<div class="message">
			<span>Don't have an account?</span>
			<a href="signup.html">Sign up here</a>.
		</div>
	</div>

	<script type="text/javascript">
		$(function () {
			var $switcher = $(".signup-switcher a");
			$switcher.click(function (e) {
				e.preventDefault();
				$switcher.removeClass("active");
				$(this).addClass("active");
				$("body").attr("class", $(this).data("class"));
			});
		});
		
		function submitbutton(){
			
			$('#errortext').hide();
			
			var email=$('#email').val();
			var password=$('#password').val();
			
			if(email=='' || email=='undefined' || email=='NULL'){
				$('.emailerror').show();
				return false;
			}
			else if(password=='' || password=='undefined' || password=='NULL'){
				$('.passworderror').show();
				return false;
			}
			else{
				$('.login_form').submit();
				//alert("faisal");
			}
		}
	</script>

</body>
</html>