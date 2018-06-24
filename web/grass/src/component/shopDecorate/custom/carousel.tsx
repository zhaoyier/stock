import * as React from "react";
import { Component } from "react";

import { EditProps } from "./types";

import { ComponentType } from "../constant";
import CarouselTemplate from "../componentTemplate/carouselTemplate";
import { i18nText } from "util/kit";
import Drag from "../partial/drag";

export default class Carousel extends Component<EditProps, {}> {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h4 style={{ fontSize: 16, color: "#999", marginBottom: 30, }}>{i18nText("Banner Carousel")}</h4>
				<Drag
					style={{ width: 190, height: 100 }}
					editOpen={() => { }}
					modeType={ComponentType.Carousel}
					content={(<CarouselTemplate />)}
				/>
				<p style={{ marginTop: 20, color: "#ccc" }}>{i18nText("Banner carousel allow upload 2~3 images")}</p>
			</div>
		);
	}
}
