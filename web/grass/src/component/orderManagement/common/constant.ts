import {
	UserOrderListNewFilter
} from "../../../services/EzSellerService";
import {
	getText,
	getOriginCode
} from "../../../util/kit";

const isSGLocalOrMYLocal: boolean = getOriginCode() === "MYLocal" || getOriginCode() === "SGLocal";

export const defaultFormat = "YYYY-MM-DD HH:mm";

export const formItemLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 17 }
};

export const activeTags = {
	1: {
		"CN": "闪购",
		"US": "FlashDeal"
	},
	2: {
		"CN": "满减",
		"US": "CashOff"
	},
	3: {
		"CN": "FriendsDeal",
		"US": "拼团"
	},
	4: {
		"CN": "包邮",
		"US": "FreeShipping"
	},
	5: {
		"CN": "满件减",
		"US": "MNCashOff"
	}
};

export const exportToShippingOrderItems = [
	{
		label: getText("All orders"),
		val: 0
	}, {
		label: getText("Selected order"),
		val: -1
	}
];

export const orderHeadTabsOrderSortItems = [
	{
		label: getText("Payment time in reverse order"),
		val: "2"
	}, {
		label: getText("Payment time is sorted in positive order"),
		val: "1"
	}
];

export const orderBodyTablePrintItems = [
	{
		key: 1,
		val: "50mm*25mm"
	}, {
		key: 2,
		val: "60mm*40mm"
	}, {
		key: 3,
		val: "100mm*100mm"
	}
];

export const orderWarehouseItems = [
	{
		label: getText("all"),
		val: 0
	}, {
		label: getText("shanghai"),
		val: 1
	}, {
		label: getText("dongguan"),
		val: 2
	}
];

export const OrderItemTrackStatus = [
	{
		label: getText("all"),
		val: 0
	}, {
		label: getText("Pending Dispatchment"),
		val: 1003000
	}, {
		label: getText("Dispatched"),
		val: 1004000
	}].concat(isSGLocalOrMYLocal ? [] :
		[{
			label: getText("Arrived At Transfer"),
			val: 1006000
		}]
	).concat(
	[{
		label: getText("Arrived At Destination"),
		val: 1016000
	}, {
		label: getText("Received"),
		val: 1009000
	}, {
		label: getText("Completed"),
		val: 1021000
	}, {
		label: getText("Cancelled"),
		val: 1000001
	}]);

export interface FilterDataType {
	offset: number;
	limit: number;
	filter: UserOrderListNewFilter;
}

export const cancelReason = {
	301: "卖家缺货／虚假或超时发货",
	302: "卖家错漏发",
	303: "商品破损/质量问题/物流问题-卖家原因",
	304: "商品破损/丢失-ezbuy 物流/仓库原因",
	305: "仓库其他售后问题",
	306: "顾客原因退单",
	307: "禁运商品"
};
