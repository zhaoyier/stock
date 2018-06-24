import * as React from "react";
import { inject, observer } from "mobx-react";
import BundleEdit from "../common/bundleEdit";
import { Collapse, Radio } from "antd";

import CommonProductTitle from "../common/productTitle";
import ProductMainImage from "../common/productMainImage";
import TableSku from "../common/tableSku";
import { toJS } from "mobx";

const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
const styles = require("../../index.scss");

@inject("store")
@observer
class SkuItems extends React.Component {
	changeCollapse(e) {
		console.log(e);
	}
	changeSkuItemRadio(e) {
		console.log(e);
	}
	render() {
		const { skuRules } = this.props["store"];
		console.log("====>>>items;", toJS(skuRules));
		const CollapseTitle: any = (item, index) => (
			<div>
				<div className={styles.clearfix}>
					<div style={{ float: "left" }}>
						SKU{index}：{JSON.stringify(item.attributes)}；
					</div>
					<div style={{ float: "right" }}>
						{/*
						https://github.com/ant-design/ant-design/issues/2738
						if you have any better method, just optimize it :)
					*/}
						<div
							style={{ display: "inline-block" }}
							onClick={e => {
								e.stopPropagation();
							}}
						>
							<RadioGroup defaultValue="yes" onChange={this.changeSkuItemRadio}>
								<Radio value="yes">上架</Radio>
								<Radio value="no">下架</Radio>
							</RadioGroup>
						</div>
					</div>
				</div>
			</div>
		);
		// const skuItems = ["666", "333", "123"];
		return (
			<div>
				<BundleEdit />
				<Collapse
					style={{ marginTop: 24 }}
					accordion
					defaultActiveKey={["0"]}
					onChange={this.changeCollapse}
				>
					{skuRules.map((item, index) => (
						<Panel header={CollapseTitle(item, index + 1)} key={`"${index}"`}>
							<CommonProductTitle detail={item} />
							<ProductMainImage images={item.images} index={index} />
							<div className={styles.item__attr}> 规格 </div>
							<TableSku skus={[item]} />
						</Panel>
					))}
				</Collapse>
			</div>
		);
	}
}

export default SkuItems;
