export const customSkuAttr = (data, skuProps) => {
  // 处理 [一键导入] 中并且没有类目的数据
  if (data.length === 0) {
    for (let i = 0; i < skuProps.length; i++) {
      const pname = skuProps[i].propName;
      let pvs: any = [];
      for (let j = 0; j < skuProps[i].values.length; j++) {
        pvs.push({
          pname,
          vname: skuProps[i].values[j].valueName,
          translation: {},
        });
      }
      data.push({
        pname,
        translation: {},
        pvs,
      });
    }
  }

  // 处理 [批量编辑] 中默认类目与上传类目不一致的数据问题
  for (let i = 0; i < skuProps.length; i++) {
    let isExist = false;
    const pname = skuProps[i].propName;
    for (let j = 0; j < data.length; j++) {
      if (pname === data[j].pname) {
        isExist = true;
        break;
      }
    }
    let pvs: any = [];
    for (let j = 0; j < skuProps[i].values.length; j++) {
      pvs.push({
        pname,
        vname: skuProps[i].values[j].valueName,
        translation: {},
      });
    }
    if (!isExist) {
      data.push({
        pname,
        translation: {},
        pvs,
      });
    }
  }

  for (let i = 0; i < data.length; i++) {
    const targetName = data[i].pname;
    let currentSkuProp: any = {};
    // from data.pname find skuProps.propName
    for (let j = 0; j < skuProps.length; j++) {
      if (targetName === skuProps[j].propName) {
        currentSkuProp = skuProps[j];
        break;
      }
    }
    // loop data.pname.pvs to match skuProps.values and find custom sku attr.
    if (currentSkuProp.values) {
      for (let j = 0; j < currentSkuProp.values.length; j++) {
        let isCustom = true;
        const skuPropsItem = currentSkuProp.values[j];
        for (let k = 0; k < data[i].pvs.length; k++) {
          if (skuPropsItem.valueName === data[i].pvs[k].vname) {
            isCustom = false;
            break;
          }
        }
        if (isCustom) {
          data[i].pvs.push({
            pname: targetName,
            vname: skuPropsItem.valueName,
            translation: {},
          });
        }
      }
    }
  }

  return data;
};
