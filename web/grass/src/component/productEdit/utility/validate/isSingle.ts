// helper
import { productSkuRule } from "./productSkuValidate";

import { errorStyle } from "../constant";

const style = errorStyle;

const isSingle = (productSkus, self, getText) => {
	if (productSkus[0].price > productSkus[0].originalPrice) {
		return message => {
			message.error(getText("Selling price is more than retail price"));
		};
	}
	if (productSkuRule("sellerSkuId", productSkus[0].sellerSkuId)) {
		return message => {
			message.error("sellerSkuId is not empty");
			const errorStyle = { sellerSkuId: style };
			self.setState({ errorStyle });
		};
	}
	if (productSkuRule("originalPrice", productSkus[0].originalPrice)) {
		return message => {
			message.error("originalPrice");
			const errorStyle = { originalPrice: style };
			self.setState({ errorStyle });
		};
	}
	if (productSkuRule("price", productSkus[0].price)) {
		return message => {
			message.error(getText("Selling price is necessary"));
			const errorStyle = { price: style };
			self.setState({ errorStyle });
		};
	}
	if (productSkuRule("quantity", productSkus[0].quantity)) {
		return message => {
			message.error(getText("Current stock is necessary"));
			const errorStyle = { quantity: style };
			self.setState({ errorStyle });
		};
	}
	if (productSkuRule("shippingFee", productSkus[0].shippingFee)) {
		return message => {
			message.error("shippingFee");
			const errorStyle = { shippingFee: style };
			self.setState({ errorStyle });
		};
	}
	if (productSkuRule("weight", productSkus[0].weight)) {
		return message => {
			message.error(getText("weight is not 0"));
			const errorStyle = { weight: style };
			self.setState({ errorStyle });
		};
	}
	if (productSkuRule("length", productSkus[0].volume.length)) {
		return message => {
			message.error(getText("length is not 0"));
			const errorStyle = { length: style };
			self.setState({ errorStyle });
		};
	}
	if (productSkuRule("width", productSkus[0].volume.width)) {
		return message => {
			message.error(getText("width is not 0"));
			const errorStyle = { width: style };
			self.setState({ errorStyle });
		};
	}
	if (productSkuRule("height", productSkus[0].volume.height)) {
		return message => {
			message.error(getText("height is not 0"));
			const errorStyle = { height: style };
			self.setState({ errorStyle });
		};
	}
};

export default isSingle;
