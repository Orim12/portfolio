import { env } from '$env/dynamic/public'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

const API_BASE_URL = env.PUBLIC_API_BASE_URL || 'https://backend.mirovaassen.nl/api'

export const POST: RequestHandler = async ({ request, fetch }) => {
	try {
		if (!API_BASE_URL) {
			console.error('Contact form API URL is not configured')
			return json(
				{ message: 'Het contactformulier is tijdelijk niet beschikbaar.' },
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
			return json({ message: 'Vul alle velden in.' }, { status: 400 })
		}

		const normalizedEmail = email.trim().toLowerCase()
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
			return json({ message: 'Vul een geldig e-mailadres in.' }, { status: 400 })
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
					{ message: 'Controleer de ingevulde gegevens en probeer het opnieuw.' },
					{ status: 400 },
				)
			}

			return json(
				{ message: 'Het bericht kon niet worden verstuurd. Probeer het later opnieuw.' },
				{ status: 502 },
			)
		}

		return json({ message: 'Je bericht is verstuurd.' }, { status: 201 })
	} catch (error) {
		console.error('Contact form request failed:', error)
		return json(
			{ message: 'Het bericht kon niet worden verstuurd. Probeer het later opnieuw.' },
			{ status: 502 },
		)
	}
}