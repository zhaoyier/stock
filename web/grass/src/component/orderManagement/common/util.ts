import {
	isUAT,
	getSearchParamValue
} from "../../../util/url";
import {
	OrderItemTrackStatus,
	Activity,
	UserOrderListNewFilter,
} from "../../../services/EzSellerService";
import {
	activeTags,
	orderWarehouseItems,
	OrderItemTrackStatus as OrderItemTrackStatusItems,
} from "./constant";
import * as moment from "moment";

export function getDefaultRangePicker(): [moment.Moment, moment.Moment] {
	const now = new Date();
	const nowTime = now.getTime() - (now.getTime() % 86400000) + 86400000 - 28800000;
	const overTime = (nowTime - 24 * 6 * 60 * 60 * 1000);
	return [moment(overTime), moment(nowTime - 1000)];
}

export function getUnixTime(parm: moment.Moment): number {
	return moment(parm).unix();
}

export function getOrderWarehouseLabel(val: number): string {
	const result = orderWarehouseItems.filter(item => item.val === val);
	return result.length > 0 ? result[0].label : "";
}

export function getOrderItemTrackStatusLabel(val: number): string {
	const result = OrderItemTrackStatusItems.filter(item => item.val === val);
	return result.length > 0 ? result[0].label : "";
}

export function isPending(parm: OrderItemTrackStatus): boolean {
	return parm === 1003000;
}

export function isDelivered(parm: OrderItemTrackStatus): boolean {
	return parm === 1004000;
}

export function isWarehouseReceived(parm: OrderItemTrackStatus): boolean {
	return parm === 1006000;
}

export function getProductLink(productId: number): string {
	if (isUAT()) {
		return `http://sg.65emall.net/product/${productId}.html`;
	}
	return `https://ezbuy.sg/product/${productId}.html`;
}

export function getActiveTagsUrl(parm: Activity, isCN: boolean) {
	return activeTags[parm] ? (isCN ? activeTags[parm]["CN"] : activeTags[parm]["US"]) : "";
}

export function getDefaultFilter(): Partial<UserOrderListNewFilter> {
	const newOrderSearch = location.href.split("newOrder")[1];
	const orderItemTrackStatus: OrderItemTrackStatus = Number(getSearchParamValue("orderItemTrackStatus", newOrderSearch) || 1003000) as OrderItemTrackStatus;
	return ({
		orderItemTrackStatus
	});
}
