import * as React from "react";
import * as moment from "moment";
import {
	Row,
	Col
} from "antd";
import {
	UserShopIndexSales,
} from "../../../services/EzSellerService";
import accountInfo from "../../../util/accountInfo";
import "./index.scss";
import { lastThirtyDaysItems } from "component/Home/common/constant";

const shopId: number = accountInfo.shop ? accountInfo.shop.shopId : 0;
const shopName: string = accountInfo.shop ? accountInfo.shop.shopName : "";

interface HeaderProps {
	lastDay: UserShopIndexSales;
}

class Header extends React.Component<HeaderProps, {}> {
	render() {
		const { lastDay } = this.props;
		const now = moment(new Date()).format("YYYY-MM-DD");

		return (
			<div className="home_header_container">
				<Row className="header ">
					<Col span={5} className="header__logo">
						<div className="logo__container">
							<img src={require("../image/Default head image.svg")} alt="" />
						</div>
						<p>Hi, {shopName}</p>
						<p>店铺ID: {shopId} </p>
					</Col>
					<Col span={19} className="header__right">
						<Row>
							<Col span={6} style={{paddingLeft: "30px"}}>
								昨日全天数据:
							</Col>
							<Col
								span={6}
								offset={12}
								style={{fontSize: "12px", paddingRight: "30px", textAlign: "right"}}>
								更新时间: {now}
							</Col>
						</Row>
						<Row>
							{
								lastThirtyDaysItems.map((item, index) =>
									<Col className="panel__info" key={index} span={6}>
										<div className="header__panel--num">{lastDay[item.key]}</div>
										<div className="header__panel--name">{item.label}</div>
									</Col>
								)
							}
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Header;
