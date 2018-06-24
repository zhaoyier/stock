import * as React from "react";
import {
	getText
} from "../../../util/kit";
import "./index.scss";
import { Modal } from "antd";
import { i18nText } from "../../../util/kit";

class Logo extends React.Component<{}, {}> {
	directClick() {
		if (window.location.hash.includes("custom")) {
			Modal.confirm({
				title: i18nText("Work Plantform"),
				content: i18nText("You are about to leave the Self-design page ！All currently unpublished data will be lost，whether to continue ?"),
				onOk() {
					window.location.href = "/index.html";
				},
			});
		} else {
			window.location.href = "/index.html";
		}
	}
	render() {
		return (
			<div className="HomeLogoWrap">
				<a onClick={ this.directClick } href="javascript: void(0);">
				<img src={require("../image/ezbuy_logo@2x.png")} alt="ezbuy"/>
				<span>
					{getText("Seller center")}
				</span>
				</a>
			</div>
		);
	}
}

export default Logo;
