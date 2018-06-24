import { createReducer } from 'redux-action'

import {
  CHANGE_MENU,
  SWITCH_MENU,
  GET_ACCOUNT,
  BILL_PAGENUM_CHANGE,
  UPDATE_NOTICE_INFO
} from '../action/common'

const assign = Object.assign

const defaultState ={
  activeMenu: {
    key: '1'
  },
  accountInfo: {},
  billPagenum: 1,
  noticeInfo: {
    announcementCount: 0,
    mailCount: 0
  }
}

const common =createReducer(defaultState,{
  [SWITCH_MENU]: (payload) => ({ activeMenu: { key: payload.key } }),
  [GET_ACCOUNT]:(payload) => ({accountInfo: payload.accountInfo}),
  [BILL_PAGENUM_CHANGE]:(payload) => ({ billPagenum: payload.pageNum }),
  [UPDATE_NOTICE_INFO]:(payload, state) => {
    let { noticeInfo } = state
    noticeInfo = assign(noticeInfo, payload)
    return ({noticeInfo})
  }
})

export default common