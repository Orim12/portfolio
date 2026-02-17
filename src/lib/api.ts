import type { PaginatedProjectsResponse, ApiError } from './types.js';
import { env } from '$env/dynamic/public';

// Type definition voor General Data
export interface GeneralData {
    projectsAantal: any;
    ervaringJaren: any;
    klantenAantal: any;
    cvUrl?: string;
}

// Base URL voor de API - uit environment variabelen of fallback
const API_BASE_URL = env.PUBLIC_API_BASE_URL || 'https://backend.mirovaassen.nl/api';

// Helper functie om de base URL voor media bestanden te krijgen
export function getMediaBaseUrl(): string {
    return env.PUBLIC_MEDIA_BASE_URL || 'https://backend.mirovaassen.nl';
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
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

/**
 * Haalt algemene data op (zoals aantal projecten, jaren ervaring, etc.)
 * @param fetchFn - Fetch functie (optioneel, voor SvelteKit load functies)
 * @returns Promise met algemene data
 */
export async function fetchGeneralData(fetchFn: typeof fetch = fetch): Promise<GeneralData> {
    try {
        const url = `${API_BASE_URL}/globals/general-data`;
        console.log('Fetching general data from URL:', url);

        const response = await fetchFn(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        console.log('General data response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('General data error response:', errorText);
            throw new ProjectsApiError(
                `Failed to fetch general data: ${response.status} ${response.statusText}`,
                response.status
            );
        }

        const data: GeneralData = await response.json();
        console.log('Successfully fetched general data');
        return data;
    } catch (error) {
        if (error instanceof ProjectsApiError) {
            throw error;
        }

        throw new ProjectsApiError(
            `Failed to fetch general data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

export async function fetchCvUrl(fetchFn: typeof fetch = fetch): Promise<string> {
    try {
        const url = `${API_BASE_URL}/media`;
        console.log('Fetching CV media from:', url);
        const response = await fetchFn(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('CV media error response:', errorText);
            throw new ProjectsApiError(
                `Failed to fetch CV media: ${response.status} ${response.statusText}`,
                response.status
            );
        }

        const data = await response.json();
        const docs = Array.isArray(data?.docs) ? data.docs : [];
        const cvDoc = docs.find((doc: { filename?: string }) => doc.filename === 'cv.pdf');

        if (!cvDoc?.cloudinaryUrl) {
            throw new ProjectsApiError('CV document not found in media response');
        }

        const cvUrl = `${cvDoc.cloudinaryUrl}`;
        console.log('Successfully fetched CV URL');
        return cvUrl;
    } catch (error) {
        console.error('Failed to fetch CV URL:', error);
        throw new ProjectsApiError(
            `Failed to fetch CV URL: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}