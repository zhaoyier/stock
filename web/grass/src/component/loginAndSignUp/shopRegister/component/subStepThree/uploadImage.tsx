import * as React from "react";
import { Component } from "react";

// API
import { getToken } from "../../../../../api/other";
import { QINIU_UPLOAD_URL } from "../../../../../constant/index";

import { Upload, Icon, Modal, message } from "antd";

import "../../../css/uploadImage.scss";

function beforeUpload(file) {
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

interface UploadImageProps {
	onChange: Function;
	value?: string;
	title?: string;
	width?: number;
	height?: number;
	fileList?: [string];
}

interface UploadImageListProps {
	onChange: Function;
	value?: string;
	title?: string;
	width?: number;
	height?: number;
	fileList: [string];
}

interface UploadImageState {
	loading: boolean;
	imageUrl: string;
	baseUrl: string;
	token: string;
}

interface UploadImageListState {
	max: number;
	baseUrl: string;
	token: string;
	fileList: any;
	previewVisible: boolean;
	previewImage: string;
}

class UploadImage extends Component<UploadImageProps, UploadImageState> {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			imageUrl: "",
			baseUrl: "",
			token: ""
		};
	}

	componentWillMount() {}

	componentDidMount() {
		getToken(info => {
			this.setState({
				baseUrl: info.baseUrl,
				token: info.token
			});
		});
	}

	handleChange = info => {
		if (info.file.status === "uploading") {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			const imageUrl = this.state.baseUrl + info.file.response.key;
			this.setState({ imageUrl: this.state.baseUrl + info.file.response.key });
			this.props.onChange(imageUrl);
		}
	};
	private node: any;
	render() {
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? "loading" : "plus"} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		const imageUrl = this.state.imageUrl || this.props.value;
		const token = this.state.token;
		const { width = 150, height = 90 } = this.props;
		return (
			<div>
				<Upload
					ref={node => (this.node = node)}
					style={{ display: "block", width, height, overflow: "hidden" }}
					name="file"
					data={{ token }}
					// listType="picture-card"
					// className="avatar-uploader"
					showUploadList={false}
					action={QINIU_UPLOAD_URL}
					beforeUpload={beforeUpload}
					onChange={this.handleChange}
				>
					<span className="customImageContainer" style={{ width, height }}>
						<div style={{ background: "#3e82f7", color: "#fff" }}>
							{this.props.title || "上传图片"}
						</div>
						<div style={{ margin: "20px auto", width }}>
							<Icon style={{ color: "#3e82f7", fontSize: 26 }} type="plus-circle" />
						</div>
					</span>
					{imageUrl ? <img width={width} src={imageUrl} alt="" /> : uploadButton}
				</Upload>
			</div>
		);
	}
}
// UploadImageList 上传文件列表
class UploadImageList extends Component<UploadImageListProps, UploadImageListState> {
	constructor(props) {
		super(props);
		this.state = {
			max: 5,
			baseUrl: "",
			token: "",
			fileList: [],
			previewVisible: false,
			previewImage: ""
		};
	}

	componentWillMount() {}

	componentDidMount() {
		this.setState({
			fileList: this.props.fileList.map((item, index) => {
				return {
					uid: index,
					status: "done",
					url: item
				};
			})
		});

		getToken(info => {
			this.setState({
				baseUrl: info.baseUrl,
				token: info.token
			});
		});
	}
	handleCancel = () => this.setState({ previewVisible: false });

	handlePreview = file => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true
		});
	};
	handleChange = info => {
		info.fileList = info.fileList.map(file => {
			if (file.response) {
				file.url = this.state.baseUrl + file.response.key;
			}
			return file;
		});
		let fileList = info.fileList.filter(file => {
			if (file.status === "done") {
				return true;
			}
			return false;
		});
		this.setState({ fileList: info.fileList });
		if (fileList.length >= this.state.max) {
			this.props.onChange(fileList);
		}
	};
	render() {
		const { max, previewVisible, previewImage, fileList } = this.state;

		const token = this.state.token;
		const uploadButton = (
			<span>
				<Icon type="plus" />
				<p className="ant-upload-text">Upload</p>
			</span>
		);
		return (
			<div>
				<Upload
					multiple={true}
					data={{ token }}
					listType="picture-card"
					action={QINIU_UPLOAD_URL}
					beforeUpload={beforeUpload}
					onPreview={this.handlePreview}
					onChange={this.handleChange}
					fileList={fileList}
				>
					{fileList.length >= max ? null : uploadButton}
				</Upload>
				<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					<img alt="example" style={{ width: "100%" }} src={previewImage} />
				</Modal>
			</div>
		);
	}
}

export { UploadImage, UploadImageList };
