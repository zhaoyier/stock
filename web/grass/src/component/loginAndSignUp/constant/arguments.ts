import { getLangText } from "../../../util/kit";
import { getLang } from "../../../util/lang";

const getText = getLangText(getLang());

export enum SellerTitleKey {
	LOGIN = "login",
	REGISTER = "register",
	RESET_PASSWORD = "resetPassword",
}

export interface SellerTitleValue {
	title: string;
	active: React.CSSProperties;
	normal: React.CSSProperties;

}

const sellerTitleMap = new Map<SellerTitleKey, SellerTitleValue>([
	[SellerTitleKey.LOGIN, {
		active: { color: "#3e82f7" },
		normal: { color: "rgba(0,0,0,.65)" },
		title: getText("seller_login")
	}],
	[SellerTitleKey.REGISTER, {
		active: { color: "#3e82f7" },
		normal: { color: "rgba(0,0,0,.65)" },
		title: getText("seller_register")
	}],
	[SellerTitleKey.RESET_PASSWORD, {
		title: getText("商家注册"),
		active: { color: "rgba(0,0,0,.65)" },
		normal: { color: "rgba(0,0,0,.65)" },
	}]
]);

export default sellerTitleMap;
