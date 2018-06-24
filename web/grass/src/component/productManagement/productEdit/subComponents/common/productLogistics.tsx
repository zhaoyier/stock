import * as React from "react";
import { Component } from "react";
import { Radio, Tooltip, Icon, Switch, Button } from "antd";
import { observer, inject } from "mobx-react";
import update from "immutability-helper";
const styles = require("../../index.scss");
const RadioGroup = Radio.Group;

@inject("store")
@observer
export default class ProductLogistics extends Component {
	constructor(props) {
		super(props);
		this.changeShopmentInfo = this.changeShopmentInfo.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	changeShopmentInfo(e) {
		const { updateProductDetail, productDetail, setProductBase } = this.props["store"];
		productDetail.base = update(productDetail.base, { $merge: { shipmentInfo: e.target.value } });
		updateProductDetail(productDetail);
		// setProductBase("shipmentInfo", e.target.value);
	}

	handleSubmit() {}

	render() {
		const { updateProductDetail, productDetail, setProductBase } = this.props["store"];

		return (
			<div style={{ fontSize: 14 }} className={styles.pd__form}>
				<span className={styles.pd__form__title}>&emsp;商品敏感运输</span>
				<div style={{ height: "32px", lineHeight: "32px" }} className={styles.pd__form__content}>
					运输 是否含有粉末、电池、液体：
					<RadioGroup onChange={this.changeShopmentInfo} value={productDetail.base.shipmentInfo}>
						<Radio value={2}>是</Radio>
						<Radio value={1}>否</Radio>
					</RadioGroup>
				</div>
			</div>
		);
	}
}
