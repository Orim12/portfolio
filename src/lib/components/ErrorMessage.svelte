<!-- Reusable error component voor project gerelateerde fouten -->
<script lang="ts">
    export let error: string = "Er is een onbekende fout opgetreden";
    export let retry: (() => void) | null = null;
    export let showRetry: boolean = true;
</script>

<div class="error-container">
    <div class="error-icon">⚠️</div>
    <h3>Oeps! Er ging iets mis</h3>
    <p class="error-message">{error}</p>
    
    {#if showRetry && retry}
        <button class="retry-button" on:click={retry}>
            Opnieuw proberen
        </button>
    {/if}
    
    <details class="error-details">
        <summary>Meer informatie</summary>
        <p>
            Als dit probleem blijft bestaan, controleer dan:
        </p>
        <ul>
            <li>Je internetverbinding</li>
            <li>Of de backend service draait</li>
            <li>Of je firewall de verbinding blokkeert</li>
        </ul>
    </details>
</div>

<style>
    .error-container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        text-align: center;
        background: #fef7f7;
        border: 1px solid #fed7d7;
        border-radius: 12px;
        color: #742a2a;
    }

    .error-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .error-container h3 {
        margin: 0 0 1rem 0;
        color: #742a2a;
    }

    .error-message {
        margin-bottom: 1.5rem;
        color: #742a2a;
    }

    .retry-button {
        background: #e53e3e;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        margin-bottom: 1.5rem;
        transition: background 0.2s ease;
    }

    .retry-button:hover {
        background: #c53030;
    }

    .error-details {
        text-align: left;
        margin-top: 1rem;
        background: white;
        padding: 1rem;
        border-radius: 6px;
        border: 1px solid #fed7d7;
    }

    .error-details summary {
        cursor: pointer;
        font-weight: 500;
        color: #742a2a;
        margin-bottom: 0.5rem;
    }

    .error-details ul {
        margin: 0.5rem 0 0 1rem;
        color: #742a2a;
    }

    .error-details p {
        margin: 0.5rem 0;
        color: #742a2a;
    }
</style>