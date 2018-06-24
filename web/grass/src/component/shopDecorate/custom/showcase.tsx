import * as React from "react";
import { Component } from "react";

import { DeviceType } from "../constant";
const { PC } = DeviceType;

import Drag from "../partial/drag";

import { ComponentType } from "../constant";
import { ShowcaseOne, ShowcaseTwo, ShowcaseThree, ShowcaseFour } from "../componentTemplate/showcaseTemplate/index";
import { i18nText } from "../../../util/kit";

interface ShowcaseProps {
	typeDevice: string;
}

export default class Showcase extends Component<ShowcaseProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		const { typeDevice } = this.props;
		return (
			<div>
				<h5>{i18nText("Image Template")}</h5>
				<p>{i18nText("Up to 10 templates can be used simultaneously, each template can be reused")}</p>
				<div>
					<Drag
						style={{ width: 190, height: 100 }}
						editOpen={() => { }}
						modeType={ComponentType.ShowCase.One}
						content={(<ShowcaseOne />)}
					/>
					<p style={{ color: "#ccc" }}>1.{i18nText("Banner template：one image, can set one link to product details page")}</p>
				</div>
				<div>
					<Drag
						style={{ width: 190, height: 100 }}
						editOpen={() => { }}
						modeType={ComponentType.ShowCase.Two}
						content={(<ShowcaseTwo />)}
					/>
					<p style={{ color: "#ccc" }}>2. {i18nText("Banner template: two images, can set two links to product details pages")}</p>
				</div>
				<div>
					<Drag
						style={{ width: 190, height: 100 }}
						editOpen={() => { }}
						modeType={ComponentType.ShowCase.Three}
						content={(<ShowcaseThree />)}
					/>
					<p style={{ color: "#ccc" }}>3.{i18nText("Banner template: four images, can set four links to product details pages")}</p>
				</div>
				{typeDevice === PC && (
					<div>
						<Drag
							style={{ width: 190, height: 100 }}
							editOpen={() => { }}
							modeType={ComponentType.ShowCase.Four}
							content={(<ShowcaseFour />)}
						/>
						<p style={{ color: "#ccc" }}>4.{i18nText("Banner template: eight images, can set eight links to product details pages")}</p>
					</div>
				)}
			</div>
		);
	}
}
