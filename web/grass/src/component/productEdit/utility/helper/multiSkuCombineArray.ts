export const generateCombineSkus = (skuSelected) => {
  function recursionNewSku(index, result) {
    if (indexArray[index + 1]) {
      if (result.length === 0) {
        // 二维
        for (let i = 0; i < indexArray[index]["length"]; i++) {
          for (let j = 0; j < indexArray[index + 1]["length"]; j++) {
            let singleSku: any = [];
            // snippet B
            singleSku.push(indexArray[index]["content"][i], indexArray[index + 1]["content"][j]);
            result.push(singleSku);
          }
        }
      } else {
        // 多维度
        let temp: any = [];
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < indexArray[index + 1]["length"]; j++) {
            temp.push(result[i].concat(indexArray[index + 1]["content"][j]));
          }
        }
        result = temp;
      }
      return recursionNewSku(index + 1, result);
    } else {
      return result;
    }
  }

  // snippet A
  // A片段得出需要组合的sku属性作为一个索引数组
  let indexArray: Array<Object> = [];
  for (let i = 0; i < skuSelected.length; i++) {
    let indexObj: { key: string; length: number; content: Array<Object> } = { key: "", length: 0, content: [] };
    let eachSkuObj = skuSelected[i] ? skuSelected[i] : {};
    indexObj["key"] = Object.keys(eachSkuObj)[0];
    if (indexObj["key"]) {
      indexObj["length"] = skuSelected[i][indexObj["key"]].length;
      indexObj["content"] = skuSelected[i][indexObj["key"]];
      if (indexObj["length"] !== 0) {
        indexArray.push(indexObj);
      }
    }
  }
  // snippet A End
  let resultAmount = 1;
  let result = [];
  for (let i = 0; i < indexArray.length; i++) {
    resultAmount *= indexArray[i]["length"];
  }
  if (indexArray.length === 1) {
    // 当skuSelected: [null, {...}]时：
    for (let i = 0; i < skuSelected.length; i++) {
      if (skuSelected[i]) {
        // 当 skuSelected => [{steam: []}, {color: [...]}]
        // indexArray[0] => "color" 时：
        // 需要查找当前 color 的 sku被选择
        if (skuSelected[i][indexArray[0]["key"]]) {
          // 一维的时候也需要返回数组，于 snippet B 对应
          result = skuSelected[i][indexArray[0]["key"]].map(item => [item]);
        }
      }
    }
  } else {
    result = recursionNewSku(0, result);
  }
  return result;
};