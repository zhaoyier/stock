import {ProductListPublic} from '../services/CastleBlackService'
import loading from '../util/loading'
import { warn, success } from '../util/antd'
function noop() {}

function productListPublic(listQuery,filter,cb=noop){
  return ProductListPublic(listQuery,filter)
    .then( result =>{
      cb(result)
      return {
        productList:result.data,
        total: result.total
      }
    })
    .catch(err => {
      console.error(err)
     })
}

export {
  productListPublic
}
