import { fetchAboutMe, fetchCvUrl, fetchGeneralData } from '$lib/api.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    try {
        const [generalData, aboutMe, cvUrl] = await Promise.all([
            fetchGeneralData(fetch),
            fetchAboutMe(fetch),
            fetchCvUrl(fetch)
        ]);
        return {
            generalData,
            aboutMe,
            cvUrl
        };
    } catch (error) {
        console.error('Failed to load general data:', error);
        return {
            generalData: null,
            aboutMe: null,
            cvUrl: null
        };
    }
};