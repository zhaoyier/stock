import * as React from "react";
import {
	Dropdown,
	Menu,
	Icon,
	Row,
	Col,
	Input,
	DatePicker,
	Select,
	Button,
	Table,
	Modal,
	Form,
	message,
	AutoComplete,
	LocaleProvider
} from "antd";
import zh from "antd/lib/locale-provider/zh_CN";
import { connect } from "react-redux";
import { getDomain } from "../../util/kit";
import { Link } from "react-router";
import "./allOrders.scss";
import { toTimestamp, showTimestamp, getPriceSymbol, getApiPrefix } from "../../util/kit";
import { redirect } from "../../util/history";
import ExpressSelect from "./_widget/expressSelect";
import IssueOrder from "./_widget/issueOrder";
import { SH_ADDRESS_INFO, GZ_ADDRESS_INFO } from "../../constant";
import {
	userOrderList,
	userOrderListExportTask,
	userOrderDetail,
	userOrderCancel,
	userOrderItemList,
	userOrderItemReturnConfirm,
	userOrderRemarkAdd,
	userOrderDispatch,
	userGetProductSimpleinfo,
	allOrderFilter,
	submit,
	getEzsellerNewMessage
} from "../../action/order";
import moment from "moment";
import { locale } from "../../config/locale";
import { changeMenu } from "../../action/common";
import enUS from "antd/lib/locale-provider/en_US";
const Option = Select.Option;
const AutoOption = AutoComplete.Option;
const FormItem = Form.Item;
@connect(state => ({
	orders: state.order.orders,
	allOrderFilter: state.order.allOrderFilter,
	accountInfo: state.common.accountInfo
}))
class AllOrders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			orderItemIds: [],
			title: "",
			orderNum: -1,
			remark: "",
			trackingNum: "",
			entrepot: 1,
			minCreateDate: moment().subtract(31, "day"),
			maxCreateDate: moment(),
			excel: { fileId: "" },
			autoComplete: [],
			timeout: true,
			loading: false,
			messageBack: []
		};
		this.searchProductName = this.searchProductName.bind(this);
		this.selectSearchProductName = this.selectSearchProductName.bind(this);
		this.searchProductLink = this.searchProductLink.bind(this);
		this.selectBillStatus = this.selectBillStatus.bind(this);
	}

	componentWillMount() {
		const { dispatch, accountInfo, allOrderFilter } = this.props;

		dispatch(
			userOrderList(0, 10, allOrderFilter.dataFilter, res => {
				this.getMessage(res);
			})
		);
		dispatch(
			changeMenu({
				main: 0,
				sub: "10"
			})
		);
		this.__ = locale(accountInfo.shop.originCode);
	}

	componentDidMount() {
		// let time = 60
		// setInterval(()=> {
		const { orders } = this.props;
		if (orders.data.length > 0) {
			this.getMessage();
		}
		// }, time * 1000)
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	getMessage(res) {
		let { dispatch, orders } = this.props;
		const filter = {
			orderNums: [],
			sender: 2,
			// sender: 1,
			msgType: 1
		};
		if (res) {
			orders = res;
		}
		const { data = [] } = orders;
		filter.orderNums = data.map(item => {
			return item.orderNum;
		});
		dispatch(
			getEzsellerNewMessage(filter, msg => {
				let res = msg.result ? msg.result : {};
				this.setState(
					{
						messageBack: Object.keys(res)
					},
					this.forceUpdate()
				);
			})
		);
	}
	reloadOrders(filter) {
		const { current, pageSize, dataFilter } = filter;
		const { dispatch } = this.props;
		const offset = (current - 1) * pageSize;
		const limit = pageSize;
		const { minCreateDate, maxCreateDate } = this.state;
		this.setState({
			loading: true
		});
		if (minCreateDate) {
			filter.dataFilter.minCreateDate = minCreateDate.startOf("day").unix();
		} else {
			delete filter.dataFilter.minCreateDate;
		}
		if (maxCreateDate) {
			filter.dataFilter.maxCreateDate = maxCreateDate.endOf("day").unix() - 1;
		} else {
			delete filter.dataFilter.maxCreateDate;
		}
		dispatch(allOrderFilter(filter));
		dispatch(
			userOrderList(offset, limit, dataFilter, res => {
				this.getMessage(res);
				this.setState({
					loading: false
				});
			})
		);
	}

	searchProductName(e) {
		const { dispatch } = this.props;
		setTimeout(() => {
			this.setState({
				timeout: true
			});
		}, 200);
		if (this.state.timeout) {
			if (!e) {
				let filter = this.props.allOrderFilter;
				filter.dataFilter.productId = null;
				dispatch(allOrderFilter(filter));
			}
			dispatch(
				userGetProductSimpleinfo(e, msg => {
					this.setState({
						autoComplete: msg
					});
					let filter = this.props.allOrderFilter;
					filter.dataFilter.productId = parseInt(msg[0].productId);
					dispatch(allOrderFilter(filter));
				})
			);
		}
		this.setState({
			timeout: false
		});
	}

	selectSearchProductName(e) {
		const { dispatch } = this.props;
		let filter = this.props.allOrderFilter;
		filter.dataFilter.productId = parseInt(e);
		dispatch(allOrderFilter(filter));
	}

	searchProductLink(e) {
		const { dispatch } = this.props;
		let filter = this.props.allOrderFilter;
		filter.dataFilter.productUrl = e.target.value;
		dispatch(allOrderFilter(filter));
	}

	selectBillStatus(e) {
		const { dispatch } = this.props;
		let filter = this.props.allOrderFilter;
		filter.current = 1;
		const { current, pageSize, dataFilter } = filter;
		const offset = (current - 1) * pageSize;
		const limit = pageSize;
		filter.dataFilter.billStatus = parseInt(e);
		this.setState({
			loading: true
		});
		dispatch(allOrderFilter(filter));
		dispatch(
			userOrderList(offset, limit, dataFilter, () => {
				this.setState({
					loading: false
				});
			})
		);
	}

	render() {
		const { orders, dispatch, accountInfo } = this.props;
		const {
			orderItemIds,
			title,
			orderNum,
			visible,
			remark,
			trackingNum,
			entrepot,
			minCreateDate,
			maxCreateDate,
			excel
		} = this.state;
		let filter = this.props.allOrderFilter;
		const { current, pageSize } = filter;
		const { data, total } = orders;
		const addressInfo = entrepot == 2 ? GZ_ADDRESS_INFO : SH_ADDRESS_INFO;
		const isCN = this.props.accountInfo.shop.originCode === "CN";
		const getText = this.__;
		const columns = [
			{
				title: (
					<Row>
						<Col span="12">{getText("production")}</Col>
						<Col span="6">{`${getText("paid_price")}(${getPriceSymbol(
							this.props.accountInfo.shop.originCode
						)})`}</Col>
						<Col span="6">{getText("number")}</Col>
					</Row>
				),
				key: "orderNum",
				dataIndex: "orderNum",
				render: (orderNum, record) => {
					let pname = record.productName;
					const url = record.productUrl;
					let columnsToItem = [
						{
							title: getText("product"),
							key: "productName",
							width: 260,
							render: (item, record) => {
								const pattern = /id=(\d*)/i;
								return (
									<p style={{ width: 260, wordBreak: "break-all" }}>
										<span style={{ color: "black" }}>
											<a
												href={
													getDomain(accountInfo.shop.originCode) +
													"/product/" +
													pattern.exec(url)[1] +
													".html"
												}
												target="_blank"
											>
												{pname}
											</a>
										</span>
										<br />
										<span style={{ color: "grey" }}>
											{record.skuName}
											{record.sellerSkuId ? `(${record.sellerSkuId})` : ""}
										</span>
									</p>
								);
							},
							width: "49%"
						},
						{
							title: getText("single_price"),
							key: "itemPaidAmount",
							dataIndex: "itemPaidAmount",
							width: "25%",
							render: text => <span>{Number(text).toFixed(2)}</span>
						},
						{
							title: getText("number"),
							key: "quantity",
							dataIndex: "quantity"
						}
					];
					return (
						<section>
							<p style={{ fontWeight: "bold", color: "#39a30e" }}>
								{getText("order_number")}：{orderNum}
							</p>
							<Table
								showHeader={false}
								columns={columnsToItem}
								dataSource={record.items}
								rowSelection={false}
								pagination={false}
							/>
						</section>
					);
				},
				width: "35%"
			},
			{
				title: getText("product_list_image"),
				key: "primaryImage",
				dataIndex: "primaryImage",
				render: text => (
					<a target="_blank" href={text}>
						<img src={text} style={{ width: 100 }} />
					</a>
				)
			},
			{
				title: getText("order_status"),
				key: "packageState",
				width: 120,
				dataIndex: "packageState",
				render: (status, record) => {
					if (record.packageState === 0) {
						status = record.status;
					}
					const statusArray = [
						"",
						getText("Pending Dispatchment"),
						getText("Dispatched"),
						getText("Received By Warehouse"),
						getText("Dispatched By Warehouse"),
						getText("Cancelled"),
						getText("Arrived At Destination"),
						getText("Pending Delivery"),
						getText("On Delivery"),
						getText("Delivered"),
						getText("Completed")
					];
					return <span>{statusArray[status]}</span>;
				}
			},
			{
				title: getText("order_generated_time"),
				key: "createdAt",
				width: 170,
				dataIndex: "createdAt",
				render: text => showTimestamp(text, "YYYY-MM-DD HH:mm:ss")
			},
			{
				title: getText("order_finished_time"),
				key: "finishedAt",
				width: 150,
				dataIndex: "finishedAt",
				render: text => showTimestamp(text, "YYYY-MM-DD HH:mm:ss")
			},
			{
				title: getText("order_remark"),
				key: "remarks",
				width: 120,
				dataIndex: "remarks",
				render: text => {
					const remarks = (text || []).map((item, index) => {
						let type;
						switch (item.source) {
							case 1:
								type = getText("user_remark");
								break;
							case 2:
								type = getText("order_remark");
								break;
							default:
								type = getText("unknown");
						}
						return (
							<p style={{ marginBottom: 10 }} key={index}>
								<span style={{ fontWeight: "bold" }}>
									{getText("type")}：{type}
								</span>
								<br />
								{getText("content")}：{item.text}
							</p>
						);
					});
					if (remarks && remarks.length > 0) {
						return (
							<a
								onClick={() => {
									Modal.info({
										title: getText("remark"),
										content: remarks,
										okText: "OK"
									});
								}}
							>
								{getText("remark")}({remarks.length})
							</a>
						);
					}
				}
			},
			{
				title: getText("operation"),
				key: "operate",
				width: 100,
				render: (text, record) => {
					return (
						<section>
							{isCN &&
								record.status == 1 && (
									<div>
										<a
											onClick={() => {
												this.setState({
													visible: true,
													orderNum: record.orderNum,
													title: "发货",
													trackingNum: "",
													entrepot: record.warehouse
												});
											}}
										>
											发货
										</a>
									</div>
								)}
							<a
								onClick={() => {
									this.setState({
										visible: true,
										orderNum: record.orderNum,
										title: getText("remark")
									});
								}}
							>
								{getText("add_remark")}
							</a>
							<br />
							{isCN && (
								<Link to={`/order-detail/${record.orderNum}`}>{getText("check_detail")}</Link>
							)}
							<div>
								<div className={this.state.messageBack.includes(record.orderNum) ? "taged" : ""}>
									<a
										onClick={() => {
											this.setState({
												visible: true,
												title: getText("issue order"),
												currentSKUItems: record.items,
												currentOrderNum: record.orderNum
											});
										}}
									>
										{getText("issue order")}
									</a>
								</div>
							</div>
						</section>
					);
				}
			}
		];
		isCN &&
			columns.splice(1, 0, {
				title: getText("paid_price"),
				key: "paidAmount",
				width: 80,
				render: (text, record) => {
					return (
						<section>
							<span style={{ color: "#FF3030" }}>
								{getPriceSymbol(this.props.accountInfo.shop.originCode)}
								{record.paidAmount}
							</span>
							<br />
							<span>
								({getText("including_shipping_fee")}
								{record.shippingFee})
							</span>
						</section>
					);
				}
			});
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 }
		};
		const formContent = () => {
			switch (title) {
				case getText("dispatch"):
					return (
						<Form horizontal>
							<FormItem {...formItemLayout} label={getText("arrival_warehouse")}>
								{addressInfo.title}
							</FormItem>
							<FormItem {...formItemLayout} label={getText("receive_address")}>
								{addressInfo.content}
							</FormItem>
							<FormItem {...formItemLayout} label={getText("receiver")}>
								{addressInfo.receiver}
							</FormItem>
							<FormItem {...formItemLayout} label={getText("phone")}>
								{addressInfo.phone}
							</FormItem>
							<FormItem {...formItemLayout} label={getText("express")}>
								<ExpressSelect
									onChange={v => {
										localStorage.express = v;
									}}
								/>
							</FormItem>
							<FormItem {...formItemLayout} label={getText("express_number")}>
								<Input
									value={trackingNum}
									style={{ width: 200 }}
									onChange={e => {
										this.setState({ trackingNum: e.target.value });
									}}
								/>
							</FormItem>
						</Form>
					);
				case getText("remark"):
					return (
						<Form horizontal>
							<FormItem {...formItemLayout} label={getText("order_number")}>
								{orderNum}
							</FormItem>
							<FormItem {...formItemLayout} label={getText("remark_content")}>
								<Input.TextArea
									row={4}
									onChange={e => {
										this.setState({ remark: e.target.value });
									}}
								/>
							</FormItem>
						</Form>
					);
				case getText("issue order"):
					return (
						<IssueOrder
							visible={this.state.visible}
							skuItems={this.state.currentSKUItems}
							orderNum={this.state.currentOrderNum}
						/>
					);
			}
		};
		const pagination = {
			total,
			pageSize,
			showTotal: total => `${getText("total")} ${total} ${getText("listing")}`,
			showQuickJumper: true,
			showSizeChanger: true,
			current,
			// locale: {
			//   items_per_page: `${getText('items_per_page')}`
			// },
			onChange: current => {
				filter.current = current;
				this.reloadOrders(filter);
			},
			onShowSizeChange: (current, pageSize) => {
				filter.current = current;
				filter.pageSize = pageSize;
				this.reloadOrders(filter);
			}
		};
		const styleLabel = {
			display: "inline-block",
			minWidth: 50,
			marginRight: 10
		};
		const autoCompleteChildren = this.state.autoComplete.map(item => {
			return <AutoOption key={item.productId}>{item.productName}</AutoOption>;
		});

		const isLocal =
			this.props.accountInfo.shop.originCode === "SGLocal" ||
			this.props.accountInfo.shop.originCode === "MYLocal";

		return (
			<LocaleProvider locale={zh}>
				<section className="allOrders">
					<h1>{getText("my_order")}</h1>
					<div style={{ paddingBottom: "10px", paddingTop: "10px" }} className="query">
						<Row>
							{!isLocal && (
								<Col span="6">
									<label style={{ ...styleLabel }}>{getText("warehouse")}</label>
									<Select
										value={filter.dataFilter.warehouse}
										style={{ marginRight: 10, width: 150 }}
										onChange={v => {
											filter.dataFilter.warehouse = v;
											filter.current = 1;
											this.reloadOrders(filter);
										}}
									>
										<Option key={2} value={null}>
											{getText("all")}
										</Option>
										<Option key={0} value={1}>
											{getText("shanghai")}
										</Option>
										<Option key={1} value={2}>
											{getText("dongguan")}
										</Option>
									</Select>
								</Col>
							)}
							<Col span="6">
								<label style={{ ...styleLabel }}>{getText("order_status")}</label>
								<Select
									value={filter.dataFilter.packagestate}
									style={{ marginRight: 10, width: 150 }}
									onChange={v => {
										filter.dataFilter.packagestate = v;
										filter.current = 1;
										this.reloadOrders(filter);
									}}
								>
									<Option key={-1} value={null}>
										{getText("all")}
									</Option>
									<Option key={0} value={1}>
										{getText("Pending Dispatchment")}
									</Option>
									<Option key={1} value={2}>
										{getText("Dispatched")}
									</Option>
									<Option key={2} value={3}>
										{getText("Received By Warehouse")}
									</Option>
									<Option key={3} value={4}>
										{getText("Dispatched By Warehouse")}
									</Option>
									<Option key={4} value={5}>
										{getText("Cancelled")}
									</Option>
									<Option key={5} value={6}>
										{getText("Arrived At Destination")}
									</Option>
									<Option key={6} value={7}>
										{getText("Pending Delivery")}
									</Option>
									<Option key={7} value={8}>
										{getText("On Delivery")}
									</Option>
									<Option key={8} value={9}>
										{getText("Delivered")}
									</Option>
									<Option key={9} value={10}>
										{getText("Completed")}
									</Option>
								</Select>
							</Col>
							{isCN && (
								<Col span="6">
									<label style={{ ...styleLabel }}>{getText("order_type")}</label>
									<Select
										value={filter.dataFilter.sellType}
										style={{ marginRight: 10, width: 150 }}
										onChange={v => {
											filter.dataFilter.sellType = v;
											this.reloadOrders(filter);
										}}
									>
										<Option key={2} value={null}>
											{getText("all")}
										</Option>
										<Option key={0} value={1}>
											{getText("common_order")}
										</Option>
										<Option key={1} value={2}>
											{getText("follow_order")}
										</Option>
									</Select>
								</Col>
							)}
							<Col span="6">
								<label style={{ ...styleLabel }}>{getText("order_number")}</label>
								<Input
									value={filter.dataFilter.orderNum}
									style={{ width: 148, marginRight: 10 }}
									onChange={e => {
										filter.dataFilter.orderNum = e.target.value;
										dispatch(allOrderFilter(filter));
									}}
								/>
							</Col>
						</Row>
						<Row style={{ marginTop: 10 }}>
							<Col span="12">
								<label style={{ ...styleLabel }}>{getText("Product Name")}</label>
								<AutoComplete
									placeholder={getText(
										"Please enter the complete product name or choose the name in the list"
									)}
									filterOption={false}
									allowClear={true}
									style={{ minWidth: 430 }}
									onChange={this.searchProductName}
									onSelect={this.selectSearchProductName}
								>
									{autoCompleteChildren}
								</AutoComplete>
							</Col>
							<Col span="6">
								<label style={{ ...styleLabel }}>{getText("Product Link")}</label>
								<Input
									value={filter.dataFilter.productUrl}
									style={{ width: 150 }}
									onChange={this.searchProductLink}
								/>
							</Col>
							<Col>
								<label style={{ ...styleLabel }}>{getText("Pay Status")}</label>
								<Select
									placeholder={getText("Please Choose")}
									onSelect={this.selectBillStatus}
									style={{ width: 150 }}
								>
									<Option value="1">{getText("Order Processing")}</Option>
									<Option value="2">{getText("Payable")}</Option>
									<Option value="3">{getText("Paid")}</Option>
								</Select>
							</Col>
						</Row>
						<Row>
							<Col style={{ display: "inline-block", marginTop: 10 }}>
								<label style={{ ...styleLabel }}>{getText("generated_time")}</label>
								<DatePicker
									locale={enUS}
									value={minCreateDate}
									onChange={(date, dateString) => {
										if (Date.parse(dateString) > Date.parse(new Date())) {
											message.info(getText("start_date_no_larger_than_today"));
										} else {
											this.setState({
												minCreateDate: date
											});
										}
									}}
								/>~
								<DatePicker
									locale={enUS}
									value={maxCreateDate}
									onChange={(date, dateString) => {
										if (Date.parse(dateString) < minCreateDate.unix() * 1000) {
											message.info(getText("end_date_no_smaller_than_start_date"));
										} else if (Date.parse(dateString) - minCreateDate.unix() * 1000 > 2678400000) {
											message.info(getText("time_period_no_larger_than_thirty_one_day"));
										} else {
											this.setState({
												maxCreateDate: date
											});
										}
									}}
								/>
							</Col>
						</Row>
						<hr
							style={{ display: "block", marginTop: 10, height: 1, background: "#eee", border: 0 }}
						/>
						<Row style={{ marginTop: 10 }}>
							<Col span="12">
								<Button
									style={{ marginLeft: 10, marginRight: 20 }}
									onClick={() => {
										if (maxCreateDate.unix() - minCreateDate.unix() > 32 * 24 * 60 * 60) {
											message.info(getText("time_period_no_larger_than_thirty_one_day"));
										} else {
											if (minCreateDate) {
												filter.dataFilter.minCreateDate = minCreateDate.startOf("day").unix();
											} else {
												delete filter.dataFilter.minCreateDate;
											}
											if (maxCreateDate) {
												filter.dataFilter.maxCreateDate = maxCreateDate.endOf("day").unix() - 1;
											} else {
												delete filter.dataFilter.maxCreateDate;
											}
											dispatch(userOrderListExportTask(filter.dataFilter, isCN ? 1 : 2));
										}
									}}
								>
									{getText("generate_excel")}
								</Button>
								<Button
									onClick={() => {
										filter.current = 1;
										this.reloadOrders(filter);
									}}
								>
									{getText("confirm")}
								</Button>
							</Col>
						</Row>
					</div>
					<div className="orderDetail">
						<Table
							loading={this.state.loading}
							bordered
							dataSource={data}
							columns={columns}
							rowKey={row => row.orderNum}
							pagination={pagination}
						/>
					</div>
					<Modal
						visible={visible}
						title={title}
						onOk={() => {
							switch (title) {
								case getText("dispatch"):
									if (!localStorage.express) {
										warn(getText("please_fill_in_express"));
										return;
									}
									if (!trackingNum) {
										warn(getText("please_fill_in_express_number"));
										return;
									}
									dispatch(
										userOrderDispatch(
											orderNum,
											{
												provider: localStorage.express,
												trackingNum
											},
											() => {
												this.reloadOrders(filter);
												this.setState({ visible: false });
											}
										)
									);
									break;
								case getText("remark"):
									if (!remark) {
										return warn(getText("please_fill_in_remark"));
									}
									this.setState({
										visible: false
									});
									dispatch(
										userOrderRemarkAdd(orderNum, remark, () => {
											this.reloadOrders(filter);
										})
									);
									break;
								case getText("issue order"):
									this.setState({ visible: false });
									break;
							}
						}}
						onCancel={() => {
							this.setState({ visible: false });
						}}
					>
						{formContent()}
					</Modal>
				</section>
			</LocaleProvider>
		);
	}
}
export default AllOrders;
