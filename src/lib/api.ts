import type { PaginatedProjectsResponse, ApiError } from './types.js';
import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';

// Base URL voor de API - uit environment variabelen of fallback
const API_BASE_URL = env.PUBLIC_API_BASE_URL || 'https://mirovaassen.nl/api';

// Helper functie om de base URL voor media bestanden te krijgen
export function getMediaBaseUrl(): string {
    return env.PUBLIC_MEDIA_BASE_URL || 'https://mirovaassen.nl';
}

export class ProjectsApiError extends Error {
    status?: number;
    
    constructor(message: string, status?: number) {
        super(message);
        this.name = 'ProjectsApiError';
        this.status = status;
    }
}

/**
 * Haalt projecten op van de backend API
 * @param page - Pagina nummer (standaard 1)
 * @param limit - Aantal projecten per pagina (standaard 10)
 * @param fetchFn - Fetch functie (optioneel, voor SvelteKit load functies)
 * @returns Promise met gepagineerde projecten data
 */
export async function fetchProjects(
    page: number = 1, 
    limit: number = 10,
    fetchFn: typeof fetch = fetch
): Promise<PaginatedProjectsResponse> {
    try {
        const url = new URL(`${API_BASE_URL}/Projects`);
        url.searchParams.set('page', page.toString());
        url.searchParams.set('limit', limit.toString());

        console.log('Fetching projects from URL:', url.toString());

        const response = await fetchFn(url.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        
        console.log('Projects response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Projects error response:', errorText);
            throw new ProjectsApiError(
                `API call failed: ${response.status} ${response.statusText}`,
                response.status
            );
        }

        const data: PaginatedProjectsResponse = await response.json();
        console.log('Successfully fetched projects:', data.docs.length, 'items');
        return data;
    } catch (error) {
        if (error instanceof ProjectsApiError) {
            throw error;
        }
        
        // Network errors, parsing errors, etc.
        throw new ProjectsApiError(
            `Failed to fetch projects: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

/**
 * Haalt een specifiek project op basis van ID
 * @param id - Project ID
 * @param fetchFn - Fetch functie (optioneel, voor SvelteKit load functies)
 * @returns Promise met project data
 */
export async function fetchProjectById(id: string, fetchFn: typeof fetch = fetch) {
    try {
        const url = `${API_BASE_URL}/Projects/${id}`;
        console.log('Fetching project from URL:', url);
        
        const response = await fetchFn(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response body:', errorText);
            throw new ProjectsApiError(
                `Failed to fetch project: ${response.status} ${response.statusText}`,
                response.status
            );
        }

        const data = await response.json();
        console.log('Successfully fetched project:', data.naam);
        return data;
    } catch (error) {
        if (error instanceof ProjectsApiError) {
            throw error;
        }
        
        throw new ProjectsApiError(
            `Failed to fetch project: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}