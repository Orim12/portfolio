import { fetchProjects, ProjectsApiError } from '$lib/api';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ url, fetch }) => {
    try {
        // Lees paginatie parameters uit de URL
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);

        // Valideer paginatie parameters
        if (page < 1 || limit < 1 || limit > 100) {
            throw error(400, 'Invalid pagination parameters');
        }

        const projectsData = await fetchProjects(page, limit, fetch);
        
        return {
            projects: projectsData,
            currentPage: page,
            limit: limit
        };
    } catch (err) {
        console.error('Error loading projects:', err);
        
        if (err instanceof ProjectsApiError) {
            // API errors
            if (err.status === 404) {
                throw error(404, 'Projects not found');
            } else if (err.status && err.status >= 500) {
                throw error(503, 'Backend service unavailable');
            } else {
                throw error(400, `Failed to load projects: ${err.message}`);
            }
        }
        
        // Network or other errors
        throw error(503, 'Failed to connect to backend service');
    }
};