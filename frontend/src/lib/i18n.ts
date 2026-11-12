import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import en from '$lib/locales/en.json';
import nl from '$lib/locales/nl.json';

export const locales = ['en', 'nl'] as const;
export type Locale = (typeof locales)[number];
type Catalog = typeof en;

const catalogs: Record<Locale, Catalog> = { en, nl };
const localeStore = writable<Locale>(getInitialLocale());

function getInitialLocale(): Locale {
	if (!browser) return 'en';
	const stored = localStorage.getItem('portfolio-locale');
	if (stored === 'en' || stored === 'nl') return stored;
	return navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en';
}

export const locale = localeStore;

export function setLocale(nextLocale: Locale): void {
	localeStore.set(nextLocale);
	if (browser) {
		localStorage.setItem('portfolio-locale', nextLocale);
		document.cookie = `portfolio-locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
		document.documentElement.lang = nextLocale;
	}
}

export function translate(currentLocale: Locale, key: string, values: Record<string, string | number> = {}): string {
	const value = key.split('.').reduce<unknown>((current, part) => {
		return current && typeof current === 'object' && part in current
			? (current as Record<string, unknown>)[part]
			: undefined;
	}, catalogs[currentLocale]);
	if (typeof value !== 'string') return key;
	return value.replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? `{${name}}`));
}

export function getCatalog(currentLocale: Locale): Catalog {
	return catalogs[currentLocale];
}
