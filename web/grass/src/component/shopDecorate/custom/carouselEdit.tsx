import * as React from "react";
import { Component } from "react";

import { DeviceType } from "../constant";
const { PC } = DeviceType;

import update from "immutability-helper";
import { Select, Modal } from "antd";
const Option = Select.Option;
import { outputArrImg } from "../utility/genEmptyImgArray";
import { i18nText } from "util/kit";

// Component
import EditMode from "../partial/imgContentEdit";

interface EditProps {
	editData: Array<{}>;
	updateWorkBench: Function;
	typeDevice?: string;
}

export default class CarouselEdit extends Component<EditProps, {}> {
	constructor(props) {
		super(props);
		this.updateCarouselLength = this.updateCarouselLength.bind(this);
	}

	updateCarouselLength(e) {
		const imgArray = outputArrImg(e);
		Modal.confirm({
			title: i18nText("Change the pecs of images ?"),
			content: i18nText("Alert！This operation will cancel all uploaded images of Banner Carousel"),
			onOk: () => {
				const { updateWorkBench, editData, } = this.props;
				const newEditData = update(editData, { $set: imgArray });
				updateWorkBench(newEditData);
			},
			onCancel: () => {
				console.log("nothing");
			}
		});
	}

	render() {
		const { typeDevice } = this.props;
		const { editData, updateWorkBench } = this.props;
		let editTemplate = editData.map((element, i) => (
			<EditMode key={i} index={i} editData={editData} updateWorkBench={updateWorkBench} sizeInfo={(
				typeDevice === PC ? (
					<span>{i18nText("carousel pc size")}</span>
				) : (
					<span>{i18nText("carousel app size")}</span>
					)
			)} />
		));
		return (
			<div>
				<h5 style={{ fontSize: 16, color: "#999" }}>{i18nText("Banner Carousel")}</h5>
				<h4 style={{ marginTop: 30, color: "#999" }}>{i18nText("The amount of images")}</h4>
				<Select defaultValue={`${editData.length}`} style={{ width: 120 }} onChange={this.updateCarouselLength} >
					<Option value="2">2</Option>
					<Option value="3">3</Option>
				</Select>
				<h4 style={{ marginTop: 20, color: "#999" }}>{i18nText("Setting the images")}</h4>
				{editTemplate}
			</div>
		);
	}
}


