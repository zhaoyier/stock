export const formatInputDate = (type, inputArray, value) => {
  switch (type) {
    case "length":
    case "width":
    case "height":
      if (value !== "") {
        inputArray["volume"][type] = parseInt(value);
      } else {
        inputArray["volume"][type] = "";
        delete inputArray["volume"][type];
      }
      break;
    case "sellerSkuId":
      inputArray[type] = value;
      break;
    default:
      inputArray[type] = Number(Number(value).toFixed(2));
      break;
  }
};