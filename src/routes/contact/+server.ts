import { env } from '$env/dynamic/public'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

const API_BASE_URL = env.PUBLIC_API_BASE_URL

export const POST: RequestHandler = async ({ request, fetch }) => {
	try {
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

		const response = await fetch(`${API_BASE_URL}/forms`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name.trim(),
				email: email.trim(),
				message: message.trim(),
			}),
		})

		if (!response.ok) {
			const details = await response.text()
			console.error('Payload contact form request failed:', response.status, details)
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