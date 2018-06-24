import * as React from "react";
import { Component } from "react";
import { Tooltip } from "antd";

import { i18nText } from "../../../util/kit";

export default class Nav extends Component<{}, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="waiting__online nav">
				{/* [{i18nText("Navigation Editor")} <br />{i18nText("Coming soon！")} */}
				<div className="title"> {i18nText("Store Navigation")} </div>
				<div className="default__title">{i18nText("Default Navigation")}</div>
				<div className="item" style={{ marginBottom: 10 }}>
					<p>{i18nText("Store home")}</p>
					<Tooltip placement="top" title={i18nText("Store home")}>
						<a href="javascript:void(0);">Home</a>
					</Tooltip>
				</div>
				<div className="item" style={{ marginBottom: 10 }}>
					<p>{i18nText("All Products")}</p>
					<Tooltip placement="top" title={i18nText("All products of store")}>
						<a href="javascript:void(0);">All Products</a>
					</Tooltip>
				</div>
				<div className="item" style={{ marginBottom: 10 }}>
					<p>{i18nText("New Arrivals")}</p>
					<Tooltip placement="top" title={i18nText("New products nearly thirty days")}>
						<a href="javascript:void(0);">New Arrivals</a>
					</Tooltip>
				</div>
				<div className="item" style={{ marginBottom: 10 }}>
					<p>{i18nText("Promotions")}</p>
					<Tooltip placement="top" title={i18nText("Products from Free shipping or Cash off or Buy X get X free")}>
						<a href="javascript:void(0);">Promotions</a>
					</Tooltip>
				</div>
			</div>
		);
	}
}