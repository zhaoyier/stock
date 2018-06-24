import { findWholeSkuAttrByName } from "./findTranslationBySkuValueName";
import { customSkuAttr } from "./customSkuAttr";
import {
  productGet,
  getCategory,
  productSelected,
  bundleProductGet,
  productChange,
  productSkusChange,
  userImportSubTaskProductDetail,
  // setValueOptions,
} from "../../../../action/productManage";

// 这个方法写的有点挫，记得改
export const differentEntrance = (dispatch, categoryId, pid, valueOptions, self) => {
  function callback(base, skus) {
    let newSelected: any = [];
    let skuProps = base.skuProps;
    if (skus.length === 1 && skus[0].name === "single") {
      // 单品
      self.setState({
        isSingleProduct: true
      });
    } else {
      // 非单品
      let data = [];
      if (valueOptions) {
        data = customSkuAttr(valueOptions.multi, skuProps);
      }
      for (let i = 0; i < skuProps.length; i++) {
        let temp: any = {};
        let result = findWholeSkuAttrByName(skuProps, data, skuProps[i].propName);
        if (result === false) {
          return;
        }
        temp[skuProps[i].propName] = result.result;
        newSelected.push(temp);
      }
      dispatch(productSelected(newSelected));
    }
  }

  function checkProduct() {
    dispatch(getCategory(Number(categoryId)));
    dispatch(productGet(Number(pid), callback));
  }

  function bundleEdit() {
    dispatch(getCategory(Number(categoryId)));
    dispatch(bundleProductGet(Number(pid), callback));
  }

  function importEdit(subTaskId) {
    dispatch(userImportSubTaskProductDetail(subTaskId, (data) => {
      let skus = data.skus;
      dispatch(productChange(data.base));
      dispatch(getCategory(Number(data.base.categoryId)));
      if (skus.length === 1 && skus[0].name === "single") {
        this.setState({
          isSingleProduct: true,
          singleProductSku: skus[0]
        });
      } else {
        dispatch(productSkusChange(skus));
      }
    }));
  }

  return {
    checkProduct,
    bundleEdit,
    importEdit
  };
};