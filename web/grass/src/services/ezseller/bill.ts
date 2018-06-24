/**
 * This file is auto-generated by protobufgen
 * Don't change manually
 */

import { Result as EzsellerResult } from "../ezseller/result";
import webapi from "../webapi";

export enum BillServiceFeeRateItemField {
	BillServiceFeeRateItemFieldUnknown = "BillServiceFeeRateItemFieldUnknown",
	BillServiceFeeRateItemFieldIsActive = "BillServiceFeeRateItemFieldIsActive",
	BillServiceFeeRateItemFieldRate = "BillServiceFeeRateItemFieldRate",
	BillServiceFeeRateItemFieldStartAt = "BillServiceFeeRateItemFieldStartAt",
	BillServiceFeeRateItemFieldEndAt = "BillServiceFeeRateItemFieldEndAt",
}


export enum BillServiceLocalDeliveryFeeSettingType {
	BillServiceLocalDeliveryFeeSettingTypeUnknown = "BillServiceLocalDeliveryFeeSettingTypeUnknown",
	BillServiceLocalDeliveryFeeSettingTypeCommon = "BillServiceLocalDeliveryFeeSettingTypeCommon",
	BillServiceLocalDeliveryFeeSettingTypePeriod = "BillServiceLocalDeliveryFeeSettingTypePeriod",
}


export enum BillServiceLocalDeliveryFeeSettingField {
	BillServiceLocalDeliveryFeeSettingFieldUnknown = "BillServiceLocalDeliveryFeeSettingFieldUnknown",
	BillServiceLocalDeliveryFeeSettingFieldFee = "BillServiceLocalDeliveryFeeSettingFieldFee",
	BillServiceLocalDeliveryFeeSettingFieldStartAt = "BillServiceLocalDeliveryFeeSettingFieldStartAt",
	BillServiceLocalDeliveryFeeSettingFieldEndAt = "BillServiceLocalDeliveryFeeSettingFieldEndAt",
	BillServiceLocalDeliveryFeeSettingFieldCancelled = "BillServiceLocalDeliveryFeeSettingFieldCancelled",
}


export enum BillServiceLocalDeliveryFeeSettingStatus {
	BillServiceLocalDeliveryFeeSettingStatusUnknown = "BillServiceLocalDeliveryFeeSettingStatusUnknown",
	BillServiceLocalDeliveryFeeSettingStatusActivated = "BillServiceLocalDeliveryFeeSettingStatusActivated",
	BillServiceLocalDeliveryFeeSettingStatusWaiting = "BillServiceLocalDeliveryFeeSettingStatusWaiting",
	BillServiceLocalDeliveryFeeSettingStatusExpired = "BillServiceLocalDeliveryFeeSettingStatusExpired",
	BillServiceLocalDeliveryFeeSettingStatusCancelled = "BillServiceLocalDeliveryFeeSettingStatusCancelled",
}


export enum BillServiceLocalDeliveryFeeSettingOpType {
	BillServiceLocalDeliveryFeeSettingOpTypeUnknown = "BillServiceLocalDeliveryFeeSettingOpTypeUnknown",
	BillServiceLocalDeliveryFeeSettingOpTypeCCommFee = "BillServiceLocalDeliveryFeeSettingOpTypeCCommFee",
	BillServiceLocalDeliveryFeeSettingOpTypeUCommFee = "BillServiceLocalDeliveryFeeSettingOpTypeUCommFee",
	BillServiceLocalDeliveryFeeSettingOpTypeCPeriodFee = "BillServiceLocalDeliveryFeeSettingOpTypeCPeriodFee",
	BillServiceLocalDeliveryFeeSettingOpTypeUPeriodFee = "BillServiceLocalDeliveryFeeSettingOpTypeUPeriodFee",
	BillServiceLocalDeliveryFeeSettingOpTypeCancelPeriodFee = "BillServiceLocalDeliveryFeeSettingOpTypeCancelPeriodFee",
	BillServiceLocalDeliveryFeeSettingOpTypeTermPeriodFee = "BillServiceLocalDeliveryFeeSettingOpTypeTermPeriodFee",
}


export enum AdjustmentReceiptFeeType {
	AdjustmentReceiptFeeTypeUnknown = "AdjustmentReceiptFeeTypeUnknown",
	AdjustmentReceiptFeeTypeCargo = "AdjustmentReceiptFeeTypeCargo",
	AdjustmentReceiptFeeTypeFreight = "AdjustmentReceiptFeeTypeFreight",
	AdjustmentReceiptFeeTypeTechnology = "AdjustmentReceiptFeeTypeTechnology",
}


export enum AdjustmentReceiptStatus {
	AdjustmentReceiptStatusUnknown = "AdjustmentReceiptStatusUnknown",
	AdjustmentReceiptStatusSettled = "AdjustmentReceiptStatusSettled",
	AdjustmentReceiptStatusCancel = "AdjustmentReceiptStatusCancel",
	AdjustmentReceiptStatusUnsettle = "AdjustmentReceiptStatusUnsettle",
}


export enum AdjustmentReceiptReason {
	AdjustmentReceiptReasonUnknown = "AdjustmentReceiptReasonUnknown",
	AdjustmentReceiptReasonComplete = "AdjustmentReceiptReasonComplete",
	AdjustmentReceiptReasonShip = "AdjustmentReceiptReasonShip",
	AdjustmentReceiptReasonAfterSales = "AdjustmentReceiptReasonAfterSales",
	AdjustmentReceiptReasonOther = "AdjustmentReceiptReasonOther",
}



export interface BillServiceFeeRateItem {
	/**
	 * @minimum 0
	 */
	rate: number;
	inherited: boolean;
	isActive: boolean;
}

export interface BillServiceFeeRateShopItem {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	shopName: string;
	rateItem: BillServiceFeeRateItem;
}

export interface BillServiceFeeRateSetting {
	origin: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	categoryId: number;
}

export interface BillServiceFeeRateSettingResp {
	common: BillServiceFeeRateItem;
	shops: BillServiceFeeRateShopItem[];
}

export interface BillServiceFeeRateSettingUpdate {
	origin: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	categoryId: number;
	/**
	 * @minimum 0
	 */
	rate: number;
	isActive: boolean;
}

export interface BillServiceFeeRateSettingUpdateResp {
	common: BillServiceFeeRateItem;
	shops: BillServiceFeeRateShopItem[];
}

export interface BillServiceFeeRateSettingUpdateShopItem {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	/**
	 * @minimum 0
	 */
	rate: number;
	isActive: boolean;
}

export interface BillServiceFeeRateSettingUpdateShop {
	origin: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	categoryId: number;
	updates: BillServiceFeeRateSettingUpdateShopItem[];
}

export interface BillServiceFeeRateSettingUpdateShopResp {
	common: BillServiceFeeRateItem;
	shops: BillServiceFeeRateShopItem[];
}

export interface BillServiceFeeRatePeriodItem {
	id: string;
	/**
	 * @minimum 0
	 */
	rate: number;
	isActive: boolean;
	/**
	 * @pattern ^\d+$
	 */
	startDate: string;
	/**
	 * @pattern ^\d+$
	 */
	endDate: string;
	updateBy: string;
	/**
	 * @pattern ^\d+$
	 */
	updateDate: string;
	name: string;
}

export interface BillServiceFeeRatePeriod {
	origin: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	categoryId: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
}

export interface BillServiceFeeRatePeriodResp {
	items: BillServiceFeeRatePeriodItem[];
}

export interface BillServiceFeeRatePeriodUpsert {
	origin: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	categoryId: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	periodId: string;
	isActive: boolean;
	/**
	 * @pattern ^\d+$
	 */
	startDate: string;
	/**
	 * @pattern ^\d+$
	 */
	endDate: string;
	/**
	 * @minimum 0
	 */
	rate: number;
	name: string;
	notStrict: boolean;
}

export interface BillServiceFeeRatePeriodUpsertResp {
	items: BillServiceFeeRatePeriodItem[];
}

export interface BillServiceFeeRateProductBatchItem {
	batchId: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	productCount: number;
	/**
	 * @minimum 0
	 */
	rate: number;
	isActive: boolean;
	/**
	 * @pattern ^\d+$
	 */
	startDate: string;
	/**
	 * @pattern ^\d+$
	 */
	endDate: string;
	updateBy: string;
	/**
	 * @pattern ^\d+$
	 */
	updateDate: string;
	name: string;
}

export interface BillServiceFeeRateProductBatch {
	origin: string;
}

export interface BillServiceFeeRateProductBatchResp {
	items: BillServiceFeeRateProductBatchItem[];
}

export interface BillServiceFeeRateProductBatchUpsert {
	origin: string;
	batchId: string;
	productId: number[];
	/**
	 * @minimum 0
	 */
	rate: number;
	isActive: boolean;
	/**
	 * @pattern ^\d+$
	 */
	startDate: string;
	/**
	 * @pattern ^\d+$
	 */
	endDate: string;
	name: string;
	notStrict: boolean;
}

export interface BillServiceFeeRateProductBatchUpsertResp {
	items: BillServiceFeeRateProductBatchItem[];
}

export interface BillServiceFeeRateGetItem {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	categoryId: number[];
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	productId: number;
	/**
	 * @pattern ^\d+$
	 */
	payDate: string;
}

export interface BillServiceFeeRateGetResult {
	/**
	 * @minimum 0
	 */
	rate: number;
	node: string;
}

export interface BillServiceFeeRateGet {
	item: BillServiceFeeRateGetItem[];
	origin: string;
}

export interface BillServiceFeeRateGetResp {
	result: BillServiceFeeRateGetResult[];
}

export interface BillServiceFeeRateSettingLogItem {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	categoryId: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	categories: string[];
	shopName: string;
	field: BillServiceFeeRateItemField;
	valBefore: string;
	valAfter: string;
	updateBy: string;
	/**
	 * @pattern ^\d+$
	 */
	updateDate: string;
}

export interface BillServiceFeeRateSettingLog {
	origin: string;
	categoryId: number[];
	shopId: number[];
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	offset: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	limit: number;
}

export interface BillServiceFeeRateSettingLogResp {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	total: number;
	items: BillServiceFeeRateSettingLogItem[];
}

export interface BillServiceFeeRatePeriodLogItem {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	categoryId: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	categories: string[];
	shopName: string;
	field: BillServiceFeeRateItemField;
	valBefore: string;
	valAfter: string;
	updateBy: string;
	/**
	 * @pattern ^\d+$
	 */
	updateDate: string;
	periodId: string;
}

export interface BillServiceFeeRatePeriodLog {
	origin: string;
	categoryId: number[];
	shopId: number[];
	periodId: string[];
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	offset: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	limit: number;
}

export interface BillServiceFeeRatePeriodLogResp {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	total: number;
	items: BillServiceFeeRatePeriodLogItem[];
}

export interface BillServiceFeeRateBatchProductLogItem {
	batchId: string;
	field: BillServiceFeeRateItemField;
	valBefore: string;
	valAfter: string;
	updateBy: string;
	/**
	 * @pattern ^\d+$
	 */
	updateDate: string;
}

export interface BillServiceFeeRateBatchProductLog {
	origin: string;
	batchId: string[];
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	offset: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	limit: number;
}

export interface BillServiceFeeRateBatchProductLogResp {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	total: number;
	items: BillServiceFeeRateBatchProductLogItem[];
}

export interface BillServiceFeeRatePeriodShopItem {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	shopName: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	periodCount: number;
}

export interface BillServiceFeeRatePeriodShops {
	origin: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	categoryId: number;
}

export interface BillServiceFeeRatePeriodShopsResp {
	item: BillServiceFeeRatePeriodShopItem[];
}

export interface BillServiceFeeRateMultiRegionGetItem {
	origin: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	categoryId: number[];
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	productId: number;
	/**
	 * @pattern ^\d+$
	 */
	payDate: string;
}

export interface BillServiceFeeRateMultiRegionGet {
	items: BillServiceFeeRateMultiRegionGetItem[];
}

export interface BillServiceFeeRateMultiRegionGetResp {
	result: BillServiceFeeRateGetResult[];
}

export interface BillServiceDeliveryFee {
	status: BillServiceLocalDeliveryFeeSettingStatus;
	settingId: string;
	type: BillServiceLocalDeliveryFeeSettingType;
	/**
	 * @pattern ^\d+$
	 */
	fee: string;
	/**
	 * @pattern ^\d+$
	 */
	startAt: string;
	/**
	 * @pattern ^\d+$
	 */
	endAt: string;
	settingTopic: string;
}

export interface BillServiceDeliveryFeeCommonResp {
	success: boolean;
	errMsg: string;
}

export interface BillServiceDeliveryFeeList {
	originCode: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	shopName: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	limit: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	offset: number;
}

export interface BillServiceDeliveryFeeListResp {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	total: number;
	items: BillServiceDeliveryFeeListRespItem[];
}

export interface BillServiceDeliveryFeeListRespItem {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	shopName: string;
	common: BillServiceDeliveryFee;
	period: BillServiceDeliveryFee[];
}

export interface BillServiceDeliveryFeeGet {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	/**
	 * @pattern ^\d+$
	 */
	time: string;
}

export interface BillServiceDeliveryFeeGetResp {
	fee: BillServiceDeliveryFee;
}

export interface BillServiceCommonDeliveryFeeUpsert {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	/**
	 * @pattern ^\d+$
	 */
	fee: string;
}

export interface BillServiceCommonDeliveryFeeUpsertResp {
	result: BillServiceDeliveryFeeCommonResp;
}

export interface BillServicePeriodDeliveryFeeCreate {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	/**
	 * @pattern ^\d+$
	 */
	fee: string;
	/**
	 * @pattern ^\d+$
	 */
	startAt: string;
	/**
	 * @pattern ^\d+$
	 */
	endAt: string;
	topic: string;
}

export interface BillServicePeriodDeliveryFeeCreateResp {
	result: BillServiceDeliveryFeeCommonResp;
}

export interface BillServicePeriodDeliveryFeeUpdate {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	settingId: string;
	/**
	 * @pattern ^\d+$
	 */
	fee: string;
	/**
	 * @pattern ^\d+$
	 */
	startAt: string;
	/**
	 * @pattern ^\d+$
	 */
	endAt: string;
}

export interface BillServicePeriodDeliveryFeeUpdateResp {
	result: BillServiceDeliveryFeeCommonResp;
	fee: BillServiceDeliveryFee;
}

export interface BillServicePeriodDeliveryFeeCancel {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	settingId: string;
}

export interface BillServicePeriodDeliveryFeeCancelResp {
	result: BillServiceDeliveryFeeCommonResp;
}

export interface BillServiveDeliveryFeeChangeLog {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	limit: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	offset: number;
}

export interface BillServiveDeliveryFeeChangeLogResp {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	total: number;
	items: BillServiveDeliveryFeeChangeLogRespItem[];
}

export interface BillServiveDeliveryFeeChangeLogRespItem {
	opType: BillServiceLocalDeliveryFeeSettingOpType;
	ops: BillServiveDeliveryFeeChangeLogRespOpItem[];
	opBy: string;
	/**
	 * @pattern ^\d+$
	 */
	opTime: string;
	settingTopic: string;
}

export interface BillServiveDeliveryFeeChangeLogRespOpItem {
	field: BillServiceLocalDeliveryFeeSettingField;
	valBefore: string;
	valAfter: string;
}

export interface BillServiceCommonDeliveryFeeGenDefault {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	/**
	 * @pattern ^\d+$
	 */
	fee: string;
}

export interface BillServiceCommonDeliveryFeeGenDefaultResp {
	result: BillServiceDeliveryFeeCommonResp;
}

export interface BillServicePeriodDeliveryFeeTerminate {
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	shopId: number;
	settingId: string;
}

export interface BillServicePeriodDeliveryFeeTerminateResp {
	result: BillServiceDeliveryFeeCommonResp;
}

export interface AdjustmentReceipt {
	/**
	 * @pattern ^\d+$
	 */
	id: string;
	/**
	 * @pattern ^\d+$
	 */
	shopID: string;
	shopName: string;
	orderNo: string;
	/**
	 * @minimum 0
	 */
	orderAmount: number;
	productName: string;
	feeType: AdjustmentReceiptFeeType;
	reason: AdjustmentReceiptReason;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	quantity: number;
	/**
	 * @minimum 0
	 */
	amount: number;
	remark: string;
	status: AdjustmentReceiptStatus;
	/**
	 * @pattern ^\d+$
	 */
	opertaorID: string;
	opertaor: string;
	/**
	 * @pattern ^\d+$
	 */
	createDate: string;
	/**
	 * @pattern ^\d+$
	 */
	updateDate: string;
}

export interface AdjustmentReceiptLog {
	/**
	 * @pattern ^\d+$
	 */
	id: string;
	opertation: string;
	changeContext: string;
	operator: string;
	/**
	 * @pattern ^\d+$
	 */
	createDate: string;
}

export interface GetAdjustmentReceiptsReq {
	/**
	 * @pattern ^\d+$
	 */
	shopID: string;
	orderNo: string;
	productName: string;
	feeType: AdjustmentReceiptFeeType;
	reason: AdjustmentReceiptReason;
	operator: string;
	status: AdjustmentReceiptStatus;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	offset: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	limit: number;
}

export interface GetAdjustmentReceiptsResp {
	result: EzsellerResult;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	total: number;
	receipts: AdjustmentReceipt[];
}

export interface GetAdjustmentReceiptsByBillNumReq {
	billNum: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	offset: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	limit: number;
}

export interface GetAdjustmentReceiptsByBillNumResp {
	result: EzsellerResult;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	total: number;
	receipts: AdjustmentReceipt[];
}

export interface GetAdjustmentReceiptDetailReq {
	/**
	 * @pattern ^\d+$
	 */
	id: string;
}

export interface GetAdjustmentReceiptDetailResp {
	result: EzsellerResult;
	receipt: AdjustmentReceipt;
}

export interface GetAdjustmentReceiptLogsReq {
	/**
	 * @pattern ^\d+$
	 */
	id: string;
}

export interface GetAdjustmentReceiptLogsResp {
	result: EzsellerResult;
	logs: AdjustmentReceiptLog[];
}

export interface CreateAdjustmentReceiptReq {
	receipt: AdjustmentReceipt;
}

export interface CreateAdjustmentReceiptResp {
	result: EzsellerResult;
}

export interface ModifyAdjustmentReceiptReq {
	receipt: AdjustmentReceipt;
}

export interface ModifyAdjustmentReceiptResp {
	result: EzsellerResult;
}

export interface CancelAdjustmentReceiptReq {
	/**
	 * @pattern ^\d+$
	 */
	id: string;
}

export interface CancelAdjustmentReceiptResp {
	result: EzsellerResult;
}

export interface ExportAdjustmentReceiptsByBillNumReq {
	billNum: string;
}

export interface ExportAdjustmentReceiptsByBillNumResp {
	result: EzsellerResult;
	exportId: string;
	isExisted: boolean;
}

export interface GetSellerAdjustmentReceiptsReq {
	orderNo: string;
	feeType: AdjustmentReceiptFeeType;
	reason: AdjustmentReceiptReason;
	status: AdjustmentReceiptStatus;
	/**
	 * @pattern ^\d+$
	 */
	createStartTime: string;
	/**
	 * @pattern ^\d+$
	 */
	createEndTime: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	offset: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	limit: number;
}

export interface GetSellerAdjustmentReceiptsResp {
	result: EzsellerResult;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	total: number;
	receipts: AdjustmentReceipt[];
}

export interface GetSellerAdjustmentReceiptsByBillNumReq {
	billNum: string;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	offset: number;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	limit: number;
}

export interface GetSellerAdjustmentReceiptsByBillNumResp {
	result: EzsellerResult;
	/**
	 * @minimum 0
	 * @TJS-type integer
	 */
	total: number;
	receipts: AdjustmentReceipt[];
}

export interface ExportSellerAdjustmentReceiptsByBillNumReq {
	billNum: string;
}

export interface ExportSellerAdjustmentReceiptsByBillNumResp {
	result: EzsellerResult;
	exportId: string;
	isExisted: boolean;
}



export function ServiceFeeRateSetting(payload: Partial<BillServiceFeeRateSetting>) {
	return webapi<BillServiceFeeRateSettingResp>("ezseller.Bill/ServiceFeeRateSetting", payload);
}

export function ServiceFeeRateSettingUpdate(payload: Partial<BillServiceFeeRateSettingUpdate>) {
	return webapi<BillServiceFeeRateSettingUpdateResp>("ezseller.Bill/ServiceFeeRateSettingUpdate", payload);
}

export function ServiceFeeRateSettingUpdateShop(payload: Partial<BillServiceFeeRateSettingUpdateShop>) {
	return webapi<BillServiceFeeRateSettingUpdateShopResp>("ezseller.Bill/ServiceFeeRateSettingUpdateShop", payload);
}

export function ServiceFeeRatePeriodShops(payload: Partial<BillServiceFeeRatePeriodShops>) {
	return webapi<BillServiceFeeRatePeriodShopsResp>("ezseller.Bill/ServiceFeeRatePeriodShops", payload);
}

export function ServiceFeeRatePeriod(payload: Partial<BillServiceFeeRatePeriod>) {
	return webapi<BillServiceFeeRatePeriodResp>("ezseller.Bill/ServiceFeeRatePeriod", payload);
}

export function ServiceFeeRatePeriodUpsert(payload: Partial<BillServiceFeeRatePeriodUpsert>) {
	return webapi<BillServiceFeeRatePeriodUpsertResp>("ezseller.Bill/ServiceFeeRatePeriodUpsert", payload);
}

export function ServiceFeeRateProductBatch(payload: Partial<BillServiceFeeRateProductBatch>) {
	return webapi<BillServiceFeeRateProductBatchResp>("ezseller.Bill/ServiceFeeRateProductBatch", payload);
}

export function ServiceFeeRateProductBatchUpsert(payload: Partial<BillServiceFeeRateProductBatchUpsert>) {
	return webapi<BillServiceFeeRateProductBatchUpsertResp>("ezseller.Bill/ServiceFeeRateProductBatchUpsert", payload);
}

export function ServiceFeeRateGet(payload: Partial<BillServiceFeeRateGet>) {
	return webapi<BillServiceFeeRateGetResp>("ezseller.Bill/ServiceFeeRateGet", payload);
}

export function ServiceFeeRateSettingLog(payload: Partial<BillServiceFeeRateSettingLog>) {
	return webapi<BillServiceFeeRateSettingLogResp>("ezseller.Bill/ServiceFeeRateSettingLog", payload);
}

export function ServiceFeeRatePeriodLog(payload: Partial<BillServiceFeeRatePeriodLog>) {
	return webapi<BillServiceFeeRatePeriodLogResp>("ezseller.Bill/ServiceFeeRatePeriodLog", payload);
}

export function ServiceFeeRateBatchProductLog(payload: Partial<BillServiceFeeRateBatchProductLog>) {
	return webapi<BillServiceFeeRateBatchProductLogResp>("ezseller.Bill/ServiceFeeRateBatchProductLog", payload);
}

export function ServiceFeeRateMultiRegionGet(payload: Partial<BillServiceFeeRateMultiRegionGet>) {
	return webapi<BillServiceFeeRateMultiRegionGetResp>("ezseller.Bill/ServiceFeeRateMultiRegionGet", payload);
}

export function ServiceDeliveryFeeList(payload: Partial<BillServiceDeliveryFeeList>) {
	return webapi<BillServiceDeliveryFeeListResp>("ezseller.Bill/ServiceDeliveryFeeList", payload);
}

export function ServiceDeliveryFeeGet(payload: Partial<BillServiceDeliveryFeeGet>) {
	return webapi<BillServiceDeliveryFeeGetResp>("ezseller.Bill/ServiceDeliveryFeeGet", payload);
}

export function ServiceCommonDeliveryFeeUpsert(payload: Partial<BillServiceCommonDeliveryFeeUpsert>) {
	return webapi<BillServiceCommonDeliveryFeeUpsertResp>("ezseller.Bill/ServiceCommonDeliveryFeeUpsert", payload);
}

export function ServicePeriodDeliveryFeeCreate(payload: Partial<BillServicePeriodDeliveryFeeCreate>) {
	return webapi<BillServicePeriodDeliveryFeeCreateResp>("ezseller.Bill/ServicePeriodDeliveryFeeCreate", payload);
}

export function ServicePeriodDeliveryFeeUpdate(payload: Partial<BillServicePeriodDeliveryFeeUpdate>) {
	return webapi<BillServicePeriodDeliveryFeeUpdateResp>("ezseller.Bill/ServicePeriodDeliveryFeeUpdate", payload);
}

export function ServicePeriodDeliveryFeeCancel(payload: Partial<BillServicePeriodDeliveryFeeCancel>) {
	return webapi<BillServicePeriodDeliveryFeeCancelResp>("ezseller.Bill/ServicePeriodDeliveryFeeCancel", payload);
}

export function ServicePeriodDeliveryFeeTerminate(payload: Partial<BillServicePeriodDeliveryFeeTerminate>) {
	return webapi<BillServicePeriodDeliveryFeeTerminateResp>("ezseller.Bill/ServicePeriodDeliveryFeeTerminate", payload);
}

export function ServiveDeliveryFeeChangeLog(payload: Partial<BillServiveDeliveryFeeChangeLog>) {
	return webapi<BillServiveDeliveryFeeChangeLogResp>("ezseller.Bill/ServiveDeliveryFeeChangeLog", payload);
}

export function ServiceCommonDeliveryFeeGenDefault(payload: Partial<BillServiceCommonDeliveryFeeGenDefault>) {
	return webapi<BillServiceCommonDeliveryFeeGenDefaultResp>("ezseller.Bill/ServiceCommonDeliveryFeeGenDefault", payload);
}

export function GetAdjustmentReceipts(payload: Partial<GetAdjustmentReceiptsReq>) {
	return webapi<GetAdjustmentReceiptsResp>("ezseller.Bill/GetAdjustmentReceipts", payload);
}

export function GetAdjustmentReceiptsByBillNum(payload: Partial<GetAdjustmentReceiptsByBillNumReq>) {
	return webapi<GetAdjustmentReceiptsByBillNumResp>("ezseller.Bill/GetAdjustmentReceiptsByBillNum", payload);
}

export function GetAdjustmentReceiptDetail(payload: Partial<GetAdjustmentReceiptDetailReq>) {
	return webapi<GetAdjustmentReceiptDetailResp>("ezseller.Bill/GetAdjustmentReceiptDetail", payload);
}

export function GetAdjustmentReceiptLogs(payload: Partial<GetAdjustmentReceiptLogsReq>) {
	return webapi<GetAdjustmentReceiptLogsResp>("ezseller.Bill/GetAdjustmentReceiptLogs", payload);
}

export function CreateAdjustmentReceipt(payload: Partial<CreateAdjustmentReceiptReq>) {
	return webapi<CreateAdjustmentReceiptResp>("ezseller.Bill/CreateAdjustmentReceipt", payload);
}

export function ModifyAdjustmentReceipt(payload: Partial<ModifyAdjustmentReceiptReq>) {
	return webapi<ModifyAdjustmentReceiptResp>("ezseller.Bill/ModifyAdjustmentReceipt", payload);
}

export function CancelAdjustmentReceipt(payload: Partial<CancelAdjustmentReceiptReq>) {
	return webapi<CancelAdjustmentReceiptResp>("ezseller.Bill/CancelAdjustmentReceipt", payload);
}

export function ExportAdjustmentReceiptsByBillNum(payload: Partial<ExportAdjustmentReceiptsByBillNumReq>) {
	return webapi<ExportAdjustmentReceiptsByBillNumResp>("ezseller.Bill/ExportAdjustmentReceiptsByBillNum", payload);
}

export function GetSellerAdjustmentReceipts(payload: Partial<GetSellerAdjustmentReceiptsReq>) {
	return webapi<GetSellerAdjustmentReceiptsResp>("ezseller.Bill/GetSellerAdjustmentReceipts", payload);
}

export function GetSellerAdjustmentReceiptsByBillNum(payload: Partial<GetSellerAdjustmentReceiptsByBillNumReq>) {
	return webapi<GetSellerAdjustmentReceiptsByBillNumResp>("ezseller.Bill/GetSellerAdjustmentReceiptsByBillNum", payload);
}

export function ExportSellerAdjustmentReceiptsByBillNum(payload: Partial<ExportSellerAdjustmentReceiptsByBillNumReq>) {
	return webapi<ExportSellerAdjustmentReceiptsByBillNumResp>("ezseller.Bill/ExportSellerAdjustmentReceiptsByBillNum", payload);
}


export default {
	ServiceFeeRateSetting,
	ServiceFeeRateSettingUpdate,
	ServiceFeeRateSettingUpdateShop,
	ServiceFeeRatePeriodShops,
	ServiceFeeRatePeriod,
	ServiceFeeRatePeriodUpsert,
	ServiceFeeRateProductBatch,
	ServiceFeeRateProductBatchUpsert,
	ServiceFeeRateGet,
	ServiceFeeRateSettingLog,
	ServiceFeeRatePeriodLog,
	ServiceFeeRateBatchProductLog,
	ServiceFeeRateMultiRegionGet,
	ServiceDeliveryFeeList,
	ServiceDeliveryFeeGet,
	ServiceCommonDeliveryFeeUpsert,
	ServicePeriodDeliveryFeeCreate,
	ServicePeriodDeliveryFeeUpdate,
	ServicePeriodDeliveryFeeCancel,
	ServicePeriodDeliveryFeeTerminate,
	ServiveDeliveryFeeChangeLog,
	ServiceCommonDeliveryFeeGenDefault,
	GetAdjustmentReceipts,
	GetAdjustmentReceiptsByBillNum,
	GetAdjustmentReceiptDetail,
	GetAdjustmentReceiptLogs,
	CreateAdjustmentReceipt,
	ModifyAdjustmentReceipt,
	CancelAdjustmentReceipt,
	ExportAdjustmentReceiptsByBillNum,
	GetSellerAdjustmentReceipts,
	GetSellerAdjustmentReceiptsByBillNum,
	ExportSellerAdjustmentReceiptsByBillNum,
};