import * as React from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import * as moment from "moment";
import { Table, Modal, message, Checkbox, Tooltip, Icon } from "antd";
import {
	getOrderWarehouseLabel,
	getOrderItemTrackStatusLabel,
	isPending,
	isDelivered,
	getProductLink,
	getActiveTagsUrl,
	isWarehouseReceived
} from "../../../common/util";
import { getOriginCode, getText } from "../../../../../util/kit";
import {
	UserOrderRemarkAddNew,
	UserOrderDispatchNew,
	UserOrderTrackUpdateNew,
	Region,
	GetUserOrderShipment,
	AppendUserOrderShipmentNumber,
	NewOrder
} from "../../../../../services/EzSellerService";

import {
	OrderBodyTableProps,
	OrderBodyTableState,
	ModalDataType,
	DeliverGoodsDataType,
	AlterOrderTrackDataType,
	AlterOrderTrackMode
} from "./type";
import MerchantRemark from "../merchantRemark";
import UserRemark from "../userRemark";
import DeliverGoods from "../deliverGoods";
import AlterOrderTrack from "../alterOrderTrack";
import { StockOutIssue } from "../StockOutIssue";
import ActivityCard from "../activityCard";
import "./index.scss";
import { cancelReason } from "../../../common/constant";

const OVER_TIME: any = require("../../../image/overTime.png");
const OVER_TIME_US: any = require("../../../image/overTimeUs.png");
const isCN: boolean = getOriginCode() === "CN";
const isSGOrMYOrKr: boolean =
	getOriginCode() === "MYLocal" || getOriginCode() === "SGLocal" || getOriginCode() === "KR";

const defaultModalData: ModalDataType = {
	type: "",
	visible: false,
	title: "",
	onOk: () => {}
};

@observer
class OrderBodyTable extends React.Component<OrderBodyTableProps, OrderBodyTableState> {
	constructor(props) {
		super(props);
		this.state = {
			modalData: defaultModalData,
			merchantRemarkData: {
				orderNum: "",
				remark: "",
				sellerRemark: []
			},
			deliverGoodsData: {
				orderNum: "",
				provider: localStorage.getItem("provider") || "",
				trackingNum: "",
				warehouse: 0
			},
			alterOrderTrackData: {
				orderNum: "",
				data: [],
				provider: "",
				trackingNum: "",
				mode: "create"
			},
			issueOrderData: {
				orderID: "",
				skuName: "",
				quantity: 0,
				unitPrice: 0
			},
			userRemarkData: [],
			selectAll: false
		};
		this.initModalData = this.initModalData.bind(this);
	}

	componentWillUpdate(nextProps) {
		const { subSelectedRows, updateSubSelectedRows, orderStore } = nextProps;
		const {
			shouldUpdateRowsAndKeys,
			updateShouldUpdateRowsAndKeys,
			newOrderListResult,
			filterData
		} = orderStore;
		const page = filterData.offset / filterData.limit + 1;
		if (shouldUpdateRowsAndKeys) {
			updateShouldUpdateRowsAndKeys(false);
			updateSubSelectedRows([]);
			this.updateSelectAll(false);
		} else {
			const currentPageSelectTotal = subSelectedRows.filter(
				item => item["key"].split("-")[0] === page.toString()
			).length;
			const currentPageIsAllSelect =
				currentPageSelectTotal !== 0 && currentPageSelectTotal === newOrderListResult.data.length;
			this.updateSelectAll(currentPageIsAllSelect);
		}
	}
	initModalData() {
		this.setState({
			modalData: defaultModalData
		});
	}
	onSelectAllChange(e) {
		const { subSelectedRows, updateSubSelectedRows, orderStore } = this.props;
		const { filterData } = orderStore;
		const dataSource = this.getDataSource();
		const page = filterData.offset / filterData.limit + 1;
		const currentPageAllRows = dataSource.reduce(
			(preVal, currentVal) => {
				currentVal.items.forEach((item, index) => {
					const key = `${page}-${currentVal.key}-${index}-${item["orderId"]}`;
					const currentItem = { ...item, key };
					preVal.push(currentItem);
				});
				return preVal;
			},
			[] as any
		);
		const otherSubSelectedRows = subSelectedRows.filter(
			item => !(item["key"].split("-")[0] === page.toString())
		);
		if (e.target.checked) {
			updateSubSelectedRows(otherSubSelectedRows.concat(currentPageAllRows));
		} else {
			updateSubSelectedRows(otherSubSelectedRows);
		}
		this.updateSelectAll(e.target.checked);
	}
	onClickIssueOrder(record) {
		const onOk = () => {
			this.initModalData();
		};
		this.setState({
			modalData: {
				type: "issueOrder",
				visible: true,
				title: getText("issue order"),
				onOk
			},
			issueOrderData: {
				orderID: record.orderId,
				skuName: record.skuName,
				quantity: record.quantity,
				unitPrice: record.unitPrice
			}
		});
	}
	onClickAlterOrderTrack(record, mode: AlterOrderTrackMode) {
		const { setNewOrderListResult } = this.props.orderStore;
		const isCreate = mode === "create";
		const isView = mode === "view";
		const title = isCreate ? "添加运单号" : isView ? "查看运单号" : "修改运单号";
		const isCreateFunction = isCreate
			? {
					// 添加
					fun: () => {
						const { alterOrderTrackData } = this.state;
						const { orderNum, provider, trackingNum } = alterOrderTrackData;
						AppendUserOrderShipmentNumber(orderNum, { provider, trackingNum, trackId: 0 }).then(
							res => {
								if (typeof res === "object") {
									message.error(res["message"]);
								} else {
									setNewOrderListResult();
									message.success(`${title}成功!`);
								}
								this.initModalData();
							}
						);
					}
			}
			: {
					// 编辑
					fun: () => {
						const { alterOrderTrackData } = this.state;
						const { orderNum, data } = alterOrderTrackData;
						UserOrderTrackUpdateNew(orderNum, data).then(result => {
							if (typeof result === "object") {
								message.error(result["message"]);
							} else {
								setNewOrderListResult();
								message.success(`${title}成功!`);
							}
							this.initModalData();
						});
					}
			};
		const onOk = isView ? this.initModalData : isCreateFunction["fun"];
		GetUserOrderShipment(record.orderId).then(res => {
			this.setState({
				modalData: {
					type: "alterOrderTrack",
					visible: true,
					title,
					onOk
				},
				alterOrderTrackData: {
					orderNum: record.orderId,
					provider: "",
					trackingNum: "",
					data: res,
					mode
				}
			});
		});
	}
	onClickUserRemark(record) {
		this.setState({
			modalData: {
				type: "userRemark",
				visible: true,
				title: getText("user_remark"),
				onOk: this.initModalData
			},
			userRemarkData: record.userRemark
		});
	}
	onClickMerchantRemark(record) {
		const { setNewOrderListResult } = this.props.orderStore;
		const onOk = () => {
			const { merchantRemarkData } = this.state;
			const { remark } = merchantRemarkData;
			UserOrderRemarkAddNew(record.orderId, remark).then(result => {
				if (typeof result === "object") {
					message.error(result["message"]);
				} else {
					setNewOrderListResult();
					message.success(getText("Remarks increased success"));
				}
				this.initModalData();
			});
		};
		this.setState({
			modalData: {
				type: "merchantRemark",
				visible: true,
				title: getText("Merchant remark"),
				onOk
			},
			merchantRemarkData: {
				orderNum: record.orderNum,
				remark: "",
				sellerRemark: record.sellerRemark
			}
		});
	}
	onClickDeliverGoods(record) {
		const { setNewOrderListResult } = this.props.orderStore;
		const onOk = () => {
			const { deliverGoodsData } = this.state;
			const { orderNum, provider, trackingNum } = deliverGoodsData;
			localStorage.setItem("provider", provider);
			UserOrderDispatchNew(orderNum, { provider, trackingNum, trackId: 0 }).then(result => {
				if (typeof result === "object") {
					message.error(result["message"]);
				} else {
					setNewOrderListResult();
					message.success(getText("Delivery successful"));
				}
				this.initModalData();
			});
		};
		this.setState({
			modalData: {
				type: "deliverGoods",
				visible: true,
				title: getText("dispatch"),
				onOk
			},
			deliverGoodsData: {
				orderNum: record.orderId,
				provider: localStorage.getItem("provider") || "",
				trackingNum: "",
				warehouse: record.warehouse
			}
		});
	}
	updateRemark(parm: string) {
		const { merchantRemarkData } = this.state;
		const data = Object.assign({}, merchantRemarkData, { remark: parm });
		this.setState({ merchantRemarkData: data });
	}
	updateAlterOrderTrackData(parm: Partial<AlterOrderTrackDataType>) {
		const { alterOrderTrackData } = this.state;
		const data = Object.assign({}, alterOrderTrackData, parm);
		this.setState({ alterOrderTrackData: data });
	}
	updateDeliverGoodsData(parm: Partial<DeliverGoodsDataType>) {
		const { deliverGoodsData } = this.state;
		const data = Object.assign({}, deliverGoodsData, parm);
		this.setState({ deliverGoodsData: data });
	}
	updateSelectAll(parm: boolean) {
		if (parm !== this.state.selectAll) this.setState({ selectAll: parm });
	}
	getTotal(): number {
		const { filterData, newOrderListResult } = this.props.orderStore;
		const { filter } = filterData;
		const { orderItemTrackStatus = -1 } = filter;
		return orderItemTrackStatus && filter.orderItemTrackStatus
			? newOrderListResult.orderCount[filter.orderItemTrackStatus]
			: Object.keys(newOrderListResult.orderCount).reduce((preVal, cVal) => {
					preVal += newOrderListResult.orderCount[cVal];
					return preVal;
			}, 0);
	}
	getDataSource() {
		const { newOrderListResult } = this.props.orderStore;
		const allData = newOrderListResult.data;
		const groupData = allData.reduce(
			(preVal, currentVal) => {
				if (preVal.length === 0) {
					preVal[0] = [currentVal];
				} else {
					const preItems = preVal[preVal.length - 1];
					const preItem = preItems[preItems.length - 1];
					if (currentVal.orderGroupNum === preItem.orderGroupNum) {
						preItems.push(currentVal);
					} else {
						preVal[preVal.length] = [currentVal];
					}
				}
				return preVal;
			},
			[] as Array<any>
		);
		return groupData.map((items, index) => ({ key: index, items }));
	}
	getSubRowSelection(key: number, record) {
		const { subSelectedRows, updateSubSelectedRows, orderStore } = this.props;
		const { filterData, newOrderListResult } = orderStore;
		const page = filterData.offset / filterData.limit + 1;
		const currentPageSelectTotal = subSelectedRows.filter(
			item => item["key"].split("-")[0] === page.toString()
		).length;
		const currentPageIsAllSelect = currentPageSelectTotal === newOrderListResult.data.length;
		const subSelectedRowKeys = subSelectedRows.map(item => item["key"]);
		return {
			selectedRowKeys: subSelectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				const otherSubSelectedRows = subSelectedRows.filter(
					item =>
						!(
							item["key"].split("-")[0] === page.toString() &&
							item["key"].split("-")[1] === key.toString()
						)
				);
				const currentSelectedRows = selectedRows.filter(
					item =>
						item["key"].split("-")[0] === page.toString() &&
						item["key"].split("-")[1] === key.toString()
				);
				updateSubSelectedRows(otherSubSelectedRows.concat(currentSelectedRows));
				if (currentPageIsAllSelect) {
					this.updateSelectAll(true);
				}
			}
		};
	}
	isPending(): boolean {
		const { filter } = this.props.orderStore.filterData;
		return filter.orderItemTrackStatus === 1003000;
	}
	isDispatched(): boolean {
		const { filter } = this.props.orderStore.filterData;
		return filter.orderItemTrackStatus === 1004000;
	}

	showIssueAction = (record: NewOrder) => {
		if (record.ticketId) {
			return (
				<a href={`/ticket.html#/detail/${record.ticketId}`} target="_blank">
					查看问题件登记
				</a>
			);
		} else {
			return (
				<div>
					{this.props.orderStore.messageBack.includes(record.orderId) && <span className="taged" />}
					<a onClick={() => this.onClickIssueOrder(record)}>{getText("issue order")}</a>
				</div>
			);
		}
	};

	render() {
		const {
			isLoadingData,
			setFilterData,
			filterData,
			expandedRowKeys,
			updateExpandedRowKeys,
		} = this.props.orderStore;
		const {
			modalData,
			merchantRemarkData,
			deliverGoodsData,
			alterOrderTrackData,
			issueOrderData,
			userRemarkData,
			selectAll
		} = this.state;
		const { visible, title, onOk, type } = modalData;
		const page = filterData.offset / filterData.limit + 1;
		const currentExpandedRowKeys = toJS(expandedRowKeys);
		const { orderItemTrackStatus } = filterData.filter;
		const dataSource = this.getDataSource();
		const subColumns = [
			{
				title: getText("production"),
				dataIndex: "product",
				key: "product",
				width: this.isPending() ? "40%" : "29.1%",
				render: (text, record) => (
					<div className="productTr">
						<span className="imageWrap">
							<img src={record.productImg} />
						</span>
						<span>
							<div className="orderId">
								{" "}
								{getText("order_number")}:
								{record.cusRegion ? <span> {Region[record.cusRegion]} </span> : null}
							</div>
							<div> {record.orderNum} </div>
							<div>
								{" "}
								{getText("sku_id")}: {record.sellerSkuId}{" "}
							</div>
							<div className="productName">
								{" "}
								<a target="_blank" href={getProductLink(record.productId)}>
									{" "}
									{record.productName}{" "}
								</a>
							</div>
							<div> {record.skuName} </div>
							<div>
								{" "}
								{record.activity.length > 0 && (
									<ActivityCard text={getActiveTagsUrl(record.activity[0], isCN)} />
								)}{" "}
							</div>
						</span>
					</div>
				)
			},
			{
				title: getText("paid_price"),
				dataIndex: "paidAmount",
				key: "paidAmount",
				width: "5%"
			},
			{
				title: "数量(实收数量)",
				dataIndex: "quantity",
				key: "quantity",
				width: "5%",
				render(text, record) {
					let snippet: any = "";
					switch (orderItemTrackStatus) {
                        case 0:
						case 1006000:
							snippet = <span>{text}(0)</span>;
							break;
						default:
							snippet = (
								<span>
									{text}({record.stockInQty})
								</span>
							);
							break;
					}
					return <span> {snippet} </span>;
				}
			},
			{
				title: getText("warehouse"),
				dataIndex: "warehouse",
				key: "warehouse",
				width: "5%",
				render: text => <p> {getOrderWarehouseLabel(text)} </p>
			},
			{
				title: getText("order_status"),
				dataIndex: "orderStatus",
				key: "orderStatus",
				width: "8.3%",
				render: (text, record) => (
					<p>
						{" "}
						{text === 1000001 && record.reason ? (
							<Tooltip title={cancelReason[record.reason]}>
								<div style={{ position: "relative" }}>
									{getOrderItemTrackStatusLabel(text)}
									<Icon type="exclamation-circle" style={{ position: "absolute", top: "-10px" }} />
								</div>
							</Tooltip>
						) : (
							getOrderItemTrackStatusLabel(text)
						)}{" "}
					</p>
				)
			}
		]
			.concat(
				this.isPending()
					? [
							// 发货截止时间
							{
								title: getText("Delivery deadline"),
								dataIndex: "expectedDispatchAt",
								key: "expectedDispatchAt",
								width: "12.5%",
								render: (text, record) => (
									<div>
										<p> {moment(text * 1000).format("YYYY-MM-DD HH:mm")} </p>
										<p>
											{isPending(record.orderStatus) &&
												text * 1000 < new Date().getTime() &&
												(isCN ? <img src={OVER_TIME} /> : <img src={OVER_TIME_US} />)}
										</p>
									</div>
								)
							}
					]
					: [
							{
								// 订单发货时间
								title: getText("Delivery time"),
								dataIndex: "orderTrack",
								key: "orderTrack",
								width: "12.5%",
								render: (text, record) => (
									<p>
										{" "}
										{record.trackTime &&
											moment(record.trackTime * 1000).format("YYYY-MM-DD HH:mm")}{" "}
									</p>
								)
							}
					]
			)
			.concat(
				this.isPending()
					? []
					: [
							// 运单信息
							{
								title: getText("Waybill information"),
								dataIndex: "orderTrack2",
								key: "orderTrack2",
								width: "12.5%",
								render: (text, record) => (
									<a
										style={{ wordBreak: "break-all" }}
										onClick={() => this.onClickAlterOrderTrack(record, "view")}
									>
										{" "}
										查看物流信息{" "}
									</a>
								)
							}
					]
			)
			.concat(
				this.isPending() || this.isDispatched()
					? []
					: [
							// 可结算时间
							{
								title: getText("Order Payable Date"),
								dataIndex: "billDate",
								key: "billDate",
								width: "8.89%",
								render: text => (
									<p> {text ? moment(text * 1000).format("YYYY-MM-DD HH:mm") : "—"} </p>
								)
							}
					]
			)
			.concat([
				{
					title: getText("operation"),
					dataIndex: "操作",
					key: "操作",
					width: "12.5%",
					render: (text, record) => (
						<div>
							{isPending(record.orderStatus) &&
								!isSGOrMYOrKr && (
									<div>
										<a onClick={() => this.onClickDeliverGoods(record)}>{getText("dispatch")}</a>
									</div>
								)}
							{isDelivered(record.orderStatus) &&
								isCN && (
									<div>
										<a onClick={() => this.onClickAlterOrderTrack(record, "edit")}>
											{getText("Modify the waybill")}
										</a>
									</div>
								)}
							{isWarehouseReceived(record.orderStatus) &&
								isCN && (
									<div>
										<a onClick={() => this.onClickAlterOrderTrack(record, "create")}>
											{getText("Add the waybill")}
										</a>
									</div>
								)}
							<div>
								<a onClick={() => this.onClickUserRemark(record)}>
									{getText("User remark")} ({record.userRemark ? record.userRemark.length : 0})
								</a>
							</div>
							<div>
								<a onClick={() => this.onClickMerchantRemark(record)}>
									{getText("Merchant remark")} ({record.sellerRemark
										? record.sellerRemark.length
										: 0})
								</a>
							</div>
							<div>{isSGOrMYOrKr ? null : this.showIssueAction(record)}</div>
						</div>
					)
				}
			]);
		const columns = [
			{
				title: (
					<div>
						<Checkbox
							checked={selectAll}
							style={{ marginRight: "30px" }}
							onChange={this.onSelectAllChange.bind(this)}
						/>
						{getText("Order group number")}
					</div>
				),
				dataIndex: "orderGroupNum",
				key: "orderGroupNum",
				width: "20%",
				render: (text, record) => <div> {record.items[0].orderGroupNum} </div>
			},
			{
				title: getText("Payment time"),
				dataIndex: "createdAt",
				key: "createdAt",
				width: "80%",
				render: (text, record) => (
					<div> {moment(record.items[0].createdAt * 1000).format("YYYY-MM-DD HH:mm")} </div>
				)
			}
		];
		const pagination = {
			total: this.getTotal(),
			current: filterData.offset / filterData.limit + 1,
			pageSize: filterData.limit,
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: ["10", "20", "40", "60", "80", "100"],
			showTotal: total => `${getText("total")} ${total} ${getText("listing")}`,
			onShowSizeChange: (current, size) => {
				setFilterData({
					offset: 0,
					limit: size
				});
			},
			onChange: page => {
				setFilterData({ offset: (page - 1) * filterData.limit });
			}
		};
		return (
			<div className="orderBodyTable">
				<section>
					<Table
						expandedRowRender={record => (
							<Table
								columns={subColumns}
								dataSource={record.items.map((item, key) => ({
									...item,
									key: `${page}-${record.key}-${key}-${item["orderId"]}`
								}))}
								pagination={false}
								rowSelection={this.getSubRowSelection(record.key, record)}
							/>
						)}
						loading={isLoadingData}
						columns={columns}
						dataSource={dataSource}
						pagination={pagination}
						rowKey={record => record["key"].toString()}
						onExpandedRowsChange={expandedRows =>
							updateExpandedRowKeys(expandedRows as Array<string>)
						}
						expandedRowKeys={
							currentExpandedRowKeys.length > 0
								? currentExpandedRowKeys
								: dataSource.map(item => item.key.toString())
						}
					/>
				</section>
				<footer>
					<Modal
						visible={visible}
						title={title}
						onOk={onOk}
						width="800px"
						style={{ top: "20px" }}
						onCancel={this.initModalData}
					>
						{type === "merchantRemark" && (
							<MerchantRemark
								data={merchantRemarkData}
								updateRemark={this.updateRemark.bind(this)}
							/>
						)}
						{type === "deliverGoods" && (
							<DeliverGoods
								data={deliverGoodsData}
								updateData={this.updateDeliverGoodsData.bind(this)}
							/>
						)}
						{type === "alterOrderTrack" && (
							<AlterOrderTrack
								data={alterOrderTrackData}
								updateData={this.updateAlterOrderTrackData.bind(this)}
							/>
						)}
						{type === "issueOrder" && <StockOutIssue data={issueOrderData} />}
						{type === "userRemark" && <UserRemark data={userRemarkData} />}
					</Modal>
				</footer>
			</div>
		);
	}
}

export default OrderBodyTable;
