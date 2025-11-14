import { fetchGeneralData } from '$lib/api.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    try {
        const generalData = await fetchGeneralData(fetch);
        return {
            generalData
        };
    } catch (error) {
        console.error('Failed to load general data:', error);
        return {
            generalData: null
        };
    }
};