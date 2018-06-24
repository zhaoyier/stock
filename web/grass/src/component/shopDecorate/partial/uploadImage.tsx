import * as React from "react";
import { Upload, Button, Icon, message } from "antd";
import { QINIU_UPLOAD_URL } from "../../../constant/index";

import { getToken } from "../../../api/other";
import { i18nText } from "../../../util/kit";

interface UploadImageProps {
	successUpload: Function;
}

interface UploadImageState {
	token: string;
	baseUrl: string;
}

function beforeUpload(file) {
	const isJPG = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJPG) {
		message.error(i18nText("The image, can consider input like this also Supported file types: JPG, PNG"));
	}
	const isLt2M = file.size / 1024 / 1024 < 3;
	if (!isLt2M) {
		message.error(i18nText("Maximum size 3M"));
	}
	return isJPG && isLt2M;
}

const tokenGen = (function() {
	let tokenPromise: Promise<{token: string, baseUrl: string}> | null = null;
	return function gen(force = false) {
		if (force || tokenPromise === null) {
			tokenPromise = new Promise((resolve) => {
				getToken((info) => {
					resolve({
						token: info.token,
						baseUrl: info.baseUrl,
					});
				});
			});
		}
		return tokenPromise;
	};
})();

export default class UploadImage extends React.Component<UploadImageProps, UploadImageState> {

	constructor(props) {
		super(props);
		this.state = {
			token: "",
			baseUrl: "",
		};
	}

	componentDidMount() {
		tokenGen().then(({token, baseUrl}) => {
			this.setState({token, baseUrl});
		});
	}

	render() {
		const { successUpload } = this.props;
		const { token, baseUrl, } = this.state;
		const uploadImageProps: any = {
			name: "file",
			action: QINIU_UPLOAD_URL,
			data: { token },
			accept: ".jpg,.jpeg,.png,.gif",
			listType: "picture",
			showUploadList: false,
			beforeUpload: beforeUpload,
			onChange: (info) => {
				if (info.file.status === "done") {
					successUpload(baseUrl + info.file.response.key);
					message.success(i18nText("Upload Successfully"));
				}else if (info.file.error && info.file.error.status === 401) {
					tokenGen(true).then(({token, baseUrl}) => {
						this.setState({token, baseUrl});
						message.error(i18nText("Upload fairly !"));
					});
				}
			}
		};
		return (
			<div>
				<Upload {...uploadImageProps}>
					<Button>
						<Icon type="upload" /> {i18nText("Upload image")}
					</Button>
				</Upload>
			</div>
		);
	}
}
