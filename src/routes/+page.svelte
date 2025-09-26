<script lang="ts">
    import { settings } from '$lib/settings';
</script>

<svelte:head>
    <title>Portfolio - Home</title>
    <meta name="description" content="Welkom op mijn portfolio website" />
</svelte:head>

<div class="home-container">
    <section class="hero">
        <h1>Welkom op mijn Portfolio</h1>
        <p>De website wordt opnieuw van scratch gemaakt met uitgebreide functionaliteiten</p>
        <div class="hero-actions">
            <a href="/projects" class="btn btn-primary">Bekijk Projecten</a>
            <a href="/settings" class="btn btn-secondary">Instellingen</a>
        </div>
    </section>
</div>

<style>
    .home-container {
        min-height: calc(100vh - 80px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
    }

    .hero {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
    }

    .hero h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: var(--text-color);
        background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero p {
        font-size: 1.2rem;
        color: var(--text-color);
        opacity: 0.8;
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .hero-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    @media (max-width: 768px) {
        .hero h1 {
            font-size: 2.5rem;
        }

        .hero p {
            font-size: 1.1rem;
        }

        .hero-actions {
            flex-direction: column;
            align-items: center;
        }

        .hero-actions .btn {
            width: 200px;
        }
    }
</style>