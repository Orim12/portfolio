<svelte:head>
	<title>No - Portfolio</title>
	<meta name="description" content="No" />
</svelte:head>

<div class="no-container">
	<header class="no-header">
		<h1>No</h1>
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

	@media (max-width: 768px) {
		.no-header {
			padding: 2rem;
		}

		.no-header h1 {
			font-size: 2.25rem;
		}
	}
</style>
