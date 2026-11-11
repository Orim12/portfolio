<!-- Reusable loading component -->
<script lang="ts">
    export let message: string = "Projecten laden...";
    export let size: 'small' | 'medium' | 'large' = 'medium';
</script>

<div class="loading-container" class:small={size === 'small'} class:large={size === 'large'}>
    <div class="spinner"></div>
    <p class="loading-message">{message}</p>
</div>

<style>
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        min-height: 200px;
    }

    .loading-container.small {
        padding: 1rem;
        min-height: 100px;
    }

    .loading-container.large {
        padding: 4rem;
        min-height: 400px;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #007acc;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }

    .small .spinner {
        width: 24px;
        height: 24px;
        border-width: 2px;
    }

    .large .spinner {
        width: 60px;
        height: 60px;
        border-width: 6px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .loading-message {
        margin: 0;
        color: #666;
        font-size: 1rem;
    }

    .small .loading-message {
        font-size: 0.875rem;
    }

    .large .loading-message {
        font-size: 1.125rem;
    }
</style>