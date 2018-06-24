import {
	UserShopIndexDataGet
} from "../../../services/EzSellerService";

export const lastThirtyDaysItems = [ {
	label: "销售额 (¥)",
	key: "salesAmount",
}, {
	label: "加购件数",
	key: "AddCartCount",
}, {
	label: "总订单数",
	key: "orderCount",
}, {
	label: "支付买家数",
	key: "paidCount",
}];

/*
{
	label: "超时发货的订单",
	key: "overTimeCount",
	href: "/index.html#/newOrder?orderItemTrackStatus=1003000&overtime=true"
}
*/

export const orderStatusItems = [{
	label: "待发货的订单",
	key: "pendingCount",
	href: "/index.html#/newOrder?orderItemTrackStatus=1003000",
	icon: require("../image/group-47.svg")
}, {
	label: "已发货的订单",
	key: "dispatchedCount",
	href: "/index.html#/newOrder?orderItemTrackStatus=1004000",
	icon: require("../image/group-33.svg")
}, {
	label: "已到转运仓库的订单",
	key: "warehouseRcvdCount",
	href: "/index.html#/newOrder?orderItemTrackStatus=1006000",
	icon: require("../image/order_transport.svg")
}, {
	label: "已到目的地仓库订单",
	key: "pendingSendCount",
	href: "/index.html#/newOrder?orderItemTrackStatus=1016000",
	icon: require("../image/order_destination.svg")
}];

export const productStatusItems = [{
	label: "在售商品",
	key: "onSaleCount",
	href: "/index.html#/arrangeProduct?isOnSale=true",
	icon: require("../image/product_online.svg")
}, {
	label: "下架商品",
	key: "offSaleCount",
	href: "/index.html#/arrangeProduct?isOnSale=false",
	icon: require("../image/product_offline.svg")
}];

export const lastDayItems = [{
	label: "销售额 (¥)",
	key: "salesAmount",
}, {
	label: "总订单数",
	key: "orderCount",
}, {
	label: "支付买家数",
	key: "paidCount",
}];

export const defaultData: UserShopIndexDataGet = {
	lastThirtyDays: {
		AddCartCount: 0,
		orderCount: 0,
		paidCount: 0,
		salesAmount: 0
	},
	lastDay: {
		AddCartCount: 0,
		orderCount: 0,
		paidCount: 0,
		salesAmount: 0
	},
	orderStatus: {
		pendingCount: 0,
		overTimeCount: 0,
		dispatchedCount: 0,
		warehouseRcvdCount: 0,
		pendingSendCount: 0,
	},
	productStatus: {
		onSaleCount: 0,
		offSaleCount: 0
	},
	announcements: [],
	productRank: []
};
