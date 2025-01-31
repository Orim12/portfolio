<script lang="ts">
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    onMount(() => {
        if (isMobileDevice()) {
            goto('/miro-telefoon');
        } else {}
    });

    function berekenLeeftijd(geboortedatum: any) {
        var huidigeDatum = new Date();
        var geboorteDatum = new Date(geboortedatum);

        var verschilJaar = huidigeDatum.getFullYear() - geboorteDatum.getFullYear();
        var maandVerschil = huidigeDatum.getMonth() - geboorteDatum.getMonth();

        if (maandVerschil < 0 || (maandVerschil === 0 && huidigeDatum.getDate() < geboorteDatum.getDate())) {
            verschilJaar--;
        }

        return verschilJaar;
    }

    var mijnGeboortedatum = '2006-02-21';
    var mijnLeeftijd = berekenLeeftijd(mijnGeboortedatum);

    let lifedate = "Welkom in mijn digitale werled! Mijn naam is Miro, een gedreven " + mijnLeeftijd + "-jarige student softwareontwikkeling met een passie voor game development. Met ervaring in HTML, JavaScript en Python heb ik gewerkt aan diverse projecten die mijn liefde voor het bouwen van games hebben gevoed. Op deze website neem ik je mee op mijn creatieve reis, van mijn eerste projecten tot mijn meest ambitieuze avonturen. Verken mijn werk en laat je inspireren door de wereld die ik heb gecreëerd. Laten we samen nieuwe mogelijkheden ontdekken in de wonderlijke wereld van game development!";
</script>

<style>
</style>

<svelte:head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>miro vaassen</title>
    <link rel="stylesheet" href="assets/vendors/themify-icons/css/themify-icons.css">
	<link rel="stylesheet" href="assets/css/johndoe.css">
    <link rel="json" href="assets/json/data.json">
    <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.0.0/uicons-brands/css/uicons-brands.css'>
    <link rel="js" href="assets/js/johndoe.js">
</svelte:head>

<header id="home" class="header">
    <div class="container">
        <div class="header-content">
            <h4 class="header-subtitle">Hoi, ik ben</h4>
            <h1 class="header-title">Miro Vaassen</h1>
            <h6 class="header-mono">aventus student</h6>
        </div>
    </div>
</header>
<nav class="navbar sticky-top navbar-expand-lg navbar-light bg-white" data-spy="affix" data-offset-top="510">
    <div class="container">
        <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse mt-sm-20 navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a href="#home" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="#about" class="nav-link">About</a>
                </li>
            </ul>
            <ul class="navbar-nav brand">
                <img id="main" src="assets/imgs/avatar.jpg" alt="" class="brand-img">
                <li class="brand-txt">
                    <h5 class="brand-title">Miro Vaassen</h5>
                    <div class="brand-subtitle">aventus student</div>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a href="#Profile">portfolio</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div class="container-fluid">
    <div id="about" class="row about-section">
        <div class="col-lg-4 about-card" style="position: relative; left: 400px;">
            <h3 class="font-weight-light">wie ben ik ?</h3>
            <span class="line mb-5"></span>
            <h5 class="mb-3">een student op aventus laan van mensenrechten</h5>
            <p class="mt-20">{lifedate}</p>
        </div>
        <div class="col-lg-4 about-card" style="position: relative; left: 400px;">
            <h3 class="font-weight-light">personelijke informatie</h3>
            <span class="line mb-5"></span>
            <ul class="mt40 info list-unstyled">
                <li><span>Birthdate</span> : 02/21/2006</li>
                <li><span>Email</span> : <a href="mailto:miro.vaassen@gmail.com">miro.vaassen@gmail.com</a></li>
                <li><span>Phone</span> : <a href="tel:+31643849658">+ (31) 0643849658</a></li>
                <li><span>u kunt hier mijn cv downloaden als u dat wilt <a href="assets/pdf/Profile.pdf" target="_blank">Download</a></span></li>
            </ul>
            <ul class="social-icons pt-3">
                <li class="social-item"><a class="social-link" href="https://github.com/Orim12" aria-label="GitHub Profile"><i class="ti-github" aria-hidden="true"></i></a></li>
                <li class="social-item"><a class="social-link" href="https://www.linkedin.com/in/miro-vaassen-36b11629b" aria-label="LinkedIn Profile"><i class="fi fi-brands-linkedin"></i></a></li>
            </ul>
        </div>
        <object id="Profile" data="assets/pdf/Profile.pdf" type="application/pdf" height="1150px" aria-label="Profile PDF"></object>
    </div>
</div>
