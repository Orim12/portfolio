<script lang="ts">
	let submitting = false
	let feedback: { type: 'success' | 'error'; message: string } | null = null

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault()
		const form = event.currentTarget as HTMLFormElement
		submitting = true
		feedback = null

		try {
			const response = await fetch('/contact', {
				method: 'POST',
				body: new FormData(form),
			})
			const result = (await response.json()) as { message?: string }

			if (!response.ok) {
				throw new Error(result.message || 'Het bericht kon niet worden verstuurd.')
			}

			form.reset()
			feedback = { type: 'success', message: result.message || 'Je bericht is verstuurd.' }
		} catch (error) {
			feedback = {
				type: 'error',
				message: error instanceof Error
					? error.message
					: 'Het bericht kon niet worden verstuurd. Probeer het later opnieuw.',
			}
		} finally {
			submitting = false
		}
	}
</script>

<svelte:head>
	<title>Contact - Portfolio</title>
	<meta name="description" content="Neem contact op voor vragen, ideeën of samenwerkingen" />
</svelte:head>

<div class="contact-container">
	<header class="contact-header">
		<h1>Neem contact op</h1>
		<p>Heb je een vraag, idee of wil je samenwerken? Stuur gerust een bericht.</p>
	</header>

	<div class="contact-content">
		<section class="contact-card card" aria-labelledby="form-title">
			<div class="card-heading">
				<h2 id="form-title">Stuur een bericht</h2>
				<p>Ik probeer zo snel mogelijk te reageren.</p>
			</div>

			<form action="/contact" method="POST" on:submit={handleSubmit}>
				<div class="form-field">
					<label for="name">Naam</label>
					<input
						class="form-control"
						id="name"
						name="name"
						type="text"
						autocomplete="name"
						required
					/>
				</div>

				<div class="form-field">
					<label for="email">E-mailadres</label>
					<input
						class="form-control"
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
					/>
					<p class="field-description">Hiermee kan ik je beantwoorden.</p>
				</div>

				<div class="form-field">
					<label for="message">Bericht</label>
					<textarea
						class="form-control"
						id="message"
						name="message"
						rows="6"
						required
					></textarea>
					<p class="field-description">Waar kan ik je mee helpen?</p>
				</div>

				{#if feedback}
					<p
						class:success-message={feedback.type === 'success'}
						class:error-message={feedback.type === 'error'}
						role="status"
					>
						{feedback.message}
					</p>
				{/if}

				<button class="btn btn-primary submit-button" type="submit" disabled={submitting}>
					{submitting ? 'Versturen...' : 'Bericht versturen'}
				</button>
			</form>
		</section>
	</div>
</div>

<style>
	.contact-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1rem 4rem;
	}

	.contact-header {
		margin-bottom: 3rem;
		text-align: center;
	}

	.contact-header h1 {
		margin: 0 0 0.5rem;
		color: var(--text-color);
		font-size: 2.5rem;
	}

	.contact-header p {
		max-width: 600px;
		margin: 0 auto;
		color: var(--text-color);
		font-size: 1.1rem;
		opacity: 0.8;
	}

	.contact-content {
		max-width: 700px;
		margin: 0 auto;
	}

	.contact-card {
		padding: 2rem;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.contact-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px var(--card-shadow);
	}

	.card-heading {
		margin-bottom: 2rem;
	}

	.card-heading h2 {
		margin: 0 0 0.5rem;
		color: var(--text-color);
		font-size: 1.5rem;
	}

	.card-heading p {
		margin: 0;
		color: var(--text-color);
		opacity: 0.7;
	}

	form {
		display: grid;
		gap: 1.5rem;
	}

	.form-field {
		display: grid;
		gap: 0.5rem;
	}

	label {
		color: var(--text-color);
		font-weight: 600;
	}

	.form-control {
		min-height: 46px;
	}

	textarea.form-control {
		min-height: 150px;
		resize: vertical;
	}

	.field-description {
		margin: 0;
		color: var(--text-color);
		font-size: 0.9rem;
		opacity: 0.7;
	}

	.success-message,
	.error-message {
		margin: 0;
		font-weight: 500;
	}

	.success-message {
		color: var(--success-color);
	}

	.error-message {
		color: var(--error-color);
	}

	.submit-button {
		width: fit-content;
		margin-top: 0.5rem;
	}

	@media (max-width: 600px) {
		.contact-container {
			padding: 2rem 1rem 3rem;
		}

		.contact-header {
			margin-bottom: 2rem;
		}

		.contact-header h1 {
			font-size: 2rem;
		}

		.contact-card {
			padding: 1.5rem;
		}

		.submit-button {
			width: 100%;
		}
	}
</style>
