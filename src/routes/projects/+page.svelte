<script lang="ts">
    import type { PageData } from './$types';
    import type { Project } from '$lib/types';
    
    export let data: PageData;
    
    $: projects = data.projects;
    $: currentPage = data.currentPage;
    $: limit = data.limit;
    
    // Helper functie om datum te formatteren
    function formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Helper functie voor paginatie URLs
    function getPageUrl(page: number): string {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page.toString());
        if (limit !== 10) {
            url.searchParams.set('limit', limit.toString());
        }
        return url.pathname + url.search;
    }
</script>

<svelte:head>
    <title>Projecten - Portfolio</title>
    <meta name="description" content="Overzicht van alle projecten in mijn portfolio" />
</svelte:head>

<div class="projects-container">
    <header class="projects-header">
        <h1>Mijn Projecten</h1>
        <p>Ontdek de verschillende projecten waar ik aan gewerkt heb</p>
    </header>

    {#if projects.docs && projects.docs.length > 0}
        <div class="projects-grid">
            {#each projects.docs as project (project.id)}
                <article class="project-card">
                    <div class="project-header">
                        <h2 class="project-title">
                            <a href="/projects/{project.id}">{project.naam}</a>
                        </h2>
                        <time class="project-date" datetime={project.createdAt}>
                            {formatDate(project.createdAt)}
                        </time>
                    </div>
                    
                    {#if project.beschrijving}
                        <p class="project-description">{project.beschrijving}</p>
                    {/if}
                    
                    {#if project.technologieen && project.technologieen.length > 0}
                        <div class="project-technologies">
                            {#each project.technologieen as tech}
                                <span class="tech-tag">{tech.technologie}</span>
                            {/each}
                        </div>
                    {/if}
                    
                    <div class="project-actions">
                        <a href="/projects/{project.id}" class="btn btn-primary">
                            Bekijk project
                        </a>
                        {#if project.url}
                            <a href={project.url} target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                                Live demo
                            </a>
                        {/if}
                    </div>
                </article>
            {/each}
        </div>

        <!-- Paginatie -->
        {#if projects.totalPages > 1}
            <nav class="pagination" aria-label="Projecten paginatie">
                <div class="pagination-info">
                    Pagina {projects.page} van {projects.totalPages} 
                    ({projects.totalDocs} projecten totaal)
                </div>
                
                <div class="pagination-controls">
                    {#if projects.hasPrevPage && projects.prevPage}
                        <a href={getPageUrl(1)} class="btn btn-outline" aria-label="Eerste pagina">
                            ««
                        </a>
                        <a href={getPageUrl(projects.prevPage)} class="btn btn-outline" aria-label="Vorige pagina">
                            ‹ Vorige
                        </a>
                    {/if}
                    
                    <span class="current-page">
                        {projects.page}
                    </span>
                    
                    {#if projects.hasNextPage && projects.nextPage}
                        <a href={getPageUrl(projects.nextPage)} class="btn btn-outline" aria-label="Volgende pagina">
                            Volgende ›
                        </a>
                        <a href={getPageUrl(projects.totalPages)} class="btn btn-outline" aria-label="Laatste pagina">
                            »»
                        </a>
                    {/if}
                </div>
            </nav>
        {/if}
    {:else}
        <div class="empty-state">
            <h2>Geen projecten gevonden</h2>
            <p>Er zijn momenteel geen projecten beschikbaar.</p>
        </div>
    {/if}
</div>

<style>
    .projects-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .projects-header {
        text-align: center;
        margin-bottom: 3rem;
    }

    .projects-header h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-color);
    }

    .projects-header p {
        font-size: 1.1rem;
        color: var(--text-color);
        opacity: 0.7;
        max-width: 600px;
        margin: 0 auto;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .project-card {
        background: var(--card-bg);
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px var(--card-shadow);
        border: 1px solid var(--border-color);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .project-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 20px var(--card-shadow);
    }

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
        gap: 1rem;
    }

    .project-title {
        margin: 0;
        font-size: 1.3rem;
        flex: 1;
    }

    .project-title a {
        color: var(--text-color);
        text-decoration: none;
    }

    .project-title a:hover {
        color: var(--accent-color);
        text-decoration: underline;
    }

    .project-date {
        color: var(--text-color);
        opacity: 0.7;
        font-size: 0.9rem;
        white-space: nowrap;
    }

    .project-description {
        color: var(--text-color);
        opacity: 0.8;
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    .project-technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .tech-tag {
        background: #f0f0f0;
        color: #333;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
    }

    .project-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .btn {
        padding: 0.5rem 1rem;
        border-radius: 6px;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        text-align: center;
        transition: all 0.2s ease;
        border: 1px solid transparent;
    }

    .btn-primary {
        background: #007acc;
        color: white;
    }

    .btn-primary:hover {
        background: #005fa3;
    }

    .btn-secondary {
        background: transparent;
        color: #007acc;
        border-color: #007acc;
    }

    .btn-secondary:hover {
        background: #007acc;
        color: white;
    }

    .btn-outline {
        background: transparent;
        color: #333;
        border-color: #ddd;
    }

    .btn-outline:hover {
        background: #f5f5f5;
    }

    .pagination {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding-top: 2rem;
        border-top: 1px solid #eee;
    }

    .pagination-info {
        color: #666;
        font-size: 0.9rem;
    }

    .pagination-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .current-page {
        padding: 0.5rem 1rem;
        background: #007acc;
        color: white;
        border-radius: 6px;
        font-weight: 500;
    }

    .empty-state {
        text-align: center;
        padding: 3rem 1rem;
        color: #666;
    }

    .empty-state h2 {
        margin-bottom: 1rem;
        color: #333;
    }

    @media (max-width: 768px) {
        .projects-header h1 {
            font-size: 2rem;
        }
        
        .projects-grid {
            grid-template-columns: 1fr;
        }
        
        .project-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .project-actions {
            flex-direction: column;
        }
        
        .pagination-controls {
            flex-wrap: wrap;
            justify-content: center;
        }
    }
</style>