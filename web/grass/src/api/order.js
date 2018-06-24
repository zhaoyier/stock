import EzSellerService from '../services/EzSellerService'
import { warn, success } from '../util/antd'
import { redirect } from '../util/history'
import { request1 } from './base/client'

function noop(parm) { }

function userOrderList(offset, limit, filter, cb = noop) {
  return EzSellerService.UserOrderList(offset, limit, filter)
    .then(orders => {
      if (cb) {
        cb(orders)
      }
      return { orders: orders }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderListExportTask(filter, language, cb = noop) {
  return request1
    .post('/UserOrderListExportTask')
    .config({
      credentials: 'include'
    })
    .send({
      filter,
      language
    })
    .json()
    .then(result => {
      if (result.hasOwnProperty('errMessage')) {
        warn(result.errMessage)
        return false
      } else {
        redirect('/exportTask')
        return result
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderDetail(orderNum, cb = noop) {
  return EzSellerService.UserOrderDetail(orderNum)
    .then(orderDetail => ({ orderDetail }))
    .catch(err => {
      console.error(err)
    })
}

function userOrderCancel(orderNums, remark, cb = noop) {
  return EzSellerService.UserOrderCancel(orderNums, remark)
    .then(result => {
      if (result === true) {
        success('更新成功！')
      } else {
        warn('更新失败！')
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderItemList(offset, limit, filter, cb = noop) {
  return EzSellerService.UserOrderItemList(offset, limit, filter)
    .then(orderItemList => ({ orderItemList }))
    .catch(err => {
      console.error(err)
    })
}

function userOrderItemReturnConfirm(orderItemIds, cb = noop) {
  return EzSellerService.UserOrderItemReturnConfirm(orderItemIds)
    .then(result => {
      if (result === true) {
        success('successed!')
      } else {
        warn('failed')
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderRemarkAdd(orderNum, remark, cb = noop) {
  return EzSellerService.UserOrderRemarkAdd(orderNum, remark)
    .then(result => {
      const res = result
      if (typeof (res) == 'boolean' && res) {
        cb()
        success('操作成功！')
      } else if (typeof (res) == 'object') {
        warn(res['errMessage'])
      } else {
        warn('操作失败！')
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderItemRemarkAdd(orderItemId, remark, cb = noop) {
  return EzSellerService.UserOrderItemRemarkAdd(orderItemId, remark)
    .then(result => {
      const res = result
      if (typeof (res) == 'boolean' && res) {
        cb()
        success('操作成功！')
      } else if (typeof (res) == 'object') {
        warn(res['errMessage'])
      } else {
        warn('操作失败！')
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderItemGroupList(offset, limit, filter, cb = noop) {
  return EzSellerService.UserOrderItemGroupList(offset, limit, filter)
    .then(orderItemGroups => {
      if (cb !== undefined) {
        cb(orderItemGroups)
      }
      return { orderItemGroups }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderTrackDetailList(offset, limit, filter, cb = noop) {
  return EzSellerService.UserOrderTrackDetailList(offset, limit, filter)
    .then(orderTrackList => ({ orderTrackList }))
    .catch(err => {
      console.error(err)
    })
}

function userOrderItemTrackUpdate(orderItemIds, track, cb = noop) {
  return EzSellerService.UserOrderItemTrackUpdate(orderItemIds, track)
    .then(result => {
      const res = result
      if (typeof (res) == 'boolean' && res) {
        cb()
        success('操作成功！')
      } else if (typeof (res) == 'object') {
        warn(res['errMessage'])
      } else {
        warn('操作失败！')
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderDispatch(orderNum, track, cb = noop) {
  return EzSellerService.UserOrderDispatch(orderNum, track)
    .then(result => {
      const res = result
      if (typeof (res) == 'boolean' && res) {
        cb()
        success('操作成功！')
      } else if (typeof (res) == 'object') {
        warn(res['errMessage'])
      } else {
        warn('操作失败！')
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderTrackUpdate(orderNum, track, cb = noop) {
  return EzSellerService.UserOrderTrackUpdate(orderNum, track)
    .then(result => {
      const res = result
      if (typeof (res) == 'boolean' && res) {
        cb()
        success('操作成功！')
      } else if (typeof (res) == 'object') {
        warn(res['errMessage'])
      } else {
        warn('操作失败！')
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderItemGroupExport(filter, language, cb = noop) {
  return EzSellerService.UserOrderItemGroupExport(filter, language)
    .then(result => {
      if (result.hasOwnProperty('errMessage')) {
        warn(result['errMessage'])
        return false
      } else {
        cb(result['fileUrl'])
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderItemGroupExportTask(filter, language, cb = noop) {
  return request1
    .post('/UserOrderItemGroupExportTask')
    .config({
      credentials: 'include'
    })
    .send({
      filter,
      language
    })
    .json()
    .then(result => {
      if (result.hasOwnProperty('errMessage')) {
        warn(result.errMessage)
        return false
      } else {
        redirect('/exportTask')
        return result
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderDispatchImport(fileKey, cb = noop) {
  return EzSellerService.UserOrderDispatchImport(fileKey)
    .then(orderDispatchImportResult => {
      if (orderDispatchImportResult) {
        if (orderDispatchImportResult.hasOwnProperty('errMessage')) {
          warn(orderDispatchImportResult['errMessage'])
        } else {
          cb(orderDispatchImportResult)
        }
      }
    })
    .catch(err => {
      console.error(err)
    })
}
function userGetProductSimpleinfo(productName, callBack) {
  return EzSellerService.UserGetProductSimpleInfo(productName)
    .then(msg => {
      if (msg) {
        if (msg.hasOwnProperty('errMessage')) {
          warn(msg['errMessage'])
        } else {
          callBack(msg)
        }
      }
    })
}

function submit(data, cb) {
  return request1
    .post('/ExportFile/Submit')
    .config({
      credentials: 'include'
    })
    .send(data)
    .json()
    .then(msg => {
      if (msg.code != 1) {
        cb(msg)
      } else {
        warn('生成失败！')
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function getEzsellerNewMessage(filter, cb) {
  return request1
    .post('/GetEzsellerNewMessage')
    .config({ credentials: 'include' })
    .send({ filter })
    .json()
    .then(msg => {
      if (cb) {
        cb(msg)
      }
    })
}

function userOrderStockout(baseInfo, orderInfos, cb) {
  return request1
    .post('/UserOrderStockout')
    .config({ credentials: 'include' })
    .send({ baseInfo, orderInfos })
    .text()
    .then(msg => {
      if (cb) {
        cb(msg)
      }
    })
}

function snapshootOfEzseller(orderNum, cb) {
  return request1
    .post('/SnapshootOfEzseller')
    .config({ credentials: 'include' })
    .send({ orderNum, msgType: 1 })
    .text()
    .then(msg => {
      if (msg) {
        cb(msg)
      }
    })
}

function sendFromEzseller(body, cb) {
  return request1
    .post('/SendFromEzseller')
    .config({ credentials: 'include' })
    .send({ body })
    .text()
    .then(msg => {
      if (cb) {
        cb(msg)
      }
    })
}

function userOrderHasExisted(baseInfo, cb) {
  return request1
    .post('/UserOrderHasExisted')
    .config({ credentials: 'include' })
    .send({ baseInfo })
    .text()
    .then(msg => {
      if (cb) {
        cb(msg)
      }
    })
}

function userExportTaskList(filter, offset, limit) {
  return request1
    .post('/UserExportTaskList')
    .config({
      credentials: 'include'
    })
    .send(
    filter,
    offset,
    limit
    )
    .json()
    .then(result => {
      if (result.hasOwnProperty('errMessage')) {
        return false
      } else {
        return result
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function newUserImportTaskList(filter, offset, limit) {
  return request1
    .post('/UserNewImportTaskList')
    .config({ credentials: 'include' })
    .send(filter, offset, limit)
    .json()
    .then(result => {
      if (result.hasOwnProperty('errMessage')) {
        return false
      } else {
        return result
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function userOrderDispatchImportTask(fileKey) {
  return request1
    .post('/UserOrderDispatchImportTask')
    .config({ credentials: 'include' })
    .send({ fileKey })
    .json()
    .then(result => {
      if (result.hasOwnProperty('errMessage')) {
        warn(result.errMessage)
        return false
      } else {
        redirect('/importTask')
        return result
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function userImportTaskRetry(taskId, cb) {
  return request1
    .post('/UserImportTaskRetry')
    .config({ credentials: 'include' })
    .send({ task: {id: taskId} })
    .json()
    .then(result => {
      if (result.hasOwnProperty('message')) {
        warn(result.message)
        return false
      } else {
        if (cb) {
          cb()
        }
      }
    })
    .catch(err => {
      console.error(err)
    })
}

export {
  userOrderList,
  userOrderDetail,
  userOrderCancel,
  userOrderItemList,
  userOrderItemReturnConfirm,
  userOrderRemarkAdd,
  userOrderItemRemarkAdd,
  userOrderItemGroupList,
  userOrderTrackDetailList,
  userOrderItemTrackUpdate,
  userGetProductSimpleinfo,
  userOrderDispatch,
  userOrderTrackUpdate,
  userOrderItemGroupExport,
  userOrderItemGroupExportTask,
  userOrderDispatchImport,
  submit,
  getEzsellerNewMessage,
  userOrderStockout,
  snapshootOfEzseller,
  sendFromEzseller,
  userOrderHasExisted,
  userOrderListExportTask,
  userExportTaskList,
  newUserImportTaskList,
  userOrderDispatchImportTask,
  userImportTaskRetry
}
