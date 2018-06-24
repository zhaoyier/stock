import * as React from "react";
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import zhCN from "antd/lib/locale-provider/zh_CN";
import {
	connect
} from "react-redux";
import {
	getAccount,
	updateNoticeInfo
} from "../../action/common";
import accountInfo from "../../util/accountInfo";
import {
	getOriginCode
} from "../../util/kit";
import Header from "./Header";
import Menu from "./Menu";
import Announcement from "./Announcement";
import "./index.scss";

interface IndexProps {
	dispatch?: any;
	hideMenu?: boolean;
}

@connect()
class Index extends React.Component<IndexProps, {}> {
	componentWillMount() {
		this.updateAccountInfo();
		this.updateNoticeInfo();
	}
	/*
        很多老的页面仅仅为了拿到店铺的信息, 引入Redux
        现在可以通过 utils/accountInfo 获得
        updateAccountInfo 还是注入店铺信息供老页面用
    */
	updateAccountInfo() {
		const { dispatch } = this.props;
		dispatch(getAccount(accountInfo));
	}
	updateNoticeInfo() {
		const { dispatch } = this.props;
		dispatch(updateNoticeInfo());
	}
	render() {
		const { hideMenu } = this.props;
		return (
			<LocaleProvider locale={getOriginCode() === "CN" ? zhCN : enUS}>
				<div className="HomeWrap">
					<Header />
					{hideMenu !== true &&
						<main className="main">
							<Menu />
							<div>{this.props.children}</div>
						</main>
					}
					{
						hideMenu === true &&
							<div className="noMenuContainer">
								{this.props.children}
							</div>
					}
					<footer>
						<Announcement />
					</footer>
				</div>
			</LocaleProvider>
		);
	}
}

export default Index;
