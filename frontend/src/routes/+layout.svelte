<script lang="ts">
    import { onMount } from 'svelte';
    import { settings } from '$lib/settings';
    import '../app.css';

    onMount(() => {
        // Zorg ervoor dat settings worden toegepast bij laden
        settings.subscribe(value => {
            // Settings worden automatisch toegepast via de store
        });
    });
</script>

<div class="app">
    <header class="main-header">
        <nav class="main-nav">
            <a href="/" class="nav-link">Home</a>
            <a href="/projects" class="nav-link">Projecten</a>
            <a href="/settings" class="nav-link">Instellingen</a>
        </nav>
    </header>

    <main class="main-content">
        <slot />
    </main>
</div>

<style>
    .app {
        min-height: 100vh;
        background-color: var(--bg-color);
        color: var(--text-color);
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .main-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background-color: var(--header-bg);
        border-bottom: 1px solid var(--border-color);
        padding: 1rem 0;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .main-nav {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        display: flex;
        gap: 2rem;
    }

    .nav-link {
        color: var(--text-color);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
    }

    .nav-link:hover {
        color: var(--accent-color);
    }

    .main-content {
        min-height: calc(100vh - 80px);
        padding-top: 80px; /* Ruimte voor de fixed header */
    }
</style>
