import {
  PRODUCT_LIST_PUBLIC
} from '../action/approve'
import { createReducer } from 'redux-action'

const defaultState ={
  productList: [],
  total:0
}

const approve =createReducer(defaultState,{
})

export default approve