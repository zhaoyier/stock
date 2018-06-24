import React from "react";
import { Input } from "antd";
import { observer, inject } from "mobx-react";
import update from "immutability-helper";

const styles = require("../../index.scss");
interface ProductTitleProps {
	detail: any;
}

@inject("store")
@observer
class ProductTitle extends React.Component<ProductTitleProps, {}> {
	constructor(props) {
		super(props);
		this.changeName = this.changeName.bind(this);
		this.changeEnName = this.changeEnName.bind(this);
	}

	changeName(e) {
		const { updateProductDetail, productDetail } = this.props["store"];
		// productDetail.base.name = e.target.value;
		productDetail.base = update(productDetail.base, { $merge: { name: e.target.value } });
		updateProductDetail(productDetail);
	}

	changeEnName(e) {
		const { updateProductDetail, productDetail } = this.props["store"];
		// productDetail.base.name = e.target.value;
		productDetail.base = update(productDetail.base, { $merge: { enName: e.target.value } });
		updateProductDetail(productDetail);
	}

	render() {
		const { detail } = this.props;
		const { productDetail } = this.props["store"];
		return (
			<div>
				<div className={styles.pd__form}>
					<span className={styles.pd__form__title}>
						&emsp;商品中文标题
					</span>
					<div className={styles.pd__form__content}>
						<Input onChange={this.changeName} value={detail.name} style={{ width: "70%" }} />
						<span>&emsp;0/120</span>
					</div>
				</div>
				<div className={styles.pd__form}>
					<span className={styles.pd__form__title}>
						&emsp;商品英文标题
					</span>
					<div className={styles.pd__form__content}>
						<Input onChange={this.changeEnName} value={detail.enName} style={{ width: "70%" }} />
						<span>&emsp;0/120</span>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductTitle;
