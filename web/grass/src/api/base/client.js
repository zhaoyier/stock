
import Fetch from 'fetch.io'
import {getApiPrefix} from '../../util/kit'

const request = new Fetch({
  prefix: getApiPrefix()+'/api/castleblack/CastleBlack'
})
const request3 = new Fetch({
  prefix: getApiPrefix()+'/api/homepage/AdminHomepage'
})
const request2 = new Fetch({
  prefix: getApiPrefix()+'/api/bootybay/BootyBay'
})
const request1 = new Fetch({
  prefix: getApiPrefix()+'/api/EzSeller'
})
export {
  request,
  request1,
  request2,
  request3
}
