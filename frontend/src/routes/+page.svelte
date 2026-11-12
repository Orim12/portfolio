<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { fetchProjects } from '$lib/api';
    import type { PageData } from './$types';
    import { locale, translate } from '$lib/i18n';

    export let data: PageData;

    const jaar = data.generalData?.ervaringJaren || 0;
    const aboutMe = data.aboutMe;

    let currentSkill = 0;
    const skills = aboutMe?.rotatingSkills?.map(({ skill }) => skill) || [
        'backend Development',
        'JavaScript & TypeScript',
        'Svelte & SvelteKit',
        'java',
        'Python'
    ];

    // Typing animation state
    let displayedSkill = '';
    let mounted = false;
    let timers: number[] = [];
    let projectAantal: number;
    $: t = (key: string) => translate($locale, key);

    function clearAllTimers() {
        for (const id of timers) {
            clearTimeout(id);
        }
        timers = [];
    }

    // types a string into displayedSkill, returns a promise that resolves when done
    function typeText(text: string, charDelay = 60) {
        clearAllTimers();
        displayedSkill = '';
        return new Promise<void>((resolve) => {
            for (let i = 0; i <= text.length; i++) {
                const id = window.setTimeout(() => {
                    displayedSkill = text.slice(0, i);
                    if (i === text.length) resolve();
                }, i * charDelay);
                timers.push(id);
            }
        });
    }

    // main loop: type each skill, wait, then go to next
    onMount(() => {
        mounted = true;
        projectAantal = getProjectAantal();

        function getProjectAantal(): number {
            fetchProjects(1, 1).then((data) => {
                projectAantal = data.totalDocs;
            });
            return projectAantal;
        }

        (async () => {
            while (mounted) {
                const skill = skills[currentSkill];
                await typeText(skill, 60);
                // hold full text for a bit
                await new Promise((res) => timers.push(window.setTimeout(res, 1400)));

                // delete text with a backspace animation
                await deleteText(40);

                // move to next
                currentSkill = (currentSkill + 1) % skills.length;
            }
        })();

        return () => {
            mounted = false;
            clearAllTimers();
        };
    });

    onDestroy(() => {
        mounted = false;
        clearAllTimers();
    });

    // delete animation: remove characters one-by-one
    function deleteText(charDelay = 40) {
        clearAllTimers();
        const original = displayedSkill;
        return new Promise<void>((resolve) => {
            for (let k = 0; k <= original.length; k++) {
                const len = original.length - k;
                const id = window.setTimeout(() => {
                    displayedSkill = original.slice(0, len);
                    if (len === 0) resolve();
                }, k * charDelay);
                timers.push(id);
            }
        });
    }
</script>

<svelte:head>
    <title>{t('home.title')}</title>
    <meta name="description" content={t('home.description')} />
</svelte:head>

<div class="home-container">
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <div class="hero-text">
                <h1>
                    <span class="greeting">{t('home.greeting')}</span>
                    <span class="name">Miro Vaassen</span>
                </h1>
                <div class="rotating-skills">
                    <span class="skill-prefix">{t('home.can')}</span>
                    <span class="skill-text">{displayedSkill}</span>
                    <span class="skill-cursor" aria-hidden="true"></span>
                </div>
                <p class="hero-description">
                    {aboutMe?.heroDescription || t('home.heroFallback')}
                </p>
                <div class="hero-actions">
                    <a href="/projects" class="btn btn-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="9" cy="9" r="2"/>
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                        </svg>
                        {t('home.viewProjects')}
                    </a>
                    <a href="#contact" class="btn btn-secondary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        Contact
                    </a>
                </div>
            </div>
            <div class="hero-image">
                <img src="/foto" alt="Profile" class="profile-image" />
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
        <div class="section-container">
            <h2 class="section-title">{aboutMe?.aboutTitle || t('home.about')}</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>
                        {aboutMe?.aboutParagraphOne || t('home.aboutOneFallback').replace('{years}', String(jaar))}
                    </p>
                    <p>
                        {aboutMe?.aboutParagraphTwo || t('home.aboutTwoFallback')}
                    </p>

                    <div class="stats">
                        <div class="stat">
                            <span class="stat-number">{ projectAantal ||data.generalData?.projectsAantal}</span>
                            <span class="stat-label">{t('home.projects')}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">{data.generalData?.ervaringJaren || 0}</span>
                            <span class="stat-label">{t('home.yearsExperience')}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">{data.generalData?.klantenAantal || 0}</span>
                            <span class="stat-label">{t('home.happyClients')}</span>
                        </div>
                    </div>
                </div>
                <div class="about-skills">
                    <h3>{t('home.mySkills')}</h3>
                    <div class="skill-categories">
                        <div class="skill-category">
                            <h4>{t('home.frontend')}</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">JavaScript</span>
                                <span class="skill-tag">TypeScript</span>
                                <span class="skill-tag">Svelte</span>
                                <span class="skill-tag">HTML5</span>
                                <span class="skill-tag">CSS3</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4>{t('home.backend')}</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Node.js</span>
                                <span class="skill-tag">Python</span>
                                <span class="skill-tag">Express</span>
                                <span class="skill-tag">MySQL</span>
                                <span class="skill-tag">MongoDB</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4>{t('home.tools')}</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Git</span>
                                <span class="skill-tag">Docker</span>
                                <span class="skill-tag">Figma</span>
                                <span class="skill-tag">CI/CD</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4>{t('home.gameDevelopment')}</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Unity</span>
                                <span class="skill-tag">Godot</span>
                                <span class="skill-tag">C#</span>
                                <span class="skill-tag">GDScript</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services">
        <div class="section-container">
            <h2 class="section-title">{aboutMe?.servicesTitle || t('home.services')}</h2>
            <div class="services-grid">
            {#each aboutMe?.services ?? [] as item}
                
            <div class="service-card">
                <div class="service-icon">
                    {#if item.logo?.cloudinaryUrl}
                        <img src={item.logo.cloudinaryUrl} alt={item.logo.alt || item.title}>
                    {/if}
                </div>
                <h3>{item?.title }</h3>
                <p>{item?.description}</p>
            </div>
            {/each}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contact">
        <div class="section-container">
            <h2 class="section-title">{t('home.workTogether')}</h2>
            <p class="contact-subtitle">{t('home.projectQuestion')}</p>
            <div class="contact-content">
                <div class="contact-info">
                    <a href="/contact" class="btn btn-primary">{t('home.contactMe')}</a>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
    .home-container {
        width: 100%;
    }

    /* Hero Section */
    .hero {
        min-height: calc(100vh - 80px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
        background: linear-gradient(135deg, var(--bg-color) 0%, rgba(77, 166, 217, 0.05) 100%);
    }

    .hero-content {
        max-width: 1200px;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 4rem;
        align-items: center;
    }

    .hero-text h1 {
        font-size: 3.5rem;
        margin-bottom: 1rem;
        line-height: 1.1;
    }

    .greeting {
        display: block;
        font-size: 1.2rem;
        font-weight: 400;
        color: var(--text-color);
        opacity: 0.8;
        margin-bottom: 0.5rem;
    }

    .name {
        display: block;
        font-weight: 700;
        background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .rotating-skills {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        height: 2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .skill-prefix {
        color: var(--text-color);
        opacity: 0.8;
    }

    .skill-text {
        color: var(--accent-color);
        font-weight: 600;
        display: inline-block;
        white-space: pre; /* preserve spaces while typing */
        animation: fadeIn 0.5s ease-in-out;
    }

    .skill-cursor {
        display: inline-block;
        width: 2px;
        height: 1.05em; /* slightly taller than the text to look like a cursor */
        background: var(--accent-color);
        margin-left: 6px; /* small gap between text and cursor */
        animation: blink 1s steps(1) infinite;
        /* center inside the flex container */
        align-self: center;
        border-radius: 1px;
        transform-origin: center;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }

    .hero-description {
        font-size: 1.1rem;
        color: var(--text-color);
        opacity: 0.85;
        line-height: 1.6;
        margin-bottom: 2.5rem;
        max-width: 500px;
    }

    .hero-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .hero-image {
        display: flex;
        justify-content: center;
    }

    .profile-image {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid var(--accent-color);
        box-shadow: 0 10px 30px rgba(77, 166, 217, 0.3);
        animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }

    /* Section Styling */
    .section-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 1rem;
    }

    .section-title {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 3rem;
        color: var(--text-color);
        position: relative;
    }

    .section-title::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
        border-radius: 2px;
    }

    /* About Section */
    .about {
        background-color: var(--card-bg);
        border-top: 1px solid var(--border-color);
        border-bottom: 1px solid var(--border-color);
    }

    .about-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: start;
    }

    .about-text p {
        font-size: 1.1rem;
        line-height: 1.7;
        color: var(--text-color);
        opacity: 0.9;
        margin-bottom: 1.5rem;
    }

    .stats {
        display: flex;
        gap: 2rem;
        margin-top: 2rem;
    }

    .stat {
        text-align: center;
    }

    .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: var(--accent-color);
        margin-bottom: 0.5rem;
    }

    .stat-label {
        font-size: 0.9rem;
        color: var(--text-color);
        opacity: 0.7;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .about-skills h3 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: var(--text-color);
    }

    .skill-categories {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .skill-category h4 {
        font-size: 1.1rem;
        margin-bottom: 0.8rem;
        color: var(--accent-color);
    }

    .skill-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .skill-tag {
        background-color: var(--input-bg);
        color: var(--text-color);
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.85rem;
        border: 1px solid var(--border-color);
        transition: all 0.2s ease;
    }

    .skill-tag:hover {
        background-color: var(--accent-color);
        color: white;
        transform: translateY(-2px);
    }

    /* Services Section */
    .services {
        background-color: var(--bg-color);
    }

    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .service-card {
        background-color: var(--card-bg);
        padding: 2.5rem 2rem;
        border-radius: 12px;
        text-align: center;
        border: 1px solid var(--border-color);
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px var(--card-shadow);
    }

    .service-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px var(--card-shadow);
    }

    .service-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
        border-radius: 50%;
        margin-bottom: 1.5rem;
        color: white;
    }

    .service-card h3 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
        color: var(--text-color);
    }

    .service-card p {
        color: var(--text-color);
        opacity: 0.8;
        line-height: 1.6;
    }

    /* Contact Section */
    .contact {
        background-color: var(--card-bg);
        border-top: 1px solid var(--border-color);
    }

    .contact-subtitle {
        text-align: center;
        font-size: 1.1rem;
        color: var(--text-color);
        opacity: 0.8;
        margin-bottom: 3rem;
    }

    .contact-content {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 3rem;
        align-items: center;
        max-width: 800px;
        margin: 0 auto;
    }

    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    /* Buttons */
    .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;
        cursor: pointer;
        border: none;
        font-size: 1rem;
        justify-content: center;
        white-space: nowrap;
    }

    .btn-primary {
        background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
        color: white;
        box-shadow: 0 4px 15px rgba(77, 166, 217, 0.3);
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(77, 166, 217, 0.4);
    }

    .btn-secondary {
        background-color: transparent;
        color: var(--text-color);
        border: 2px solid var(--border-color);
    }

    .btn-secondary:hover {
        background-color: var(--accent-color);
        color: white;
        border-color: var(--accent-color);
        transform: translateY(-2px);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
        }

        .hero-text h1 {
            font-size: 2.5rem;
        }

        .profile-image {
            width: 200px;
            height: 200px;
        }

        .about-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .stats {
            justify-content: center;
        }

        .services-grid {
            grid-template-columns: 1fr;
        }

        .contact-content {
            grid-template-columns: 1fr;
            text-align: center;
        }

        .btn {
            width: 200px;
        }

        .section-container {
            padding: 2rem 1rem;
        }

        .section-title {
            font-size: 2rem;
        }
    }

    @media (max-width: 480px) {
        .hero-text h1 {
            font-size: 2rem;
        }

        .rotating-skills {
            font-size: 1.2rem;
        }

        .skill-text {
            min-width: 150px;
        }

        .hero-actions {
            flex-direction: column;
            align-items: center;
        }

        .stats {
            flex-direction: column;
            gap: 1rem;
        }
    }
</style>