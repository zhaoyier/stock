import * as React from "react";
import { Component } from "react";

import { i18nText } from "../../../../util/kit";
interface EditProps {
	editData: Array<{}>;
	updateWorkBench: Function;
	typeDevice?: string;
}
const sizeInfoTips = {
	PC: [i18nText("showcaseOne pc size"), i18nText("showcaseTwo pc size"), i18nText("showcaseThree pc size")],
	APP: [i18nText("showcaseOne app size"), i18nText("showcaseTwo app size"), i18nText("showcaseThree app size")],
}

import { DeviceType } from "../../constant";
const { PC } = DeviceType;

// Component
import EditMode from "../../partial/imgContentEdit";

export default class ShowcaseEdit extends Component<EditProps> {
	constructor(props) {
		super(props);
	}

	render() {
		const { editData, updateWorkBench } = this.props;
		const { typeDevice } = this.props;
		let sizeInfoIndex = 0;
		switch (editData.length) {
			case 1:
				sizeInfoIndex = 0;
				break;
			case 3:
				sizeInfoIndex = 1;
				break;
			case 4:
				sizeInfoIndex = 2;
				break;
		}
		let editTemplate = editData.map((element, i) => (
			<EditMode key={i} index={i} editData={editData} updateWorkBench={updateWorkBench} sizeInfo={(
				typeDevice === PC ? (
					<span>{sizeInfoTips.PC[sizeInfoIndex]}</span>
				) : (
					<span>{sizeInfoTips.APP[sizeInfoIndex]}</span>
					)
			)} />
		));
		return (
			<div>
				<h5 style={{ fontSize: 16, color: "#999" }}>{i18nText("Image Template")}</h5>
				{editTemplate}
			</div>
		);
	}
}