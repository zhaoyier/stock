import * as React from "react";
import { getToken } from "../../../../../api/other";
import { QINIU_UPLOAD_URL } from "../../../../../constant/index";
// import accountInfo from "../../../../../util/accountInfo";
import { i18nText } from "../../../../../util/kit";
import { Upload, Button, Icon, message } from "antd";

interface UploadImageProps {
	src: string;
	getSrc: Function;
}

interface UploadImageState {
	token: string;
	baseUrl: string;
}

const tokenGen = new Promise(resolve => {
	getToken(info => {
		resolve({
			token: info.token,
			baseUrl: info.baseUrl
		});
	});
});

class UploadImage extends React.Component<UploadImageProps, UploadImageState> {
	constructor(props) {
		super(props);
		this.state = {
			token: "",
			baseUrl: ""
		};
	}

	componentDidMount() {
		tokenGen.then(({ token, baseUrl }) => {
			this.setState({ token, baseUrl });
		});
	}

	render() {
		const { src, getSrc } = this.props;
		const { token, baseUrl } = this.state;
		const uploadImageProps: any = {
			name: "file",
			accept: ".jpg,.jpeg,.png,.gif",
			action: QINIU_UPLOAD_URL,
			data: { token },
			listType: "picture",
			showUploadList: false,
			onChange: info => {
				if (info.file.status === "done") {
					message.success(`${info.file.name} ${i18nText("upload_success")}`);
					const imgurl = baseUrl + info.file.response.key;
					getSrc(imgurl);
				} else if (info.file.status === "error") {
					message.warn(`${info.file.name} ${i18nText("upload_fail")}。`);
				}
			}
		};

		return (
			<div style={{ display: "inline-block" }}>
				<Upload {...uploadImageProps}>
					<div style={{ cursor: "pointer", border: "1px solid #ddd" }}>
						{src ? (
							<img style={{ width: 100 }} src={src} alt="" />
						) : (
							<img
								style={{ width: 104, height: 104 }}
								src={require("../../../image/defaultImg.png")}
								alt=""
							/>
						)}
					</div>
					<Button style={{ display: "none" }} type="ghost">
						<Icon type="upload" /> {i18nText("click_to_upload")}
					</Button>
				</Upload>
			</div>
		);
	}
}

export default UploadImage;
