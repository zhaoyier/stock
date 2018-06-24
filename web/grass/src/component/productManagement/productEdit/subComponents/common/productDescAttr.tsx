// 商品描述属性 模块

import React from "react";
import { Input, Tooltip, Icon, Row, Col } from "antd";
import { observer, inject } from "mobx-react";

const styles = require("../../index.scss");
// const Option = Select.Option;

@inject("store")
@observer
class ProductDescAttr extends React.Component {
	constructor(props) {
		super(props);

		this.handleChangeInput = this.handleChangeInput.bind(this);
	}

	handleChangeInput(key, value) {
		console.log("====>>change:", key, value);
	}

	hanleBlurInput(key, value) {
		console.log("====>>blur:", key, value);
		// TODO 是否更新
	}

	render() {
		const { productDetail } = this.props["store"];
		const { base } = productDetail;
		return (
			<div className={styles.pd__form}>
				<div className={styles.pd__form__title}>
					<Tooltip placement="top" title={"商品详情描述"}>
						商品描述属性&ensp;<Icon className={styles.orange} type="question-circle" />
					</Tooltip>
				</div>
				<div
					style={{ textAlign: "center" }}
					className={`${styles.pd__form__content} ${styles.bg__rect}`}
				>
					<Row>
						{Object.keys(base.attributes).map((item, index) => {
							return (
								<Col key={index} style={{ marginBottom: 15 }} span={12}>
									<span style={{ display: "inline-block", width: 150, textAlign: "right" }}>
										{item}&emsp;
									</span>
									<Input
										defaultValue={base.attributes[item]}
										style={{ width: 200 }}
										onBlur={e => this.hanleBlurInput(item, e.target["value"])}
									/>
								</Col>
							);
						})}
						{Object.keys(base.attributes).length === 0 && "(暂无)"}
						{/* <Col style={{ marginBottom: 15 }} span={12}>
							<span>风格&emsp;</span>
							<Select style={{ width: 200 }}>
								<Option key="1">1</Option>
							</Select>
						</Col> */}
					</Row>
				</div>
			</div>
		);
	}
}

export default ProductDescAttr;
