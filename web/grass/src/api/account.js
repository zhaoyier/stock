import {
  AccountSignin, AccountRegister, AccountResetPassword, AccountValidEmail,
  AccountValidUsername, AccountForgetPassword, UserShopValidShopName, UserShopApprovalPersonal, UserShopApprovalOrganization,
  UserAccountUpdatePassword, UserShopCreate, BankListOfOrigin
} from '../services/EzSellerService'
import {request1} from './base/client'
import { warn, success } from '../util/antd'
function noop() {}

function accountSignin(username, password, cb=noop, failCb) {
  return AccountSignin(username,password)
    .then(result =>{
      if(result.hasOwnProperty('errCode')){
        failCb(result)
      }else{
        cb(result)
      }
    })
    .catch(err => {
      console.error(err)
     })
}

function userAccountUpdatePassword(oldpass,newpass,cb=noop){
  return UserAccountUpdatePassword(oldpass,newpass)
    .then(result =>{
      if(result === true){
        success('修改成功！')
      }else{
        warn('修改失败！')
      }
    })
    .catch(err => {
      console.error(err)
     })
}

function accountRegister(email,username,password,cb=noop){
  return AccountRegister(email,username,password)
    .then(result =>{
      console.log(result)
      if(result.hasOwnProperty('errCode')){
        warn(result.errMessage)
        return;
      }else{
        success('注册成功！')
        cb(result)
      }
    })
    .catch(err => {
      console.error(err)
     })
}

function accountResetPassword(token,newpass,cb=noop){
  return AccountResetPassword(token, newpass)
    .then(result =>{
      if(result.hasOwnProperty('errCode')){
        warn(result.errMessage)
      }else{
        cb(result)
      }
    })
    .catch(err => {
      console.error(err)
     })
}

function accountValidEmail(email,cb=noop){
  return AccountValidEmail(email)
    .then( result =>{
      cb(result)
    })
    .catch(err => {
      console.error(err)
     })
}

function accountValidUsername(username,cb=noop){
  return AccountValidUsername(username)
    .then( result =>{
      cb(result)
    })
    .catch(err => {
      console.error(err)
     })
}

function accountForgetPassword(username,cb=noop){
  return AccountForgetPassword(username)
    .then(result =>{
      if(result.hasOwnProperty('errCode')){
        warn(result.errMessage)
      }else{
        success('邮件已发送，请到'+result.email+'查收！')
      }
    })
    .catch(err => {
      console.error(err)
     })
}

function userShopValidShopName(shopName){
  return UserShopValidShopName(shopName)
}

function userShopApprovalPersonal(shopName,requester,form,originCode,cb=noop){
  return UserShopApprovalPersonal(shopName,requester,form,originCode)
    .catch(err => {
      console.error(err)
     })
}

function userShopApprovalOrganization(shopName,requester,form,originCode,cb=noop){
  return UserShopApprovalOrganization(shopName, requester, form, originCode)
    .catch(err => {
      console.error(err)
     })
}

function sellerUpdatePassword(oldpass,newpass,cb){
  return UserAccountUpdatePassword(oldpass, newpass)
    .then((msg)=>{
      if(msg === true){
        cb(true)
        success('更新成功')
      }else{
        if(msg.errCode === 7){
          cb(false)
          warn('原密码错误')
        }
      }
    })
    .catch(err => {
      console.error(err)
     })
}
function userShopCreate(sellerInfo, bizInfo, bankInfo) {
  return UserShopCreate(sellerInfo, bizInfo, bankInfo)
    .catch(err => {
      console.error(err)
    })
}
function bankListOfOrigin(originCode) {
  return BankListOfOrigin(originCode)
    .catch(err => {
      console.error(err)
    })
}

function AccountUpdateNotificationChannel(data, cb){
  return request1
    .post('/AccountUpdateNotificationChannel')
    .config({ credentials: 'include' })
    .send(data)
    .text()
    .then((paypoad) => {
      cb(paypoad)
    })
    .catch(err => {
      console.error(err);
    })
}

function AccountUpdateNotifications(data, cb){
  return request1
    .post('/AccountUpdateNotifications')
    .config({ credentials: 'include' })
    .send(data)
    .text()
    .then((paypoad) => {
      cb(paypoad)
    })
    .catch(err => {
      console.error(err);
    })
}

function AccountNotifications(cb){
  return request1
    .post('/AccountNotifications')
    .config({ credentials: 'include' })
    .send({})
    .json()
    .then((paypoad) => {
      cb(paypoad)
    })
    .catch(err => {
      console.error(err);
    })
}

export {
  accountSignin,
  userAccountUpdatePassword,
  accountRegister,
  accountResetPassword,
  accountValidEmail,
  accountValidUsername,
  accountForgetPassword,
  userShopValidShopName,
  userShopApprovalPersonal,
  userShopApprovalOrganization,
  sellerUpdatePassword,
  userShopCreate,
  bankListOfOrigin,
  AccountUpdateNotificationChannel,
  AccountUpdateNotifications,
  AccountNotifications
}
