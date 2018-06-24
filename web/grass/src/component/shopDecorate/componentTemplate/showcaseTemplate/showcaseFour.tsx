import * as React from "react";
import { BaseTemplate } from "../types";

interface ShowcaseProps {
	data?: BaseTemplate;
}

export default class ShowcaseFour extends React.PureComponent<ShowcaseProps> {
	render() {
		const { data } = this.props;
		let renderData: undefined | {} = data;
		console.log(renderData);
		return (
			<div className="showcase__model">
				<div style={{ widht: "100%", height: "100%" }}>
					<div style={{ width: "100%", height: "50%", }}>
						<div style={{ float: "left", width: "25%", height: "100%", borderBottom: "1px dashed #3E82F7", borderRight: "1px dashed #3E82F7" }}>
							<div style={{backgroundImage: `url(${renderData && renderData[0]["img"] ? renderData[0]["img"] : require("../../image/default.png")})`}} className="imageBox" />
							<div className="number">1</div>
						</div>
						<div style={{ float: "left", width: "25%", height: "100%", borderBottom: "1px dashed #3E82F7", borderRight: "1px dashed #3E82F7" }}>
							<div style={{backgroundImage: `url(${renderData && renderData[1]["img"] ? renderData[1]["img"] : require("../../image/default.png")})`}} className="imageBox" />
							<div className="number">2</div>
						</div>
						<div style={{ float: "left", width: "25%", height: "100%", borderBottom: "1px dashed #3E82F7", borderRight: "1px dashed #3E82F7" }}>
							<div style={{backgroundImage: `url(${renderData && renderData[2]["img"] ? renderData[2]["img"] : require("../../image/default.png")})`}} className="imageBox" />
							<div className="number">3</div>
						</div>
						<div style={{ float: "left", width: "25%", height: "100%", borderBottom: "1px dashed #3E82F7", }}>
							<div style={{backgroundImage: `url(${renderData && renderData[3]["img"] ? renderData[3]["img"] : require("../../image/default.png")})`}} className="imageBox" />
							<div className="number">4</div>
						</div>
					</div>
					<div style={{ width: "100%", height: "50%", }}>
						<div style={{ float: "left", width: "25%", height: "100%", borderRight: "1px dashed #3E82F7" }}>
							<div style={{backgroundImage: `url(${renderData && renderData[4]["img"] ? renderData[4]["img"] : require("../../image/default.png")})`}} className="imageBox" />
							<div className="number">5</div>
						</div>
						<div style={{ float: "left", width: "25%", height: "100%", borderRight: "1px dashed #3E82F7" }}>
							<div style={{backgroundImage: `url(${renderData && renderData[5]["img"] ? renderData[5]["img"] : require("../../image/default.png")})`}} className="imageBox" />
							<div className="number">6</div>
						</div>
						<div style={{ float: "left", width: "25%", height: "100%", borderRight: "1px dashed #3E82F7" }}>
							<div style={{backgroundImage: `url(${renderData && renderData[6]["img"] ? renderData[6]["img"] : require("../../image/default.png")})`}} className="imageBox" />
							<div className="number">7</div>
						</div>
						<div style={{ float: "left", width: "25%", height: "100%", }}>
							<div style={{backgroundImage: `url(${renderData && renderData[7]["img"] ? renderData[7]["img"] : require("../../image/default.png")})`}} className="imageBox" />
							<div className="number">8</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}