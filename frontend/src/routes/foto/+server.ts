import { redirect } from '@sveltejs/kit';
import { fetchCvUrl, fetchGeneralData } from '$lib/api.js';

export async function GET({ fetch }: any) {
	const data = await _getting({ fetch });
	const url = (data?.generalData as any)?.profielFoto?.cloudinaryUrl;

	if (!url) {
		return new Response('Profile photo not found', { status: 404 });
	}

	throw redirect(307, url);
}


export const _getting = async ({ fetch }: any) => {
	try {
		const generalData = await fetchGeneralData(fetch);
		return { generalData };
	} catch (error) {
		console.error('Failed to load general data:', error);
		return { generalData: null };
	}
};