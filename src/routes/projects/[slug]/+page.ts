import { fetchProjectById, ProjectsApiError } from '$lib/api.js';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
    try {
        const projectId = params.slug;
        
        if (!projectId) {
            throw error(400, 'Project ID is required');
        }

        const project = await fetchProjectById(projectId, fetch);
        
        return {
            project
        };
    } catch (err) {
        console.error('Error loading project:', err);
        
        if (err instanceof ProjectsApiError) {
            if (err.status === 404) {
                throw error(404, 'Project niet gevonden');
            } else if (err.status && err.status >= 500) {
                throw error(503, 'Backend service niet beschikbaar');
            } else {
                throw error(400, `Failed to load project: ${err.message}`);
            }
        }
        
        throw error(503, 'Kan geen verbinding maken met de backend service');
    }
};