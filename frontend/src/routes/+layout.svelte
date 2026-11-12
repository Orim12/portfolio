<script lang="ts">
    import { onMount } from 'svelte';
    import { invalidateAll } from '$app/navigation';
    import { locale, setLocale, translate, type Locale } from '$lib/i18n';
    import '../app.css';

    $: t = (key: string) => translate($locale, key);

    onMount(() => {
        document.documentElement.lang = $locale;
        return locale.subscribe((value) => {
            document.documentElement.lang = value;
        });
    });

    async function handleLocaleChange(event: Event) {
        setLocale((event.currentTarget as HTMLSelectElement).value as Locale);
        await invalidateAll();
    }
</script>

<div class="app">
    <header class="main-header">
        <nav class="main-nav">
            <a href="/" class="nav-link">{t('nav.home')}</a>
            <a href="/projects" class="nav-link">{t('nav.projects')}</a>
            <a href="/contact" class="nav-link">{t('nav.contact')}</a>
            <a href="/settings" class="nav-link">{t('nav.settings')}</a>
            <label class="locale-selector">
                <span class="sr-only">{t('language.label')}</span>
                <select value={$locale} on:change={handleLocaleChange} aria-label={t('language.label')}>
                    <option value="en">{t('language.english')}</option>
                    <option value="nl">{t('language.dutch')}</option>
                </select>
            </label>
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
        align-items: center;
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

    .locale-selector select {
        color: var(--text-color);
        background: var(--header-bg);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        padding: 0.35rem 0.5rem;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    .main-content {
        min-height: calc(100vh - 80px);
        padding-top: 80px; /* Ruimte voor de fixed header */
    }
</style>
