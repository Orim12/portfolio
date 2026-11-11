<script lang="ts">
    export let checked: boolean = false;
    export let disabled: boolean = false;
    export let id: string = '';
    export let ariaLabel: string = '';
    export let onChange: ((checked: boolean) => void) | undefined = undefined;
    
    function handleChange(event: Event) {
        const target = event.target as HTMLInputElement;
        checked = target.checked;
        if (onChange) {
            onChange(checked);
        }
    }
</script>

<label class="toggle-switch" class:disabled for={id}>
    <input 
        {id}
        type="checkbox" 
        {checked}
        {disabled}
        aria-label={ariaLabel}
        on:change={handleChange}
    />
    <span class="toggle-slider"></span>
</label>

<style>
    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
    }

    .toggle-switch.disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--border-color);
        transition: 0.3s;
        border-radius: 24px;
    }

    .disabled .toggle-slider {
        cursor: not-allowed;
    }

    .toggle-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    input:checked + .toggle-slider {
        background-color: var(--accent-color);
    }

    input:checked + .toggle-slider:before {
        transform: translateX(26px);
    }

    input:focus + .toggle-slider {
        box-shadow: 0 0 4px var(--accent-color);
    }

    input:disabled + .toggle-slider {
        background-color: var(--border-color);
    }

    input:disabled:checked + .toggle-slider {
        background-color: var(--border-color);
    }
</style>