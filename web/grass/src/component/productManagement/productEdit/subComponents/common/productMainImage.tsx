import React from "react";
import { Tooltip, Icon, Upload, Modal } from "antd";
import { observer, inject } from "mobx-react";
import { getToken } from "../../../../../api/other";
import { QINIU_UPLOAD_URL } from "../../../../../constant/index";
import { toJS } from "mobx";
import { defaultConfig } from "../../../constant";
// import update from "immutability-helper";

const styles = require("../../index.scss");
interface ProductMainImageProps {
	index: number;
	images: Array<any>;
}

interface ProductMainImageState {
	previewVisible: boolean;
	previewImage: string;
	fileList: Array<any>;
	token: string;
	baseUrl: string;
}

@inject("store")
@observer
class ProductMainImage extends React.Component<ProductMainImageProps, ProductMainImageState> {
	constructor(props) {
		super(props);
		this.state = {
			previewVisible: false,
			previewImage: "",
			fileList: [],
			token: "",
			baseUrl: ""
		};
		console.log("===>>construct:", props);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePreview = this.handlePreview.bind(this);
	}

	componentDidMount() {
		getToken(info => {
			this.setState({
				token: info.token,
				baseUrl: info.baseUrl
			});
		});
	}

	componentWillReceiveProps(props) {
		console.log("====>>>componentWillReceiveProps:", toJS(props));
		const { images } = this.props;
		const validImages = (images || []).filter(item => !!item);
		const fileList = validImages.map((item, index) => {
			return { uid: index, status: "done", url: item };
		});
		this.setState({
			fileList
		});
	}

	handlePreview(file) {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true
		});
	}

	handleCancel() {
		this.setState({ previewVisible: false });
	}

	handleChange(info) {
		console.log("====>>change:", info);
		const { setSkuRulesProps, isSpu } = this.props["store"];
		info.fileList = info.fileList.map(file => {
			if (file.response && file.status === "done") {
				file.url = this.state.baseUrl + file.response.key;
			}
			return file;
		});

		const images = info.fileList.map(item => {
			return item.url;
		});

		if (isSpu) {
			const { productDetail, updateProductDetail } = this.props["store"];
			productDetail.base.images = images;
			updateProductDetail(productDetail);
		} else {
			setSkuRulesProps("images", images, this.props.index);
		}

		this.setState({
			fileList: info.fileList
		});
	}

	render() {
		let { fileList, previewVisible, previewImage, token } = this.state;
		// const { images } = this.props;
		// fileList = images.map((item, index) => {
		// 	return {uid: index, status: "done", url: item};
		// });
		console.log("====>>render:", fileList, token);
		// const {productDetail} = this.props["store"];

		// console.log("====>>did image 2:", this.props.images);

		const uploadButton = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">Upload</div>
			</div>
		);

		return (
			<div>
				<div className={styles.pd__form}>
					<div className={styles.pd__form__title}>
						<Tooltip placement="top" title={"商品主图"}>
							商品主图&ensp;<Icon className={styles.orange} type="question-circle" />
						</Tooltip>
					</div>
					<div className={styles.pd__form__content}>
						<div className={styles.tips}>
							最佳比例1:1，不超过3M；图片超过比例大小会自动缩放，请至少上传一张商品主图，至多5张;左右拖拽可调整顺序
						</div>
						<div style={{ marginTop: 24 }}>
							<Upload
								listType="picture-card"
								fileList={fileList}
								action={QINIU_UPLOAD_URL}
								data={{ token }}
								onPreview={this.handlePreview}
								onChange={this.handleChange}
							>
								{fileList.length >= defaultConfig.skuMainImg ? null : uploadButton}
							</Upload>
							<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
								<img alt="example" style={{ width: "100%" }} src={previewImage} />
							</Modal>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductMainImage;
