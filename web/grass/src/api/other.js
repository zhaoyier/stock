import { GetUploadInfo } from '../services/AdminHomepageService'
import {request1} from './base/client'

function noop(parm){}

//此方法页面直接调用，获取上传相关参数
function getToken(cb = noop){
  return GetUploadInfo()
   .then(info => {
     return cb(info)
   })
   .catch(err => {
     console.error(err)
   })
}

function AccountForgetPassword(data, cb){
  return request1
   .post('/AccountForgetPassword')
   .send(data)
   .json()
   .then(info => {
     cb(info)
   })
   .catch(err => {
     console.error(err)
   })
}

function AccountResetPassword(data, cb){
  return request1
   .post('/AccountResetPassword')
   .send(data)
   .json()
   .then(info => {
     cb(info)
   })
   .catch(err => {
     console.error(err)
   })
}

export {
  getToken,
  AccountForgetPassword,
  AccountResetPassword
}
