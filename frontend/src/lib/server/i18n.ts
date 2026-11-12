import { I18n } from 'i18n';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Locale } from '$lib/i18n';

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../locales');
const translator = new I18n({
	locales: ['en', 'nl'],
	directory,
	defaultLocale: 'en',
	updateFiles: false,
	syncFiles: false,
	objectNotation: true,
});

export function translate(locale: Locale, key: string, params?: Record<string, string | number>): string {
	translator.setLocale(locale);
	return translator.__(key, params);
}
