import * as React from "react";
import { Component } from "react";
import { toJS } from "mobx";
import { Card, Select, Row, Col, Icon, Button, message } from "antd";
import { observer } from "mobx-react";

// Utility
import { i18nText } from "../../../util/kit";
import accountInfo from "../../../util/accountInfo";

// Store
import CategoryStore from "./models/chooseCategory";

const styles = require("./chooseCategory.scss");
const Option = Select.Option;

interface CategoryProps {
	store: CategoryStore;
}

@observer
class Category extends Component<CategoryProps, any> {
	constructor(props) {
		super(props);
		this.submitCategory = this.submitCategory.bind(this);
	}

	categoryTreeRender(catIndex) {
		const { store } = this.props;
		const { categoryTree, getSubCategories } = store;
		const isCN = accountInfo.shop && accountInfo.shop.originCode === "CN";
		const selectId = categoryTree[catIndex].selected;
		return (
			<ul>
				{categoryTree[catIndex].all.map((item, index) => (
					<li
						key={index}
						className={selectId === item.cid ? styles.active : ""}
						onClick={() => {
							getSubCategories(item.cid, catIndex);
						}}
					>
						<span>{isCN ? item.translation.CN : item.name}</span>
					</li>
				))}
			</ul>
		);
	}

	submitCategory() {
		const { store } = this.props;
		const { categoryTree, breadCrumb, updateHistory, selectCategoryId } = store;
		if (selectCategoryId === -1) {
			message.warn("请先选择类目");
			return;
		}
		updateHistory({ name: breadCrumb, categoryTree: toJS(categoryTree) });
		// console.log(selectCategoryId);
		if (window.location.hash.includes("?")) {
			let hash = window.location.hash;
			hash = hash.substr(hash.indexOf("?"));
			window.location.hash = `#/productEdit${hash}&cid=${selectCategoryId}&cName=${encodeURIComponent(
				breadCrumb.join(" > ")
			)}`;
		} else {
			window.location.hash = `#/productEdit?cid=${selectCategoryId}&cName=${encodeURIComponent(
				breadCrumb.join(" > ")
			)}`;
		}
	}

	render() {
		const { store } = this.props;
		const { history, updateCategoryTree, breadCrumb } = store;
		return (
			<div style={{ padding: 20 }}>
				<Card title={i18nText("select_category")}>
					<div style={{ minWidth: 800, margin: "0 auto", padding: "10px 40px" }}>
						<div>
							<label style={{ marginRight: 10, paddingTop: "1rem" }}>
								{i18nText("previous_chosen")}
							</label>
							<Select
								onChange={(item: any) => {
									updateCategoryTree(history[item].categoryTree);
								}}
								style={{ width: 400, height: 36, borderRadius: 0 }}
							>
								{history.reverse().map((item, index) => (
									<Option key={index} value={index}>
										{item.name.join(" > ")}
									</Option>
								))}
							</Select>
						</div>
						<h5 style={{ paddingTop: "1rem", fontSize: 14 }}>{i18nText("select_category")}</h5>
						<Row>
							<Col className={styles.categoryCol} span={6}>
								{this.categoryTreeRender(0)}
							</Col>
							<Col className={styles.categoryCol} span={6}>
								{this.categoryTreeRender(1)}
							</Col>
							<Col className={styles.categoryCol} span={6}>
								{this.categoryTreeRender(2)}
							</Col>
							<Col className={styles.categoryCol} span={6}>
								{this.categoryTreeRender(3)}
							</Col>
						</Row>
						<p className={styles.bread__crumb}>
							<span className={styles.title}>
								{" "}
								<Icon style={{ color: "#FAAD14" }} type="exclamation-circle" />{" "}
								{i18nText("current_chosen")}:{" "}
							</span>
							<span className={styles.content}>{breadCrumb.join(" > ")}</span>
						</p>
						<div style={{ padding: "4px 10px", border: "1px solid #ddd" }}>
							<header style={{ marginTop: 10 }}>{i18nText("seller_agreements")}</header>
							{accountInfo.shop && accountInfo.shop.originCode === "CN" ? (
								<iframe
									style={{ margin: "0 auto", width: 880, display: "block" }}
									width="100%"
									height="400"
									src="/asset/ezbuysellerterms.html"
								/>
							) : (
								<iframe
									style={{ margin: "0 auto", width: 880, display: "block" }}
									width="100%"
									height="400"
									src="https://docs.google.com/document/d/e/2PACX-1vSTdlgE6IXLcm6zr7YcMte6m1X43HRCecVUu1zqpXFJEpmyl6b67MESy0OdeLRA-s4ppmK2Tozcy5T4/pub"
								/>
							)}
						</div>
						<div style={{ textAlign: "center", marginTop: 10 }}>
							<Button
								onClick={this.submitCategory}
								style={{ width: 400, height: 48 }}
								type="primary"
							>
								{i18nText("have_read")}
							</Button>
						</div>
					</div>
				</Card>
			</div>
		);
	}
}

export default () => <Category store={new CategoryStore()} />;
