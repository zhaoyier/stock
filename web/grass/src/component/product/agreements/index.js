import ChineseAgreements from './chineseAgreements'
import MyAgreements from './myAgreements'
import SgAgreements from './sgAgreements'
import KrAgreements from './krAgreements'

function getAgreements (originCode) {
  switch (originCode) {
    case 'CN':
      return <ChineseAgreements />
    case 'KR':
      return <KrAgreements />
    case 'SGLocal':
      return <SgAgreements />
    case 'MYLocal':
      return <MyAgreements />
    default:
      return <ChineseAgreements />
  }
}

export default getAgreements
