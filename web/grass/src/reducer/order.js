import { createReducer } from 'redux-action'
import moment from 'moment'
import {
  message
} from 'antd'
import {
  USER_ORDER_LIST,
  USER_ORDER_DETAIL,
  USER_ORDER_ITEM_LIST,
  GET_ORDER_ITEM_GROUP,
  USER_ORDER_TRACK_DETAIL_LIST,
  USER_ORDER_DISPATCH_IMPORT,
  ALL_ORDER_FILTER,
  TO_DELIVERY_FILTER,
  DELIVERIED_FILTER,
  USER_ORDER_ITEM_GROUP_EXPORT_TASK,
  USER_EXPORT_TASK_LIST,
  NEW_USER_IMPORT_TASK_LIST,
  ALTER_TASK_LIST_SEARCH_INFO,
  IMPORT_ALTER_TASK_LIST_SEARCH_INFO,
  USER_ORDER_LIST_EXPORT_TASK,
  USER_ORDER_DISPATCH_IMPORT_TASK,
  USER_IMPORT_TASK_RETRY
} from '../action/order'

const assign = Object.assign

const defaultState ={
  allOrderFilter:{
    current:1,
    pageSize:10,
    dataFilter:{
      warehouse:null,
      sellType:null,
      packagestate:null,
      orderNum:'',
      minCreateDate:moment().subtract(31, 'day').startOf('day').unix(),
      maxCreateDate:moment().endOf('day').unix() - 1
    },
  },
  toDeliveryFilter:{
    current:1,
    pageSize:10,
    dataFilter:{
      warehouse:2,
      status:1,
      orderNum:'',
    },
  },
  deliveriedFilter:{
    current:1,
    pageSize:10,
    dataFilter:{
      status:2,
      orderNum:'',
      trackingNum:'',
    }
  },
  orders:{
    total:0,
    data:[]
  },
  orderDetail:{},
  orderItemList:[],
  orderItemGroups:{
    data:[],
    total:0,
  },
  orderTrackList:[],
  orderDispatchImportResult:[],
  taskCenterExport: {
    selectValue: '0',
    taskId: '',
    tasks: [],
    total: 0
  },
  taskCenterImport: {
    selectValue: '0',
    taskId: '',
    tasks: [],
    total: 0
  }
}

const order =createReducer(defaultState,{
  [USER_ORDER_LIST]: (payload, state) =>({
    orders: payload.orders,
  }),
  [ALL_ORDER_FILTER]: (payload, state) =>({
    allOrderFilter:assign({},state.allOrderFilter,payload.filter)
  }),
  [TO_DELIVERY_FILTER]: (payload, state) =>({
    toDeliveryFilter:assign({},state.toDeliveryFilter,payload.filter)
  }),
  [DELIVERIED_FILTER]: (payload, state) =>({
    deliveriedFilter: assign({},state.deliveriedFilter,payload.filter)
  }),
  [USER_ORDER_DETAIL]:(payload) => ({orderDetail: payload.orderDetail}),
  [USER_ORDER_ITEM_LIST]:(payload) => ({orderItemList: payload.orderItemList}),
  [GET_ORDER_ITEM_GROUP]:(payload) => ({orderItemGroups: payload.orderItemGroups}),
  [USER_ORDER_TRACK_DETAIL_LIST]:(payload) => ({orderTrackList: payload.orderTrackList}),
  [USER_ORDER_DISPATCH_IMPORT]:(payload) => {
    if(payload.orderDispatchImportResult){
      return {orderDispatchImportResult:payload.orderDispatchImportResult}
    }else{
      return {orderDispatchImportResult:[]}
    }
  },
  [USER_ORDER_ITEM_GROUP_EXPORT_TASK]:(payload, state) => {
    if (payload) {
      const { taskCenterExport } = state
      taskCenterExport.taskId = payload.id
      return { taskCenterExport }
    }
  },
  [USER_ORDER_DISPATCH_IMPORT_TASK]: (payload, state) => {
    if (payload) {
      const { taskCenterImport } = state
      taskCenterImport.taskId = payload.id
      return { taskCenterImport }
    }
  },
  [USER_EXPORT_TASK_LIST]:(payload, state) => {
    if ( payload ) {
      const { taskCenterExport } = state
      const currentTaskCenter = Object.assign({}, taskCenterExport, payload)
      return { taskCenterExport: currentTaskCenter }
    }
  },
  [NEW_USER_IMPORT_TASK_LIST]: (payload, state) => {
    if (payload) {
      const { taskCenterImport } = state
      const currentTaskCenter = Object.assign({}, taskCenterImport , payload)
      return { taskCenterImport : currentTaskCenter }
    }
  },
  [USER_IMPORT_TASK_RETRY]: (payload, state) => ({
    result: payload
  }),
  [ALTER_TASK_LIST_SEARCH_INFO]: (payload, state) => {
    const { taskCenterExport } = state
    const currentTaskCenter = Object.assign({}, taskCenterExport, payload.info)
    return { taskCenterExport: currentTaskCenter }
  },
  [IMPORT_ALTER_TASK_LIST_SEARCH_INFO]: (payload, state) => {
    const { taskCenterImport } = state
    const currentTaskCenter = Object.assign({}, taskCenterImport, payload.info)
    return { taskCenterImport: currentTaskCenter }
  },
  [USER_ORDER_LIST_EXPORT_TASK]:(payload, state) => {
    if (payload) {
      const { taskCenterExport } = state
      taskCenterExport.taskId = payload.id
      return { taskCenterExport }
    }
  }
})

export default order
