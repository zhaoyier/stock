import * as React from "react";
import { Component } from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContextProvider } from "react-dnd";
import UploadImage from "./uploadImage";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import { Alert } from "antd";
import update from "immutability-helper";

// import { Upload, Icon, } from "antd";

const styles = require("./imgList.scss");

interface ImgListState {
	badImage: boolean;
}

@inject("store")
@observer
class ImgList extends Component<{}, ImgListState> {
	constructor(props) {
		super(props);
		this.getSrc = this.getSrc.bind(this);
		this.state = {
			badImage: false
		};
		this.toggleBadImage = this.toggleBadImage.bind(this);
	}

	getSrc(index, src) {
		const { productDetail, updateProductDetail } = this.props["store"];
		console.log(productDetail.base.images);
		productDetail.base.images = update(toJS(productDetail.base.images), {
			$splice: [[index, 1, src]]
		});
		updateProductDetail(productDetail);
	}

	toggleBadImage() {
		const { badImage } = this.state;
		this.setState({
			badImage: !badImage
		});
	}

	render() {
		// const uploadButton = (
		//   <div>
		//     <Icon style={{ fontSize: 16 }} type="plus" />
		//     <div className="ant-upload-text">上传照片</div>
		//   </div>
		// );
		const { productDetail } = this.props["store"];
		const { base } = productDetail;
		const { badImage } = this.state;
		return (
			<div>
				<DragDropContextProvider backend={HTML5Backend}>
					<div className={styles.clearfix}>
						{/* 这里的图片上传需要抽象 */}
						{/* <Upload
							action="//jsonplaceholder.typicode.com/posts/"
							listType="picture-card"
						>
							{uploadButton}
						</Upload> */}
						{(base.images || []).map((item, index) => {
							return (
								<div key={index} className={styles.imgItem}>
									<UploadImage getSrc={src => this.getSrc(index, src)} src={item} />
								</div>
							);
						})}
						<div className={styles.imgItem}>
							<a
								onClick={this.toggleBadImage}
								style={{ marginTop: 36, display: "inline-block" }}
								href="javascript: void(0);"
							>
								差图示例
							</a>
						</div>
					</div>
				</DragDropContextProvider>
				{badImage && (
					<div style={{ marginTop: 20 }}>
						<Alert message="差图内容 (这里需要补充UI示例)" />
					</div>
				)}
			</div>
		);
	}
}

export default ImgList;
