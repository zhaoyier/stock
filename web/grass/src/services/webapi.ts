import getApiPrefix from "../util/getApiPrefix";
import * as Fetch from "fetch.io";

const getFetchRequest = (function(){
	const prefix2fetchMap: {[key: string]: Fetch} = {};
	return function(prefix: string){
		if (typeof prefix2fetchMap[prefix] === "undefined") {
			prefix2fetchMap[prefix] = new Fetch({
  				prefix: `${getApiPrefix()}${prefix}`
			});
		}
		return prefix2fetchMap[prefix];
	};
})();

const getPrefix = (method: string) => {
	const [service] = method.split(".");
	let prefix = "";
	switch (service) {
		case "CastleBlack":
			prefix = "castleblack";
			break;
		case "AdminHomepage":
			prefix = "homepage";
			break;
		case "BootyBay":
			prefix = "bootybay";
			break;
		default:
			prefix = "";
			break;
	}
	return `/api${prefix === "" ? "" : `/${prefix}`}`;
};

const requestConfig = {
	credentials: "include"
};

const allDotRegex = /\./g;

function webapi<T>(method: string, params: any): Promise<T> {
	let fetchRequest = getFetchRequest(getPrefix(method));
	let api = method.indexOf("/") > -1 ? `/${method}` : `/${method.replace(allDotRegex, "/")}`;
	return fetchRequest.post(api)
			.config(requestConfig)
			.send(params)
			.json(false);
}

export default webapi;
