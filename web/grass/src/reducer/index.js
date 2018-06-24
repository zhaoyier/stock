import productManage from './productManage'
import order from './order'
import common from './common'
import approve from './approve'
import lang from './language'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  productManage,
  common,
  order,
  approve,
  lang
})

export default rootReducer