<?php
/*
 * @version:1.0.0 2018
 */


/*********************************************************
 * Configuration options
 */

/* Version is used to flush cache */
define('VERSION', '0.0.1');
/* Define DEV or PROD environnement */
define('ENV', 'DEV');


define('PROJECT_ROOT_PATH',     dirname(__FILE__)   . DIRECTORY_SEPARATOR);
// define('PROJECT_INC_PATH',      PROJECT_ROOT_PATH   . 'inc' . DIRECTORY_SEPARATOR);
define('PROJECT_TPL_PATH',      PROJECT_ROOT_PATH   . 'parts' . DIRECTORY_SEPARATOR);
// define('PROJECT_CONTENTS_PATH',	PROJECT_ROOT_PATH    . 'contents' . DIRECTORY_SEPARATOR);
// define('WEB_ROOT_PATH',         PROJECT_ROOT_PATH   . 'html' . DIRECTORY_SEPARATOR);
// define('WEB_JS_PATH',           '/js'   . DIRECTORY_SEPARATOR);
// define('WEB_STYLE_PATH',        '/css'  . DIRECTORY_SEPARATOR);

if (ENV === 'DEV')
{
	error_reporting(E_ALL);
	ini_set("display_errors", 1);

    /* Define base url */
    define('BASEURL', 'http://localhost/template-highway/dist/');
	define('ASSETSURL', 'http://localhost/template-highway/');
    define('SITE_ROOT', 'http://localhost/template-highway/dist');
    // define('ROOT_PATH', _DIR_.'/');
}else {
    /* Define base url */
    define('BASEURL', 'http://localhost/template-highway/dist');
	define('ASSETSURL', 'http://localhost/template-highway/');
    define('SITE_ROOT', 'http://localhost/template-highway/dist');
    // define('ROOT_PATH', _DIR_.'/');
}
