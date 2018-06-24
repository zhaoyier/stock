import * as React from "react";
import moment from "moment";
import { Table, InputNumber, Button, Input, Card, message, Tabs } from "antd";
import "./index.scss";
import * as api from "../../../api/order";
import { getText } from "../../../util/kit";
import accountInfo from "../../../util/accountInfo";
import {
	PackageOrderItem
} from "../../../services/EzSellerService";

const TabPane = Tabs.TabPane;

interface IssueOrderProps {
	orderNum: string;
	skuItems: PackageOrderItem[];
}
interface IssueOrderState {
	logDataSource: any[];
	skuItems: PackageOrderItem[];
	confirmRegistry: boolean;
	textContent: string;
	editLog: string;
	hasExisted: boolean;
}
class IssueOrder extends React.Component<IssueOrderProps, IssueOrderState> {
	constructor(props) {
		super(props);
		this.confirmRegistry = this.confirmRegistry.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.originSkuItems = [];
	}
	originSkuItems: PackageOrderItem[];
	state: IssueOrderState = {
		logDataSource: [],
		skuItems: this.getSkuItems(),
		confirmRegistry: false,
		textContent: "",
		editLog: "",
		hasExisted: false
	};

	componentDidMount() {
		const {
			orderNum
		} = this.props;
		this.getLog(orderNum);
		this.userOrderHasExisted(orderNum);
	}

	getSkuItems() {
		const { skuItems } = this.props;
		return skuItems.map(item => ({...item, quantity: 0, originQuantity: item.quantity}));
	}
	userOrderHasExisted(orderNum) {
		const baseInfo = {
			orderNum: orderNum,
			msgType: 1
		};
		api.userOrderHasExisted(baseInfo, (msg) => {
			if (msg !== "null") {
				// remove this -> [""]
				msg = msg.substr(2, msg.length - 4);
				this.setState({
					hasExisted: true
				});
			}
			this.setState({
				editLog: msg
			});
		});
	}

	getLog(orderNum) {
		api.snapshootOfEzseller(orderNum, (res) => {
			let msg = JSON.parse(res);
			msg = msg ? msg : {};
			this.setState({
				logDataSource: msg.snapshoot
			});
		});
	}

	userOrderStockout(orderNum, skuItems) {
		const baseInfo = {
			orderNum: orderNum,
			msgType: 1
		};
		api.userOrderStockout(baseInfo, skuItems, (msg) => {
			if (msg === "true") {
				message.success(getText("add_success"));
				this.getLog(orderNum);
			}
			this.setState({
				confirmRegistry: true
			});
		});
	}

	confirmRegistry() {
		const { orderNum } = this.props;
		const { skuItems } = this.state;
		if (skuItems.some(item => skuItems.filter(s => s.orderNumber === item.orderNumber).every(item => item.quantity === 0))) {
			message.error("Out of stock quantity must > 0 !");
			return;
		}
		this.userOrderStockout(orderNum, skuItems);
	}

	sendMessage() {
		const {
			orderNum
		} = this.props;
		this.getLog(orderNum);
		const body = {
			content: this.state.textContent,
			info: { orderNum: this.props.orderNum, msgType: 1 }
		};
		if (this.state.textContent.replace(/(^\s*)|(\s*$)/g, "") === "") {
			message.warn(getText("Empty message cannot be sent"));
			this.setState({
				textContent: ""
			});
			return;
		}
		api.sendFromEzseller(body, (msg) => {
			if (msg === "false") {
				if (this.state.hasExisted) {
					message.warn(getText("Order has be closed"));
				} else {
					message.warn(getText("Please submit order issues before sending a message"));
				}
			}
			if (msg === "true") {
				message.success(getText("add_success"));
				this.setState({
					textContent: ""
				});
				this.getLog(orderNum);
			}
		});
	}

	render() {
		const stockDataSource = this.state.skuItems;

		const stockColumns = [{
			title: getText("order_number"),
			dataIndex: "orderNumber",
			key: "orderNumber",
		}, {
			title: getText("Product Name"),
			dataIndex: "productName",
			key: "productName",
		}, {
			title: getText("sku_id"),
			dataIndex: "sellerSkuId",
			key: "sellerSkuId",
		}, {
			title: getText("SKU name"),
			dataIndex: "skuName",
			key: "skuName",
		}, {
			title: getText("Out of stock quantity"),
			dataIndex: "quantity",
			key: "quantity",
			render: (text, record, index) => {
				return (
					<InputNumber disabled={this.state.confirmRegistry} min={0} max={record.originQuantity} value={text} onChange={(value) => {
						value = Number(Number(value).toFixed(0));
						stockDataSource[index].quantity = value;
						this.setState({
							skuItems: stockDataSource,
						});
					}} />
				);
			}
		}];


		const logColumns = [{
			title: getText("Time"),
			dataIndex: "ctime",
			key: "ctime",
			width: 90,
			render: (text) => {
				return (
					<div>
						<span>{moment(text * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>
					</div>
				);
			}
		}, {
			title: getText("User ID"),
			dataIndex: "createBy",
			width: 90,
			key: "createBy",
			render: (text, record) => {
				let name = text;
				if (record.from === "ezbuySupporter") {
					name = "ezbuy";
				}
				return (
					<span>{name}</span>
				);
			}
		}, {
			title: getText("Message"),
			dataIndex: "content",
			key: "content"
		}];
		const pagination = {
			showSizeChanger: true,
			showQuickJumper: true
		};
		return (
			<div style={{ padding: "10px 15px" }}>
				{this.state.editLog !== "null" ? (
					<Card style={{ marginBottom: 15 }}>
						<p dangerouslySetInnerHTML={{ __html: this.state.editLog.replace(/\\n/g, "</br>") }} ></p>
					</Card>
				) : (
						<Table dataSource={stockDataSource} columns={stockColumns} pagination={false} />
					)}
				{(this.state.editLog === "null" && !this.state.confirmRegistry) && (
					<div className="buttonGroupStyle" >
						<Button onClick={this.confirmRegistry}>{getText("Confirm submission")}</Button>
						<p className="tagP">{getText("modification is not allowed afterwards")}</p>
					</div>
				)}
				<div>
					<Input.TextArea value={this.state.textContent} rows={5} onChange={e => {
						let value = e.target.value;
						this.setState({
							textContent: value as string
						});
					}} />
					<div style={{ color: "#eee" }}>
						{accountInfo.shop && accountInfo.shop.originCode === "CN" ? `还可以输入 ${200 - this.state.textContent.length} 字` : `${200 - this.state.textContent.length} words left`}
					</div>
				</div>
				<div className="buttonGroupStyle" >
					<Button onClick={this.sendMessage}>{getText("Send Message")}</Button>
					<p className="tagP">{getText("Message is unable to recall after sent")}</p>
				</div>
				<Table dataSource={this.state.logDataSource} columns={logColumns} pagination={pagination} />
			</div>
		);
	}
}

interface IssueOrdersProps {
	orderItems: PackageOrderItem[];
}

class IssueOrders extends React.Component<IssueOrdersProps, {}> {
	groupDataByOrderNumber() {
		const { orderItems } = this.props;
		const orderNumbers = Array.from(new Set(orderItems.map(item => item.orderNumber)));
		return orderNumbers.map(item => ({
			orderNum: item,
			skuItems: orderItems.filter(order => order.orderNumber === item)
		}));

	}
	render() {
		const groupData = this.groupDataByOrderNumber();

		return (
			<Tabs type="card">
			{
				groupData.map((item, index) =>
					<TabPane tab={item.orderNum} key={index}>
						<IssueOrder {...item}/>
					</TabPane>
				)
			}
			</Tabs>
		);
	}
}

export default IssueOrders;