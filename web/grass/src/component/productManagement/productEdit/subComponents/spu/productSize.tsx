import React from "react";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import BundleEdit from "../common/bundleEdit";
import TableSku from "../common/tableSku";

const styles = require("../../index.scss");

@inject("store")
@observer
class ProductSize extends React.Component<{}, {}> {
	render() {
		const { skuRules } = this.props["store"];

		return (
			<div>
				<BundleEdit />
				<p style={{ marginTop: "10px" }} />
				<TableSku skus={skuRules} />
			</div>
		);
	}
}

export default ProductSize;
