import React from "react";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import {
	Checkbox,
	Divider,
	Input,
	Button,
	Select,
	Row,
	Col,
	Upload,
	Modal,
	message,
	UploadFile
} from "antd";
import { getToken } from "../../../../../api/other";
import { QINIU_UPLOAD_URL } from "../../../../../constant/index";
import index from "../../../importProduct";

const Option = Select.Option;
const styles = require("../../index.scss");

interface ProductColorStore {
	data: number;
	store: any;
}

interface ProductColorState {
	index: number;
	skuValue: any; // image valueId valueName
	fileList: Array<any>;
	colorSkus: Array<any>;
	isChecked: boolean;
	previewVisible: boolean;
	previewImage: string;
	baseUrl: string;
	token: string;
}

@inject("store")
@observer
class ProductColor extends React.Component<ProductColorStore, ProductColorState> {
	constructor(props) {
		super(props);
		this.state = {
			index: props.data,
			skuValue: props.store.skuColors[props.data],
			fileList: [],
			colorSkus: [],
			baseUrl: "",
			token: "",

			isChecked: false,
			previewVisible: false,
			previewImage: ""
		};
		this.onChangeSelect.bind(this);
	}

	// fileList: [{
	// 	uid: -1,
	// 	status: "done",
	// 	url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
	// }]

	componentWillMount() {
		// 初始化上传列表
		let { skuValue, fileList, index } = this.state;
		if (skuValue && skuValue.image) {
			fileList.push({ uid: index, status: "done", url: skuValue.image });
			this.setState({
				fileList
			});
		}
	}

	componentDidMount() {
		console.log("====>>did:", this.state.fileList, toJS(this.state.skuValue));
		let { colorSkus } = this.state;
		for (let i = 1; i < 3; i++) {
			colorSkus.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
		}
		getToken(info => {
			this.setState({
				baseUrl: info.baseUrl,
				token: info.token
			});
		});
		this.setState({
			colorSkus
		});
	}

	updateSkuColors() {
		const { index, skuValue, isChecked } = this.state;
		console.log("====>>>update sku:", isChecked, skuValue);
		const { setSkuColors, delSkuColors, skuColors } = this.props.store;
		if ((skuColors || []).length <= 1) {
			// 清空本行信息
			setSkuColors(index, skuValue);
		} else {
			// 删除本行
			delSkuColors(index);
		}
	}

	onChangeCheckbox(e) {
		console.log("====>>>check:", e.target.checked);
		if (e.target.checked === true) {
			return;
		}

		const { delSkuColors } = this.props.store;
		this.setState(
			{
				isChecked: e.target.checked,
				skuValue: {},
				fileList: []
			},
			() => delSkuColors(index)
		);
	}

	onChangeSelect(text) {
		console.log("====>>select:", text);
		let { skuValue, index, isChecked } = this.state;
		const { setSkuColors } = this.props.store;
		skuValue.valueName = text;
		isChecked = text.length ? true : isChecked ? true : false;
		this.setState(
			{
				isChecked: isChecked,
				skuValue
			},
			() => setSkuColors(index, skuValue)
		);

		setSkuColors(index + 1, {});
	}

	onBlurSelect(text) {
		console.log("===>> onBlur: ", text);
		if (text === "") {
			return message.error("不能为空");
		}
		return;
	}

	onClickUpload(fileList) {
		console.log("====>>upload: ", fileList);
	}
	// 删除信息
	onDeleteUpload() {
		// TODO 删除图片，取消勾选，清空选择框
		const { delSkuColors } = this.props.store;
		let { skuValue, fileList } = this.state;
		skuValue.image = "";
		fileList = [];
		this.setState({
			skuValue,
			fileList
		});
	}

	handlePreview = file => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true
		});
	};
	handleCancel = () => this.setState({ previewVisible: false });

	beforeUpload(file) {
		const isJPG = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJPG) {
			message.error("这不是图片!");
		}
		const isLt2M = file.size / 1024 < 500;
		if (!isLt2M) {
			message.error("图片要小于500kB!");
		}
		return isJPG && isLt2M;
	}

	onChangeUpload(info) {
		let { fileList, index, baseUrl, skuValue } = this.state;
		console.log("===>>>upload:", info);
		if (info.file.status === "done") {
			fileList.push({
				uid: index,
				name: info.file.name,
				url: baseUrl + info.file.response.key
			});
			skuValue.valueId = index;
			skuValue.image = baseUrl + info.file.response.key;
			this.setState({ fileList });
		}
	}

	render() {
		const {
			colorSkus,
			fileList,
			previewVisible,
			previewImage,
			isChecked,
			skuValue,
			token
		} = this.state;
		console.log("====>>render:", toJS(isChecked));
		return (
			<div>
				{JSON.stringify(skuValue)}
				<Row>
					<Col span={1} push={1}>
						<Checkbox checked={isChecked} onChange={this.onChangeCheckbox.bind(this)} />
					</Col>
					<Col span={6} push={1}>
						<Select
							mode="combobox"
							value={skuValue.valueName || ""}
							onChange={this.onChangeSelect.bind(this)}
							onBlur={this.onBlurSelect.bind(this)}
							style={{ width: 200 }}
						>
							{colorSkus}
						</Select>
					</Col>
					{skuValue.image && (
						<Col span={4} push={1}>
							<Upload listType="picture-card" fileList={fileList} onPreview={this.handlePreview} />
							<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
								<img alt="example" style={{ width: "100%" }} src={previewImage} />
							</Modal>
						</Col>
					)}
					{skuValue.image && (
						<Col span={2} push={1}>
							<Button onClick={this.onDeleteUpload}>删除</Button>
						</Col>
					)}
					{!skuValue.image && (
						<Col span={4} push={1}>
							<Upload
								name="file"
								action={QINIU_UPLOAD_URL}
								data={{ token }}
								accept=".jpg,.jpeg,.png,.gif"
								listType="picture"
								showUploadList={false}
								onChange={this.onChangeUpload.bind(this)}
							>
								<Button icon="upload" disabled={!isChecked}>
									上传文件
								</Button>
							</Upload>
						</Col>
					)}
				</Row>
			</div>
		);
	}
}

export default ProductColor;
