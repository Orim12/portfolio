// Export API functions
export { fetchProjects, fetchProjectById, ProjectsApiError } from './api.js';

// Export types
export type { Project, PaginatedProjectsResponse, ApiError } from './types.js';

// Export settings
export { 
    settings, 
    toggleDarkMode, 
    setFontSize, 
    toggleAnimations, 
    resetSettings,
    clearSettingsCookies,
    getSettingsFromCookies,
    createSettingsCookie
} from './settings.js';
export type { Settings } from './settings.js';

// Export components
export { default as ErrorMessage } from './components/ErrorMessage.svelte';
export { default as LoadingSpinner } from './components/LoadingSpinner.svelte';