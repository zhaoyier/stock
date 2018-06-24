import * as React from "react";
import {
	Table,
	message,
	Button,
	Input,
	Card,
	InputNumber
} from "antd";
import * as moment from "moment";
import {
	SnapshootOfEzsellerTmp,
	Chatlog,
	UserOrderHasExistedTmp,
	UserOrderStockoutTmp,
	SendFromEzsellerTmp
} from "../../../../../services/EzSellerService";
import { getText } from "../../../../../util/kit";
import "./index.scss";

interface DataType {
	orderNum: string;
	skuName: string;
	quantity: number;
	unitPrice: number;
}

interface IssueOrderProps {
	data: DataType;
}

interface IssueOrderState {
	snapshoot: Array<Chatlog>;
	orderHasExisted: string[] | null;
	confirmRegistry: boolean;
	textContent: string;
	data: DataType;
}

class IssueOrder extends React.Component<IssueOrderProps, IssueOrderState> {
	state: IssueOrderState = {
		snapshoot: [],
		orderHasExisted: [],
		confirmRegistry: false,
		textContent: "",
		data: {
			orderNum: "",
			skuName: "",
			quantity: 0,
			unitPrice: 0
		}
	};

	componentDidMount() {
		this.getOrderHasExisted();
		this.getSnapshoot();
		this.setData(this.props.data);
	}
	userOrderStockoutTmp() {
		const { data } = this.state;
		if (data.quantity === 0) {
			message.warn(getText("The stock can not be 0"));
			return;
		}
		const baseInfo = {
			orderNum: data.orderNum.toString(),
			msgType: 1
		};
		UserOrderStockoutTmp(baseInfo, [data] as any)
			.then(result => {
				if (result === true) {
					message.success("success!");
					this.getSnapshoot();
				}
				this.setState({
					confirmRegistry: true
				});
			});
	}
	sendMessage() {
		const { textContent, orderHasExisted } = this.state;
		const { orderNum } = this.props.data;
		if (textContent.replace(/(^\s*)|(\s*$)/g, "") === "") {
			message.warn(getText("Empty message cannot be sent"));
			this.setTextContent("");
			return;
		}
		const baseInfo = {
			orderNum: orderNum.toString(),
			msgType: 1
		};
		SendFromEzsellerTmp({ content: textContent, info: baseInfo })
			.then(result => {
				if (!result) {
					if (orderHasExisted) {
						message.warn(getText("Order processing is completed"));
					} else {
						message.warn(getText("Please submit order issues before sending a message"));
					}
				}
				else {
					message.success("success!");
					this.setTextContent("");
					this.getSnapshoot();
				}
			});
	}
	setData(parm: Partial<DataType>) {
		const data = Object.assign({}, this.state.data, parm);
		this.setState({ data });
	}
	setTextContent(parm: string) {
		this.setState({
			textContent: parm
		});
	}
	getSnapshoot() {
		const { data } = this.props;
		SnapshootOfEzsellerTmp(data.orderNum.toString(), 1)
			.then(result => this.setState({ snapshoot: result.snapshoot }));
	}
	getOrderHasExisted() {
		const { orderNum } = this.props.data;
		const baseInfo = {
			orderNum: orderNum.toString(),
			msgType: 1
		};
		UserOrderHasExistedTmp(baseInfo)
			.then(result => this.setState({ orderHasExisted: result }));
	}
	render() {
		const { snapshoot, orderHasExisted, confirmRegistry, textContent, data } = this.state;
		const snapshootColumns = [{
			title: getText("Time"),
			dataIndex: "ctime",
			key: "ctime",
			width: 90,
			render: (text) => <p> {moment(text * 1000).format("YYYY-MM-DD HH:mm:ss")} </p>
		}, {
			title: getText("User ID"),
			dataIndex: "createBy",
			width: 90,
			key: "createBy",
			render: (text, record) => <p> {record.from === "ezbuySupporter" ? "ezbuy" : text} </p>
		}, {
			title: getText("Message"),
			dataIndex: "content",
			key: "content"
		}];
		const snapshootPagination = {
			total: snapshoot.length,
			showSizeChanger: true,
			showQuickJumper: true
		};
		return (
			<div>
				<div>
					{
						orderHasExisted !== null ?
							<Card style={{ marginBottom: 15 }}>
								<p dangerouslySetInnerHTML={{ __html: orderHasExisted.toString().replace(/\\n/g, "</br>") }} ></p>
							</Card>
							:
							<Card style={{ marginBottom: 15 }}>
								<p>
									<label> SKU: {data.skuName} </label>
								</p>
								<p>
									<label> {getText("Out of stock quantity")}:
										<InputNumber
											disabled={confirmRegistry}
											value={data.quantity}
											onChange={val => this.setData({ quantity: Number(val) })} />
									</label>
								</p>
							</Card>
					}
				</div>
				{
					!orderHasExisted && !confirmRegistry &&
					<div className="buttonGroupStyle" >
						<Button onClick={this.userOrderStockoutTmp.bind(this)}>{getText("Confirm submission")}</Button>
						<p className="tagP">{getText("modification is not allowed afterwards")}</p>
					</div>
				}
				<div>
					<Input.TextArea value={textContent} onChange={(e: any) => this.setTextContent(e.target.value)} />
					<div style={{ color: "#eee" }}>
						{`${getText("You can also enter it")} ${200 - textContent.length} .`}
					</div>
				</div>
				<div className="buttonGroupStyle" >
					<Button onClick={this.sendMessage.bind(this)}>{getText("Send Message")}</Button>
					<p className="tagP">{getText("Message is unable to recall after sent")}</p>
				</div>
				<Table
					dataSource={snapshoot}
					columns={snapshootColumns}
					pagination={snapshootPagination}
				/>
			</div>
		);
	}
}

export default IssueOrder;
