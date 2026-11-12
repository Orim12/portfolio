declare module 'i18n' {
	export class I18n {
		constructor(options?: Record<string, unknown>);
		setLocale(locale: string): void;
		__(key: string, params?: Record<string, string | number>): string;
	}
}
