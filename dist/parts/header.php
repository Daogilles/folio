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
    define('URL', 'http://localhost/template-highway/dist/');
	define('ASSETS_URL', 'http://localhost/template-highway/');
    // define('ROOT_PATH', _DIR_.'/');
}else {
    /* Define base url */
    define('URL', 'http://localhost/template-highway/dist');
	define('ASSETS_URL', 'http://localhost/template-highway/');
    // define('ROOT_PATH', _DIR_.'/');
}
?>
<header>
    <a href="<?php echo URL; ?>" id="name">Gilles Dao Duc</a>

    <nav class="menu">
        <a href="<?php echo URL; ?>about">About</a>
        <a href="#" id="menu">Projects</a>
    </nav>
</header>

<div class="progress">
    <span></span>
</div>
<div class="layer"></div>
<div class="blur"></div>

<div class="menu">
	<div class="menu__wrapper">
		<div class="wrapper">
			<a href="<?php echo BASEURL; ?>projects/kenzo" class="menu__link">
				<p>Kenzo</p>
				<div class="menu__link--bg">
					<img src="<?php echo ASSETSURL; ?>assets/images/kenzo-women.png" alt="Kenzo">
				</div>
			</a>
			<a href="<?php echo BASEURL; ?>projects/carlsberg" class="menu__link">
				<p>Carlsberg</p>
				<div class="menu__link--bg">
					<img src="<?php echo ASSETSURL; ?>assets/images/carlsberg-beer.png" alt="carlsberg beer">
				</div>
			</a>
			<a href="<?php echo BASEURL; ?>projects/lolita" class="menu__link">
				<p>Lolita Lempicka</p>
				<div class="menu__link--bg">
					<img src="<?php echo ASSETSURL; ?>assets/images/lolita-sweet.png" alt="Lolita Lempicka Sweet">
				</div>
			</a>
			<a href="<?php echo BASEURL; ?>projects/msf" class="menu__link">
				<p>Médecins Sans Frontières</p>
				<div class="menu__link--bg">
					<img src="<?php echo ASSETSURL; ?>assets/images/msf-logo2.svg" alt="MSF">
				</div>
			</a>
		</div>

	</div>
</div>
