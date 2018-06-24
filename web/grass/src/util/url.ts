// 用这个，别不信
export const getUrlParams = function (url) {
	let params = {};
	(url + "?").split("?")[1].split("&").forEach(function (pair: any) {
		pair = (pair + "=").split("=").map(decodeURIComponent);
		if (pair[0].length) {
			params[pair[0]] = pair[1];
		}
	});
	return params;
};

// 这个方法用了后果自负，科科
export const getPathSearchParams = function(url: string = window.location.search) {
	let obj = {},
		str: string = "",
		strArr: string[] = [];
	const splitSearchParamReg = /([^=]+)=(.+)/;

	if (url.trim() === "" || url[0] !== "?") {
		return obj;
	} else {
		str = url.substring(1);
		strArr = str.split("&");
		for (let i = 0; i < strArr.length; i++) {
			const s = strArr[i];
			if (s.indexOf("=") !== -1) {
				const result = s.match(splitSearchParamReg);
				if (result !== null) {
					const prp = result[1];
					const val = result[2];
					obj[prp] = decodeURIComponent(val);
				}
			}
		}
		return obj;
	}
};

// 这个方法用了后果自负，科科
export function getSearchParamValue(searchKey, url: string = window.location.search) {
	const searchParams = getPathSearchParams(url);
	const keyReg = new RegExp(`^${searchKey}$`, "i");
	let value: string = "";

	for (let prp in searchParams) {
		if (keyReg.test(prp)) {
			value = searchParams[prp];
		}
	}

	return value;
}

const testEnvHostReg = /65emall\.net|127\.0|192\.168|localhost/i;

export function isUAT(): boolean { return testEnvHostReg.test(location.hostname); }

export function getProductLink(productId: number): string {
		if ( isUAT() ) {
				return `http://sg.65emall.net/product/${productId}.html`;
		}
		return `https://ezbuy.sg/product/${productId}.html`;
}

export const ImageUrl = {
	CNPro: "https://o3pkb6kbz.qnssl.com"
};
