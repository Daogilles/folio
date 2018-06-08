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
        <title>About Me</title>
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

    	<link rel="author" href="../humans.txt">

        <link href="https://fonts.googleapis.com/css?family=Montserrat:200i,300,400,500,600|Oswald:300,400,700" rel="stylesheet">
        <!-- <link rel="stylesheet" href="../styles/main.css"> -->
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <?php require_once(PROJECT_TPL_PATH . 'header.php')?>

        <main class="main" role="main" router-wrapper>
            <div class="main__wrapper" router-view="about">
                <div class="wrapper">
                    <div class="description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pharetra tortor in lorem bibendum viverra. Sed bibendum dui ut rhoncus imperdiet. Quisque aliquet tortor ac auctor accumsan.</p>

                        <p class="bold">dolor sit amet, consectetur adipiscing elit. Vivamus pharetra tortor in lorem bibendum viverra. Sed bibendum dui ut rhoncus imperdiet.</p>
                    </div>
                </div>
            </div>
        </main>

        <?php require_once(PROJECT_TPL_PATH . 'footer.php')?>

    </body>
</html>
