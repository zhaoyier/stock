import { createAction, createSyncAction } from 'redux-action'
import * as api from '../api/account'

export const ACCOUNT_SIGNIN = 'ACCOUNT_SIGNIN'
export const USER_ACCOUNT_UPDATE_PASSWORD = 'USER_ACCOUNT_UPDATE_PASSWORD'
export const ACCOUNT_REGISTER = 'ACCOUNT_REGISTER'
export const ACCOUNT_RESET_PASSWORD = 'ACCOUNT_RESET_PASSWORD'
export const ACCOUNT_VALID_EMAIL = 'ACCOUNT_VALID_EMAIL'
export const ACCOUNT_VALID_USERNAME = 'ACCOUNT_VALID_USERNAME'
export const ACCOUNT_FORGET_PASSWORD = 'ACCOUNT_FORGET_PASSWORD'
export const USER_SHOP_VALID_SHOP_NAME = 'USER_SHOP_VALID_SHOP_NAME'
export const USER_SHOP_APPROVAL_PERSONAL = 'USER_SHOP_APPROVAL_PERSONAL'
export const USER_SHOP_APPROVAL_ORGANIZATION = 'USER_SHOP_APPROVAL_ORGANIZATION'
export const CHANGE_REGISTER_INFO = 'CHANGE_REGISTER_INFO'
export const SELLER_UPDATE_PASSWORD = 'SELLER_UPDATE_PASSWORD'
export const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE'

export const accountSignin = createAction(ACCOUNT_SIGNIN, api.accountSignin)
export const userAccountUpdatePassword =  createAction(USER_ACCOUNT_UPDATE_PASSWORD, api.userAccountUpdatePassword)
export const accountRegister = createAction(ACCOUNT_REGISTER, api.accountRegister)
export const accountResetPassword = createAction(ACCOUNT_FORGET_PASSWORD, api.accountResetPassword)
export const accountValidEmail = createAction(ACCOUNT_VALID_EMAIL, api.accountValidEmail)
export const accountValidUsername = createAction(ACCOUNT_VALID_USERNAME, api.accountValidUsername)
export const accountForgetPassword = createAction(ACCOUNT_FORGET_PASSWORD, api.accountForgetPassword)
export const userShopValidShopName = createAction(USER_SHOP_VALID_SHOP_NAME, api.userShopValidShopName)
export const userShopApprovalPersonal = createAction(USER_SHOP_APPROVAL_PERSONAL, api.userShopApprovalPersonal)
export const userShopApprovalOrganization = createAction(USER_SHOP_APPROVAL_ORGANIZATION, api.userShopApprovalOrganization)
export const changeRegisterInfo = createSyncAction(CHANGE_REGISTER_INFO, (registerInfo)=>({registerInfo}))
export const sellerUpdatePassword = createAction(SELLER_UPDATE_PASSWORD, api.sellerUpdatePassword)
export const switchLanguage = createSyncAction(SWITCH_LANGUAGE, lang => ({ lang }))
