/**
 * This file is auto-generated by protobufgen
 * Don't change manually
 */

import { Empty as CommonEmpty } from "../common/empty";
import webapi from "../webapi";

export enum TicketStatus {
	TicketStatusUnknown = "TicketStatusUnknown",
	TicketStatusPending = "TicketStatusPending",
	TicketStatusWaitFor = "TicketStatusWaitFor",
	TicketStatusReplied = "TicketStatusReplied",
	TicketStatusFinished = "TicketStatusFinished",
}



export interface UserTicketListFilter {
	/**
	 * @pattern ^\d+$
	 */
	ticketId: string;
	orderItemNum: string;
	status: TicketStatus;
	/**
	 * @pattern ^\d+$
	 */
	createDateFrom: string;
	/**
	 * @pattern ^\d+$
	 */
	createDateTo: string;
	/**
	 * @pattern ^\d+$
	 */
	updateDateFrom: string;
	/**
	 * @pattern ^\d+$
	 */
	updateDateTo: string;
	/**
	 * @pattern ^\d+$
	 */
	finishDateFrom: string;
	/**
	 * @pattern ^\d+$
	 */
	finishDateTo: string;
}

export interface UserTicketListReq {
	filter: UserTicketListFilter;
	/**
	 * @pattern ^\d+$
	 */
	offset: string;
	/**
	 * @pattern ^\d+$
	 */
	limit: string;
}

export interface UserTicketListResp {
	list: TicketItem[];
}

export interface TicketItem {
	/**
	 * @pattern ^\d+$
	 */
	ticketId: string;
	typeName: string;
	orderItemNum: string;
	status: TicketStatus;
	/**
	 * @pattern ^\d+$
	 */
	createDate: string;
	/**
	 * @pattern ^\d+$
	 */
	updateDate: string;
	/**
	 * @pattern ^\d+$
	 */
	finishDate: string;
}

export interface UserTicketDetailReq {
	/**
	 * @pattern ^\d+$
	 */
	ticketId: string;
}

export interface UserTicketDetailResp {
	ticket: TicketItem;
	sku: TicketSku;
}

export interface TicketSku {
	productName: string;
	skuName: string;
	/**
	 * @pattern ^\d+$
	 */
	qty: string;
	/**
	 * @pattern ^\d+$
	 */
	price: string;
	/**
	 * @pattern ^\d+$
	 */
	errQty: string;
}

export interface UserTicketRepliesReq {
	/**
	 * @pattern ^\d+$
	 */
	ticketId: string;
}

export interface UserTicketRepliesResp {
	replies: TicketReply[];
}

export interface TicketReply {
	/**
	 * @pattern ^\d+$
	 */
	createDate: string;
	username: string;
	replyContext: string;
	isReplyContextLocal: boolean;
}

export interface UserTicketReplyReq {
	/**
	 * @pattern ^\d+$
	 */
	ticketId: string;
	replyContext: string;
	isReplyContextLocal: boolean;
}

export interface UserTicketStockOutReq {
	/**
	 * @pattern ^\d+$
	 */
	orderItemId: string;
	/**
	 * @pattern ^\d+$
	 */
	qty: string;
	remark: string;
	isRemarkLocal: boolean;
}

export interface Reply {
	content: string;
	isContentLocal: boolean;
	replyBy: string;
}

export interface GetShopIdByShopNameReq {
	shopName: string;
}

export interface GetShopIdByShopNameResp {
	/**
	 * @pattern ^\d+$
	 */
	shopId: string;
}

export interface MultiGetStockOutTicketReq {
	/**
	 * @pattern ^\d+$
	 */
	orderItemIds: string[];
}

export interface MultiGetStockOutTicketResp {
	/**
	 * @pattern ^\d+$
	 */
	ticketIds: string[];
}



export function UserTicketList(payload: Partial<UserTicketListReq>) {
	return webapi<UserTicketListResp>("ezseller.Ticket/UserTicketList", payload);
}

export function UserTicketDetail(payload: Partial<UserTicketDetailReq>) {
	return webapi<UserTicketDetailResp>("ezseller.Ticket/UserTicketDetail", payload);
}

export function UserTicketReplies(payload: Partial<UserTicketRepliesReq>) {
	return webapi<UserTicketRepliesResp>("ezseller.Ticket/UserTicketReplies", payload);
}

export function UserTicketReply(payload: Partial<UserTicketReplyReq>) {
	return webapi<CommonEmpty>("ezseller.Ticket/UserTicketReply", payload);
}

export function UserTicketStockOut(payload: Partial<UserTicketStockOutReq>) {
	return webapi<CommonEmpty>("ezseller.Ticket/UserTicketStockOut", payload);
}

export function MultiGetStockOutTicket(payload: Partial<MultiGetStockOutTicketReq>) {
	return webapi<MultiGetStockOutTicketResp>("ezseller.Ticket/MultiGetStockOutTicket", payload);
}

export function GetShopIdByShopName(payload: Partial<GetShopIdByShopNameReq>) {
	return webapi<GetShopIdByShopNameResp>("ezseller.Ticket/GetShopIdByShopName", payload);
}


export default {
	UserTicketList,
	UserTicketDetail,
	UserTicketReplies,
	UserTicketReply,
	UserTicketStockOut,
	MultiGetStockOutTicket,
	GetShopIdByShopName,
};