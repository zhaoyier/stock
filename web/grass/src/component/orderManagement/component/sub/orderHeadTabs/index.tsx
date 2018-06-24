import * as React from "react";
import { observer } from "mobx-react";
import {
	Select,
	message,
	Upload,
	Button
} from "antd";
import {
	orderBodyTablePrintItems,
	OrderItemTrackStatus,
	orderHeadTabsOrderSortItems,
	exportToShippingOrderItems
} from "../../../common/constant";
import {
	getOrderWarehouseLabel
} from "../../../common/util";
import {
	injectPrintScript,
	previewSellerOrderHorizontal,
	previewSellerOrderVertical,
	previewSellerOrder100
} from "../../../../../util/print/SellerPrint";
import OrderStore from "../../../store/order";
import { getOriginCode, getText } from "../../../../../util/kit";
import { redirect } from "../../../../../util/history";
import {
	UserOrderItemGroupNewExportTask,
	UserOrderListNewExportTask,
	UserOrderDispatchNewImportTask,
	NewOrder
} from "../../../../../services/EzSellerService";
import { getToken } from "../../../../../api/other";
import { QINIU_UPLOAD_URL } from "../../../../../constant/index";
import "./index.scss";

const Option = Select.Option;
const isCN: boolean = getOriginCode() === "CN";
const isUS: boolean = getOriginCode() === "US";

interface OrderHeadTabsProps {
	orderStore: OrderStore;
	subSelectedRows: Array<NewOrder>;
}

interface OrderHeadTabsState {
	token: any;
}

@observer
class OrderHeadTabs extends React.Component<OrderHeadTabsProps, OrderHeadTabsState> {
	state: OrderHeadTabsState = {
		token: null
	};

	componentDidMount() {
		injectPrintScript();
		this.getTokenData();
	}
	getTokenData() {
		getToken(info => {
			this.setState({
				token: info.token
			});
		});
	}
	getOrderCount(parm) {
		const { newOrderListResult } = this.props.orderStore;
		const { orderCount } = newOrderListResult;
		if (parm === 0) {
			return Object.keys(orderCount).reduce((pre, current) => {
				pre += orderCount[current];
				return pre;
			}, 0);
		}
		else if (orderCount.hasOwnProperty(parm)) {
			return orderCount[parm];
		}
		return "";
	}
	isPending(): boolean {
		const { filter } = this.props.orderStore.filterData;
		return filter.orderItemTrackStatus === 1003000;
	}
	onExportToShippingOrderChange(val) {
		const { subSelectedRows, orderStore } = this.props;
		const { filterData } = orderStore;
		const subSelectedRowKeys = subSelectedRows.map(item => item["key"]);
		const originCode = getOriginCode();
		const exportTask = this.isPending() ? UserOrderItemGroupNewExportTask : UserOrderListNewExportTask;
		if (val !== -1) {
			const currentFilter = Object.assign({}, filterData.filter);
			exportTask(currentFilter, originCode === "CN" ? 1 : 2)
				.then(result => redirect(`/exportTask?taskId=${result.id}`));
		} else {
			if (subSelectedRows.length === 0) {
				message.warn(getText("Please check the order first"));
				return;
			}
			const orderNumList = subSelectedRowKeys.map(item => item.split("-")[3]);
			exportTask({ orderNumList }, originCode === "CN" ? 1 : 2)
				.then(result => redirect(`/exportTask?taskId=${result.id}`));
		}
	}
	onSelectPrintChange(val) {
		const { subSelectedRows } = this.props;
		if (subSelectedRows.length === 0) {
			message.warn(getText("Please check the order first"));
			return;
		}
		const type = subSelectedRows.length === 1 ? 0 : 1;
		subSelectedRows.forEach(order => {
			const orderWarehouse = getOrderWarehouseLabel(order.warehouse);
			if (val === "50mm*25mm") {
				previewSellerOrderHorizontal(order, orderWarehouse, type);
			} else if (val === "60mm*40mm") {
				previewSellerOrderVertical(order, orderWarehouse, type);
			} else {
				previewSellerOrder100(order, orderWarehouse, type);
			}
		});
	}
	render() {
		const { filterData, setFilterData } = this.props.orderStore;
		const { token } = this.state;
		const { filter } = filterData;
		const { orderItemTrackStatus = -1, orderItemSortBy } = filter;
		const uploadProps = {
			name: "file",
			action: QINIU_UPLOAD_URL,
			data: { token },
			accept: ".xlsx",
			onChange: info => {
				if (info.file.status === "done") {
					UserOrderDispatchNewImportTask(info.file.response.key)
						.then(result => redirect(`/importTask?id=${result.id}`));
				}
				else if (info.file.status === "error") {
					message.warn(`${info.file.name} ${getText("upload_fail")}`);
				}
			}
		};

		return (
			<div className="orderHeadTabs">
				<div>
					<span>{getText("order_status")}</span>
					{
						OrderItemTrackStatus.map((item, index) =>
							<a
								className={orderItemTrackStatus === item.val ? "spanTab spanTabHover" : "spanTab"}
								onClick={() => {
									const filter = Object.assign({}, filterData.filter, { orderItemTrackStatus: item.val });
									setFilterData({ filter });
								}}>
								{item.label} ({this.getOrderCount(item.val) || 0})
						</a>
						)
					}
				</div>
				<div className="header">
					<Select
						className="sortSelect"
						placeholder={getText("Export orders")}
						onSelect={this.onExportToShippingOrderChange.bind(this)}>
						{
							exportToShippingOrderItems.map((item, index) =>
								<Option key={index} value={item.val}> {item.label} </Option>
							)
						}
					</Select>
					{
						(isCN || isUS) &&
						<Select
							className="printSelect"
							placeholder={getText("Batch print order bar code")}
							onSelect={this.onSelectPrintChange.bind(this)}>
							{
								orderBodyTablePrintItems.map((item, index) =>
									<Option key={index} value={item.val}> {item.val} </Option>
								)
							}
						</Select>
					}
					<Select
						placeholder={getText("Sort Order")}
						value={orderItemSortBy ? orderItemSortBy.toString() : undefined}
						onChange={val => {
							const filter = Object.assign({}, filterData.filter, { orderItemSortBy: Number(val) });
							setFilterData({ filter });
						}}
						className="printSelect"
						style={{ minWidth: isCN ? 200 : 270 }}>
						{
							orderHeadTabsOrderSortItems.map((item, index) =>
								<Option value={item.val}> {item.label} </Option>
							)
						}
					</Select>
					{
						this.isPending() && (isCN || isUS) &&
						<Upload
							{...uploadProps}>
							<Button icon="upload" className="printSelect"> {getText("Import the shipping list")} </Button>
						</Upload>
					}
				</div>
			</div>
		);
	}
}

export default OrderHeadTabs;
