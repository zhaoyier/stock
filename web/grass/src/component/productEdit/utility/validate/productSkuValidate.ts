//  统一单品非单品所有SKU 验证规则
// 字段目前不校验: validate = false

export const productSkuRule = (type, value) => {
	let validate = false;
	switch (type) {
		case "sellerSkuId":
			validate = false;
			break;
		case "originalPrice":
			// validate = false;
			validate = value <= 0;
			break;
		case "price":
			validate = value <= 0;
			break;
		case "quantity":
			validate = value <= 0;
			break;
		case "shippingFee":
			validate = false;
			break;
		case "weight":
			validate = value <= 0;
			break;
		case "length":
			validate = false;
			// validate = value === 0;
			break;
		case "width":
			validate = false;
			// validate = value === 0;
			break;
		case "height":
			validate = false;
			// validate = value === 0;
			break;
	}
	return validate;
};
