export const initData = {
  pid: 0,
  categoryId: 0,
  name: "",
  enName: "",
  description: "",
  primaryImage: "",
  isStocked: true,
  isOnSale: true,
  attributes: {},
  saleRegion: [],
  originCode: "CN",
  shipmentInfo: 1,
  images: [],
  sellType: 1,
  url: "",
  source: 1,
  skuProps: []
};

export const singleProductSku = {
  skuId: 0,
  name: "single",
  isOnSale: true,
  originalPrice: 0,
  shipmentInfo: 1,
  // shippingFee: "",
  price: 0,
  quantity: 0,
  sellerSkuId: "",
  weight: 0,
  volume: {
  },
  attributes: {},
  sellType: 1,
  url: "",
};

export const countryUnit = {
  "CN": "￥",
  "SGLocal": "S$",
  "MYLocal": "RM",
  "US": "$",
  // "KR": "₩"
  "KR": "W",
};

export const valueOptions = {
  fixed: [],
  multi: [],
  single: [],
};

export const errorStyle = {
  // border: "1px solid #f00"
};

export const Entrance = {
  checkProduct: "checkProduct",
  bundleEdit: "bundleEdit",
  importEdit: "importEdit",
};
