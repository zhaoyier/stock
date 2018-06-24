import * as React from "react";
import ReactQuill from "react-quill-old-react16";
import { Upload, Button, Icon, message } from "antd";
import { locale } from "../../../../config/locale";
import { ProductEditorProps } from "../../variableType";
import { i18nText } from "../../../../util/kit";

// API
import { getToken } from "../../../../api/other";
import { QINIU_UPLOAD_URL } from "../../../../constant/index";

import initDragable from "./drag";
import "./index.scss";

function beforeUpload(file) {
	const isJPG = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJPG) {
		message.error(i18nText("This is not image"));
	}
	const isLt2M = file.size / 1024 / 1024 < 3;
	if (!isLt2M) {
		message.error(i18nText("Maximum size 3M"));
	}
	return isJPG && isLt2M;
}

class ProductEditor extends React.Component<ProductEditorProps> {
	private baseUrl: string;
	private token: string;

	componentWillMount() {
		getToken((info) => {
			this.baseUrl = info.baseUrl;
			this.token = info.token;
		});
	}
	componentDidMount() {
		const uploadInside: any = document.querySelector("#quillUpload");
		uploadInside.addEventListener("click", function () {
			const uploadOutside: any = document.querySelector(".quill-upload-external");
			uploadOutside.click();
		});
		initDragable();
	}

	render() {
		const getText = locale(this.props.accountInfo.shop.originCode);
		const propsToEditor: any = {
			name: "file",
			action: QINIU_UPLOAD_URL,
			data: { token: this.token },
			accept: ".jpg,.jpeg,.png,.gif",
			multiple: true,
			listType: "picture",
			beforeUpload: beforeUpload,
			onChange: (info) => {
				if (info.file.status === "done") {
					message.success(`${info.file.name} ${getText("upload_success")}`);
					const tmpImgUrl = this.baseUrl + info.file.response.key;
					// console.log(info);
					const imageList: any = document.querySelector("#customImageList");
					const li = document.createElement("li");
					li.innerHTML = info.file.name;
					li.setAttribute("url", tmpImgUrl);
					li.setAttribute("draggable", "true");
					imageList.appendChild(li);
					// const editorInput: any = document.querySelector("#editorInput");
					// editorInput.value = tmpImgUrl;
					// let inputChange = document.createEvent("HTMLEvents");
					// inputChange.initEvent("stupid_input", true, true);
					// editorInput.dispatchEvent(inputChange);
				} else if (info.file.status === "error") {
					message.warn(`${info.file.name} ${getText("upload_fail")}`);
				}
			}
		};
		return (
			<div>
				<div id="editor" style={this.props.errorDescription}>
					<ReactQuill theme="snow"
						value={this.props.productData && this.props.productData.description}
						onChange={value => this.props.productChange && this.props.productChange(value)}
					/>
					<div style={{ display: "none" }}>
						<Upload {...propsToEditor} >
							<Button className="ant-upload-text">
								<Icon type="upload" className="quill-upload-external" />
							</Button>
						</Upload>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductEditor;
