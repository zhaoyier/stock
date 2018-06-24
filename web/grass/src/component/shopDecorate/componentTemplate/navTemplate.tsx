import * as React from "react";
import { BaseTemplate } from "./types";

interface NavTemplateProps {
	data: BaseTemplate;
}

export default class NavTemplate extends React.PureComponent<NavTemplateProps> {
	render() {
		return (
			<div className="nav">
				<ul>
					<li>Home</li>
					<li>All Products</li>
					<li>New Arrivals</li>
					<li>Promotions</li>
				</ul>
			</div>
		);
	}
}
