import { getLodop } from './LodopFuncs.js'
import { injectPrintScript as realInjectPrintScript } from './LodopFuncs.js'
import {
  previewSellerOrderVertical as realPreviewSellerOrderVertical,
  previewSellerOrderHorizontal as realPreviewSellerOrderHorizontal,
  previewSellerOrder100 as realPreviewSellerOrder100,
  previewSellerOrderHorizontalOld as realPreviewSellerOrderHorizontalOld,
  previewSellerOrderVerticalOld as realPreviewSellerOrderVerticalOld
} from './OldSellerPrint'

export const injectPrintScript = realInjectPrintScript
export const previewSellerOrderVertical = realPreviewSellerOrderVertical
export const previewSellerOrderHorizontal = realPreviewSellerOrderHorizontal
export const previewSellerOrder100 = realPreviewSellerOrder100
export const previewSellerOrderHorizontalOld = realPreviewSellerOrderHorizontalOld
export const previewSellerOrderVerticalOld = realPreviewSellerOrderVerticalOld

const licence = 'F890ED779D3B7F53EB48D2F896DAAE46'
const licenceName = '厦门煦逸信息科技有限公司'

const getAllStyles = () => {
  let strStyle = ''
  const styleTags = document.querySelectorAll('head style')
  styleTags.forEach((styleTag) => {
    strStyle += styleTag.innerHTML
  })
  return `<style>${strStyle}</style>`
}

export const getPrintContent = (element, way = 1) => {
  const isPagingPrint = element.length > 0
  const strBodyStyle = getAllStyles()
  const LODOP = getLodop()
  LODOP.SET_LICENSES(licenceName, licence, '', '')
  LODOP.PRINT_INIT('Seller Print')
  LODOP.SET_PRINT_PAGESIZE(way, '210mm', '297mm', 'Seller Print')
  if ( isPagingPrint ) {
    for (const key in element) {
      const item = element[key]
      if ( item && item.outerHTML) {
        LODOP.ADD_PRINT_HTM(
          '4mm',
          '1mm',
          '100%',
          '100%',
          strBodyStyle + item.outerHTML
        )
        LODOP.NewPage()
      }
    }
  } else {
    LODOP.ADD_PRINT_HTM(
      '4mm',
      '1mm',
      '100%',
      '100%',
      strBodyStyle + element.outerHTML
    )
  }
  return LODOP
}

//  elementId 需要打印 DOM id, way = 1 竖着打印, way = 2 横着打印
export function preview(elementId, way = 1) {
  const element = document.getElementById(elementId)
  const LODOP = getPrintContent(element, way)
  LODOP.PREVIEW()
}

export function print(elementId, way = 1) {
  const element = document.getElementById(elementId)
  const LODOP = getPrintContent(element, way)
  LODOP.PRINT()
}

export const pagingPreview = (className, way = 1) => {
  const elementItems = document.getElementsByClassName(className)
  const LODOP = getPrintContent(elementItems, way)
  LODOP.PREVIEW()
}

export const pagingPrint = (className, way = 1) => {
  const elementItems = document.getElementsByClassName(className)
  const LODOP = getPrintContent(elementItems, way)
  LODOP.PRINT()
}
