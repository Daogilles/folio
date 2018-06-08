<?php
/*
 * @version:1.0.0 2018
 */
if (file_exists('./config.php') === false)
{
    die('Please configure site (config.php.dist => config.php)');
}
require_once('./config.php');
?>
<!doctype html>
<html lang="">
    <head>
        <meta charset="utf-8">
        <title>Gilles DAO DUC</title>
        <meta property="og:title" content="Starter">
    	<meta name="twitter:title" content="Starter">
    	<meta name="twitter:site" content="@">
    	<meta name="twitter:creator" content="@">
    	<meta property="og:site_name" content="Starter"> <!-- If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb". -->
    	<meta name="description" content="WWWWWW">
    	<meta property="og:description" content="WWWWWW">
    	<meta name="twitter:description" content="WWWWWW">
    	<meta property="og:type" content="website">
    	<meta name="twitter:card" content="summary_large_image">
    	<meta property="og:url" content="">
    	<meta property="og:image" content="/assets/images/cover.png">
    	<meta itemprop="image" content="/assets/images/cover.png">
    	<meta name="twitter:image" content="/assets/images/cover.png">
    	<meta property="og:locale" content="fr_FR">
    	<meta property="fb:app_id" content="WWWWWW">

    	<meta name="viewport" content="width=device-width, initial-scale=1">

    	<link rel="author" href="/humans.txt">

        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600|Oswald:300,400,700|Libre+Baskerville:400,700" rel="stylesheet">
        <!-- <link rel="stylesheet" href="main.css"> -->
    </head>
    <body id="page-home">
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <?php require_once(PROJECT_TPL_PATH . 'header.php')?>

        <main class="main" role="main" router-wrapper>
            <div class="home__wrapper" router-view="home">
                <div id="dummy-dragger"></div>
                <div id="slider__nav">
                    <p class="active"></p>
                    <span></span>
                    <p class="totale"></p>
                </div>

                <div id="slider">
                    <div id="swipe">
                        <div class="left"></div>
                        <div class="right"></div>
                    </div>
            		<div class="slider__wrapper">
            			<div class="slide kenzo">
                            <a href="<?php echo BASEURL; ?>projects/kenzo" class="slide__content">
                                <div class="slide__background kenzo__background"
                                    style="background: url(<?php echo ASSETSURL; ?>assets/images/kenzo-bg.png) center center no-repeat; background-size:cover;">
                                    <!-- <img src="<?php echo ASSETSURL; ?>assets/images/kenzo-bg.png" alt="Kenzo"> -->
                                </div>
                                <div class="slide__brand kenzo__brand">
                                    <span></span>
                                    <img id="kenzok" src="<?php echo ASSETSURL; ?>assets/images/kenzo-logo.png" alt="Kenzo K">
                                </div>
                                <div class="slide__title">
                                    <img src="<?php echo ASSETSURL; ?>assets/images/kenzo-logofull.svg" alt="Kenzo Logo">
                                </div>
                                <div class="slide__icon kenzo__icon">
                                    <img src="<?php echo ASSETSURL; ?>assets/images/kenzo-women.png" alt="Kenzo">
                                </div>
                                <div class="slide__deco">&#10014;</div>
                                <div class="slide__text">Kenzo</div>
                            </a>
            			</div>
            			<div class="slide carlsberg">
                            <a href="<?php echo BASEURL; ?>projects/carlsberg" class="slide__content">
                                <div class="slide__background carlsberg__background"
                                    style="background: url(<?php echo ASSETSURL; ?>assets/images/carlsberg-bg.png) center center no-repeat; background-size:cover;"></div>
                                <div class="slide__brand carlsberg__brand">
                                    <img src="<?php echo ASSETSURL; ?>assets/images/carlsberg-beer-big.png" alt="Carlsberg">
                                </div>
                                <div class="slide__title">
                                    <img src="<?php echo ASSETSURL; ?>assets/images/carlsberg-logo.svg" alt="Carlsberg Logo">
                                </div>
                                <div class="slide__icon carlsberg__icon">
                                    <img src="<?php echo ASSETSURL; ?>assets/images/carlsberg-beer.png" alt="carlsberg beer">
                                </div>
                                <div class="slide__deco">&#10032;</div>
                                <div class="slide__text">Carlsberg</div>
                            </a>
            			</div>
            			<div class="slide lolita">
            				<a href="<?php echo BASEURL; ?>projects/lolita-lempicka" class="slide__content">
                                <div class="slide__background lolita__background">
                                    <img src="<?php echo ASSETSURL; ?>assets/images/lolita-blur.png" alt="Lolita Lempicka">
                                </div>
                                <div class="slide__brand lolita__brand">
                                    <img src="<?php echo ASSETSURL; ?>assets/images/lolita-sweet.png" alt="Lolita Lempicka Sweet">
                                </div>
                                <div class="slide__icon lolita__icon">
                                    <img src="<?php echo ASSETSURL; ?>assets/images/lolita-cherrybig.png" alt="Lolita Lempicka cherry">
                                </div>
                                <div class="slide__title">
                                    <img src="<?php echo ASSETSURL; ?>assets/images/lolita-case-logo.svg" alt="Lolita Lempicka Logo">
                                </div>
                                <div class="slide__deco">
                                    <img src="<?php echo ASSETSURL; ?>assets/images/lolita-cherry.png" alt="Lolita Lempicka cherry">
                                </div>
                                <div class="slide__text">
                                    <img src="<?php echo ASSETSURL; ?>assets/images/lolita-cherry2.png" alt="Lolita Lempicka cherry">
                                </div>
            				</a>
            			</div>
            			<div class="slide msf">
            				<a href="<?php echo BASEURL; ?>projects/msf" class="slide__content">
            					<div class="slide__title">
                                    <img src="<?php echo ASSETSURL; ?>assets/images/msf-logo2.svg" alt="Médecin sans frontières Logo">
                                </div>
                                <div class="msf__morph morph-wrap">
                    				<svg class="morph" width="1400" height="770" viewBox="0 0 1400 770">
                                        <clipPath id="msf__svg">
                                            <path d="M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z"/>
                                        </clipPath>
                                        <image clip-path="url(#msf__svg)" height="100%" width="100%" xlink:href="<?php echo ASSETSURL; ?>assets/images/msf_background.jpeg" class="msf__img" />
                                    </svg>
                    			</div>
            				</a>
            			</div>
            		</div>
            	</div>
            </div>
        </main>

        <?php require_once(PROJECT_TPL_PATH . 'footer.php')?>

    </body>
</html>
