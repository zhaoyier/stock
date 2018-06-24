import React from "react";
import { observer, inject } from "mobx-react";
import { Checkbox, Divider, Input, Button, Row, Col, Modal, message } from "antd";
import { toJS } from "mobx";
import Message from "../../../../notice/message";

const styles = require("../../index.scss");
interface ProductSizeProps {
	data: any;
	index: number;
}

interface ProductSizeState {
	isChecked: boolean;
	sizeText: string;
}

@inject("store")
@observer
class ProductRule extends React.Component<ProductSizeProps, ProductSizeState> {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false,
			sizeText: ""
		};
		this.onChangeInput = this.onChangeInput.bind(this);
		this.onBlurInput = this.onBlurInput.bind(this);
		this.onPubCheckbox = this.onPubCheckbox.bind(this);
	}

	componentDidMount() {
		const { productDetail } = this.props["store"];
		console.log("=====>>size did:", productDetail);
	}

	onPubCheckbox(state, pos) {
		console.log("=====>>001:", pos);
		const { setSkuProps } = this.props["store"];
		const { index, data } = this.props;
		if (!data.values[pos] || state === true) {
			return;
		}

		Modal.confirm({
			title: "提示",
			content: "取消尺码会被删除",
			onOk() {
				setSkuProps(index, pos, data.values[pos], "del");
			},
			onCancel() {}
		});
	}

	onChangeInput(text) {
		console.log("====>>>change input:", text);
		this.setState({
			isChecked: text.length > 0,
			sizeText: text
		});
	}

	onBlurInput(text) {
		console.log("====>>>blur input:", text);
		const { index } = this.props;
		const { setSkuProps } = this.props["store"];
		if (text === "") {
			return;
		}

		this.setState({
				isChecked: false,
				sizeText: ""
		});
		const result = setSkuProps(index, 0, { valueId: this.getMaxValueId(), valueName: text }, "add");
		if (result) message.warn(result);
	}

	getMaxValueId() {
		const { data } = this.props;
		return (data.values || []).reduce((max, cur) => {
			return max.valueId > cur.valueId ? max.valueId : cur.valueId;
		}, 0);
	}

	render() {
		const { isChecked, sizeText } = this.state;
		const { skuSizes } = this.props["store"];
		const { data } = this.props;
		// console.log("=====>>render size:", toJS(skuSizes));
		return (
			<div>
				<div className={styles.item__attr}>
					<div className={styles.title}>{data.propName}</div>
					<div style={{ marginTop: 15 }}>
						<Row style={{ background: "#FFFFFF", marginBottom: 16 }}>
							{data.values.map((item, index) => (
								<Col span={4} key={index} style={{marginBottom: 5 }}>
									<Checkbox
										checked={item.valueId >= 0}
										onChange={e => this.onPubCheckbox(e.target.checked, index)}
									>
										{item.valueName}
									</Checkbox>
								</Col>
							))}
						</Row>
						<Row>
							<Col span={1}>
								<Checkbox checked={isChecked} />
							</Col>
							<Col span={3}>
								<Input
									placeholder="自定义"
									value={sizeText}
									onChange={e => this.onChangeInput(e.target["value"])}
									onBlur={e => this.onBlurInput(e.target["value"])}
								/>
							</Col>
						</Row>
					</div>
				</div>
				<Divider />
			</div>
		);
	}
}

export default ProductRule;
