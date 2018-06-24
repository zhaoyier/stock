import { createSyncAction, createAction } from 'redux-action'
import * as api from '../api/common'

export const CHANGE_MENU = 'CHANGE_MENU'
export const SWITCH_MENU = 'SWITCH_MENU'
export const BILL_PAGENUM_CHANGE = 'BILL_PAGENUM_CHANGE'
export const GET_ACCOUNT = 'GET_ACCOUNT'
export const UPDATE_NOTICE_INFO = 'UPDATE_NOTICE_INFO'

export const changeMenu = createSyncAction(CHANGE_MENU,(activeMenu) => ({activeMenu}))
export const switchMenu = createSyncAction(SWITCH_MENU, menu => menu)
export const changeBillPagenum = createSyncAction(BILL_PAGENUM_CHANGE, pageNum => ({ pageNum }))
export const getAccount = createSyncAction(GET_ACCOUNT, (accountInfo) => ({accountInfo}))
export const updateNoticeInfo = createAction(UPDATE_NOTICE_INFO, api.userAnnAndMailCount)

