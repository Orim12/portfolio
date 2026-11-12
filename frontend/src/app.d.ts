// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module 'i18n' {
	export class I18n {
		constructor(options?: Record<string, unknown>);
		setLocale(locale: string): void;
		__(key: string, params?: Record<string, string | number>): string;
	}
}

export {};
