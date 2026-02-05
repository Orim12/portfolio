<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { fetchProjects } from '$lib/api';
    import type { PageData } from './$types';

    export let data: PageData;

    const jaar = data.generalData?.ervaringJaren || 0;

    let currentSkill = 0;
    const skills = [
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
    <title>Portfolio - Home</title>
    <meta name="description" content="Welkom op mijn portfolio website" />
</svelte:head>

<div class="home-container">
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <div class="hero-text">
                <h1>
                    <span class="greeting">Hallo, ik ben</span>
                    <span class="name">Miro Vaassen</span>
                </h1>
                <div class="rotating-skills">
                    <span class="skill-prefix">Ik kan</span>
                    <span class="skill-text">{displayedSkill}</span>
                    <span class="skill-cursor" aria-hidden="true"></span>
                </div>
                <p class="hero-description">
                    Gepassioneerde full-stack developer die moderne web applicaties bouwt 
                    met focus op gebruikerservaring en clean code. Altijd op zoek naar nieuwe 
                    technologieën en uitdagingen.
                </p>
                <div class="hero-actions">
                    <a href="/projects" class="btn btn-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="9" cy="9" r="2"/>
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                        </svg>
                        Bekijk Projecten
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
                <img src="/assets/imgs/profecioneel-foto.jpg" alt="Profile" class="profile-image" />
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
        <div class="section-container">
            <h2 class="section-title">Over Mij</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>
                        Met ongeveer {jaar} jaar ervaring in webdevelopment richt ik mij vooral op het bouwen van 
                        schaalbare en efficiënte backend-systemen. Naast webdevelopment ben ik ook actief bezig met 
                        game development en mod development, waar ik mijn creativiteit en technische kennis kan 
                        combineren om unieke ervaringen en uitbreidingen te ontwikkelen.
                    </p>
                    <p>
                        Ik werk graag met de nieuwste technologieën en frameworks en ben altijd op zoek naar manieren 
                        om mijn projecten naar een hoger niveau te tillen. Optimalisatie, toegankelijkheid en 
                        gebruiksvriendelijkheid staan voor mij centraal — of het nu gaat om een webapplicatie, een game 
                        of een mod. Dankzij mijn brede interesse in zowel software- als game-technologie kan ik 
                        innovatieve oplossingen creëren die passen bij de behoeften van ieder project.
                    </p>

                    <div class="stats">
                        <div class="stat">
                            <span class="stat-number">{ projectAantal ||data.generalData?.projectsAantal}</span>
                            <span class="stat-label">Projecten</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">{data.generalData?.ervaringJaren || 0}</span>
                            <span class="stat-label">Jaar Ervaring</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">{data.generalData?.klantenAantal || 0}</span>
                            <span class="stat-label">Tevreden Klanten</span>
                        </div>
                    </div>
                </div>
                <div class="about-skills">
                    <h3>Mijn Skills</h3>
                    <div class="skill-categories">
                        <div class="skill-category">
                            <h4>Frontend</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">JavaScript</span>
                                <span class="skill-tag">TypeScript</span>
                                <span class="skill-tag">Svelte</span>
                                <span class="skill-tag">HTML5</span>
                                <span class="skill-tag">CSS3</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4>Backend</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Node.js</span>
                                <span class="skill-tag">Python</span>
                                <span class="skill-tag">Express</span>
                                <span class="skill-tag">MySQL</span>
                                <span class="skill-tag">MongoDB</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4>Tools & Overig</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Git</span>
                                <span class="skill-tag">Docker</span>
                                <span class="skill-tag">Figma</span>
                                <span class="skill-tag">CI/CD</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4>Game Development</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Unity</span>
                                <span class="skill-tag">Godot</span>
                                <span class="skill-tag">C#</span>
                                <span class="skill-tag">GDScript</span>
                                <span class="skill-tag">Game Design</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4>Mod Development</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Minecraft Mods (Fabric/Forge)</span>
                                <span class="skill-tag">Java</span>
                                <span class="skill-tag">Asset Creation</span>
                                <span class="skill-tag">Scripting</span>
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
            <h2 class="section-title">Wat Ik Doe</h2>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="16,18 22,12 16,6"/>
                            <polyline points="8,6 2,12 8,18"/>
                        </svg>
                    </div>
                    <h3>Web Development</h3>
                    <p>Ik richt me op de backend van webontwikkeling, met een focus op server-side logica, database-integratie en API-ontwikkeling.</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
<svg viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.12 20.75C5.36 20.75 4.64 20.45 4.09 19.91C2.97 18.79 2.97 16.98 4.09 15.86L9.6 10.35C9.1 8.40997 9.64 6.31997 11.06 4.89997C12.49 3.46997 14.59 2.90997 16.54 3.43997C16.8 3.50997 17 3.70997 17.07 3.96997C17.14 4.22997 17.07 4.49997 16.88 4.68997L14.43 7.13997L14.95 9.04997L16.86 9.56997L19.31 7.11997C19.5 6.92997 19.78 6.85997 20.03 6.92997C20.29 6.99997 20.49 7.19997 20.56 7.45997C21.09 9.40997 20.54 11.51 19.1 12.94C17.68 14.36 15.59 14.9 13.65 14.4L8.14 19.91C7.6 20.45 6.88 20.75 6.12 20.75ZM14.68 4.76997C13.72 4.84997 12.81 5.26997 12.11 5.96997C10.97 7.10997 10.6 8.77997 11.15 10.32C11.25 10.59 11.18 10.9 10.97 11.1L5.14 16.93C4.61 17.46 4.61 18.33 5.14 18.86C5.4 19.12 5.74 19.26 6.11 19.26C6.47 19.26 6.82 19.12 7.07 18.86L12.9 13.03C13.11 12.82 13.41 12.76 13.68 12.85C15.22 13.39 16.89 13.03 18.03 11.89C18.73 11.19 19.14 10.28 19.23 9.31997L17.6 10.95C17.41 11.14 17.13 11.21 16.87 11.14L14.13 10.39C13.87 10.32 13.67 10.12 13.6 9.85997L12.85 7.11997C12.78 6.85997 12.85 6.57997 13.04 6.38997L14.67 4.75997L14.68 4.76997Z" fill="#fff"></path> </g></svg>
                    </div>
                    <h3>Mod Development</h3>
                    <p>ik ben hier niet het beste in, maar ik kan helpen met de basis. want ik doe dit voor de lol.</p>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <svg viewBox="0 0 512 512" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:20px;}.cls-2{fill:#fff;}</style></defs><title></title><path class="cls-1" d="M254,183.7h0c-72.82-1.22-101.38,22.29-111.25,39-14.72,24.92-27,81.37,7.64,102.23,10.92,6.57,25.37,3.09,37.4-5.82,19-14.09,41.81-22.21,65.49-22.21h5.46c23.68,0,46.47,8.12,65.49,22.21,12,8.91,26.48,12.39,37.4,5.82,34.67-20.86,22.36-77.31,7.64-102.23-9.87-16.72-38.43-40.23-111.25-39h-4Z"></path><path class="cls-2" d="M201.9,233.93V222.36a2.3,2.3,0,0,0-2.3-2.31H188a2.3,2.3,0,0,0-2.3,2.31v11.57a2.31,2.31,0,0,1-2.31,2.31H171.83a2.3,2.3,0,0,0-2.3,2.3v11.58a2.3,2.3,0,0,0,2.3,2.3h11.58a2.31,2.31,0,0,1,2.31,2.3V266.3a2.3,2.3,0,0,0,2.3,2.3H199.6a2.3,2.3,0,0,0,2.3-2.3V254.72a2.3,2.3,0,0,1,2.3-2.3h11.58a2.3,2.3,0,0,0,2.3-2.3V238.54a2.3,2.3,0,0,0-2.3-2.3H204.2A2.3,2.3,0,0,1,201.9,233.93Z"></path><circle class="cls-2" cx="328.06" cy="228.14" r="8.09"></circle><circle class="cls-2" cx="328.06" cy="228.14" r="8.09"></circle><circle class="cls-2" cx="328.06" cy="260.51" r="8.09"></circle><circle class="cls-2" cx="344.24" cy="244.33" r="8.09"></circle><circle class="cls-2" cx="344.24" cy="244.33" r="8.09"></circle><circle class="cls-2" cx="311.87" cy="244.33" r="8.09"></circle></g></svg>
                    </div>
                    <h3>Game Development</h3>
                    <p>ik vind het leuk om te experimenteren met game-ideeën en prototypes. Het proces van
                    spelontwerp en ontwikkeling fascineert me, en ik geniet van de creatieve uitdagingen
                    die het met zich meebrengt.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contact">
        <div class="section-container">
            <h2 class="section-title">Laten We Samenwerken</h2>
            <p class="contact-subtitle">Heb je een project in gedachten? Neem contact met me op!</p>
            <div class="contact-content">
                <div class="contact-info">
                    <div class="contact-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <span>&#109;&#105;&#114;&#111;&#64;&#109;&#105;&#114;&#111;&#118;&#97;&#97;&#115;&#115;&#101;&#110;&#46;&#110;&#108;</span>
                    </div>
                    <div class="contact-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>Nederland</span>
                    </div>
                </div>
                <div class="contact-actions">
                    <a href="&#77;&#97;&#105;&#108;&#116;&#111;&#58;&#109;&#105;&#114;&#111;&#64;&#109;&#105;&#114;&#111;&#118;&#97;&#97;&#115;&#115;&#101;&#110;&#46;&#110;&#108;" class="btn btn-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        Stuur een Email
                    </a>
                    <a href="https://backend.mirovaassen.nl/api/media/file/cv.pdf" target="_blank" class="btn btn-secondary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10,9 9,9 8,9"/>
                        </svg>
                        Download CV
                    </a>
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

    .contact-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background-color: var(--input-bg);
        border-radius: 8px;
        border: 1px solid var(--border-color);
    }

    .contact-item svg {
        color: var(--accent-color);
        flex-shrink: 0;
    }

    .contact-item span {
        color: var(--text-color);
        font-weight: 500;
    }

    .contact-actions {
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

        .contact-actions {
            align-items: center;
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