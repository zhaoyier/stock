import * as React from "react";
import { Component } from "react";
import update from "immutability-helper";
import { Input, Divider, message, } from "antd";

import { i18nText } from "../../../util/kit";
import { ValidProductLink } from "../../../services/ezseller/decorator";

const { TextArea } = Input;
import UploadImage from "./uploadImage";

interface EditModeProps {
	updateWorkBench: Function;
	editData: {};
	index: number;
	sizeInfo?: any;
}

export default class EditMode extends Component<EditModeProps> {
	constructor(props) {
		super(props);
		this.editData = this.editData.bind(this);
		this.editHrefLink = this.editHrefLink.bind(this);
	}

	editData(url) {
		const { updateWorkBench, editData, index } = this.props;
		const newIndexEditData = update(editData[index], { $merge: { img: url } });
		const newEditData = update(editData, { $splice: [[index, 1, newIndexEditData]] });
		updateWorkBench(newEditData);
	}

	editImageLink(e) {
		const link = e.target.value;
		const { updateWorkBench, editData, index } = this.props;
		ValidProductLink({ link })
			.then(res => {
				let newIndexEditData = {};
				let newEditData = {};
				if (res.result.code === 0) {
					message.success(i18nText("Valid product detail link"));
					newIndexEditData = update(editData[index], { $merge: { link, gpid: res.gpid}});
				} else {
					newIndexEditData = update(editData[index], { $merge: { link: "", gpid: ""}});
				}
				newEditData = update(editData, { $splice: [[index, 1, newIndexEditData]] });
				updateWorkBench(newEditData, index);
			});
	}

	editHrefLink(e) {
		const url = e.target.value;
		const { updateWorkBench, editData, index } = this.props;
		const newIndexEditData = update(editData[index], { $merge: { link: url, }});
		const newEditData = update(editData, { $splice: [[index, 1, newIndexEditData]] });
		updateWorkBench(newEditData, index);
	}

	render() {
		const { index, editData, sizeInfo, } = this.props;
		return (
			<div className="imgContent__edit__model">
				<Divider style={{color: "#999", fontSize: 16}}>{i18nText("picture")}{index + 1}</Divider>
				<p style={{color: "#999", fontSize: 14}}>{i18nText("Setting image")}</p>
				<div style={{marginBottom: 20, overflow: "hidden", }}>
					<img style={{ width: "100%", }} src={editData[index]["img"] || require("../image/default.png")} />
				</div>
				<UploadImage
					successUpload={this.editData}
				/>
				{sizeInfo && (
					<p style={{color: "#ccc"}}>* {sizeInfo}</p>
				)}
				<p style={{marginTop: 30, color: "#999"}}>{i18nText("Image link to")}</p>
				<p style={{color: "#ccc"}}>* {i18nText("Non-mandatory, do not choose that image without link")}</p>
				<TextArea value={editData[index]["link"]} onChange={e => this.editHrefLink(e)} onBlur={e => this.editImageLink(e)} />
			</div>
		);
	}
}