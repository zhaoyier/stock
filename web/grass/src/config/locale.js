import zh from './locales/zh'
import en from './locales/en'

export const getCoin = (originCode) => {
  switch(originCode) {
    case 'KR':
      return '₩'
    case 'SGLocal':
      return 'S$'
    case 'MYLocal':
      return 'M$'
    case 'US':
      return "$"
    default:
      return '￥'
  }
}

export const locale = (originCode) => {
  const resource = originCode === 'CN' ? zh : en
  return (key, showCoin= false) => {
    const value = showCoin ? `${resource[key] || key} (${getCoin(originCode)})` : (resource[key] || key)
    return value || key
  }
}
