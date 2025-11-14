<script lang="ts">
    import { settings, toggleDarkMode, setFontSize, toggleAnimations, resetSettings, type Settings } from '$lib/settings';
    import ToggleSwitch from '$lib/components/ToggleSwitch.svelte';
    
    let currentSettings: Settings;
    
    // Subscribe to settings store
    $: currentSettings = $settings;
    
    function handleFontSizeChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        setFontSize(target.value as 'small' | 'medium' | 'large');
    }
    
    function handleReset() {
        if (confirm('Weet je zeker dat je alle instellingen wilt resetten naar de standaardwaarden?')) {
            resetSettings();
        }
    }

    function handleDarkModeChange(checked: boolean) {
        toggleDarkMode();
    }

    function handleAnimationsChange(checked: boolean) {
        toggleAnimations();
    }
</script>

<svelte:head>
    <title>Instellingen - Portfolio</title>
    <meta name="description" content="Pas je voorkeuren aan voor een gepersonaliseerde ervaring" />
</svelte:head>

<div class="settings-container">
    <header class="settings-header">
        <h1>Instellingen</h1>
        <p>Pas je voorkeuren aan voor een gepersonaliseerde ervaring</p>
    </header>

    <div class="settings-content">
        <div class="settings-grid">
            
            <!-- Uiterlijk sectie -->
            <section class="settings-section card">
                <h2>🎨 Uiterlijk</h2>
                
                <div class="setting-item">
                    <div class="setting-info">
                        <h3>Dark Mode</h3>
                        <p>Gebruik een donker thema om je ogen te sparen (standaard ingeschakeld)</p>
                    </div>
                    <ToggleSwitch 
                        checked={currentSettings.darkMode}
                        onChange={handleDarkModeChange}
                        id="dark-mode-toggle"
                        ariaLabel="Dark mode in- of uitschakelen"
                    />
                </div>

                <div class="setting-item">
                    <div class="setting-info">
                        <h3>Tekstgrootte</h3>
                        <p>Kies de lettergrootte die het prettigst leest</p>
                    </div>
                    <select 
                        class="form-control select-control"
                        value={currentSettings.fontSize}
                        on:change={handleFontSizeChange}
                    >
                        <option value="small">Klein</option>
                        <option value="medium">Normaal</option>
                        <option value="large">Groot</option>
                    </select>
                </div>

                <div class="setting-item">
                    <div class="setting-info">
                        <h3>Animaties</h3>
                        <p>Schakel animaties en overgangen in of uit</p>
                    </div>
                    <ToggleSwitch 
                        checked={currentSettings.animationsEnabled}
                        onChange={handleAnimationsChange}
                        id="animations-toggle"
                        ariaLabel="Animaties in- of uitschakelen"
                    />
                </div>
            </section>

            <!-- Geavanceerd sectie -->
            <section class="settings-section card">
                <h2>🔧 Geavanceerd</h2>
                
                <div class="setting-item">
                    <div class="setting-info">
                        <h3>Instellingen resetten</h3>
                        <p>Herstel alle instellingen naar de standaardwaarden (dark mode blijft aan)</p>
                    </div>
                    <button class="btn btn-outline" on:click={handleReset}>
                        Reset instellingen
                    </button>
                </div>
            </section>
        </div>
    </div>
</div>

<style>
    .settings-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .settings-header {
        text-align: center;
        margin-bottom: 3rem;
    }

    .settings-header h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-color);
    }

    .settings-header p {
        font-size: 1.1rem;
        color: var(--text-color);
        opacity: 0.8;
        max-width: 600px;
        margin: 0 auto;
    }

    .settings-content {
        margin-bottom: 2rem;
    }

    .settings-grid {
        display: grid;
        gap: 2rem;
    }

    .settings-section {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .settings-section:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 20px var(--card-shadow);
    }

    .settings-section h2 {
        color: var(--text-color);
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid var(--border-color);
        gap: 2rem;
    }

    .setting-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }

    .setting-info {
        flex: 1;
    }

    .setting-info h3 {
        margin: 0 0 0.25rem 0;
        font-size: 1.1rem;
        color: var(--text-color);
        font-weight: 600;
    }

    .setting-info p {
        margin: 0;
        color: var(--text-color);
        opacity: 0.7;
        font-size: 0.9rem;
        line-height: 1.4;
    }

    .select-control {
        min-width: 140px;
        max-width: 200px;
    }

    @media (max-width: 768px) {
        .settings-container {
            padding: 1rem;
        }
        
        .settings-header h1 {
            font-size: 2rem;
        }
        
        .settings-section {
            padding: 1rem;
        }
        
        .setting-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .select-control {
            width: 100%;
            max-width: none;
        }
    }

    @media (max-width: 480px) {
        .setting-item {
            padding: 0.75rem 0;
        }
        
        .setting-info h3 {
            font-size: 1rem;
        }
        
        .setting-info p {
            font-size: 0.85rem;
        }
    }
</style>
