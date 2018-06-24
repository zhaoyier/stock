import * as React from "react";
import { Component } from "react";

import update from "immutability-helper";
// import { EditProps } from "./types";
import { DeviceType, } from "../constant";
const { PC } = DeviceType;

interface EditProps {
	updateWorkBench: Function;
	editData: {};
	typeDevice?: string;
}

// component
import UploadImage from "../partial/uploadImage";
import { i18nText } from "util/kit";

export default class BannerEdit extends Component<EditProps, {}> {
	constructor(props) {
		super(props);
		this.banner_edit = this.banner_edit.bind(this);
	}

	banner_edit(url) {
		const { updateWorkBench, editData, } = this.props;
		const newEditData = update(editData, { $splice: [[0, 1, { img: url }]] });
		updateWorkBench(newEditData);
	}

	render() {
		const { typeDevice, } = this.props;
		return (
			<div>
				<h5 style={{ fontSize: 16, color: "#999" }}>{i18nText("Setting Store Banner")}</h5>
				{typeDevice === PC ? (
					<p style={{marginTop: 15, color: "#ccc" }}>{i18nText("banner pc size")}</p>
				) : (
					<p style={{marginTop: 15, color: "#ccc" }}>{i18nText("banner app size")}</p>
				)}
				<div style={{ marginTop: 30, textAlign: "center" }}>
					<UploadImage
						successUpload={this.banner_edit}
					/>
				</div>
			</div>
		);
	}
}