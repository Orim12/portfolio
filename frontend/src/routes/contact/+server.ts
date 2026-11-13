import { env } from '$env/dynamic/public'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { translate } from '$lib/server/i18n'

const API_BASE_URL = env.PUBLIC_API_BASE_URL

export const POST: RequestHandler = async ({ request, fetch }) => {
	const requestLocale = request.headers.get('cookie')?.match(/(?:^|;\s*)portfolio-locale=(en|nl)/)?.[1] as 'en' | 'nl' | undefined
	const locale = requestLocale || (request.headers.get('accept-language')?.toLowerCase().startsWith('nl') ? 'nl' : 'en')
	const t = (key: string) => translate(locale, key)
	try {
		if (!API_BASE_URL) {
			console.error('Contact form API URL is not configured')
			return json(
				{ message: t('contact.unavailable') },
				{ status: 503 },
			)
		}

		const formData = await request.formData()
		const name = formData.get('name')
		const email = formData.get('email')
		const message = formData.get('message')

		if (
			typeof name !== 'string' ||
			typeof email !== 'string' ||
			typeof message !== 'string' ||
			!name.trim() ||
			!email.trim() ||
			!message.trim()
		) {
			return json({ message: t('contact.invalidFields') }, { status: 400 })
		}

		const normalizedEmail = email.trim().toLowerCase()
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
			return json({ message: t('contact.invalidEmail') }, { status: 400 })
		}

		const response = await fetch(`${API_BASE_URL}/forms`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name.trim(),
				email: normalizedEmail,
				message: message.trim(),
			}),
		})

		if (!response.ok) {
			const details = await response.text()
			console.error('Payload contact form request failed:', response.status, details)
			if (response.status === 400) {
				return json(
					{ message: t('contact.invalidRequest') },
					{ status: 400 },
				)
			}

			return json(
				{ message: t('contact.sendFailed') },
				{ status: 502 },
			)
		}

		return json({ message: t('contact.sent') }, { status: 201 })
	} catch (error) {
		console.error('Contact form request failed:', error)
		return json(
			{ message: t('contact.sendFailed') },
			{ status: 502 },
		)
	}
}