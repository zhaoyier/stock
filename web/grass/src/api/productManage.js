import loading from '../util/loading'
import {request1} from './base/client'
import { warn, success } from '../util/antd'
import { GetCategories, GetSubCategories, GetCategoryValueOptions, GetCategoryPathValueOptions, GetCategory } from '../services/BootyBayService'
import {
  UserProductDetail, UserUnCommitedProductDetail, UserProductUpdate, UserUnCommitedProductUpdate, UserProductList, UserImportTaskAdd,
  UserImportTaskList, UserImportSubTaskList, UserImportSubTaskProductDetail, UserImportSubTaskProductUpdate, UserProductQuickUpdate,
  UserProductBatchDelete, UserMirrorProductList, UserMirrorProductLink, UserMirrorProductUnLink
} from '../services/EzSellerService'

const noop = (...parm) => {}

function getCategories(query, parent, index, cb=noop){
  loading('add')
  return GetCategories(query,parent)
   .then( categories => {
    loading('none')
    if(parent != -1){
      return {categories, index}
    }else{
      return {preCategories: categories}
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function getSubCategories(cid, index, cb=noop){
  loading('add')
  return GetSubCategories(cid)
   .then( subCategories => {
    loading('none')
    const info ={
      subCategories,
      index,
      cid
    }
    return {info}
   })
   .catch(err => {
    console.error(err)
   })
}

function getCategoryValueOptions(cid, cb=noop){
  return GetCategoryValueOptions(cid, true)
   .then( valueOptions => {
    cb && cb(valueOptions)
    return {valueOptions}
   })
   .catch(err => {
    console.error(err)
   })
}

function getCategoryPathValueOptions(categoryPath, cb=noop){
  return GetCategoryPathValueOptions(categoryPath)
   .then( valueOptions => {
    cb(valueOptions)
    return {valueOptions}
   })
   .catch(err => {
    console.error(err)
   })
}

function productGet(productId,cb=noop){
  return UserProductDetail(productId)
    .then( productData =>{
      if(productData.hasOwnProperty('errCode')){
        warn(productData["errMessage"])
      }else{
        cb(productData["base"], productData["skus"])
        return {productData}
      }
    })
    .catch(err =>{
      console.error(err)
    })
}

function bundleProductGet(productId,cb=noop){
  return UserUnCommitedProductDetail(productId)
    .then( productData =>{
      if(productData.hasOwnProperty('errCode')){
        warn(productData["errMessage"])
      }else{
        cb(productData.base,productData.skus)
        return {productData}
      }
    })
    .catch(err =>{
      console.error(err)
    })
}

function productUpdate(data,skus,cb=noop, failCb){
  return UserProductUpdate(data,skus)
    .then( productData =>{
      if(productData.hasOwnProperty('errCode') || productData.hasOwnProperty('message')){
        let message = productData['errMessage'] || productData['message'] || productData['errCode']
        if (failCb !== undefined) {
          failCb()
        }
        return warn("出错！请重新登录!")
      }else{
        cb(productData)
        success('更新成功')
      }
    })
    .catch(err =>{
      console.error(err)
    })
}

function userUnCommitedProductUpdate(data,skus,cb=noop){
  return UserUnCommitedProductUpdate(data,skus)
    .then( productData =>{
      if(productData.hasOwnProperty('errCode') || productData.hasOwnProperty('message')){
        let message = productData["errMessage"] || productData["message"] || productData["errCode"]
        return warn(message)
      }else{
        cb(productData)
        success('更新成功')
      }
    })
    .catch(err =>{
      console.error(err)
    })
}

function productList(offset,limit,filter,cb=noop){
  loading('add')
  return UserProductList(offset,limit,filter)
    .then(products =>{
      loading('none')
      return {products, isReload: offset === 0}
    })
    .catch(err =>{
      console.error(err)
    })
}

function importTaskAdd(urls,taskType,cb=noop){
  return UserImportTaskAdd(urls, taskType)
    .then(result =>{
      if(result === true){
        success('导入成功！')
        cb()
      }else{
        warn('导入失败！')
      }
    })
    .catch(err =>{
      console.error(err)
    })
}

function importTaskList(offset,limit,cb=noop){
  return UserImportTaskList(offset, limit)
    .then(taskList =>{
      if(taskList['length']){
        cb()
      }
      return {taskList, isReload: offset === 0}
    })
    .catch(err =>{
      console.error(err)
    })
}

function importSubTaskList(taskId,offset,limit,filter,cb=noop){
  return UserImportSubTaskList(taskId,offset,limit,filter)
    .then(subTaskList =>({subTaskList}))
    .catch(err =>{
      console.error(err)
    })
}

function userImportSubTaskProductDetail(subTaskId,cb=noop){
  return UserImportSubTaskProductDetail(subTaskId)
    .then( productData =>{
      if(productData.hasOwnProperty('errCode')){
        warn(productData['errMessage'])
      }else{
        cb(productData)
      }
    })
    .catch(err =>{
      console.error(err)
    })
}

function userImportSubTaskProductUpdate(subTaskId,data,skus,cb=noop){
  return UserImportSubTaskProductUpdate(subTaskId,data,skus)
    .then(productData =>{
      if(productData){
        cb(productData)
        success('更新成功！')
      }
    })
    .catch(err =>{
      console.error(err)
    })
}

function userProductQuickUpdate(productId,change,cb=noop){
  return UserProductQuickUpdate(productId,change)
    .then( result =>{
      const res = result
      if(typeof(res) == 'boolean' && res){
        cb()
        success('操作成功！')
      }else if(typeof(res) == 'object'){
        warn(res['message'])
      }else{
        warn('操作失败！')
      }
    })
}
function userProductBatchDelete(pids, cb=noop) {
  return UserProductBatchDelete(pids)
    .then( result =>{
      const res = result
      if(res.length === 0){
        cb()
        success('操作成功！')
      }else if(res.length > 0){
        for(let i = 0; i < res.length; i++) {
          warn(res[i])
        }
      }else{
        warn('操作失败！')
      }
    })
}

function getCategory(cid,cb=noop){
  return GetCategory(cid)
    .then( result =>{
      if(result !== null){
        return {category:result}
      }
    })

}

function userMirrorProductList(offset, limit, filter, cb= noop) {
  return UserMirrorProductList(offset,limit,filter)
    .then( coSaleList =>({coSaleList}))
    .catch(err => {
      console.error(err)
     })
}

function userMirrorProductLink(productId,cb=noop){
  return UserMirrorProductLink(productId)
    .then( productData =>{
      if(productData.hasOwnProperty('errCode')){
        return warn(productData['errMessage'])
      }else{
        return {productData}
      }
    })
    .catch(err =>{
      console.error(err)
    })
}

function userMirrorProductUnLink(productId,cb=noop){
  return UserMirrorProductUnLink(productId)
    .then( result =>{
      const res = result
      if(typeof(res) == 'boolean' && res){
        cb()
      }else if(typeof(res) == 'object'){
        warn(res['errMessage'])
      }else{
        warn('操作失败！')
      }
    })
}

function shopExportSkus(UserProductListFilter, cn=noop) {
  return request1
    .post('/ShopExportSkus')
    .config({
      credentials: 'include'
    })
    .send({filter: UserProductListFilter})
    .json()
    .then(result => {
      if (result.fileUrl) {
        cn(result.fileUrl)
      }
    })
}
function userUploadProducts(fileKey, cb) {
  return request1
  .post('/ShopBatchUpdateSkus')
  .config({
    credentials: 'include'
  })
  .send({ fileKey })
  .json()
  .then(result => {
    if(result) {
      cb(result)
    }
  })
  .catch(function(result){
    warn('error server')
  })
}

export {
  userProductQuickUpdate,
  userProductBatchDelete,
  getCategories,
  getCategory,
  getSubCategories,
  getCategoryValueOptions,
  productGet,
  bundleProductGet,
  productUpdate,
  userUnCommitedProductUpdate,
  productList,
  getCategoryPathValueOptions,
  importTaskList,
  importTaskAdd,
  importSubTaskList,
  userImportSubTaskProductDetail,
  userImportSubTaskProductUpdate,
  userMirrorProductLink,
  userMirrorProductList,
  userMirrorProductUnLink,
  shopExportSkus,
  userUploadProducts
}
