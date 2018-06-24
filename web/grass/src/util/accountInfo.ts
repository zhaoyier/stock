import * as Cookies from "js-cookie";
import {
	AccountBase
} from "../services/EzSellerService";

const accountInfo: AccountBase = ((): AccountBase => {
	const defaultInfo: AccountBase = {
		userId: 0,
		username: "",
		token: "",
		isActivated: false
	};
	let info: AccountBase | null;
	try {
		info = JSON.parse(Cookies.get("data"));
	}
	catch (err) {
		info = null;
		console.error("Can't get correct accountInfo !");
	}
	return info ? info : defaultInfo;
})();

export default accountInfo;
