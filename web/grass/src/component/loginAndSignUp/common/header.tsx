import * as React from "react";
import
	sellerTitleMap,
{
	SellerTitleKey,
	SellerTitleValue
} from "../constant/arguments";
import {
	switchLang,
	Lang,
	getLang
} from "../../../util/lang";
import "../css/header.scss";

interface HeaderProps {
	active: SellerTitleKey;
	forceUpdate: Function;
}

import { getLangText } from "../../../util/kit";

class Header extends React.Component<HeaderProps, {}> {
	setLang(lang: Lang) {
		switchLang(lang);
		this.props.forceUpdate();
	}
	render() {
		const lang = getLang();
		const current = sellerTitleMap.get(this.props.active);
		const { active, normal, title } = current as SellerTitleValue;
		const getText = getLangText(getLang());

		return (
			<div>
				<header className="header">
					<div className="top">
						<div className="container">
							<div className="top__left">
								<span>
									{getText("welcome")} |
								</span>
								<a
									className="lang"
									onClick={() => this.setLang("zh")}
									style={{color: lang === "zh" ? "#3e82f7" : "rgba(0,0,0,.65)"}}>
									中文
								</a>
								<a
									className="lang"
									onClick={() => this.setLang("us")}
									style={{color: lang === "us" ? "#3e82f7" : "rgba(0,0,0,.65)"}}>
									English
								</a>
							</div>
							<div className="top__right">
								<a href="/signin.html#" style={this.props.active === SellerTitleKey.LOGIN ? active : normal}> Login </a> |
								<a href="/signin.html#register" style={this.props.active === SellerTitleKey.REGISTER ? active : normal}> Register </a>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="logo">
							<div className="image">
								<img src={require("../../../resources/static/ezbuyR.png")} alt="" />
							</div>
							<h3 className="title">
								{title}
							</h3>
						</div>
					</div>
				</header>
			</div>
		);
	}
}

export default Header;
