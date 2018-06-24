import {
	OrderWarehouse,
	OrderItemRemark,
	NewOrder
} from "../../../../../services/EzSellerService";
import OrderStore from "../../../store/order";
import { IssueOrderInfo } from "../StockOutIssue";

type ModalType = "" | "deliverGoods" | "merchantRemark" | "alterOrderTrack" | "issueOrder" | "userRemark";

export type AlterOrderTrackMode = "create" | "view" | "edit";


export interface ModalDataType {
	type: ModalType;
	visible: boolean;
	title: string;
	onOk: any;
}

export interface DeliverGoodsDataType {
	orderNum: string;
	provider: string;
	trackingNum: string;
	warehouse: OrderWarehouse;
}

export interface AlterOrderTrackDataType {
	orderNum: string;
	data: Array<any>;
	provider: string;
	trackingNum: string;
	mode: AlterOrderTrackMode;
}

export interface OrderBodyTableProps {
	orderStore: OrderStore;
	subSelectedRows: Array<NewOrder>;
	updateSubSelectedRows: Function;
}

export interface OrderBodyTableState {
	modalData: ModalDataType;
	merchantRemarkData: {
		orderNum: string;
		remark: string;
		sellerRemark: Array<OrderItemRemark>;
	};
	deliverGoodsData: DeliverGoodsDataType;
	alterOrderTrackData: AlterOrderTrackDataType;
	issueOrderData: IssueOrderInfo;
	userRemarkData: Array<OrderItemRemark>;
	selectAll: boolean;
}
