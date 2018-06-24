import Fetch from 'fetch.io'
import { getApiPrefix } from './kit'

export const TRANSFER_STATUS = ['-', 'pending', 'rejected', 'successfully withdrawn', 'approved', 'Transferring', 'MaxLimit']

export const BILL_STATUS = ['-', 'pending', 'verified', 'appeal in progress', 'confirmed', 'FinancePending', 'MaxLimit']

export const BILL_REMARK_TYPE = ['unknown', 'verification remarks', 'internal remarks', 'appeal remarks', 'appeal remarks', 'MaxLimit']

export const BILL_PERIOD = ['unknown', 'never', 'monthly statement', 'weekly statement', 'daily statement', 'account shortage']

export const ORDER_WAREHOUSE = ['unknown', 'shanghai', 'guangzhou', 'American', 'Taiwan', 'SGLocal', 'MYLocal', 'KRIncheon', 'MaxLimit']

export const reportPrefix = 'http://d2dreport.graysheep.me'

export const SYH_API = new Fetch({ prefix: reportPrefix })

export const request = new Fetch({
  prefix: getApiPrefix() + '/api/EzSeller'
})