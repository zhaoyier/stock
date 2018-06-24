import { createAction, createSyncAction } from 'redux-action'
import { UserNewImportTaskList } from '../services/EzSellerService'
import * as api from '../api/order'

export const USER_ORDER_LIST = 'USER_ORDER_LIST'
export const USER_ORDER_LIST_EXPORT_TASK = 'USER_ORDER_LIST_EXPORT_TASK'
export const USER_ORDER_DETAIL = 'USER_ORDER_DETAIL'
export const USER_ORDER_CANCEL = 'USER_ORDER_CANCEL'
export const USER_ORDER_ITEM_LIST = 'USER_ORDER_ITEM_LIST'
export const USER_ORDER_ITEM_DISPATCH = 'USET_ORDER_ITEM_DISPATCH'
export const USER_ORDER_ITEM_RETURN_CONFIRM = 'USET_ORDER_ITEM_RETURN_CONFIRM'
export const USER_ORDER_REMARK_ADD = 'USER_ORDER_REMARK_ADD'
export const USER_ORDER_ITEM_REMARK_ADD = 'USER_ORDER_REMARK_ADD'
export const GET_ORDER_ITEM_GROUP = 'GET_ORDER_ITEM_GROUP'
export const USER_ORDER_TRACK_DETAIL_LIST = 'USER_ORDER_TRACK_DETAIL_LIST'
export const USER_ORDER_ITEM_TRACK_UPDATE = 'USER_ORDER_ITEM_TRACK_UPDATE'
export const USER_ORDER_DISPATCH = 'USER_ORDER_DISPATCH'
export const USER_ORDER_TRACK_UPDATE = 'USER_ORDER_TRACK_UPDATE'
export const USER_ORDER_ITEM_GROUP_EXPORT_TASK = 'USER_ORDER_ITEM_GROUP_EXPORT_TASK'
export const USER_EXPORT_TASK_LIST = 'USER_EXPORT_TASK_LIST'
export const NEW_USER_IMPORT_TASK_LIST = 'NEW_USER_IMPORT_TASK_LIST'
export const ALTER_TASK_LIST_SEARCH_INFO = 'ALTER_TASK_LIST_SEARCH_INFO'
export const IMPORT_ALTER_TASK_LIST_SEARCH_INFO = 'IMPORT_ALTER_TASK_LIST_SEARCH_INFO'
export const USER_ORDER_DISPATCH_IMPORT = 'USER_ORDER_DISPATCH_IMPORT'
export const USER_GET_PRODUCT_SIMPLEINFO = 'USER_GET_PRODUCT_SIMPLEINFO'
export const ALL_ORDER_FILTER = 'ALL_ORDER_FILTER'
export const TO_DELIVERY_FILTER = 'TO_DELIVERY_FILTER'
export const DELIVERIED_FILTER = 'DELIVERIED_FILTER'
export const SUBMIT = 'SUBMIT'
export const GET_EZSELLER_NEW_MESSAGE = 'GET_EZSELLER_NEW_MESSAGE'
export const USER_ORDER_DISPATCH_IMPORT_TASK = 'USER_ORDER_DISPATCH_IMPORT_TASK'
export const USER_IMPORT_TASK_RETRY = 'USER_IMPORT_TASK_RETRY'



export const userOrderList = createAction(USER_ORDER_LIST, api.userOrderList)
export const userOrderListExportTask = createAction(USER_ORDER_LIST_EXPORT_TASK, api.userOrderListExportTask)
export const userOrderDetail = createAction(USER_ORDER_DETAIL, api.userOrderDetail)
export const userOrderCancel = createAction(USER_ORDER_CANCEL, api.userOrderCancel)
export const userOrderItemList = createAction(USER_ORDER_ITEM_LIST, api.userOrderItemList)
export const userOrderItemReturnConfirm = createAction(USER_ORDER_ITEM_RETURN_CONFIRM, api.userOrderItemReturnConfirm)
export const userOrderRemarkAdd = createAction(USER_ORDER_REMARK_ADD, api.userOrderRemarkAdd)
export const userOrderItemRemarkAdd = createAction(USER_ORDER_ITEM_REMARK_ADD, api.userOrderItemRemarkAdd)
export const getOrderItemGroup = createAction(GET_ORDER_ITEM_GROUP, api.userOrderItemGroupList)
export const userOrderTrackList = createAction(USER_ORDER_TRACK_DETAIL_LIST, api.userOrderTrackDetailList)
export const userOrderItemTrackUpdate = createAction(USER_ORDER_ITEM_TRACK_UPDATE, api.userOrderItemTrackUpdate)
export const userOrderDispatch = createAction(USER_ORDER_DISPATCH, api.userOrderDispatch)
export const userOrderTrackUpdate = createAction(USER_ORDER_TRACK_UPDATE, api.userOrderTrackUpdate)
export const userOrderItemGroupExportTask = createAction(USER_ORDER_ITEM_GROUP_EXPORT_TASK, api.userOrderItemGroupExportTask)
export const alterTaskListSearchInfo = createSyncAction(ALTER_TASK_LIST_SEARCH_INFO, (info)=>({info}))
export const importAlterTaskListSearchInfo = createSyncAction(IMPORT_ALTER_TASK_LIST_SEARCH_INFO, (info)=>({info}))
export const userExportTaskList = createAction(USER_EXPORT_TASK_LIST, api.userExportTaskList)
export const newUserImportTaskList = createAction(NEW_USER_IMPORT_TASK_LIST, UserNewImportTaskList)
export const userImportTaskRetry = createAction(USER_IMPORT_TASK_RETRY, api.userImportTaskRetry)
export const userOrderDispatchImport = createAction(USER_ORDER_DISPATCH_IMPORT, api.userOrderDispatchImport)
export const userGetProductSimpleinfo = createAction(USER_GET_PRODUCT_SIMPLEINFO, api.userGetProductSimpleinfo)
export const allOrderFilter = createSyncAction(ALL_ORDER_FILTER, (filter)=>({filter}))
export const toDeliveryFilter = createSyncAction(TO_DELIVERY_FILTER, (filter)=>({filter}))
export const deliveriedFilter = createSyncAction(DELIVERIED_FILTER, (filter)=>({filter}))
export const submit = createAction(SUBMIT, api.submit)
export const getEzsellerNewMessage = createAction(GET_EZSELLER_NEW_MESSAGE, api.getEzsellerNewMessage)
export const userOrderDispatchImportTask = createAction(USER_ORDER_DISPATCH_IMPORT_TASK, api.userOrderDispatchImportTask)
