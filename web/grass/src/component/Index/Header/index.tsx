import * as React from "react";
import * as Cookies from "js-cookie";
import {
	Badge,
} from "antd";
import {
	connect
} from "react-redux";
import {
	getText
} from "../../../util/kit";
import accountInfo from "../../../util/accountInfo";
import Logo from "../Logo";
import LangSelect from "../LangSelect";
import "./index.scss";
import { redirect } from "util/history";
import { getMessageCount } from "util/seller";


interface HeaderProps {
	noticeInfo?: {
		announcementCount: number;
		mailCount: number;
	};
}

@connect(state => ({
	noticeInfo: state.common.noticeInfo
}))
class Header extends React.Component<HeaderProps, {}> {
	logout() {
		window.sessionStorage.login = "";
		Cookies.remove("data");
		location.pathname = "/signin.html";
	}
	render() {
		const { noticeInfo } = this.props;
		const total = noticeInfo!.announcementCount + noticeInfo!.mailCount;

		return (
			<div className="HomeHeaderWrap">
				<Logo />
				<div className="welcome">
					<span
						onClick={() => redirect("/viewMessage")}>
						<Badge
							offset={[-3, 8]}
							count={getMessageCount(total)}
							className="noticeWrap">
							<img src={require("../image/notice.svg")} />
						</Badge>
					</span>
					<img
						style={{width: "30px", margin: "0 10px 0 30px"}}
						src={require("../image/Default head image.svg")} />
					<span>
						{accountInfo.username}
					</span>
					<span className="dividing" />
					<a onClick={() => this.logout()}>
						{getText("sign out")}
					</a>
				</div>
				<div className="languageChange">
					<LangSelect />
				</div>
			</div>
		);
	}
}

export default Header;
