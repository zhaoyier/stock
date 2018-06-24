/* global getCLodop, CLODOP, is64IE */
/* eslint-disable consistent-return, 0 */
import * as Cookies from 'js-cookie'
import { locale } from '../../config/locale'

let CreatedOKLodop7766 = null

function getOriginCode() {
  let accountInfo
  try {
    accountInfo = JSON.parse(Cookies.get('data'))
  }
  catch(e) {
    accountInfo = {}
  }
  return (accountInfo && accountInfo.shop && accountInfo.shop.originCode) || 'CN'
}

const getText = locale(getOriginCode())
const printTips = document.getElementById('printTips')

// 使用打印代码之前，必须执行此函数，注入打印脚本
// 可以放在组件的 componentDidMount 的时候调用
export function injectPrintScript() {
	const head =
		document.head || document.getElementsByTagName('head')[0] || document.documentElement
	let oscript = document.createElement('script')
	oscript.src = 'https://localhost:8443/CLodopfuncs.js'
	head.insertBefore(oscript, head.firstChild)
}

//= ===判断是否需要安装CLodop云打印服务器:====
export function needCLodop() {
	try {
		const ua = navigator.userAgent
		if (ua.match(/Windows\sPhone/i) != null) return true
		if (ua.match(/iPhone|iPod/i) != null) return true
		if (ua.match(/Android/i) != null) return true
		if (ua.match(/Edge\D?\d+/i) != null) return true

		const verTrident = ua.match(/Trident\D?\d+/i)
		const verIE = ua.match(/MSIE\D?\d+/i)
		let verOPR = ua.match(/OPR\D?\d+/i)
		let verFF = ua.match(/Firefox\D?\d+/i)
		const x64 = ua.match(/x64/i)
		if (verTrident == null && verIE == null && x64 !== null) return true
		else if (verFF !== null) {
			verFF = verFF[0].match(/\d+/)
			if ( verFF &&  parseFloat(verFF[0]) >= 42 || x64 !== null) return true
		} else if (verOPR !== null) {
			verOPR = verOPR[0].match(/\d+/)
			if ( verOPR && parseFloat(verOPR[0]) >= 32) return true
		} else if (verTrident == null && verIE == null) {
			let verChrome = ua.match(/Chrome\D?\d+/i)
			if (verChrome !== null) {
				verChrome = verChrome[0].match(/\d+/)
				if ( verChrome && parseFloat(verChrome[0]) >= 42) return true
			}
		}
		return false
	} catch (err) {
		return true
	}
}

//= ===获取LODOP对象的主过程：====
export function getLodop(oOBJECT, oEMBED) {
	const strHtmInstall =
    `<br>
    <font color=\'#FF00FF\'>
      ${getText('Print control is not installed. Click here')}
      <a href=\'install_lodop32.exe\' target=\'_self\'>
        ${getText('Proceed to install')}
      </a>
      ,${getText('Please refresh the page or re-enter the page after the upgrade')}。
    </font>`
	const strHtmUpdate =
		`<br>
    <font color=\'#FF00FF\'>
      ${getText('Print controls need to be upgraded. Click here')}
      <a href=\'install_lodop32.exe\' target=\'_self\'>
        ${getText('Proceed to upgrade')}
      </a>
      ,${getText('Please re-enter the page after the upgrade')}。
    </font>`
	const strHtm64_Install =
		`<br>
    <font color=\'#FF00FF\'>
      ${getText('Print control is not installed. Click here')}
      <a href=\'install_lodop64.exe\' target=\'_self\'>
        ${getText('Proceed to install')}
      </a>
      ,${getText('Please refresh the page or re-enter the page after the upgrade')}。
    </font>`
	const strHtm64_Update =
		`<br>
    <font color=\'#FF00FF\'>
      ${getText('Print controls need to be upgraded. Click here')}
      <a href=\'install_lodop64.exe\' target=\'_self\'>
        ${getText('Proceed to upgrade')}
      </a>
      ,${getText('Please re-enter the page after the upgrade')}。
    </font>`
	const strHtmFireFox =
		`<br>
    <br>
    <font color=\'#FF00FF\'>
      ${getText('Note: if you have installed Lodop')}
    </font>`
	const strHtmChrome =
    `<br>
    <br>
    <font color=\'#FF00FF\'>
      ${getText('If it had been normal and only had problems')}
  </font>`
	const strCLodopInstall =
		`<br>
    <font color=\'#FF00FF\'>
      ${getText('Clodop Cloud printing service(localhost) has not been activated! Please click here')}
      <a href=\'/asset/CLodop_Setup_for_Win32NT_https_3.028Extend.zip\' download=\'Seller_CLodop_3.028.zip\'>
       ${getText('Proceed to install')}
      </a>
      ,${getText('Please refresh the page or re-enter the page after the upgrade')}。
    </font>`
	const strCLodopUpdate =
		`<br>
    <font color=\'#FF00FF\'>
      ${getText('Upgrade is needed for CLodop cloud printing service! Please Click here')}
      <a href=\'/asset/CLodop_Setup_for_Win32NT_https_3.028Extend.zip\' download=\'Seller_CLodop_3.028.zip\'>
        ${getText('Proceed to upgrade')}
      </a>
      ,${getText('Please re-enter the page after the upgrade')}。
    </font>`
	let LODOP
	try {
		const isIE =
			navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.indexOf('Trident') >= 0
		if (needCLodop()) {
			try {
				LODOP = getCLodop()
			} catch (err) {
				console.error(err)
			}
			if (!LODOP && document.readyState !== 'complete') {
				alert(getText('C-Lodop is not ready yet, please try again later'))
				return
			}
			if (!LODOP) {
				if (isIE) printTips.write(strCLodopInstall)
				else {
					printTips.innerHTML = strCLodopInstall
				}
				return
			} else {
				if (CLODOP.CVERSION < '2.1.0.2') {
					if (isIE) printTips.write(strCLodopUpdate)
					else {
						printTips.innerHTML = strCLodopUpdate
					}
				}
				if (oEMBED && oEMBED.parentNode) {
					oEMBED.parentNode.removeChild(oEMBED)
				}
				if (oOBJECT && oOBJECT.parentNode) {
					oOBJECT.parentNode.removeChild(oOBJECT)
				}
			}
		} else {
			const is64IE = isIE && navigator.userAgent.indexOf('x64') >= 0
			//= ====如果页面有Lodop就直接使用，没有则新建:==========
			if (oOBJECT !== undefined || oEMBED !== undefined) {
				if (isIE) LODOP = oOBJECT
				else LODOP = oEMBED
			} else if (CreatedOKLodop7766 == null) {
				LODOP = document.createElement('object')
				LODOP.setAttribute('width', '0')
				LODOP.setAttribute('height', '0')
				LODOP.setAttribute(
					'style',
					'position:absolute;left:0px;top:-100px;width:0px;height:0px;'
				)
				if (isIE) {
					LODOP.setAttribute(
						'data-classid',
						'clsid:2105C259-1E0C-4534-8141-A753534CB4CA'
					)
				} else LODOP.setAttribute('type', 'application/x-print-lodop')
				document.documentElement.appendChild(LODOP)
				CreatedOKLodop7766 = LODOP
			} else LODOP = CreatedOKLodop7766
			//= ====Lodop插件未安装时提示下载地址:==========
			if (LODOP == null || typeof LODOP.VERSION === 'undefined') {
				if (navigator.userAgent.indexOf('Chrome') >= 0) {
					document.documentElement.innerHTML =
						strHtmChrome + document.documentElement.innerHTML
				}
				if (navigator.userAgent.indexOf('Firefox') >= 0) {
					document.documentElement.innerHTML =
						strHtmFireFox + document.documentElement.innerHTML
				}
				if (is64IE) document.write(strHtm64_Install)
				else if (isIE) document.write(strHtmInstall)
				else {
					document.documentElement.innerHTML =
						strHtmInstall + document.documentElement.innerHTML
				}
				return LODOP
			}
		}
		if (LODOP.VERSION < '6.2.1.7') {
			if (needCLodop()) {
				printTips.innerHTML = strCLodopUpdate
			} else if (is64IE) document.write(strHtm64_Update)
			else if (isIE) document.write(strHtmUpdate)
			else {
				document.documentElement.innerHTML =
					strHtmUpdate + document.documentElement.innerHTML
			}
			return LODOP
		}
		//= ==如下空白位置适合调用统一功能(如注册语句、语言选择等):===

		//= ==========================================================
		return LODOP
	} catch (err) {
		alert('getLodop error:' + err)
	}
}
