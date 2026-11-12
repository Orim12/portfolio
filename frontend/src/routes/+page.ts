import { fetchAboutMe, fetchCvUrl, fetchGeneralData } from '$lib/api.js';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';
import { locale } from '$lib/i18n';

export const load: PageLoad = async ({ fetch }) => {
    try {
        const [generalData, aboutMe, cvUrl] = await Promise.all([
            fetchGeneralData(fetch, get(locale)),
            fetchAboutMe(fetch, get(locale)),
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