// SKU 非单品选择辅助函数
// constant
import { SkuProp } from "../../../../services/EzSellerService";
import { singleProductSku } from "../constant";
import { ProductSku } from "../../variableType";

// utility
import { generateCombineSkus } from "./multiSkuCombineArray";

export const skuSelectedHelper = {
  productSelected: (skuSelected, item, sku, index) => {
    // debugger;
    let skuArray: any = [];
    let isExistProp: boolean = false;
    for (let i = 0; i < skuSelected.length; i++) {
      let skuPropName = Object.keys(skuSelected[i])[0];
      if (skuPropName === sku.pname) {
        skuArray = skuSelected[i][sku.pname];
        isExistProp = true;
        index = i;
        break;
      }
    }
    if (!isExistProp) {
      skuSelected.push({[sku.pname]: [item]});
    } else {
      skuSelected[index] = skuSelected[index] ? skuSelected[index] : {};
      skuSelected[index][sku.pname] = skuSelected[index][sku.pname] ? skuSelected[index][sku.pname] : [];
      skuArray = skuSelected[index][sku.pname];
      // 不能对于[{},{}]这样的不定项数组进行includes，对这样的['a', 'b', 'c']这样操作更合适
      const skuVnames = skuArray.map(item => item.vname);
      if (skuVnames.includes(item.vname)) {
        // let itemIndex = skuArray.indexOf(item);
        let itemIndex = skuVnames.indexOf(item.vname);
        skuArray.splice(itemIndex, 1);
      } else {
        skuArray.push(item);
      }
    }

    return skuSelected;
  },

  // update propducData.skuProps
  productChange: (skuProps, item, sku) => {
    let skuProp: SkuProp = {
      propId: 0,
      propName: "",
      values: [{
        valueId: 0,
        valueName: "",
        image: "",
      }]
    };
    let isNewPropName = true;
    let isExistInPropName = false;
    let currentSkuprop: any = {};
    for (let i = 0; i < skuProps.length; i++) {
      if (skuProps[i].propName === sku.pname) {
        isNewPropName = false;
        currentSkuprop = skuProps[i];
        break;
      } else {
        isNewPropName = true;
      }
    }
    let currentItemIndex = 0;
    if (!isNewPropName) {
      for (let i = 0; i < currentSkuprop.values.length; i++) {
        let skuPropValue = currentSkuprop.values[i];
        if (skuPropValue.valueName === item.vname) {
          isExistInPropName = true;
          currentItemIndex = i;
          break;
        } else {
          isExistInPropName = false;
        }
      }
    }
    // 不存在属性
    if (isNewPropName) {
      skuProps.push(Object.assign(skuProp, { propName: sku.pname, values: [Object.assign(skuProp.values[0], { valueName: item.vname })] }));
    }
    // 存在属性,不存在值
    if (!isNewPropName && !isExistInPropName) {
      currentSkuprop.values.push(Object.assign(skuProp.values[0], {valueName: item.vname}));
    }
    // 存在属性,存在值
    if (!isNewPropName && isExistInPropName) {
      currentSkuprop.values.splice(currentItemIndex, 1);
    }
    return skuProps;

  },

  productSkus: (skuSelected, beforeProductSkus, origin) => {
    const result = generateCombineSkus(skuSelected);
    let newProductSkus: Array<ProductSku> = [];
    result.map(item => {
      let name = (item as Array<any>).map(each => each.translation[origin] ? each.translation[origin] : each.vname).join("; ");
      // deep copy
      let attributes = {};
      (item as Array<any>).map(item => {
        attributes[item["pname"]] = item["vname"];
      });
      let temp = JSON.parse(JSON.stringify(Object.assign({}, singleProductSku, {name, attributes})));
      newProductSkus.push(temp);
    });
    for (let i = 0; i < newProductSkus.length; i++) {
      for (let j = 0; j < beforeProductSkus.length; j++) {
        // 这里有个大坑，跟以前的旧数据不兼容，是否要改，需要斟酌。
        if (beforeProductSkus[j].name === newProductSkus[i].name) {
          newProductSkus[i] = Object.assign({}, beforeProductSkus[j]) ;
          break;
        }
      }
    }
    return newProductSkus;
  }

};
