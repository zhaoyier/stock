import { getUrlParams } from "../../../../../util/url";

import * as React from "react";
import { Modal, message } from "antd";
// import { Provider, observer, inject } from "mobx-react";
// @inject("store")
// @observer
export default class ChangeCategory extends React.PureComponent {
	handleClick(newParams) {
		// const { params } = this.props["store"];
		// if (params["source"] === "import") {
		// 	return message.error("导入商品不能修改类目");
		// }
		Modal.confirm({
			title: "确定切换目录",
			content: "当前编辑信息会丢失，确定切换类目吗？",
			onOk() {
				window.location.href = `${window.location.pathname}#/chooseCategory?${newParams.join("&")}`;
			}
		});
	}

	render() {
		const paramsObj = getUrlParams(window.location.href);
		if (Object.keys(paramsObj).includes("cid") && Object.keys(paramsObj).includes("cName")) {
			delete paramsObj["cid"];
			delete paramsObj["cName"];
		}
		const newParams = Object.keys(paramsObj).map(item => {
			return `${item}=${paramsObj[item]}`;
		});
		return (
			// <a href={`${window.location.pathname}#/chooseCategory?${newParams.join("&")}`}> 重选类目</a>
			<a href="javascript: void(0);" onClick={this.handleClick.bind(this, newParams)}>
				{" "}
				重选类目
			</a>
		);
	}
}
