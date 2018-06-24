import * as React from "react";
import * as Cookies from "js-cookie";
import StepOne from "../loginAndSignUp/shopRegister/component/stepOne";
import {
	Row,
	Col,
	Button
} from "antd";
import * as moment from "moment";
import Popup from "../popup";
import Header from "./Header";
import Icon from "./Icon";
import Circle from "./Circle";
import {
	UserShopIndexDataGet,
	UserShopSetEverSignIn
} from "../../services/EzSellerService";
import {
	defaultData,
	orderStatusItems,
	productStatusItems,
	lastDayItems
} from "./common/constant";
import accountInfo from "../../util/accountInfo";
import {
	getProductLink
} from "../../util/url";
import {
	redirect
} from "../../util/history";
import "./index.scss";

const isApproved: boolean = Boolean(accountInfo.shop && accountInfo.shop.isApproved);
let firstSignin: boolean = Boolean(accountInfo.shop && accountInfo.shop.firstSignin);

interface ApprovedShopState {
	data: UserShopIndexDataGet;
	visible: boolean;
}

class ApprovedShop extends React.Component<{}, ApprovedShopState> {
	state: ApprovedShopState = {
		data: defaultData,
		visible: firstSignin
	};

	componentDidMount() {
		this.getData();
	}
	getCorrectTitle(title: string, length: number): string {
		return title.length >= length ? title.substr(0, length) + "..." : title;
	}
	getData() {
		UserShopIndexDataGet()
			.then(data => {
				if (data && data.announcements) {
					this.setState({ data });
				} else {
					window.location.href = "/signin.html";
				}
			});
	}
	handleClosePopup() {
		UserShopSetEverSignIn()
			.then(result => {
				if (result && accountInfo.shop) {
					firstSignin = false;
					const expireDate = new Date();
					expireDate.setDate(expireDate.getDate() + 1);
					accountInfo.shop.firstSignin = false;
					Cookies.set("data", accountInfo, { expires: expireDate });
				}
			});
		this.setState({ visible: false });
	}
	render() {
		const {
			data,
			visible
		} = this.state;
		const {
			orderStatus,
			productStatus,
			lastDay,
			announcements,
			productRank,
			lastThirtyDays,
		} = data;

		return (
			<Row className="ApprovedShopWrap">
				<Header lastDay={lastDay}/>
				<section>
					<Col
						span={18}>
						<div
							className="leftColSection">
							<div className="sellerTitle">
								<a
									href="/index.html#/newOrder"
									className="sellerContentTitle">
									我的订单
								</a>
							</div>
							<div className="sellerContent">
								<Row className="sellerContentDetail">
									{
										orderStatusItems.map((item, index) => {
											const data = {
												href: item.href,
												icon: item.icon,
												label: item.label,
												total: orderStatus[item.key]
											};
											if (item.key === "pendingCount") {
												data["overtime"] = orderStatus["overTimeCount"];
											}
											return (
												<Col
													span={6}
													key={index}>
													<Icon {...data}/>
												</Col>
											);
											}
										)
									}
								</Row>
							</div>
						</div>
						<div className="leftColSection">
							<div className="sellerTitle">
								<a
									href="/index.html#/arrangeProduct"
									className="sellerContentTitle">
									我的商品
								</a>
							</div>
							<div className="sellerContent">
								<Row className="sellerContentDetail">
									{
										productStatusItems.map((item, index) =>
											<Col
												span={6}
												key={index}
												className="order">
												<Icon
													href={item.href}
													icon={item.icon}
													label={item.label}
													total={productStatus[item.key]} />
											</Col>)
									}
								</Row>
							</div>
						</div>
						<div
							className="leftColSection">
							<div className="sellerTitle">
								近30天店铺经营情况
							</div>
							<div className="sellerContent">
								<Row>
									{
										lastDayItems.map((item, index) =>
											<Col
												span={8}
												key={index}
												className="salesAmountWrap" >
												<Circle
													total={item.key === "salesAmount" ?
													(lastThirtyDays[item.key] * 1.00).toFixed(2)
													:
													lastThirtyDays[item.key]}
													label={item.label} />
											</Col>
										)
									}
								</Row>
							</div>
						</div>
					</Col>
					<Col
						span={6}>
						<div className="rightColFooter">
							<div className="sellerTitle">
								<span>最新通知</span>
								<a
									onClick={() => redirect("/viewAnnouncement")}
									className="more"> 更多 </a>
							</div>
							<div className="announcementsList">
								{
									announcements.length > 0 ?
									announcements.map((item, index) =>
										<div
											key={index}
											className="announcements"
											onClick={() => redirect(`/notice_detail?announcementId=${item.announcementId}`)}>
											<a>
												{
													this.getCorrectTitle(item.title, 7)
												}
											</a>
											<a>
												{
													moment(item.time * 1000).format("YYYY-MM-DD")
												}
											</a>
										</div>
									)
									:
									<div className="noNews" />
								}
							</div>
						</div>
						<div className="rightColFooter">
							<div
								className="sellerTitle"
								style={{marginTop: "16px"}}>
								七天热销榜
							</div>
							<div className="productRankWrap">
								{
									productRank.length === 0 ?
									<div className="noProduct" />
									:
									<div>
										<div className="productRankTitle">
											<span> 商品 </span>
											<span> 销量 </span>
										</div>
										<div className="announcementsList">
											{
												productRank.map((item, index) =>
													<div
														key={index}
														className="announcements">
														<a href={getProductLink(item.productId)}>
															{this.getCorrectTitle(item.productName, 9)}
														</a>
														<span>
															{item["salesCount"]}
														</span>
													</div>)
											}
										</div>
									</div>
								}
							</div>
						</div>
					</Col>
				</section>
				<Popup
					visible={visible}
					className="homePopup">
					<div className="popupHeader">
						成功!
				</div>
					<div className="popupContent">
						<img src={require("./image/page-1@3x.png")} />
						<div>
							您的店铺已经认证成功
					</div>
						<Button
							type="primary"
							onClick={this.handleClosePopup.bind(this)}>
							进入工作平台
					</Button>
					</div>
				</Popup>
			</Row>);
	}
}

class Home extends React.Component<{}, {}> {
	render() {
		return isApproved ? <ApprovedShop /> : <StepOne />;
	}
}

export default Home;
