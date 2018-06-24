import * as React from "react";
import { Breadcrumb } from "antd";

const Bread: React.SFC<any> = (props) => {
  const categoryTree = props.categoryTree;
  const productData = props.productData;
  const isChinese = props.isChinese;
  const from = props.from;
  const category = props.category;
  let breadcrumb: any = [];
  for (let key in categoryTree) {
    if (categoryTree[key].selected !== -1) {
      categoryTree[key].all.map((item) => {
        if (item.cid === categoryTree[key].selected) {
          breadcrumb.push(
            <Breadcrumb.Item key={key}>{isChinese ? item.translation.CN : item.name}</Breadcrumb.Item>
          );
        }
      });
    }
  }
  if (!props.isReplaceCategory) {
    switch (from) {
      case "checkProduct":
      case "bundleEdit":
      case "importEdit":
        if (category.breadcrumb) {
          breadcrumb = category.breadcrumb.map((item, key) => (<Breadcrumb.Item key={key}>{isChinese ? item.translation.CN : item.name}</Breadcrumb.Item>));
        }
        if (Number(productData.categoryId) === 0) {
          breadcrumb = [];
        }
        break;
      default:
        break;
    }
  }
  return (
    <Breadcrumb style={{ display: "inline-block", marginRight: 5 }}>
      {breadcrumb.map(item => item)}
    </Breadcrumb>
  );
};

export default Bread;