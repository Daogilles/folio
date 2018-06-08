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
    define('URL', 'http://localhost/template-highway/docs/');
	define('ASSETS_URL', 'http://localhost/template-highway/');
    // define('ROOT_PATH', _DIR_.'/');
}else {
    /* Define base url */
    define('URL', 'http://localhost/template-highway/docs');
	define('ASSETS_URL', 'http://localhost/template-highway/');
    // define('ROOT_PATH', _DIR_.'/');
}
?>
<header>
    <a href="<?php echo URL; ?>" id="name">Gilles Dao Duc</a>

    <nav class="menu">
        <a href="<?php echo URL; ?>about">About</a>
        <a href="<?php echo URL; ?>projects/kenzo">Projects</a>
    </nav>
</header>

<div class="progress">
    <span></span>
</div>
<div class="layer"></div>
