import * as React from "react";
import { DatePicker, Button, Table, message } from "antd";
import * as moment from "moment";
import {
	UserShopStatistics,
	UserShopStatisticsReq,
	UserShopStatisticsResp,
} from "../../../services/EzSellerService";
import {
	defaultProductFilter,
	saleItems,
	orderItems
} from "../common/constant";
import {
	getProductLink
} from "../../../util/url";
import {
	getText
} from "../../../util/kit";
import "./index.scss";

const { RangePicker } = DatePicker;

interface DetailData {
	label: string;
	value: string;
}

interface AllProductState {
	filterData: UserShopStatisticsReq;
	resultData: UserShopStatisticsResp | null;
	sortBy: number;
}

class AllProduct extends React.Component<any, AllProductState> {
	state: AllProductState = {
		filterData: defaultProductFilter,
		resultData: null,
		sortBy: 1003
	};

	componentDidMount() {
		this.userShopStatistics();
	}
	setFilterData(parm: Partial<UserShopStatisticsReq>) {
		const { filterData } = this.state;
		const currentFilterData = Object.assign({}, filterData, parm);
		this.setState({ filterData: currentFilterData });
	}
	getCurrentFilterData(): UserShopStatisticsReq {
		const { filterData } = this.state;
		return {
			rangeStart: Math.floor(filterData.rangeStart / 1000),
			rangeEnd: Math.floor(filterData.rangeEnd / 1000) + 24 * 60 * 60
		};
	}
	userShopStatistics() {
		const { rangeStart, rangeEnd } = this.getCurrentFilterData();
		if (rangeEnd - rangeStart > 31 * 24 * 60 * 60) {
			message.warn("Can only choose within one month");
			return;
		}
		UserShopStatistics(this.getCurrentFilterData())
			.then(result => this.setState({ resultData: result }));
	}
	getData(parm: string, defaultValue: any = 0) {
		const { resultData } = this.state;
		if (resultData && resultData[parm]) {
			return resultData[parm];
		}
		return defaultValue;
	}
	redirectSingleProduct(record) {
		const { rangeStart, rangeEnd } = this.state.filterData;
		let url = `productId=${record.productId}&productName=${record.productName}&imageUrl=${record.productImg}&rangeStart=${rangeStart}&rangeEnd=${rangeEnd}`;
		return `/index.html#/singleProduct?${encodeURIComponent(url)}`;
	}
	renderDetailComponent(parm: DetailData[]) {
		return parm.map(item =>
			<div className="detailWrap">
				<div className="label"> {getText(item.label)} </div>
				<div className="value"> {item.label === "revenue" ? parseInt(item.value) / 100 : item.value} </div>
			</div>
		);
	}
	renderTitle(title: string, key: string) {
		const titleObj = {
			addToCartCount: 1001,
			orderTotalCount: 1002,
			vendorOrderAmount: 1003
		};
		return (<span onClick={() => this.setState({ sortBy: titleObj[key] })}>
			{ getText(title) }
			</span>);
	}
	render() {
		const { filterData, sortBy } = this.state;
		const { rangeStart, rangeEnd } = filterData;
		const columns = [
			{
				title: getText("Product Name"),
				dataIndex: "productName",
				key: "productName",
				render: (text, record) => <a href={getProductLink(record.productId)} target="_blank">{text}</a>
			}, {
				title: this.renderTitle("revenue", "vendorOrderAmount"),
				dataIndex: "vendorOrderAmount",
				key: "vendorOrderAmount",
				render: text => <span> {text / 100} </span>,
				sorter: (a, b) => a.vendorOrderAmount - b.vendorOrderAmount,
			}, {
				title: this.renderTitle("order_amount", "orderTotalCount"),
				dataIndex: "orderTotalCount",
				key: "orderTotalCount",
				sorter: (a, b) => a.orderTotalCount - b.orderTotalCount,
			}, {
				title:  this.renderTitle("add-on items number", "addToCartCount"),
				dataIndex: "addToCartCount",
				key: "addToCartCount",
				sorter: (a, b) => a.addToCartCount - b.addToCartCount,
			}, {
				title: getText("Operation"),
				dataIndex: "action",
				key: "action",
				render: (text, record) =>
					<a
						href={this.redirectSingleProduct(record)}
						target="_blank"
						className="actionBtn" >
						{getText("Single product analysis")} </a>
			}
		];

		return (
			<div className="allProductWrap">
				<header>
					<h1> {getText("Product Information Summary")} </h1>
					<div style={{ marginTop: "20px" }}>
						<RangePicker
							defaultValue={[moment(rangeStart), moment(rangeEnd)]}
							onChange={(dates, dateString) => this.setFilterData({
								rangeStart: moment(dateString[0]).unix() * 1000,
								rangeEnd: moment(dateString[1]).unix() * 1000
							})} />
						<Button
							type="primary"
							icon="search"
							style={{ marginLeft: "10px" }}
							onClick={this.userShopStatistics.bind(this)}>
							{getText("search")}
						</Button>
					</div>
				</header>
				<section>
					<div>
						<p className="reportType">
							<span className="greenPoint"></span>
							<span> {getText("conversion-related")} </span>
						</p>
						{
							this.renderDetailComponent([{ label: "add-on items number", value: this.getData("addToCartCount") }])
						}
					</div>
					<div>
						<p className="reportType">
							<span className="greenPoint"></span>
							<span> {getText("sales-related")} </span>
						</p>
						{
							saleItems.map(item =>
								this.renderDetailComponent([{ label: item.val, value: this.getData(item.key) }])
							)
						}
					</div>
					<div>
						<p className="reportType">
							<span> {getText("order distribution details")} </span>
						</p>
						{
							orderItems.map(item =>
								this.renderDetailComponent([{ label: item.val, value: this.getData(item.key) }])
							)
						}
					</div>
					<div>
						<p className="reportType">
							<span className="greenPoint"></span>
							<span> {getText("overview of product ranking")}(TOP10) </span>
						</p>
					</div>
					<div>
						<Table
							columns={columns}
							dataSource={this.getData("productLists") ? this.getData("productLists")[sortBy] : []} />
					</div>
				</section>
			</div>
		);
	}
}

export default AllProduct;
