<script lang="ts">
	import { locale, translate } from '$lib/i18n';

	$: t = (key: string) => translate($locale, key);
</script>

<svelte:head>
	<title>{t('blocked.title')} - Portfolio</title>
	<meta name="description" content={t('blocked.description')} />
</svelte:head>

<div class="no-container">
	<header class="no-header">
		<h1>{t('blocked.title')}</h1>
		<p>{t('blocked.description')}</p>
	</header>
</div>

<style>
	.no-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1rem;
		min-height: calc(100vh - 80px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.no-header {
		text-align: center;
		background: var(--card-bg);
		border-radius: 12px;
		padding: 2.5rem 3rem;
		box-shadow: 0 2px 10px var(--card-shadow);
		border: 1px solid var(--border-color);
	}

	.no-header h1 {
		margin: 0;
		font-size: 2.75rem;
		color: var(--text-color);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	.no-header p {
		margin: 0;
		font-size: 1.2rem;
		color: var(--text-color);
		letter-spacing: 0.04em;
	}

	@media (max-width: 768px) {
		.no-header {
			padding: 2rem;
		}

		.no-header h1 {
			font-size: 2.25rem;
		}

		.no-header p {
			font-size: 1.125rem;
		}
	}
</style>
