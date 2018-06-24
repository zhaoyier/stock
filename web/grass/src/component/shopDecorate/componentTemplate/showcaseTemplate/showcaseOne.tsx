import * as React from "react";
import { BaseTemplate } from "../types";

interface ShowcaseProps {
	data?: BaseTemplate | undefined;
}

export default class ShowcaseOne extends React.PureComponent<ShowcaseProps> {
	render() {
		const { data } = this.props;
		let renderData: undefined | {} = data;
		return (
			<div className="showcase__model">
				<div style={{ widht: "100%", height: "100%" }}>
					<div style={{backgroundImage: `url(${renderData && renderData[0]["img"] ? renderData[0]["img"] : require("../../image/default.png")})`}} className="imageBox" />
				</div>
			</div>
		);
	}
}