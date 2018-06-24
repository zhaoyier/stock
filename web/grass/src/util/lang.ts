export type Lang = "zh" | "us";

const KEY: string = "ezbuy_seller_lang";

export function switchLang(lang: Lang) {
	localStorage.setItem(KEY, lang);
}

export function getLang(): Lang {
	return (localStorage.getItem(KEY) as Lang) || "zh";
}
