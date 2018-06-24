import * as React from "react";
import { connect } from "react-redux";
import { getToken } from "../../../api/other";
import { QINIU_UPLOAD_URL } from "../../../constant/index";
import { locale } from "../../../config/locale";

import { Upload, Button, Icon, message } from "antd";

// constant
import { SkuUploadImageProps } from "../variableType";

// action
import {
  productChange
} from "../../../action/productManage";

@connect(state => ({
  accountInfo: state.common.accountInfo,
}))
class SkuUploadImage extends React.Component<SkuUploadImageProps> {
  private baseUrl: string;
  private token: string;

  componentWillMount() {
    getToken((info) => {
      this.baseUrl = info.baseUrl;
      this.token = info.token;
      this.forceUpdate();
    });
  }

  render() {
    const token = this.token;
    const baseUrl = this.baseUrl;
    const getText = locale(this.props.accountInfo.shop.originCode);
    const { dispatch, skuPropsIndex, valueIndex, productData } = this.props;
    let { skuProps } = productData;
    const uploadImageProps: any = {
      name: "file",
      accept: ".jpg,.jpeg,.png,.gif",
      action: QINIU_UPLOAD_URL,
      data: { token },
      listType: "picture",
      showUploadList: false,
      onChange: (info) => {
        if (info.file.status === "done") {
          message.success(`${info.file.name} ${getText("upload_success")}`);
          skuProps[skuPropsIndex].values[valueIndex].image = baseUrl + info.file.response.key;
          productData["skuProps"] = skuProps;
          dispatch(productChange(productData));
        } else if (info.file.status === "error") {
          message.warn(`${info.file.name} ${getText("upload_fail")}。`);
        }
      }
    };
    const placeholder = (<Icon type="file" style={{fontSize: 30}} />);

    return (
      <div style={{ display: "inline-block", margin: "5px 25px" }}>
        <p style={{ padding: "2px 0" }}>{this.props.colorName}</p>
        <div style={{ margin: "0 auto" }} className="dragTarget">
          <div className="dragItem">
            {skuProps[skuPropsIndex].values[valueIndex].image === "" ? placeholder : (
              <img src={skuProps[skuPropsIndex].values[valueIndex].image} alt="" />
            )}
          </div>
          <div style={{ margin: "10px auto" }}>
            <Upload {...uploadImageProps} >
              <Button style={{ padding: "2px 4px", width: "100%" }} type="ghost">
                <Icon type="upload" /> {getText("click_to_upload")}
              </Button>
              <br/>
              <span>{getText("you_can_upload")}{skuProps[skuPropsIndex].values[valueIndex].image ? 1 : 0}/1</span>
            </Upload>
          </div>
        </div>
      </div >
    );
  }
}

export default SkuUploadImage;
