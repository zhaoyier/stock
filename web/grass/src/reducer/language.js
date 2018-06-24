import { createReducer } from 'redux-action'

import {
  SWITCH_LANGUAGE
} from '../action/account'

const assign = Object.assign

const defaultState = localStorage.getItem('ezbuy_lang') || 'zh' 

const common = (state = defaultState, action)=>{
  switch(action.type){
    case SWITCH_LANGUAGE:
      return action.payload.lang;
    default:
      return state;
  }
}

export default common