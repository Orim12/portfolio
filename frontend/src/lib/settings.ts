import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';
import * as cookie from 'cookie';

export interface Settings {
    darkMode: boolean;
    animationsEnabled: boolean;
    fontSize: 'small' | 'medium' | 'large';
}

const defaultSettings: Settings = {
    darkMode: true,
    animationsEnabled: true,
    fontSize: 'medium'
};

// Laad settings uit cookies
function loadSettings(): Settings {
    if (!browser) return defaultSettings;
    
    try {
        const cookies = cookie.parse(document.cookie);
        const stored = cookies['portfolio-settings'];
        if (stored) {
            const parsed = JSON.parse(decodeURIComponent(stored));
            // Filter alleen de properties die we nog steeds gebruiken
            const filteredSettings: Settings = {
                darkMode: parsed.darkMode ?? defaultSettings.darkMode,
                animationsEnabled: parsed.animationsEnabled ?? defaultSettings.animationsEnabled,
                fontSize: parsed.fontSize ?? defaultSettings.fontSize
            };
            return filteredSettings;
        }
    } catch (e) {
        console.error('Failed to load settings from cookies:', e);
    }
    
    return defaultSettings;
}

// Sla settings op in cookies
function saveSettings(settings: Settings): void {
    if (!browser) return;
    
    try {
        const serialized = cookie.serialize('portfolio-settings', encodeURIComponent(JSON.stringify(settings)), {
            maxAge: 60 * 60 * 24 * 365, // 1 jaar
            path: '/',
            httpOnly: false,
            secure: false, // Voor development, in productie zou dit true moeten zijn voor HTTPS
            sameSite: 'lax'
        });
        
        document.cookie = serialized;
    } catch (e) {
        console.error('Failed to save settings to cookies:', e);
    }
}

// Settings store
export const settings = writable<Settings>(loadSettings());

// Subscribe om automatisch op te slaan
if (browser) {
    settings.subscribe((value) => {
        saveSettings(value);
        applySettings(value);
    });
}

// Server-side helper om settings uit cookies te lezen
export function getSettingsFromCookies(cookieString: string | null): Settings {
    if (!cookieString) return defaultSettings;
    
    try {
        const cookies = cookie.parse(cookieString);
        const stored = cookies['portfolio-settings'];
        if (stored) {
            const parsed = JSON.parse(decodeURIComponent(stored));
            // Filter alleen de properties die we nog steeds gebruiken
            const filteredSettings: Settings = {
                darkMode: parsed.darkMode ?? defaultSettings.darkMode,
                animationsEnabled: parsed.animationsEnabled ?? defaultSettings.animationsEnabled,
                fontSize: parsed.fontSize ?? defaultSettings.fontSize
            };
            return filteredSettings;
        }
    } catch (e) {
        console.error('Failed to parse settings from cookies:', e);
    }
    
    return defaultSettings;
}

// Helper om settings cookie te maken voor server responses
export function createSettingsCookie(settings: Settings): string {
    return cookie.serialize('portfolio-settings', encodeURIComponent(JSON.stringify(settings)), {
        maxAge: 60 * 60 * 24 * 365, // 1 jaar
        path: '/',
        httpOnly: false,
        secure: false, // Voor development
        sameSite: 'lax'
    });
}

// Apply settings to DOM
function applySettings(settingsValue: Settings): void {
    if (!browser) return;
    
    const html = document.documentElement;
    
    // Dark mode - nu omgekeerd: light class toevoegen als dark mode UIT is
    if (settingsValue.darkMode === false) {
        html.classList.add('light');
    } else {
        html.classList.remove('light');
    }
    
    // Font size
    html.setAttribute('data-font-size', settingsValue.fontSize);
    
    // Animations
    if (!settingsValue.animationsEnabled) {
        html.classList.add('no-animations');
    } else {
        html.classList.remove('no-animations');
    }
}

// Helper functions
export function toggleDarkMode() {
    settings.update(s => ({ ...s, darkMode: !s.darkMode }));
    saveSettings(get(settings));
};

export const setFontSize = (fontSize: 'small' | 'medium' | 'large') => {
    settings.update(s => ({ ...s, fontSize }));
};

export const toggleAnimations = () => {
    settings.update(s => ({ ...s, animationsEnabled: !s.animationsEnabled }));
};

// Reset to defaults
export const resetSettings = () => {
    settings.set(defaultSettings);
};

// Clear cookies (voor debugging)
export const clearSettingsCookies = () => {
    if (!browser) return;
    
    document.cookie = 'portfolio-settings=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};