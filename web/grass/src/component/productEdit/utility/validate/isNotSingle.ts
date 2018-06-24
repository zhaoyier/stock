import { errorStyle } from "../constant";

// help
import { productSkuRule } from "./productSkuValidate";


const style = errorStyle;
const isNotSingle = (productSkus, self, getText) => {
  if (productSkus.length === 0) {
    return message => {
      message.error(getText("Please select SKU details"));
    };
  } else {
    for (let i = 0; i < productSkus.length; i++) {
      let single = productSkus[i];

      // 如果不售卖该sku，则跳过
      if (!single.isOnSale) {
        continue;
      }
      if (single.price > single.originalPrice) {
        return message => {
          message.error(getText("Selling price is more than retail price"));
        };
      }
      if (productSkuRule("sellerSkuId", single.sellerSkuId)) {
        return message => {
          message.error("sellerSkuId is not empty");
          const errorStyle = { sellerSkuId: style };
          self.setState({
            errorStyle,
            errorRow: i
          });
        };
      }
      if (productSkuRule("originalPrice", single.originalPrice)) {
        return message => {
          message.error(getText("originalPrice is not empty"));
          const errorStyle = { originalPrice: style };
          self.setState({
            errorStyle,
            errorRow: i
          });
        };
      }
      if (productSkuRule("price", single.price)) {
        return message => {
          message.error(getText("Selling price is necessary"));
          const errorStyle = { price: style };
          self.setState({
            errorStyle,
            errorRow: i
          });
        };
      }
      if (productSkuRule("quantity", single.quantity)) {
        return message => {
          message.error(getText("Current stock is necessary"));
          const errorStyle = { quantity: style };
          self.setState({
            errorStyle,
            errorRow: i
          });
        };
      }
      if (productSkuRule("shippingFee", single.shippingFee)) {
        return message => {
          message.error("shippingFee is not empty");
          const errorStyle = { shippingFee: style };
          self.setState({
            errorStyle,
            errorRow: i
          });
        };
      }
      if (productSkuRule("weight", single.weight)) {
        return message => {
          message.error(getText("weight is not 0"));
          const errorStyle = { weight: style };
          self.setState({
            errorStyle,
            errorRow: i
          });
        };
      }
      if (productSkuRule("length", single.volume.length)) {
        return message => {
          message.error(getText("length is not 0"));
          const errorStyle = { length: style };
          self.setState({
            errorStyle,
            errorRow: i
          });
        };
      }
      if (productSkuRule("width", single.volume.width)) {
        return message => {
          message.error(getText("width is not 0"));
          const errorStyle = { width: style };
          self.setState({
            errorStyle,
            errorRow: i
          });
        };
      }
      if (productSkuRule("height", single.volume.height)) {
        return message => {
          message.error(getText("height is not 0"));
          const errorStyle = { height: style };
          self.setState({
            errorStyle,
            errorRow: i
          });
        };
      }
    }
  }
};

export default isNotSingle;

