<?php
/*
 * @version:1.0.0 2018
 */


/*********************************************************
 * Configuration options
 */

if (ENV === 'DEV')
{
	error_reporting(E_ALL);
	ini_set("display_errors", 1);

    /* Define base url */
    define('FOOTER_URL', 'http://localhost/template-highway/docs/');
    // define('ROOT_PATH', _DIR_.'/');
}else {
    /* Define base url */
    define('FOOTER_URL', 'http://localhost/template-highway/docs');
    // define('ROOT_PATH', _DIR_.'/');
}
?>

<footer class="footer">
    <div class="footer__description">
        <p class="title">Front End Developer</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
</footer>

<script src="<?php echo FOOTER_URL; ?>vendor/lethargy.min.js"></script>
<script src="<?php echo FOOTER_URL; ?>vendor/Draggable.min.js"></script>
<script src="<?php echo FOOTER_URL; ?>vendor/ThrowPropsPlugin.min.js"></script>
<script src="<?php echo FOOTER_URL; ?>vendor/SplitText.min.js"></script>

<script src="<?php echo FOOTER_URL; ?>bundle.js"></script>

<!-- <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.12.0.min.js"><\/script>')</script>
<script src="js/plugins.js"></script>
<script src="js/main.js"></script> -->

<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
<!-- <script>
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
    function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
    e=o.createElement(i);r=o.getElementsByTagName(i)[0];
    e.src='https://www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
    ga('create','UA-XXXXX-X','auto');ga('send','pageview');
</script> -->
