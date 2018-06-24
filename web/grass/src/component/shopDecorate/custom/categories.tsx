import * as React from "react";
import { Component } from "react";

import { i18nText } from "util/kit";

export default class Categories extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className="waiting__online">
				[{i18nText("Product Category Editor")}] <br/>{i18nText("Coming soon！")}
			</div>
		);
	}
}
