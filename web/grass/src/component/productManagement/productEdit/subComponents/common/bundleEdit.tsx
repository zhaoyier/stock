import * as React from "react";
import { observer, inject } from "mobx-react";
import { Button, Input } from "antd";
const styles = require("../../index.scss");

interface BundleEditState {
	bundles: Array<any>;
}

@inject("store")
@observer
class BundleEdit extends React.Component<{}, BundleEditState> {
	constructor(props) {
		super(props);
		this.state = {
			bundles: []
		};
		this.handleSubmitProps = this.handleSubmitProps.bind(this);
	}

	componentDidMount() {
		this.setState({
			bundles: [
				{ key: "originalPrice", value: null, width: 66, placeholder: "原价" },
				{ key: "price", value: null, width: 66, placeholder: "售价" },
				{ key: "quantity", value: null, width: 66, placeholder: "库存" },
				{ key: "weight", value: null, width: 66, placeholder: "重量" },
				{ key: "volume.length", value: null, width: 66, placeholder: "长" },
				{ key: "volume.width", value: null, width: 66, placeholder: "宽" },
				{ key: "volume.height", value: null, width: 66, placeholder: "高" },
				{ key: "sellerSkuId", value: null, width: 110, placeholder: "商家编码" }
			]
		});
	}
	handleChangeProps(value, index) {
		let { bundles } = this.state;
		bundles[index].value = value ? value : null;
		this.setState({
			bundles
		});
	}

	// 批量修改属性
	handleSubmitProps() {
		console.log("====>>submit:");
		let { bundles } = this.state;
		const { setSkuRulesProps } = this.props["store"];
		bundles.map(item => {
			if (item.value !== null) {
				setSkuRulesProps(item.key, item.value);
			}
		});
	}

	render() {
		const { bundles } = this.state;

		return (
			<div>
				<div className={styles.title}>批量填写</div>
				<div style={{ marginTop: 15 }}>
					{bundles.map((item, index) => (
						<Input
							key={index}
							style={{ width: item.width, marginRight: 10 }}
							placeholder={item.placeholder}
							value={item.value}
							onChange={e => this.handleChangeProps(e.target["value"], index)}
						/>
					))}
					<Button onClick={this.handleSubmitProps}> 确定 </Button>
				</div>
			</div>
		);
	}
}

export default BundleEdit;
