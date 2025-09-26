<script lang="ts">
	import { page } from '$app/stores';

	$: errorMessage = getErrorMessage($page.error);
	$: statusCode = $page.status || 500;

	function getErrorMessage(error: any): string {
		if (typeof error?.message === 'string') {
			return error.message;
		}
		
		switch (statusCode) {
			case 404:
				return 'Deze pagina bestaat niet.';
			case 500:
				return 'Er is een interne serverfout opgetreden.';
			case 403:
				return 'Je hebt geen toegang tot deze pagina.';
			default:
				return 'Er is iets misgegaan.';
		}
	}

	function goBack() {
		if (typeof window !== 'undefined' && window.history.length > 1) {
			history.back();
		} else {
			window.location.href = '/';
		}
	}
</script>

<svelte:head>
	<title>Fout {statusCode} - Portfolio</title>
	<meta name="description" content="Er is een fout opgetreden op de portfolio website." />
</svelte:head>

<main class="error-container">
	<div class="error-content">
		<div class="error-icon">
			{#if statusCode === 404}
				<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"/>
					<path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
					<line x1="9" y1="9" x2="9.01" y2="9"/>
					<line x1="15" y1="9" x2="15.01" y2="9"/>
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"/>
					<line x1="12" y1="8" x2="12" y2="12"/>
					<line x1="12" y1="16" x2="12.01" y2="16"/>
				</svg>
			{/if}
		</div>
		
		<h1 class="error-code">{statusCode}</h1>
		<h2 class="error-title">
			{#if statusCode === 404}
				Pagina niet gevonden
			{:else if statusCode === 500}
				Interne serverfout
			{:else if statusCode === 403}
				Geen toegang
			{:else}
				Er is een fout opgetreden
			{/if}
		</h2>
		
		<p class="error-message">{errorMessage}</p>
		
		<div class="error-actions">
			<button class="btn btn-primary" on:click={goBack}>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="m12 19-7-7 7-7"/>
					<path d="M19 12H5"/>
				</svg>
				Ga terug
			</button>
			<a href="/" class="btn btn-secondary">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
					<polyline points="9,22 9,12 15,12 15,22"/>
				</svg>
				Naar startpagina
			</a>
		</div>
	</div>
</main>

<style>
	.error-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.error-content {
		text-align: center;
		max-width: 500px;
		width: 100%;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 3rem 2rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.error-icon {
		color: #6b73ff;
		margin-bottom: 1.5rem;
		opacity: 0.8;
	}

	.error-code {
		font-size: 4rem;
		font-weight: 800;
		margin: 0 0 1rem 0;
		color: #2d3748;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.error-title {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
		color: #2d3748;
	}

	.error-message {
		font-size: 1.1rem;
		color: #718096;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.error-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: 12px;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s ease;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		min-width: 140px;
		justify-content: center;
	}

	.btn-primary {
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(102, 126, 234, 0.6);
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.8);
		color: #4a5568;
		border: 2px solid rgba(116, 75, 162, 0.2);
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 1);
		border-color: rgba(116, 75, 162, 0.4);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	@media (max-width: 640px) {
		.error-container {
			padding: 1rem;
		}

		.error-content {
			padding: 2rem 1.5rem;
		}

		.error-code {
			font-size: 3rem;
		}

		.error-title {
			font-size: 1.25rem;
		}

		.error-actions {
			flex-direction: column;
		}

		.btn {
			width: 100%;
		}
	}
</style>