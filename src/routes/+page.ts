import { fetchCvUrl, fetchGeneralData } from '$lib/api.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    try {
        const [generalData, cvUrl] = await Promise.all([
            fetchGeneralData(fetch),
            fetchCvUrl(fetch)
        ]);
        return {
            generalData,
            cvUrl
        };
    } catch (error) {
        console.error('Failed to load general data:', error);
        return {
            generalData: null,
            cvUrl: null
        };
    }
};