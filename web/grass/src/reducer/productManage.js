import { createReducer } from 'redux-action'
import { equal } from '../util/kit'
import {
  GET_CURRENT_TAB,
  GET_PERPERTIES,
  GET_VALUES,
  GET_CATEGORIES,
  GET_SUB_CATEGORIES,
  GET_VALUE_OPTIONS,
  GET_CATEGORYPATH_VALUE_OPTIONS,
  GET_VALUES_FOR_PROPERTY,
  GET_PREFIX,
  CLEAR_PROPERTY_VALUES,
  PRODUCT_GET,
  BUNDLE_PRODUCT_GET,
  PRODUCT_UPDATE,
  PRODUCT_CHANGE,
  PRODUCT_LIST,
  PRODUCT_SELECTED,
  PRODUCT_FILTER,
  IMPORT_TASK_LIST,
  IMPORT_SUB_TASK_LIST,
  PRODUCT_SKUS_CHANGE,
  PRESS_BUTTON,
  CHANGE_SKU_PICTURES,
  CHANGE_SKU_TO_ALL,
  CHANGE_SKU_SWITCH,
  CHANGE_COLOR_KEY,
  USER_IMPORT_SUB_TASK_PRODUCT_UPDATE,
  CHANGE_PRODUCT_DETAIL,
  GET_CATEGORY,
  USER_MIRROR_PRODUCT_LIST,
  USER_MIRROR_PRODUCT_LINK,
  UPDATE_CATEGORY_TREE,
  REPLACE_CATEGORY,
} from '../action/productManage'
const assign = Object.assign

const defaultState = {
  products:{
    products: [],
    total:0,
  },
  isReplaceCategory:false,
  filter: {
    current:1,
    pageSize:10,
    dataFilter:{
      isOnSale:null,
      sellType:1,
      soldCountSortType:0,
      minPrice:null,
      maxPrice:null,
      minCreateDate:null,
      maxCreateDate:null,
      productName:'',
      isStocked: null
    }
  },
  categoriesForSelect: [],
  categoryTree: {
    '0': {
      selected: -1,
      all: [],
      prefix: []
    },
    '1': {
      selected: -1,
      all: [],
      prefix: []
    },
    '2': {
      selected: -1,
      all: [],
      prefix: []
    },
    '3': {
      selected: -1,
      all: [],
      prefix: []
    }
  },
  valueOptions: {fixed:[],multi:[{
    pname:'',
    pvs: []
  }],single:[{
    pname:'',
    pvs: []
  }]},
  prefix:{"0":"","1":"","2":"","3":""},
  preCategories: [],
  productData:{
    pid: 0,
    categoryId: 0,
    name:'',
    enName:'',
    description: '',
    primaryImage: '',
    isStocked: false,
    isOnSale: true,
    attributes: {},
    saleRegion:[],
    originCode:'CN',
    shipmentInfo: 1,
    images:[],
    sellType:1,
    url:'',
    skuProps:[]
  },
  tasks: {
    taskList: [],
    total: 0
  },
  subTaskList: {
    list: [],
    total: 0
  },
  productSkus: [],
  skuSelected: [],
  skuPictures: {},
  skuToAll:{},
  skuSwitch:[],
  colorKey:'',
  category:{},
  coSaleList: {
    list: [],
    total: 0
  }
}

const productManage = createReducer(defaultState, {
  [REPLACE_CATEGORY]:(payload) => {
    return {isReplaceCategory:payload.status}
  },
  [GET_PREFIX]: (payload, state) => {
    const index = payload.index
    let  prefix = state.prefix
    prefix[index] = payload.value
    return {prefix}
  },
  [GET_CATEGORIES]: (payload, state) => {
    let categoryTree = state.categoryTree
    if(!payload.hasOwnProperty('preCategories')){
      const index = payload.index
      categoryTree[index].all = payload.categories
      return {categoryTree}
    }else{
      return {preCategories: payload.preCategories}
    }
  },
  [GET_SUB_CATEGORIES]: (payload, state) => {
    const categoryTree = state.categoryTree
    const index = payload.info.index
    const init = {
      selected: -1,
      all: [],
      prefix: []
    }
    if(index > -1){
      categoryTree[index].selected = payload.info.cid
    }
    if(index<3){
      categoryTree[index+1].selected = -1
      categoryTree[index+1].all = payload.info.subCategories
    }
    if(index==-1){
      categoryTree[1] = init
      categoryTree[2] = init
      categoryTree[3] = init
    }
    if(index==0){
      categoryTree[2] = init
      categoryTree[3] = init
    }
    if(index==1){
      categoryTree[3] = init
    }
    return {categoryTree}
  },
  [GET_VALUE_OPTIONS]: (payload) => ({valueOptions: payload.valueOptions}),
  [GET_CATEGORYPATH_VALUE_OPTIONS]: (payload) => ({valueOptions: payload.valueOptions}),
  [PRODUCT_LIST]: (payload) => ({products: payload.products}),
  [PRODUCT_GET]: (payload) => {
    if(payload && payload.productData){
      return {
        productData:payload.productData.base,
        productSkus:payload.productData.skus
      }
    }
  },
  [PRODUCT_CHANGE]: (payload,state) => ({
    productData: assign({},state.productData,payload.productData)
  }),
  [PRODUCT_FILTER]: (payload,state) =>({
    filter: assign({},state.filter,payload.filter)
  }),
  [IMPORT_TASK_LIST]: (payload, state) => ({
    tasks: {
      taskList: payload.taskList.data,
      total: payload.taskList.total
    }
  }),
  [IMPORT_SUB_TASK_LIST]: (payload) => ({
    subTaskList: payload.subTaskList
  }),
  [PRODUCT_SELECTED]: (payload) => ({
    skuSelected: payload.skuSelected
  }),
  [PRODUCT_SKUS_CHANGE]: (payload) =>({productSkus:payload.data}),
  [CHANGE_COLOR_KEY]: (payload) => ({colorKey:payload.data}),
  [CHANGE_SKU_SWITCH]: (payload) => ({skuSwitch:payload.data}),
  [CHANGE_SKU_TO_ALL]: (payload) => ({skuToAll:payload.data}),
  [CHANGE_SKU_PICTURES]: (payload) => ({skuPictures:payload.data}),
  // [USER_IMPORT_SUB_TASK_PRODUCT_UPDATE]: (payload) => {
  //   if(payload){
  //     return {
  //       productData:payload.productData.base,
  //       productSkus:payload.productData.skus
  //     }
  //   }
  // },
  [GET_CATEGORY]: (payload) => {
    if(payload && payload.category){
      return {category:payload.category}
    }
  },
  [USER_MIRROR_PRODUCT_LIST]: (payload) => ({coSaleList:payload.coSaleList}),
  [USER_MIRROR_PRODUCT_LINK]: (payload) => {
    if(payload){
      return {
        productData:payload.productData.base,
        productSkus:payload.productData.skus
      }
    }
  },
  [UPDATE_CATEGORY_TREE]:(payload) => ({categoryTree:payload.categoryTree})
})
export default productManage
