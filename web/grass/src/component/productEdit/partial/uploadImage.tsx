import * as React from "react";
import { Upload, message, Button, Icon, Alert } from "antd";
import { locale } from "../../../config/locale";
import { QINIU_UPLOAD_URL } from "../../../constant/index";

// API
import { getToken } from "../../../api/other";

// utility
import { insertSort } from "../../../util/kit";

// constant
import { UploadImageProps } from "../variableType";
const tokenGen = new Promise((resolve) => {
  getToken((info) => {
    resolve({
      token: info.token,
      baseUrl: info.baseUrl,
    });
  });
});
interface UploadImageState {
  token: string;
  baseUrl: string;
}

class UploadImage extends React.Component<UploadImageProps, UploadImageState> {
  private sourceIndex: number;
  private maxImage: number;

  constructor(props) {
    super(props);
    this.maxImage = 5;
    this.state = {
      token: "",
      baseUrl: "",
    }
  }

  componentDidMount() {
    tokenGen.then(({ token, baseUrl }) => {
      this.setState({ token, baseUrl });
    });
  }

  render() {
    const getText = locale(this.props.accountInfo.shop.originCode);
    const {token, baseUrl} = this.state;
    let { images } = this.props.productData;
    const uploadImageProps: any = {
      name: "file",
      action: QINIU_UPLOAD_URL,
      data: { token },
      accept: ".jpg,.jpeg,.png,.gif",
      listType: "picture",
      multiple: true,
      showUploadList: false,
      beforeUpload: () => {
        let { images } = this.props.productData;
        if (images.length >= this.maxImage) {
          message.warn(getText("at_most_five_image"));
          return false;
        }
      },
      onChange: (info) => {
        let { images } = this.props.productData;
        if (images.length >= this.maxImage) {
          message.warn("have_uploaded_five_images");
          return false;
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} 上传成功。`);
          console.log(info.file.name);
          images.push(baseUrl + info.file.response.key);
          this.props.productChange({ images });
        } else if (info.file.status === "error") {
          message.warn(`${info.file.name} ${getText("upload_fail")}`);
        }
      }
    };
    let imagesList = images.map((item, index) => {
      return (
        <section key={index} className="dragTarget"
          onDrop={() => {
            let { images } = this.props.productData;
            images = insertSort(images, this.sourceIndex, index);
            this.props.productChange({ images });
          }}
          onDragOver={(e) => e.preventDefault()}>
          <div className="dragItem" onDragStart={() => this.sourceIndex = index} style={{ borderRadius: 5 }}>
            {index === 0 ? (
              <div className="head">{getText("main_image")}</div>
            ) : null}
            <div className="foot">
              <Button size="small" onClick={() => {
                let { images } = this.props.productData;
                images.splice(index, 1);
                this.props.productChange({ images });
              }} style={{ marginRight: 5 }}>{getText("delete")}</Button>
              <Button size="small" onClick={() => {
                window.open(item);
              }}>{getText("check_origin_picture")}</Button>
            </div>
            <img src={item} alt="ezbuy is the best" />
          </div>
        </section>
      );
    });
    return (
      <div>
        <Upload {...uploadImageProps}>
          <Button style={this.props.error}>
            <Icon type="upload" /> Upload
          </Button>
          <span style={{ margin: "0 10px" }}>{getText("you_can_upload")}&nbsp;{imagesList.length}/{this.maxImage}&nbsp;{getText("picture")}</span>
        </Upload>
        <Alert message={(
          <div>
            {getText("picture_quality")}
            <br />
            <b>{getText("picture_ratio")}</b>
          </div>
        )} type="warning" />
        {imagesList.length > 1 && (<div style={{ marginTop: 10 }}><Alert message={getText("drag_to_order")} type="info" /></div>)}
        <div className="dragContent">
          {imagesList}
        </div>
      </div>
    );
  }
}

export default UploadImage;
