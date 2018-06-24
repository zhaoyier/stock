import { errorStyle } from "../constant";
import isSingle from "./isSingle";
import isNotSingle from "./isNotSingle";

function validateData(self, data, getText) {
  const productData = data.productData;
  const productSkus = data.productSkus;
  if (productData.categoryId === 0) {
    return message => {
      message.error("必须要选择类目");
      self.setState({ errorCategory: errorStyle });
    };
  }
  if (productData.name === "") {
    return message => {
      message.error(getText("Product name is necessary"));
      self.setState({ errorName: errorStyle });
    };
  }
  if (productData.images.length === 0) {
    return message => {
      message.error(getText("Product picture is necessary"));
      self.setState({ errorProductImage: errorStyle });
    };
  }
  let singleOrNot: any = null;
  if (self.state.isSingleProduct) {
    // 单品验证
    singleOrNot = isSingle(productSkus, self, getText);
  } else {
    // SKU验证
    singleOrNot = isNotSingle(productSkus, self, getText);
  }
  if (singleOrNot) {
    return singleOrNot;
  }
  if (productData.description === "") {
    return message => {
      message.error(getText("Product detail is necessary"));
      self.setState({ errorDescription: errorStyle });
    };
  }
}

export { validateData };