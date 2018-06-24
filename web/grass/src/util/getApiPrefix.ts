function getApiPrefix() {
	let hostname = "";
	switch (location.hostname) {
		case "cn-ezseller.ezbuy.sg":
			hostname = "https://cn-ezseller-webapi.ezbuy.sg";
			break;
		case "cn2-ezseller.ezbuy.sg":
			hostname = "https://cn2-ezseller-webapi.ezbuy.sg";
			break;
		case "ezseller.ezbuy.com":
			hostname = "https://webapi.ezbuy.com";
			break;
		case "localhost":
			hostname = `http://${location.hostname}:${location.port}`;
			break;
		default:
			hostname = "http://webapi.sg.65emall.net";
			break;
	}
	return hostname;
}

export default getApiPrefix;
