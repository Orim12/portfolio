<script lang="ts">
    import type { PageData } from './$types';
    import type { Project } from '$lib/types';
    import { getMediaBaseUrl } from '$lib/api';
    
    export let data: PageData;
    
    $: project = data.project as Project;
    $: mediaBaseUrl = getMediaBaseUrl();
    
    // Helper functie om datum te formatteren
    function formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
</script>

<svelte:head>
    <title>{project.naam} - Portfolio</title>
    <meta name="description" content={project.beschrijving || `Details over het project ${project.naam}`} />
</svelte:head>

<div class="project-detail-container">
    <nav class="breadcrumb">
        <a href="/projects">← Terug naar projecten</a>
    </nav>

    <article class="project-detail">
        <header class="project-header">
            <h1>{project.naam}</h1>
            <div class="project-meta">
                <time datetime={project.createdAt}>
                    Gemaakt op {formatDate(project.createdAt)}
                </time>
                {#if project.updatedAt !== project.createdAt}
                    <time datetime={project.updatedAt}>
                        • Laatst bijgewerkt op {formatDate(project.updatedAt)}
                    </time>
                {/if}
            </div>
        </header>

        {#if project.afbeelding}
            <div class="project-image">
                <img 
                    src='{mediaBaseUrl}{project.afbeelding.url}' 
                    alt={project.afbeelding.alt || project.naam}
                />
            </div>
        {/if}

        <div class="project-content">
            {#if project.beschrijving}
                <section class="project-description">
                    <h2>Beschrijving</h2>
                    <p>{project.beschrijving}</p>
                </section>
            {/if}

            {#if project.technologieen && project.technologieen.length > 0}
                <section class="project-technologies">
                    <h2>Gebruikte technologieën</h2>
                    <div class="tech-tags">
                        {#each project.technologieen as tech}
                            <span class="tech-tag">{tech.technologie}</span>
                        {/each}
                    </div>
                </section>
            {/if}

            {#if project.url}
                <section class="project-links">
                    <h2>Links</h2>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        Bekijk live project
                    </a>
                </section>
            {/if}
        </div>
    </article>
</div>

<style>
    .project-detail-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .breadcrumb {
        margin-bottom: 2rem;
    }

    .breadcrumb a {
        color: var(--accent-color);
        text-decoration: none;
        font-size: 0.9rem;
    }

    .breadcrumb a:hover {
        text-decoration: underline;
    }

    .project-detail {
        background: var(--card-bg);
        border-radius: 12px;
        box-shadow: 0 2px 10px var(--card-shadow);
        border: 1px solid var(--border-color);
        overflow: hidden;
    }

    .project-header {
        padding: 2rem;
        background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%);
        color: white;
    }

    .project-header h1 {
        margin: 0 0 1rem 0;
        font-size: 2.5rem;
    }

    .project-meta {
        font-size: 0.9rem;
        opacity: 0.9;
    }

    .project-image {
        padding: 0;
    }

    .project-image img {
        width: 100%;
        height: auto;
        display: block;
    }

    .project-content {
        padding: 2rem;
    }

    .project-content section {
        margin-bottom: 2rem;
    }

    .project-content section:last-child {
        margin-bottom: 0;
    }

    .project-content h2 {
        color: var(--text-color);
        font-size: 1.5rem;
        margin-bottom: 1rem;
        border-bottom: 2px solid var(--accent-color);
        padding-bottom: 0.5rem;
    }

    .project-description p {
        line-height: 1.7;
        color: var(--text-color);
        opacity: 0.8;
        font-size: 1.1rem;
    }

    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .tech-tag {
        background: var(--header-bg);
        color: var(--text-color);
        padding: 0.5rem 1rem;
        border-radius: 25px;
        font-size: 0.9rem;
        border: 2px solid var(--accent-color);
    }

    .btn {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    .btn-primary {
        background: #007acc;
        color: white;
    }

    .btn-primary:hover {
        background: #005fa3;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 122, 204, 0.3);
    }

    @media (max-width: 768px) {
        .project-detail-container {
            padding: 1rem;
        }
        
        .project-header {
            padding: 1.5rem;
        }
        
        .project-header h1 {
            font-size: 2rem;
        }
        
        .project-content {
            padding: 1.5rem;
        }
        
        .tech-tags {
            gap: 0.5rem;
        }
        
        .tech-tag {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
        }
    }
</style>