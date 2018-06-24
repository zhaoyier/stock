import * as React from "react";
import { Component } from "react";


import { i18nText } from "../../../util/kit";

interface BannerProps {
	token: string;
	baseUrl: string;
	successUpload: Function;
}

export default class Banner extends Component<BannerProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		// const { token, baseUrl, successUpload } = this.props;
		return (
			<div>
				<h4 style={{textAlign: "center", color: "#ccc", fontSize: 20}}>{i18nText("Please click [Store Banner]")}</h4>
			</div>
		);
	}
}