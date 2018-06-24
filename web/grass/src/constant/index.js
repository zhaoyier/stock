export const COUNTRY_CODE_MAP = {
  '马来西亚': 'MY',
  '印度尼西亚': 'ID',
  '澳洲': 'AU',
  '新加坡': 'SG',
  '泰国': 'TH',
  'MY': '马来西亚',
  'ID': '印度尼西亚',
  'AU': '澳洲',
  'SG': '新加坡',
  'TH': '泰国',
  'CN': '中国',
  'TW': '台湾',
  'US': '美国',
  'MYLocal': '马来本地',
  'SGLocal': '新家坡本地'
}

export const SHIPMENT_INFO = {
  1: '标准',
  2: '敏感'
}
export const MONEY_MAP = {
  MYLocal: 'RM',
  SGLocal: 'S$'
}
export const NET_MAP = {
  MYLocal: {
    uat: 'http://my.65emall.net/Product/Detail',
    production: 'https://ezbuy.my/Product/Detail'
  },
  SGLocal: {
    uat: 'http://sg.65emall.net/Product/Detail',
    production: 'https://ezbuy.sg/Product/Detail'
  }
}
export const QINIU_UPLOAD_URL = 'https://up.qbox.me'
export const EXPRESS = {
  'CN': [
    '顺丰快递',
    '申通快递',
    '圆通快递',
    '中通快递',
    '汇通快递',
    '韵达快递',
    '天天快递',
    '邮政EMS',
    '全峰快递',
    '优速快递',
    '百世快递',
    '快捷快递',
    '安能物流',
    '速尔快递',
    '龙邦物流',
    '国通快递',
    '宅急送',
    '亚风快运',
    '晨光物流',
    '大恩物流',
    '信丰快递',
    '京广快递',
    '安能快递',
    '运通中港快递',
    '高铁快递',
    '德邦物流',
    '其他'
  ],
  'US': [
    'UPS',
    'USPS',
    'AMAZON LOGISTIC',
    'FEDEX',
    'ONTRAC',
    'DHL',
    '自己送货',
    'OTHERS'
  ]
}
export const BANKS = [
  '民生银行',
  '华夏银行',
  '招商银行',
  '浦发银行',
  '兴业银行',
  '工商银行',
  '交通银行',
  '建设银行',
  '北京银行',
  '平安银行',
  '南京银行',
  '中国银行',
  '光大银行',
  '宁波银行',
  '中信银行',
  '农业银行',
  '常熟农村商业银行',
  '中国邮政储蓄银行',
  '农村商业银行'
]

/*
  _EXPRESS === 快递地址
*/

export const GZ_ADDRESS_INFO = {
  title: '东莞仓库',
  content: '东莞市凤岗镇竹塘村骏宇混凝土有限公司下坡直走200米102室（程天装饰公司）',
  receiver: '万哲威',
  phone: '13267306294'
}
export const GZ_ADDRESS_INFO_EXPRESS = {
  title: '东莞仓库',
  content: '东莞市凤岗镇竹塘村骏宇混凝土有限公司下坡直走200米102室（程天装饰公司）',
  receiver: '万哲威',
  phone: '13267306294'
}
export const SH_ADDRESS_INFO = {
  title: '嘉兴仓库',
  content: '浙江省嘉兴市南湖区城南街道朝晖路356号一楼',
  receiver: '年小熊',
  phone: '13052341634'
}
export const SH_ADDRESS_INFO_EXPRESS = {
  title: '嘉兴仓库',
  content: '浙江省嘉兴市南湖区城南街道朝晖路1111号（圆通快递对面）',
  receiver: '沈慧',
  phone: '17858306423'
}
export const US_ADDRESS_INFO = {
  title: 'ezbuy warehouse',
  content: '8080 SW Cirrus Drive Beaverton, OR 97008',
  receiver: 'Ezseller',
  phone: '3103824836'
}
