<?php

define( 'EMAIL_ADDRESS', 'your@emailaddress.com' );

error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

function email_validate($value)
{
	$regex = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i';

	if($value == '') { 
		return false;
	} else {
		$string = preg_replace($regex, '', $value);
	}

	return empty($string) ? true : false;
}

if( $post )
{
	$name = stripslashes($_POST['name']);
	$email = trim($_POST['email']);
	$subject = stripslashes($_POST['subject']);
	$message = stripslashes($_POST['message']);

	$error = '';

	// Check name
	if( !$name )
	{
		$error .= 'Please enter your name.<br />';
	}

	// Check email
	if( !$email )
	{
		$error .= 'Please enter an e-mail address.<br />';
	}

	if( $email && !email_validate($email) )
	{
		$error .= 'Please enter a valid e-mail address.<br />';
	}

	// Check message (length)

	if( !$message || strlen($message) < 10 )
	{
		$error .= "Please enter your message. It should have at least 10 characters.<br />";
	}


	if(!$error)
	{
		$mail = mail( EMAIL_ADDRESS, $subject, $message,
			 "From: ".$name." <".$email.">\r\n"
			."Reply-To: ".$email."\r\n"
			."X-Mailer: PHP/" . phpversion() );
		if($mail)
		{
			echo 'Message sent.';
		}
	}
	else
	{
		echo $error;
	}

}
?>