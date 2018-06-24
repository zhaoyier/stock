/**
 *
 * @param skuProps 只含有vname的sku属性
 * @param valueOptions 含有全部信息的sku属性,translation包含其中
 * // 机智的name， 这个name这么用是因为表示颜色的字段不定，可以是 Color，可以是 Color Name ， 也是【色彩】，也是【颜色】，谁知道？
 * @param name: string || name: Regex
 *
 */
export const findWholeSkuAttrByName = (skuProps, multi, name) => {
  let result: Array<any> = [];
  let skuPropsIndex = 0;

  const colorNameForTranslation = multi.filter(item => typeof name === "object" ? name.test(item.pname) : item.pname === name)[0];
  if (typeof colorNameForTranslation === "undefined") {
    return false;
  }
  const skuPropsForColor = skuProps.filter((item, index) => {
    if (typeof name === "object" ? name.test(item.propName) : item.propName === name) {
      skuPropsIndex = index;
      return item;
    }
  });
  // 当没有sku属性或者没有sku = "Color name" 属性时：
  if (skuProps.length === 0 || skuPropsForColor.length === 0) {
    return false;
  }
  // console.log(skuPropsForColor, colorNameForTranslation)
  for (let i = 0; i < skuPropsForColor[0].values.length; i++) {
    let item = skuPropsForColor[0].values[i];
    for (let j = 0; j < colorNameForTranslation.pvs.length; j++) {
      const originColor = colorNameForTranslation.pvs[j];
      if (originColor.vname === item.valueName) {
        result.push(originColor);
        break;
      }
    }
  }
  return {result, skuPropsIndex};
};
