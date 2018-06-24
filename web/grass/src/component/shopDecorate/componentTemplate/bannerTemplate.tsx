import * as React from "react";

interface BannerTemplateProps {
	data: {};
	typeDevice?: string;
}

import { DeviceType, } from "../constant";
const { PC, } = DeviceType;

export default class BannerTemplate extends React.PureComponent<BannerTemplateProps, {}> {
	render() {
		const { data, typeDevice } = this.props;
		return (
			<div className="banner" >
				{typeDevice === PC ? (
					<div style={{backgroundImage: `url(${data[0]["img"] ? data[0]["img"] : require("../image/pc-banner.png")})`}} className="imageBox" />
				) : (
					<div style={{backgroundImage: `url(${data[0]["img"] ? data[0]["img"] : require("../image/app_header.png")})`}} className="imageBox" />
				)}
			</div>
		);
	}
}