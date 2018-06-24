import { createReducer } from 'redux-action'

import {
  ACCOUNT_SIGNIN,
  ACCOUNT_REGISTER,
  ACCOUNT_RESET_PASSWORD,
  CHANGE_REGISTER_INFO,
  SWITCH_LANGUAGE
} from '../action/account'

const assign = Object.assign

const defaultState ={
  lang: localStorage.getItem('ezbuy_lang') || 'zh',
  registerInfo:{
    email:'',
    username:'',
    password:'',
    extra:{
      realName:'',
      identifierNum:'',
      phone:'',
      aliShopUrl:''
    }
  }
}

const common =createReducer(defaultState,{
  [CHANGE_REGISTER_INFO]:(payload,state) => ({registerInfo:assign({},state.registerInfo,payload.registerInfo)}),
  [SWITCH_LANGUAGE]: (payload) => {
    localStorage.setItem('ezbuy_lang', payload.lang)
    return { lang: payload.lang }
  }
})

export default common