const assign = Object.assign
import { equal } from '../util/kit'

export const volumeJoin = (data) => {
  data.volume = data.volume ? data.volume : {}
  const {
    width = 0,
    height = 0,
    length = 0,
  } = data
  if (width !== 0) {
    data.volume.width = width
  }
  if (height !== 0) {
    data.volume.height = height
  }
  if (data.length !== 0) {
    data.volume.length = length
  }
  return data
}
export const volumeSplit = (data) => {
  data.volume = data.volume ? data.volume : {}
  const {
    width = 0,
    height = 0,
    length = 0,
  } = data.volume
  if (width !== 0) {
    data.width = width
  }
  if (height !== 0) {
    data.height = height
  }
  if (data.length !== 0) {
    data.length = length
  }
  return data
}

export const volumeOperate = (dataList, type) => {
  if (type === 'join') {
    return dataList.map((item) => volumeJoin(item))
  } else {
    return dataList.map((item) => volumeSplit(item))
  }

}

// 该方法用于生成多维度自定义sku组合，有bug，已废弃, instead of generateCombineSkus()
export const getAttributeAry = (skuSelected) => {
  let attributeAry = []
  for (let i = 0; i < skuSelected.length; i++) {
    let newAray = []
    for (let key in skuSelected[i]) {
      for (let j = 0; j < skuSelected[i][key].length; j++) {
        let tmp = {}
        tmp[key] = skuSelected[i][key][j]
        if (attributeAry.length > 0) {
          for (let k = 0; k < attributeAry.length; k++) {
            newAray.push(assign({}, attributeAry[k], tmp))
          }
        } else {
          newAray.push(tmp)
        }
      }
    }
    attributeAry = newAray
  }
  return attributeAry
}



export const filterSkus = (attributeAry, productSkus) => {
  let newProductSkus = []
  for (let i = 0; i < productSkus.length; i++) {
    for (let j = 0; j < attributeAry.length; j++) {
      if (equal(productSkus[i].attributes, attributeAry[j])) {
        newProductSkus.push(productSkus[i])
      }
    }
  }
  return newProductSkus
}

export const getPriceSymbol = (country = "CN") => {
  const symbolMap = {
    "KR": "₩",
    "CN": "￥",
    "US": "$",
    "SGLocal": "S$",
    "MYLocal": "RM"
  }
  return symbolMap[country]
}



