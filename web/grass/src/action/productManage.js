import { createAction, createSyncAction } from 'redux-action'
import * as api from '../api/productManage'

export const GET_PREFIX = 'GET_PREFIX'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_SUB_CATEGORIES = 'GET_SUB_CATEGORIES'

export const GET_VALUE_OPTIONS = 'GET_VALUE_OPTIONS'
export const GET_CATEGORYPATH_VALUE_OPTIONS = 'GET_CATEGORYPATH_VALUE_OPTIONSE'
export const GET_CATEGORY = 'GET_CATEGORY'

export const PRODUCT_GET = 'PRODUCT_GET'
export const PRODUCT_UPDATE = 'PRODUCT_UPDATE'
export const PRODUCT_LIST = 'PRODUCT_LIST'
export const PRODUCT_CHANGE = 'PRODUCT_CHANGE'
export const PRODUCT_FILTER = 'PRODUCT_FILTER'
export const PRODUCT_SELECTED = 'PRODUCT_SELECTED'
export const PRODUCT_SKUS_CHANGE = 'PRODUCT_SKUS_CHANGE'

export const IMPORT_TASK_ADD = 'IMPORT_TASK_ADD'
export const IMPORT_TASK_LIST = 'IMPORT_TASK_LIST'
export const IMPORT_SUB_TASK_LIST = 'IMPORT_SUB_TASK_LIST'

export const CHANGE_SKU_PICTURES = 'CHANGE_SKU_PICTURES'
export const CHANGE_SKU_TO_ALL = 'CHANGE_SKU_TO_ALL'
export const CHANGE_SKU_SWITCH = 'CHANGE_SKU_SWITCH'
export const CHANGE_COLOR_KEY = 'CHANGE_COLOR_KEY'


export const USER_IMPORT_SUB_TASK_PRODUCT_UPDATE = 'USER_IMPORT_SUB_TASK_PRODUCT_UPDATE'
export const USER_IMPORT_SUB_TASK_PRODUCT_DETAIL = 'USER_IMPORT_SUB_TASK_PRODUCT_DETAIL'
export const CHANGE_PRODUCT_DETAIL = 'CHANGE_PRODUCT_DETAIL'
export const USER_PRODUCT_QUICK_UPDATE = 'USER_PRODUCT_QUICK_UPDATE'
export const USER_PRODUCT_BATCH_DELETE = 'USER_PRODUCT_BATCH_DELETE'

export const USER_MIRROR_PRODUCT_LIST = 'USER_MIRROR_PRODUCT_LIST'
export const USER_MIRROR_PRODUCT_LINK = 'USER_MIRROR_PRODUCT_LINK'
export const USER_MIRROR_PRODUCT_UNLINK = 'USER_MIRROR_PRODUCT_UNLINK'

export const UPDATE_CATEGORY_TREE = 'UPDATE_CATEGORY_TREE'
export const REPLACE_CATEGORY = 'REPLACE_CATEGORY'
export const SHOP_EXPORT_SKUS = 'ShopExportSkus'

export const getPrefix =  createSyncAction(GET_PREFIX, (value, index) =>({value,index}))

export const getCategories = createAction(GET_CATEGORIES, (query, parent, index) => api.getCategories(query, parent, index))
export const getSubCategories = createAction(GET_SUB_CATEGORIES, (cid, index) => api.getSubCategories(cid, index))
export const getValueOptions = createAction(GET_VALUE_OPTIONS, api.getCategoryValueOptions)
export const getCategoryPathValueOptions = createAction(GET_CATEGORYPATH_VALUE_OPTIONS, api.getCategoryPathValueOptions)

export const productList = createAction(PRODUCT_LIST, api.productList)
export const productGet = createAction(PRODUCT_GET, api.productGet)
export const bundleProductGet = createAction(PRODUCT_GET, api.bundleProductGet)
export const productUpdate = createAction(PRODUCT_UPDATE, api.productUpdate)
export const userUnCommitedProductUpdate = createAction(PRODUCT_UPDATE, api.userUnCommitedProductUpdate)
export const productChange = createSyncAction(PRODUCT_CHANGE, (productData) => ({productData}))
export const productFilter = createSyncAction(PRODUCT_FILTER, (filter)=>({filter}))
export const productSelected = createSyncAction(PRODUCT_SELECTED, (skuSelected)=>({skuSelected}))
export const productSkusChange = createSyncAction(PRODUCT_SKUS_CHANGE, (data)=>({data}))

export const importTaskAdd = createAction(IMPORT_TASK_ADD, api.importTaskAdd)
export const importTaskList = createAction(IMPORT_TASK_LIST, api.importTaskList)
export const importSubTaskList = createAction(IMPORT_SUB_TASK_LIST, api.importSubTaskList)

export const changeSkuPictures = createSyncAction(CHANGE_SKU_PICTURES, (data) => ({data}))
export const changeSkuToAll = createSyncAction(CHANGE_SKU_TO_ALL, (data) => ({data}))
export const changeSkuSwitch = createSyncAction(CHANGE_SKU_SWITCH, (data) => ({data}))
export const changeColorKey = createSyncAction(CHANGE_COLOR_KEY, (data) => ({data}))

export const userImportSubTaskProductDetail = createAction(USER_IMPORT_SUB_TASK_PRODUCT_DETAIL,api.userImportSubTaskProductDetail)
export const userImportSubTaskProductUpdate = createAction(USER_IMPORT_SUB_TASK_PRODUCT_UPDATE,api.userImportSubTaskProductUpdate)
export const changeProductDetail = createSyncAction(CHANGE_PRODUCT_DETAIL, (data) => ({data}))
export const userProductQuickUpdate = createAction(USER_PRODUCT_QUICK_UPDATE, api.userProductQuickUpdate)
export const userProductBatchDelete = createAction(USER_PRODUCT_BATCH_DELETE, api.userProductBatchDelete)
export const getCategory = createAction(GET_CATEGORY,api.getCategory)

export const userMirrorProductLink = createAction(USER_MIRROR_PRODUCT_LINK,api.userMirrorProductLink)
export const userMirrorProductList = createAction(USER_MIRROR_PRODUCT_LIST,api.userMirrorProductList)
export const userMirrorProductUnLink = createAction(USER_MIRROR_PRODUCT_UNLINK,api.userMirrorProductUnLink)

export const updateCategoryTree = createSyncAction(UPDATE_CATEGORY_TREE, (categoryTree)=>({categoryTree}))

export const changeCategory = createSyncAction(REPLACE_CATEGORY, (status)=>({status}))
export const shopExportSkus = createAction(SHOP_EXPORT_SKUS, api.shopExportSkus)
