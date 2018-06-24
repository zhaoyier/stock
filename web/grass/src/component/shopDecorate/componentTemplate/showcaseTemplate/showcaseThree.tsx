import * as React from "react";
import { BaseTemplate } from "../types";

interface ShowcaseProps {
	data?: BaseTemplate;
}

export default class ShowcaseThree extends React.PureComponent<ShowcaseProps> {
	render() {
		const { data } = this.props;
		let renderData: undefined | {} = data;
		return (
			<div className="showcase__model">
				<div style={{ widht: "100%", height: "100%" }}>
					<div style={{ float: "left", width: "50%", height: "100%", borderRight: "1px dashed #3E82F7" }}>
						<div style={{ height: "50%", borderBottom: "1px dashed #3E82F7" }}>
							<div style={{backgroundImage: `url(${renderData && renderData[0]["img"] ? renderData[0]["img"] : require("../../image/default.png")})`}} className="imageBox" />
							<div className="number">1</div>
						</div>
						<div style={{ height: "50%", }}>
							<div style={{backgroundImage: `url(${renderData && renderData[2]["img"] ? renderData[2]["img"] : require("../../image/default.png")})`}} className="imageBox" />
							<div className="number">3</div>
						</div>
					</div>
					<div style={{ float: "right", width: "50%", height: "100%", }}>
						<div style={{ height: "50%", borderBottom: "1px dashed #3E82F7" }}>
							<div style={{backgroundImage: `url(${renderData && renderData[1]["img"] ? renderData[1]["img"] : require("../../image/default.png")})`}} className="imageBox" />
							<div className="number">2</div>
						</div>
						<div style={{ height: "50%", }}>
							<div style={{backgroundImage: `url(${renderData && renderData[3]["img"] ? renderData[3]["img"] : require("../../image/default.png")})`}} className="imageBox" />
							<div className="number">4</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}