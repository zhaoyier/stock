import { getLodop } from './LodopFuncs'
import { Region } from '../../services/EzSellerService'

var licence = 'F890ED779D3B7F53EB48D2F896DAAE46'
var licenceName = '厦门煦逸信息科技有限公司'
//判断操作系统是否为中文
// if (navigator.appName == 'Netscape')
//     var language = navigator.language
// else
// 	var language = navigator.browserLanguage
//台湾继续走65daigou.com
if (window.location.host.toLowerCase().indexOf('65daigou.com') != -1) {
	licence = '044868798991081165310311611656'
	licenceName = ''
}

//  如果程序控制打印大小, Canon MF220 Series XPS 会出现偏移打印不全的问题 (可能存在更多)
//  如果用户自己选择打印大小, 以下 specialType 变量中的型号在打印时用户不能选择大小
//  const specialType = ['GK888t', 'GT800', 'ZDesigner']

// function findSpecialType (LODOP) {
//   const printCount = LODOP.GET_PRINTER_COUNT()
//   let hasSpecialType = false
//   for (var i = 0; i < printCount -1; i++) {
//     const printName = LODOP.GET_PRINTER_NAME(`${i}:DriverName`)
//     specialType.forEach(item => {
//       if ( printName.includes(item) ) {
//         hasSpecialType = true
//       }
//     })
//   }
//   return hasSpecialType
// }


//判断浏览器类型
// function GetOs() {
//     var OsObject = ''
//     if (navigator.userAgent.indexOf('MSIE') > 0) {
//         return 'MSIE'
//     }
//     if (isFirefox = navigator.userAgent.indexOf('Firefox') > 0) {
//         return 'Firefox'
//     }
//     if (isSafari = navigator.userAgent.indexOf('Safari') > 0) {
//         return 'Safari'
//     }
//     if (isCamino = navigator.userAgent.indexOf('Camino') > 0) {
//         return 'Camino'
//     }
//     if (isMozilla = navigator.userAgent.indexOf('Gecko/') > 0) {
//         return 'Gecko'
//     }
// }

// function Print(catalogCode, weight, location, nickName, orderNumber, prefix, originCode, parcelCount) {
//     CreatePrintPage(catalogCode, weight, location, nickName, orderNumber, prefix, originCode)
//     LODOP.PRINT()
// };
// function Preview(catalogCode, weight, location, nickName, orderNumber, prefix, originCode, parcelCount) {
//     CreatePrintPage(catalogCode, weight, location, nickName, orderNumber, prefix, originCode, parcelCount, parcelCount)
//     LODOP.PREVIEW()
// };
//打印订单
// function CreatePrintPage(catalogCode, weight, location, nickName, orderNumber, prefix, originCode, parcelCount, printIndex) {
//     var logoStr = 'ezbuy'
//     if (catalogCode == 'AU') {
//         logoStr = 'ezbuy          .'//因为打印时会会忽略后面空格，所以需要加个点
//     }

//     if (GetOs() == 'Firefox') LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
//     LODOP.SET_LICENSES(licenceName, licence, '', '')
//     LODOP.PRINT_INIT('打印订单号')
//     LODOP.SET_PRINT_PAGESIZE(1, '50mm', '30mm', 'CreateCustomPage')
//     LODOP.SET_PRINT_STYLE('FontColor', 'Black')
//     LODOP.SET_PRINT_STYLE('FontSize', 10)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial Black')
//     LODOP.SET_PRINT_STYLE('Alignment', 3)
//     LODOP.ADD_PRINT_TEXT(1, 0, 86, 20, logoStr)
//     if (originCode.toUpperCase() == 'TW') {
//         LODOP.ADD_PRINT_TEXT(2, 78, 2, 1, 'T')
//     }
//     LODOP.SET_PRINT_STYLE('FontSize', 9)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     var weightLabel = weight + ' KG'
//     LODOP.ADD_PRINT_TEXT(4, 82, 60, 1, weightLabel) //绘制重量
//     if (location.length == 5) {//5位货架，放大第二、第三个字母
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(14, 98, 45, 1, location.substring(0, 2)) //绘制货架号
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 18)
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.ADD_PRINT_TEXT(10, 132, 20, 1, location.substring(2, 3))
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.SET_PRINT_STYLE('Bold', 0)
//         LODOP.ADD_PRINT_TEXT(14, 148, 20, 1, location.substring(3, 4))
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 18)
//         LODOP.ADD_PRINT_TEXT(10, 165, 20, 1, location.substring(4, location.length))
//     }
//     else if (location.length == 7 || location.length == 6) {
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 15)
//         LODOP.ADD_PRINT_TEXT(16, 105, 10, 0, location.substring(2, 3))
//         LODOP.SET_PRINT_STYLE('Bold', 0)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(18, 114, 20, 1, location.substring(3, 4))
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 15)
//         LODOP.ADD_PRINT_TEXT(15, 129, 20, 1, location.substring(4, 5))
//         LODOP.SET_PRINT_STYLE('Bold', 0)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(18, 136, 45, 0, location.substring(5, location.length))
//     }
//     else if (location.length >= 10) {
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(16, 90, 10, 5, location.substring(2, 3))
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 15)
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.ADD_PRINT_TEXT(15, 100, 20, 1, location.substring(3, 4))
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 15)
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.ADD_PRINT_TEXT(15, 115, 20, 1, location.substring(4, 5))
//         LODOP.SET_PRINT_STYLE('Bold', 0)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 11)
//         LODOP.ADD_PRINT_TEXT(17, 122, 60, 0, location.substring(5, location.length))
//     }
//     else {//4位货架，放大第二个字母
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(14, 130, 10, 1, location.substring(0, 1)) //绘制货架号
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 18)
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.ADD_PRINT_TEXT(8, 142, 20, 1, location.substring(1, 2))
//         LODOP.SET_PRINT_STYLE('Bold', 0)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(14, 156, 30, 1, location.substring(2, location.length))
//     }
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.SET_PRINT_STYLE('FontSize', 9)
//     if (nickName.length > 18) nickName = nickName.substring(0, 18) + '...'
//     LODOP.ADD_PRINT_TEXT(29, 0, 120, 1, nickName) //绘制会员昵称
//     var reg = /[^\d]/g
//     //orderNumber = orderNumber.replace("#", "").replace(reg, '');
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.SET_PRINT_STYLE('FontSize', 10)
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_BARCODE('12mm', '2mm', '50mm', '15mm', '128A', orderNumber) //绘制订单条码
// }

// //初始化包裹标签 竖打
// function CreatePackagePagey(catalogCode, nickName, packageNumber, boxCount, bagCount, prefix, originCode, locationLabel) {
//     if (GetOs() == 'Firefox') LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
//     LODOP.SET_LICENSES(licenceName, licence, '', '')
//     LODOP.PRINT_INIT('打印包裹号')
//     LODOP.SET_PRINT_PAGESIZE(1, '40mm', '60mm', 'CreateCustomPage')
//     LODOP.SET_PRINT_STYLE('FontColor', 'Black')
//     LODOP.SET_PRINT_STYLE('FontSize', 12)
//     LODOP.SET_PRINT_STYLE('FontName', 'Verdana')
//     LODOP.SET_PRINT_STYLE('Alignment', 1)
//     LODOP.SET_PRINT_STYLE('Angle', 90) //旋转
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.ADD_PRINT_BARCODE('-5mm', '1mm', '12mm', '60mm', '128A', packageNumber) //绘制包裹一维条码
//     LODOP.SET_PRINT_STYLEA(0, 'ShowBarText', 0)
//     LODOP.SET_PRINT_STYLE('FontSize', 12)
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.ADD_PRINT_TEXT(220, 60, 130, 1, nickName) //绘制会员昵称
//     LODOP.SET_PRINT_STYLE('FontSize', 10)
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.ADD_PRINT_TEXT(225, 80, 160, 1, packageNumber) //绘制包裹号
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     //绘制B和P
//     if (bagCount != 0) {
//         LODOP.ADD_PRINT_TEXT(150, 100, 40, 30, bagCount + 'P')
//     }
//     if (boxCount != 0) {
//         LODOP.ADD_PRINT_TEXT(130, 100, 40, 30, boxCount + 'B')
//     }

//     LODOP.ADD_PRINT_BARCODE('0mm', '16mm', '25mm', '25mm', 'QRCode', packageNumber) //绘制二级包裹号QR条码
// }
// //打印包裹
// function PrintPackage(catalogCode, nickName, packageNumber, boxCount, bagCount, prefix, originCode, locationLabel) {
//     CreatePackagePagey(catalogCode, nickName, packageNumber, boxCount, bagCount, prefix, originCode, locationLabel)
//     LODOP.PRINT()
// };
// //预览包裹
// function PreviewPackage(catalogCode, nickName, packageNumber, boxCount, bagCount, prefix, originCode, locationLabel) {
//     CreatePackagePagey(catalogCode, nickName, packageNumber, boxCount, bagCount, prefix, originCode, locationLabel)
//     LODOP.PREVIEW()
// };

//创建自助购订单打印项
/**
weight: MAX(Weight, VolumeWeight)，订单重量和体积重取较大的；
location: 对应的自助购货架号 或者 问题订单货架号；
nickName: 会员昵称；
orderNumber: 订单号；
originCode: 代购区域，可选值为CN、TW， 默认为CN。 保留将来对台湾自助购的支持；
**/
// function CreateSelfHelpPrintPage(catalogCode, maxWeight, weight, volumeWeight, location, nickName, orderNumber, originCode, waybill) {
//     var logoStr = 'ezbuy'
//     if (catalogCode == 'AU') {
//         logoStr = 'ezbuy          .'//因为打印时会会忽略后面空格，所以需要加个点
//     }

//     if (GetOs() == 'Firefox') LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
//     LODOP.SET_LICENSES(licenceName, licence, '', '')
//     LODOP.PRINT_INIT('打印自助购订单号')
//     LODOP.SET_PRINT_PAGESIZE(1, '50mm', '30mm', 'CreateCustomPage')
//     LODOP.SET_PRINT_STYLE('FontColor', 'Black')
//     LODOP.SET_PRINT_STYLE('FontSize', 10)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial Black')
//     LODOP.SET_PRINT_STYLE('Alignment', 3)
//     LODOP.ADD_PRINT_TEXT(1, 0, 80, 22, logoStr)
//     if (originCode.toUpperCase() == 'TW') {
//         LODOP.ADD_PRINT_TEXT(2, 82, 2, 1, 'T')
//     }
//     LODOP.ADD_PRINT_TEXT(2, 92, 2, 1, 'Z')

//     var volumeTop = 19
//     var volumeLeft = 1
//     var volumeWidth = 80
//     var volumeHeight = 10
//     var volumeWeightLabel = 'V:' + volumeWeight + ' KG'
//     LODOP.SET_PRINT_STYLE('FontSize', 9)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_TEXT(volumeTop, volumeLeft, volumeWidth, volumeHeight, volumeWeightLabel) //绘制体积重

//     var weightTop = 31
//     var weightLeft = 1
//     var weightWidth = 80
//     var weightHeight = 10
//     var weightLabel = 'W:' + weight + ' KG'
//     LODOP.SET_PRINT_STYLE('FontSize', 9)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_TEXT(weightTop, weightLeft, weightWidth, weightHeight, weightLabel) //绘制重量


//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.SET_PRINT_STYLE('FontSize', 12)
//     LODOP.ADD_PRINT_TEXT(22, 104, 40, 1, location.substring(0, 2)) //绘制货架号

//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.SET_PRINT_STYLE('FontSize', 18)
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.ADD_PRINT_TEXT(16, 135, 20, 1, location.substring(2, 3))//绘制货架号

//     LODOP.SET_PRINT_STYLE('Bold', 0)
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.SET_PRINT_STYLE('FontSize', 12)
//     LODOP.ADD_PRINT_TEXT(22, 146, 30, 1, location.substring(3, location.length))//绘制货架号

//     var nickTop = 1
//     var nickLeft = 65
//     var nickWidth = 150
//     var nickHeight = 20
//     LODOP.SET_PRINT_STYLE('FontSize', 9)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     if (nickName.length > 18) nickName = nickName.substring(0, 18) + '...'
//     LODOP.ADD_PRINT_TEXT(nickTop, nickLeft, nickWidth, nickHeight, nickName) //绘制会员昵称

//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.SET_PRINT_STYLE('FontSize', 10)
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_BARCODE('13mm', '2mm', '50mm', '15mm', '128A', orderNumber) //绘制订单条码
// }
// //打印自助购订单
// function PrintSelfHelpOrder(catalogCode, maxWeight, weight, volumeWeight, location, nickName, orderNumber, originCode, waybill) {
//     CreateSelfHelpPrintPage(catalogCode, maxWeight, weight, volumeWeight, location, nickName, orderNumber, originCode, waybill)
//     LODOP.PRINT()
// };
// //预览自助购订单
// function PreviewSelfHelpOrder(catalogCode, maxWeight, weight, volumeWeight, location, nickName, orderNumber, originCode, waybill) {
//     CreateSelfHelpPrintPage(catalogCode, maxWeight, weight, volumeWeight, location, nickName, orderNumber, originCode, waybill)
//     LODOP.PREVIEW()
// };

//运单管理：打印/预览等待认领运单
// var waybillPrint = {
//     createPrint: function (catalogCode, waybill, location, originCode) {
//         var logoStr = 'ezbuy'
//         if (catalogCode == 'AU') {
//             logoStr = 'ezbuy          .'//因为打印时会会忽略后面空格，所以需要加个点
//         }

//         if (GetOs() == 'Firefox') LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
//         LODOP.SET_LICENSES(licenceName, licence, '', '')
//         LODOP.PRINT_INIT('打印等待认领包裹运单号')
//         LODOP.SET_PRINT_PAGESIZE(1, '50mm', '30mm', 'CreateCustomPage')
//         LODOP.SET_PRINT_STYLE('FontColor', 'Black')
//         LODOP.SET_PRINT_STYLE('FontSize', 10)
//         LODOP.SET_PRINT_STYLE('FontName', 'Arial Black')
//         LODOP.SET_PRINT_STYLE('Alignment', 3)
//         LODOP.ADD_PRINT_TEXT(1, 0, 80, 22, logoStr)
//         if (originCode.toUpperCase() == 'TW') {
//             LODOP.ADD_PRINT_TEXT(2, 78, 2, 1, 'T')
//         }
//         LODOP.ADD_PRINT_TEXT(2, 84, 2, 1, 'Z')
//         LODOP.SET_PRINT_STYLE('FontSize', 9)
//         LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(14, 114, 30, 1, location.substring(0, 2)) //绘制货架号
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 18)
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.ADD_PRINT_TEXT(8, 140, 20, 1, location.substring(2, 3))
//         LODOP.SET_PRINT_STYLE('Bold', 0)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(14, 156, 30, 1, location.substring(3, location.length))
//         LODOP.ADD_PRINT_BARCODE(44, 18, 160, 60, '128A', waybill) //绘制运单条码
//     },
//     printWaitingClaimWaybill: function (catalogCode, waybill, location, originCode) {
//         this.createPrint(catalogCode, waybill, location, originCode)
//         LODOP.PRINT()
//     },
//     previewWaitingClaimWaybill: function (catalogCode, waybill, location, originCode) {
//         this.createPrint(catalogCode, waybill, location, originCode)
//         LODOP.PREVIEW()
//     }
// }

// //创建二级包裹号打印项
// function CreateSubPackage(subPackageNumber, nickName, localDeliveryLocationType, boxCount, bagCount) {
//     if (GetOs() == 'Firefox') LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
//     LODOP.SET_LICENSES(licenceName, licence, '', '')
//     LODOP.PRINT_INIT('打印二级包裹号')
//     LODOP.SET_PRINT_PAGESIZE(1, '40mm', '60mm', 'CreateCustomPage')
//     LODOP.SET_PRINT_STYLE('FontColor', 'Black')
//     LODOP.SET_PRINT_STYLE('FontSize', 12)
//     LODOP.SET_PRINT_STYLE('FontName', 'Verdana')
//     LODOP.SET_PRINT_STYLE('Alignment', 1)
//     LODOP.SET_PRINT_STYLE('Angle', 90) //旋转
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.ADD_PRINT_BARCODE('-5mm', '1mm', '12mm', '60mm', '128A', subPackageNumber) //绘制包裹一维条码
//     LODOP.SET_PRINT_STYLEA(0, 'ShowBarText', 0)
//     LODOP.SET_PRINT_STYLE('FontSize', 12)
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.ADD_PRINT_TEXT(220, 60, 130, 1, nickName) //绘制会员昵称
//     LODOP.SET_PRINT_STYLE('FontSize', 10)
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.ADD_PRINT_TEXT(225, 80, 160, 1, subPackageNumber) //绘制包裹号
//     LODOP.SET_PRINT_STYLE('FontSize', 16)
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.ADD_PRINT_TEXT(220, 100, 10, 1, localDeliveryLocationType) //绘制本地派送货架区域类型
//     LODOP.SET_PRINT_STYLE('FontSize', 14)
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     //绘制B和P
//     if (bagCount != 0) {
//         LODOP.ADD_PRINT_TEXT(150, 100, 40, 30, bagCount + 'P')
//     }
//     if (boxCount != 0) {
//         LODOP.ADD_PRINT_TEXT(120, 100, 40, 30, boxCount + 'B')
//     }

//     LODOP.ADD_PRINT_BARCODE('0mm', '16mm', '25mm', '25mm', 'QRCode', subPackageNumber) //绘制二级包裹号QR条码
// }
//打印二级包裹号
// function PrintSubPackage(subPackageNumber, nickName, localDeliveryLocationType, boxCount, bagCount) {
//     CreateSubPackage(subPackageNumber, nickName, localDeliveryLocationType, boxCount, bagCount)
//     LODOP.PRINT()
// }
// //预览二级包裹号
// function PreviewSubPackage(subPackageNumber, nickName, localDeliveryLocationType, boxCount, bagCount) {
//     CreateSubPackage(subPackageNumber, nickName, localDeliveryLocationType, boxCount, bagCount)
//     LODOP.PREVIEW()
// }

/**
打印货架号Code128码
**/
//创建货架号打印项
// function CreateLocationLabelPage(locationLabel) {
//     if (GetOs() == 'Firefox')
//         LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
//     LODOP.SET_LICENSES(licenceName, licence, '', '')
//     LODOP.PRINT_INIT('打印二级包裹号')
//     LODOP.SET_PRINT_PAGESIZE(1, '40mm', '60mm', 'CreateCustomPage')
//     LODOP.SET_PRINT_STYLE('Alignment', 1)
//     LODOP.ADD_PRINT_BARCODE('10mm', '9mm', '30mm', '30mm', 'QRCode', locationLabel)
//     LODOP.SET_PRINT_STYLE('FontSize', 18)
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.ADD_PRINT_TEXT('35mm', '10mm', '50mm', '100mm', locationLabel)

// }
// //打印货架号QR Code
// function PrintLocationLabel(locationLabel) {
//     CreateLocationLabelPage(locationLabel)
//     LODOP.Print()
// }

// //预览货架号QR Code
// function PreviewLocationLabel(locationLabel) {
//     CreateLocationLabelPage(locationLabel)
//     LODOP.PREVIEW()
// }

// //打印箱号
// function PrintBoxNumber(deliveryMethod, deliveryName, boxNumber, deliveryDate) {
//     CreateBoxNumber(deliveryMethod, deliveryName, boxNumber, deliveryDate)
//     LODOP.PRINT()
// }

// //预览箱号
// function PreviewBoxNumber(deliveryMethod, deliveryName, boxNumber, deliveryDate) {
//     CreateBoxNumber(deliveryMethod, deliveryName, boxNumber, deliveryDate)
//     LODOP.PREVIEW()
// }

// //创建箱号打印项
// function CreateBoxNumber(deliveryMethod, deliveryName, boxNumber, deliveryDate) {
//     if (GetOs() == 'Firefox') {
//         LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
//     }
//     else {
//         alert('请使用火狐浏览器打印')
//         return
//     }
//     LODOP.SET_LICENSES(licenceName, licence, '', '')
//     LODOP.PRINT_INIT('打印箱号')
//     LODOP.SET_PRINT_PAGESIZE(1, '40mm', '60mm', 'CreateCustomPage')
//     LODOP.SET_PRINT_STYLE('FontColor', 'Black')
//     LODOP.SET_PRINT_STYLE('FontSize', 12)
//     LODOP.SET_PRINT_STYLE('FontName', 'Verdana')
//     LODOP.SET_PRINT_STYLE('Alignment', 1)
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.SET_PRINT_STYLE('FontSize', 14)
//     LODOP.ADD_PRINT_TEXT('10mm', '8mm', '40mm', '24mm', boxNumber.substring(7)) //绘制取货点
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     if (deliveryName.length > 34) {
//         strCenterStyle = '<style/>form {text-align: center;font-weight:Bold;font-size:12px}</style>'
//         LODOP.ADD_PRINT_HTM('15mm', '0mm', '40mm', '24mm', strCenterStyle + '<form>' + deliveryName + '</form>') //绘制取货点
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_BARCODE('35mm', '9mm', '30mm', '30mm', 'QRCode', boxNumber + ';' + deliveryMethod + ';' + deliveryName + ';' + deliveryDate) //绘制QR条码
//     } else {
//         strCenterStyle = '<style/>form {text-align: center;font-weight:Bold}</style>'
//         LODOP.ADD_PRINT_HTM('18mm', '0mm', '39mm', '24mm', strCenterStyle + '<form>' + deliveryName + '</form>') //绘制取货点
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_BARCODE('30mm', '10mm', '26mm', '26mm', 'QRCode', boxNumber + ';' + deliveryMethod + ';' + deliveryName + ';' + deliveryDate) //绘制QR条码
//     }
// }

// function PrintOrder(catalogCode, isEzbuy, weight, volumeWeight, copies, nickName, location, orderNumber,purchaseType) {
//     for (var i = 1; i <= copies; i++) {
//         CreateOrderPrint(catalogCode, isEzbuy, weight, volumeWeight, i, copies, nickName, location, orderNumber, purchaseType)
//         LODOP.PRINT()
//     }
// };
// function PreviewOrder(catalogCode, isEzbuy, weight, volumeWeight, copies, nickName, location, orderNumber, purchaseType) {
//     CreateOrderPrint(catalogCode, isEzbuy, weight, volumeWeight, 1, copies, nickName, location, orderNumber, purchaseType)
//     LODOP.PREVIEW()
// };


export function previewSellerOrderHorizontal (order, orderWarehouse, type) {
		var LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
		LODOP.SET_LICENSES(licenceName, licence, '', '')
		LODOP.PRINT_INIT('打印卖家订单号')
    LODOP.SET_PRINT_PAGESIZE(1, '50mm', '25mm', 'sellerOrderHorizontal')
    var productName = order.productName.length > 14 ? order.productName.substring(0, 14) + '...' : order.productName

		var logoTop = '0mm'
		var logoLeft = '2mm'
		var logoWidth = '48mm'
		var logoHeight = '8mm'
		LODOP.ADD_PRINT_HTM(logoTop, logoLeft, logoWidth, logoHeight, `
			<div style="color: black; font-size: 8pt;font: Arial Black;overFlow: hidden;">
				${Region[order.cusRegion]}  ${productName}
			</div>
		`)

		LODOP.SET_PRINT_STYLE('Bold', 1)
		LODOP.SET_PRINT_STYLE('FontSize', 8)
		LODOP.SET_PRINT_STYLE('Alignment', 2)
		LODOP.ADD_PRINT_BARCODE('8mm', '2mm', '55mm', '9mm', '128Auto', order.orderNum) //绘制订单条码
		var logoTop = '17mm'
		var logoLeft = '2mm'
		var logoWidth = '48mm'
		var logoHeight = '8mm'
		LODOP.ADD_PRINT_HTM(logoTop, logoLeft, logoWidth, logoHeight, `
      <div style="color: black; font-size: 8pt;font: Arial Black;overflow: hidden; border-top: 1px solid #ccc;">
        <div style="width: 50%; border-Right: 1px solid #ccc; display: inline-block;">
          ${orderWarehouse} ${Region[order.cusRegion]}
        </div>
        <div style="display: inline-block">
          ${order.orderGroupNum.substring(order.orderGroupNum.length - 9)}
        </div>
			</div>
		`)

		if (!type) {
		    LODOP.PREVIEW()
		} else {
		    LODOP.PRINT()
		}
};

export function previewSellerOrderVertical (order, orderWarehouse, type) {
		var LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
		LODOP.SET_LICENSES(licenceName, licence, '', '')
		LODOP.PRINT_INIT('打印卖家订单号')
    LODOP.SET_PRINT_PAGESIZE(2, '40mm', '60mm', 'sellerOrderVertical')
    var productName = order.productName.length > 14 ? order.productName.substring(0, 14) + '...' : order.productName
    var skuId = order.sellerSkuId.length > 25 ? order.sellerSkuId.substring(0, 25) + '...' : order.sellerSkuId
    var skuName = order.skuName

		var logoTop = '0mm'
		var logoLeft = '3mm'
		var logoWidth = '57mm'
		var logoHeight = '10mm'
		LODOP.ADD_PRINT_HTM(logoTop, logoLeft, logoWidth, logoHeight, `
			<div style="color: black; font-size: 9pt;font: Arial Black;overflow: hidden; border-bottom: 1px solid #ccc;">
      ${Region[order.cusRegion]} ${productName}
			</div>
		`)

		LODOP.SET_PRINT_STYLE('Bold', 1)
		LODOP.SET_PRINT_STYLE('FontSize', 10)
		LODOP.SET_PRINT_STYLE('Alignment', 2)
		LODOP.ADD_PRINT_BARCODE('10mm', '3mm', '50mm', '15mm', '128Auto', order.orderNum) //绘制订单条码

		var logoTop = '27mm'
		var logoLeft = '3mm'
		var logoWidth = '57mm'
		var logoHeight = '13mm'
		LODOP.ADD_PRINT_HTM(logoTop, logoLeft, logoWidth, logoHeight, `
			<div style="color: black; font-size: 9pt;font: Arial Black;overflow: hidden; border-top: 1px solid #ccc;">
        <div>${orderWarehouse}仓 ${Region[order.cusRegion]} ${order.orderGroupNum.substring(order.orderGroupNum.length - 9)}</div>
        <div style="width: 400px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${skuName}</div>
        <div>货号: ${skuId}</div>
			</div>
		`)

		if (!type) {
				LODOP.PREVIEW()
		} else {
				LODOP.PRINT()
		}
}

export function previewSellerOrder100 (order, orderWarehouse, type) {
  var LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
  LODOP.SET_LICENSES(licenceName, licence, '', '')
  LODOP.PRINT_INIT('打印卖家订单号')
  LODOP.SET_PRINT_PAGESIZE(1, '100mm', '100mm', 'sellerOrderVertical')
  var productName = order.productName.length > 50 ? order.productName.substring(0, 50) + '...' : order.productName
  var skuId = order.sellerSkuId.length > 25 ? order.sellerSkuId.substring(0, 25) + '...' : order.sellerSkuId
  var skuName =  order.skuName

  var logoTop = '5mm'
  var logoLeft = '5mm'
  var logoWidth = '95mm'
  var logoHeight = '20mm'
  LODOP.ADD_PRINT_HTM(logoTop, logoLeft, logoWidth, logoHeight, `
    <div style="color: black; font-size: 12pt;font: Arial Black;overflow: hidden; border-bottom: 1px solid #ccc;">
      ${Region[order.cusRegion]} ${productName}
    </div>
  `)

  LODOP.SET_PRINT_STYLE('Bold', 1)
  LODOP.SET_PRINT_STYLE('FontSize', 12)
  LODOP.SET_PRINT_STYLE('Alignment', 2)
  LODOP.ADD_PRINT_BARCODE('25mm', '5mm', '80mm', '30mm', '128Auto', order.orderNum) //绘制订单条码

  var logoTop = '65mm'
  var logoLeft = '5mm'
  var logoWidth = '95mm'
  var logoHeight = '35mm'
  LODOP.ADD_PRINT_HTM(logoTop, logoLeft, logoWidth, logoHeight, `
    <div style="color: black; font-size: 15pt;font: Arial Black;overflow: hidden; border-top: 1px solid #ccc;">
      <div>${orderWarehouse}仓 ${Region[order.cusRegion]}</div>
      <div>${order.orderGroupNum.substring(order.orderGroupNum.length - 9)}</div>
      <div style="width: 300px; white-space: nowrap;">${skuName}</div>
      <div>货号: ${skuId}</div>
    </div>
  `)

  if (!type) {
  		LODOP.PREVIEW()
  } else {
  		LODOP.PRINT()
  }
}

export function previewSellerOrderHorizontalOld (productName, orderNum, type) {
  var LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
  LODOP.SET_LICENSES(licenceName, licence, '', '')
  LODOP.PRINT_INIT('打印卖家订单号')
 LODOP.SET_PRINT_PAGESIZE(1, '50mm', '25mm', 'sellerOrderHorizontal')

  var logoTop = '2mm'
  var logoLeft = '2mm'
  var logoWidth = '48mm'
  var logoHeight = '8mm'
  LODOP.ADD_PRINT_HTM(logoTop, logoLeft, logoWidth, logoHeight, `
    <div style="color: black; font-size: 6pt;font: Arial Black;overFlow: hidden;">
      ${productName}
    </div>
  `)

  LODOP.SET_PRINT_STYLE('Bold', 1)
  LODOP.SET_PRINT_STYLE('FontSize', 10)
  LODOP.SET_PRINT_STYLE('Alignment', 2)
  LODOP.ADD_PRINT_BARCODE('10mm', '2mm', '50mm', '15mm', '128Auto', orderNum) //绘制订单条码

  if (!type) {
      LODOP.PREVIEW()
  } else {
      LODOP.PRINT()
  }
};

export function previewSellerOrderVerticalOld (productName, orderNum, type) {
  var LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
  LODOP.SET_LICENSES(licenceName, licence, '', '')
  LODOP.PRINT_INIT('打印卖家订单号')
  LODOP.SET_PRINT_PAGESIZE(2, '40mm', '60mm', 'sellerOrderVertical')

  var logoTop = '3mm'
  var logoLeft = '3mm'
  var logoWidth = '57mm'
  var logoHeight = '10mm'
  LODOP.ADD_PRINT_HTM(logoTop, logoLeft, logoWidth, logoHeight, `
    <div style="color: black; font-size: 9pt;font: Arial Black;overFlow: hidden;">
      ${productName}
    </div>
  `)

  LODOP.SET_PRINT_STYLE('Bold', 1)
  LODOP.SET_PRINT_STYLE('FontSize', 10)
  LODOP.SET_PRINT_STYLE('Alignment', 2)
  LODOP.ADD_PRINT_BARCODE('14mm', '3mm', '60mm', '20mm', '128Auto', orderNum) //绘制订单条码

  if (!type) {
      LODOP.PREVIEW()
  } else {
      LODOP.PRINT()
  }
}

//打印韩国卖家面单
// function PrintKoreaBill(pkg) {
//   var LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
//   LODOP.SET_LICENSES(licenceName, licence, '', '')
//   LODOP.PRINT_INIT('韩国卖家面单打印')
//   LODOP.SET_PRINT_PAGESIZE(1, '100mm', '130mm', 'KoreaBill')

//   var total = 0
//   var _style = '<style>table{ border: 1 solid #000000;border-collapse:collapse;border:hidden } td{border: 1 solid #000000;b} *{font-size:10px;font-family:\'Microsoft YaHei\' !important;padding: 0;margin: 0;}</style>'
//   var _items = pkg.items.map(item => {
//     total += item.total
//     return `
//       <tr>
//         <td></td>
//         <td></td>
//         <td>${item.destination}</td>
//         <td></td>
//         <td>${item.qty}</td>
//         <td>${item.unitType}</td>
//         <td>${item.unitPrice.toFixed(2)}</td>
//         <td>${item.total.toFixed(2)}</td>
//       </tr>`
//   })
//   var _html = `<div style="width: 100mm;height: 130mm;">
//     <table cellpadding="0" cellspacing="0" width="100%" border="1" style="border: thin; width: 100mm; height: 130mm;">
//       <thead>
//         <tr>
//           <td colspan="4">
//             <img style="width: 50mm;" src="http://qrcode.graysheep.me/create_barcode?text=${pkg.packageNumber}" alt="">
//           </td>
//           <td colspan="3">
//             <p>${pkg.username}<p>
//             <p>0B1P</p>
//             <p>${pkg.packageNumber}</p>
//           </td>
//           <td colspan="1">
//             <img style="width: 20mm;" src="http://sg-en-web-api.ezbuy.sg/api/qrgenerator?data=${pkg.packageNumber}" alt="">
//           </td>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td colspan="4">Invoice No:   ${pkg.subPkgNumbers[0]}</td>
//           <td colspan="4">Date of Exportation: ${pkg.warehouse.exportDate}</td>
//         </tr>
//         <tr>
//           <td colspan="4">COUNTRY OF ORIGIN: ${pkg.warehouse.originCountry}</td>
//           <td colspan="4">DESTINATION: ${pkg.warehouse.destination}</td>
//         </tr>
//         <tr>
//           <td colspan="4">
//             <div>SHIPPER/EXPORTER</div>
//             <div>Contat Person: ${pkg.sender.username}</div>
//             <div>Add: ${pkg.sender.address}</div>
//             <div>ZIP CODE: ${pkg.sender.ZIPCode}</div>
//             <div>PHONE: ${pkg.sender.mobile}</div>
//           </td>
//           <td colspan="4">
//             <div>Consignee</div>
//             <div>Contact Person: ${pkg.receiver.username}</div>
//             <div>Add: ${pkg.receiver.address}</div>
//             <div>ZIP Code: ${pkg.receiver.ZIPCode}</div>
//             <div>Phone: ${pkg.receiver.mobile}</div>
//           </td>
//         </tr>
//         <tr>
//           <td>Marks NOS.</td>
//           <td>NO.OF PKG(S)</td>
//           <td>FULL DESC OF GOODS</td>
//           <td>HS CODE</td>
//           <td>QTY</td>
//           <td>UNIT TYPE</td>
//           <td>UNIT VALUE</td>
//           <td>TOTAL VALUE</td>
//         </tr>
//         ${_items}
//         <tr>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td colSpan="4">Total CIF Value</td>
//           <td>${total.toFixed(2)}</td>
//         </tr>
//       </tbody>
//     </table>
//   </div>`
//   LODOP.ADD_PRINT_HTM(0, 0, '100mm', '130mm', _style +  _html)
//   LODOP.Print()
// }

// function CreateOrderPrint(catalogCode, isEzbuy, weight, volumeWeight, indexOfCopies, copies, nickName, location, orderNumber, purchaseType) {
//     var logoStr = 'ezbuy'
//     if (catalogCode == 'AU') {
//         logoStr = 'ezbuy          .'//因为打印时会会忽略后面空格，所以需要加个点
//     }
//     if (catalogCode == 'TH') {
//         logoStr = ''// 泰国干掉logo
//     }
//     if (GetOs() == 'Firefox') LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
//     LODOP.SET_LICENSES(licenceName, licence, '', '')
//     LODOP.PRINT_INIT('打印订单号')
//     LODOP.SET_PRINT_PAGESIZE(1, '50mm', '30mm', 'CreateCustomPage')

//     var logoTop = 1
//     var logoLeft = 1
//     var logoWidth = 80
//     var logoHeight = 20
//     LODOP.SET_PRINT_STYLE('FontColor', 'Black')
//     LODOP.SET_PRINT_STYLE('FontSize', 10)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial Black')
//     LODOP.SET_PRINT_STYLE('Alignment', 3)
//     LODOP.ADD_PRINT_TEXT(logoTop, logoLeft, logoWidth, logoHeight, logoStr)//绘制LOGO

//     var nickTop = 1
//     var nickLeft = 45
//     var nickWidth = 150
//     var nickHeight = 20
//     LODOP.SET_PRINT_STYLE('FontSize', 9)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     if (nickName.length > 18) nickName = nickName.substring(0, 18) + '...'
//     LODOP.ADD_PRINT_TEXT(nickTop, nickLeft, nickWidth, nickHeight, nickName) //绘制会员昵称

//     if (isEzbuy != 'Y') {
//         var volumeTop = 20
//         var volumeLeft = 1
//         var volumeWidth = 80
//         var volumeHeight = 10
//         var volumeWeightLabel = 'V:' + volumeWeight + ' KG'
//         LODOP.SET_PRINT_STYLE('FontSize', 9)
//         LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.ADD_PRINT_TEXT(volumeTop, volumeLeft, volumeWidth, volumeHeight, volumeWeightLabel) //绘制体积重

//         var weightTop = 30
//         var weightLeft = 1
//         var weightWidth = 90
//         var weightHeight = 10
//         var weightLabel = 'W:' + weight + ' KG'
//         LODOP.SET_PRINT_STYLE('FontSize', 9)
//         LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.ADD_PRINT_TEXT(weightTop, weightLeft, weightWidth, weightHeight, weightLabel) //绘制重量
//     }

//     var copiesTop = 27
//     var copiesLeft = 70
//     var copiesWidth = 50
//     var copiesHeight = 20
//     LODOP.SET_PRINT_STYLE('FontSize', 10)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial Black')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_TEXT(15, 65, 50, 20, indexOfCopies)//绘制份数分子
//     LODOP.ADD_PRINT_TEXT(22, 70, 45, 20, '——')
//     LODOP.ADD_PRINT_TEXT(30, 65, 50, 20, copies)//绘制份数分母
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Bold', 0)
//     if (location.length == 5) {//5位货架，prime放大第二、第三个字母
//         if (purchaseType == 'Prime') {
//             LODOP.SET_PRINT_STYLE('Alignment', 2)
//             LODOP.SET_PRINT_STYLE('FontSize', 12)
//             LODOP.SET_PRINT_STYLE('Bold', 0)
//             LODOP.ADD_PRINT_TEXT(19, 88, 45, 1, location.substring(0, 1)) //绘制货架号
//             LODOP.SET_PRINT_STYLE('Alignment', 2)
//             LODOP.SET_PRINT_STYLE('FontSize', 18)
//             LODOP.SET_PRINT_STYLE('Bold', 1)
//             LODOP.ADD_PRINT_TEXT(15, 103, 45, 1, location.substring(1, 2)) //绘制货架号
//             LODOP.SET_PRINT_STYLE('Alignment', 2)
//             LODOP.SET_PRINT_STYLE('FontSize', 18)
//             LODOP.SET_PRINT_STYLE('Bold', 1)
//             LODOP.ADD_PRINT_TEXT(15, 129, 20, 1, location.substring(2, 3))
//             LODOP.SET_PRINT_STYLE('Alignment', 2)
//             LODOP.SET_PRINT_STYLE('FontSize', 12)
//             LODOP.SET_PRINT_STYLE('Bold', 0)
//             LODOP.ADD_PRINT_TEXT(19, 145, 20, 1, location.substring(3, 4))
//             LODOP.SET_PRINT_STYLE('Bold', 0)
//             LODOP.SET_PRINT_STYLE('Alignment', 2)
//             LODOP.SET_PRINT_STYLE('FontSize', 12)
//             LODOP.ADD_PRINT_TEXT(19, 162, 20, 1, location.substring(4, location.length))
//         } else {
//             LODOP.SET_PRINT_STYLE('Alignment', 2)
//             LODOP.SET_PRINT_STYLE('FontSize', 12)
//             LODOP.ADD_PRINT_TEXT(19, 95, 45, 1, location.substring(0, 2)) //绘制货架号
//             LODOP.SET_PRINT_STYLE('Alignment', 2)
//             LODOP.SET_PRINT_STYLE('FontSize', 18)
//             LODOP.SET_PRINT_STYLE('Bold', 1)
//             LODOP.ADD_PRINT_TEXT(15, 129, 20, 1, location.substring(2, 3))
//             LODOP.SET_PRINT_STYLE('Alignment', 2)
//             LODOP.SET_PRINT_STYLE('FontSize', 12)
//             LODOP.SET_PRINT_STYLE('Bold', 0)
//             LODOP.ADD_PRINT_TEXT(19, 145, 20, 1, location.substring(3, 4))
//             LODOP.SET_PRINT_STYLE('Bold', 1)
//             LODOP.SET_PRINT_STYLE('Alignment', 2)
//             LODOP.SET_PRINT_STYLE('FontSize', 18)
//             LODOP.ADD_PRINT_TEXT(15, 162, 20, 1, location.substring(4, location.length))
//         }
//     }
//     else if (location.length == 7 || location.length == 6) {
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 15)
//         LODOP.ADD_PRINT_TEXT(21, 115, 10, 0, location.substring(2, 3))
//         LODOP.SET_PRINT_STYLE('Bold', 0)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(23, 124, 20, 1, location.substring(3, 4))
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 15)
//         LODOP.ADD_PRINT_TEXT(20, 139, 20, 1, location.substring(4, 5))
//         LODOP.SET_PRINT_STYLE('Bold', 0)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(23, 146, 45, 0, location.substring(5, location.length))
//     }
//     else if (location.length >= 10) {
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(21, 100, 10, 5, location.substring(2, 3))
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 15)
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.ADD_PRINT_TEXT(20, 110, 20, 1, location.substring(3, 4))
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 15)
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.ADD_PRINT_TEXT(20, 125, 20, 1, location.substring(4, 5))
//         LODOP.SET_PRINT_STYLE('Bold', 0)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 11)
//         LODOP.ADD_PRINT_TEXT(22, 132, 60, 0, location.substring(5, location.length))
//     }
//     else {//4位货架，放大第二个字母
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(19, 130, 10, 1, location.substring(0, 1)) //绘制货架号
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 18)
//         LODOP.SET_PRINT_STYLE('Bold', 1)
//         LODOP.ADD_PRINT_TEXT(13, 142, 20, 1, location.substring(1, 2))
//         LODOP.SET_PRINT_STYLE('Bold', 0)
//         LODOP.SET_PRINT_STYLE('Alignment', 2)
//         LODOP.SET_PRINT_STYLE('FontSize', 12)
//         LODOP.ADD_PRINT_TEXT(19, 156, 30, 1, location.substring(2, location.length))
//     }

//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.SET_PRINT_STYLE('FontSize', 10)
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_BARCODE('13mm', '2mm', '50mm', '15mm', '128A', orderNumber) //绘制订单条码
// }
// //

// function PrintFlawOrder(productName, shipperName, wayBillNumber, locationLabel, qty, printDate) {
//     CreateFlawOrderPrint(productName, shipperName, wayBillNumber, locationLabel, qty, printDate)
//     LODOP.PRINT()
// }

// function PreviewFlawOrder(productName, shipperName, wayBillNumber, locationLabel, qty, printDate) {
//     CreateFlawOrderPrint(productName, shipperName, wayBillNumber, locationLabel, qty, printDate)
//     LODOP.PREVIEW()
// }

// function CreateFlawOrderPrint(productName, shipperName, wayBillNumber, locationLabel, qty, printDate) {
//     var logoStr = 'ezbuy问题件'

//     if (GetOs() == 'Firefox') LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'))
//     LODOP.SET_LICENSES(licenceName, licence, '', '')
//     LODOP.PRINT_INIT('打印问题件')
//     LODOP.SET_PRINT_PAGESIZE(1, '50mm', '30mm', 'CreateCustomPage')

//     var logoTop = 10
//     var logoLeft = 0
//     var logoWidth = 80
//     var logoHeight = 10
//     LODOP.SET_PRINT_STYLE('FontSize', 9)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_TEXT(logoTop, logoLeft, logoWidth, logoHeight, logoStr)//绘制LOGO

//     var nickTop = 10
//     var nickLeft = 65
//     var nickWidth = 80
//     var nickHeight = 10
//     LODOP.SET_PRINT_STYLE('FontSize', 9)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_TEXT(nickTop, nickLeft, nickWidth, nickHeight, printDate)

//     var nickTop = 10
//     var nickLeft = 120
//     var nickWidth = 80
//     var nickHeight = 10
//     LODOP.SET_PRINT_STYLE('Bold', 1)
//     LODOP.SET_PRINT_STYLE('FontSize', 9)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_TEXT(nickTop, nickLeft, nickWidth, nickHeight, locationLabel)

//     var nickTop = 35
//     var nickLeft = 10
//     var nickWidth = 120
//     var nickHeight = 10
//     LODOP.SET_PRINT_STYLE('FontSize', 12)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_TEXT(nickTop, nickLeft, nickWidth, nickHeight, productName)

//     var nickTop = 35
//     var nickLeft = 120
//     var nickWidth = 40
//     var nickHeight = 10
//     LODOP.SET_PRINT_STYLE('FontSize', 12)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_TEXT(nickTop, nickLeft, nickWidth, nickHeight, 'Qty:')

//     var nickTop = 35
//     var nickLeft = 143
//     var nickWidth = 50
//     var nickHeight = 10
//     LODOP.SET_PRINT_STYLE('FontSize', 12)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_TEXT(nickTop, nickLeft, nickWidth, nickHeight, qty)

//     var nickTop = 70
//     var nickLeft = 60
//     var nickWidth = 60
//     var nickHeight = 10
//     LODOP.SET_PRINT_STYLE('Bold', 0)
//     LODOP.SET_PRINT_STYLE('FontSize', 9)
//     LODOP.SET_PRINT_STYLE('FontName', '宋体')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_TEXT(nickTop, nickLeft, nickWidth, nickHeight, shipperName)

//     var nickTop = 90
//     var nickLeft = 1
//     var nickWidth = 180
//     var nickHeight = 10
//     LODOP.SET_PRINT_STYLE('FontSize', 9)
//     LODOP.SET_PRINT_STYLE('FontName', 'Arial')
//     LODOP.SET_PRINT_STYLE('Alignment', 2)
//     LODOP.ADD_PRINT_TEXT(nickTop, nickLeft, nickWidth, nickHeight, wayBillNumber)

//     /*
//     LODOP.ADD_PRINT_BARCODE(80, 10, 180, 30, "128A", wayBillNumber); //绘制条码
//     //LODOP.SET_PRINT_STYLEA(0, "Horient", 2);
//     LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0);
//     */
// }

