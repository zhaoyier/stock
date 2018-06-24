import React from "react";
import { Alert } from "antd";
import { observer, inject } from "mobx-react";

// Component
import CommonProductTitle from "../common/productTitle";
const styles = require("../../index.scss");

@inject("store")
@observer
class ProductTitle extends React.Component<{}, {}> {
	render() {
		const { productDetail } = this.props["store"];
		return (
			<div>
				<div className={`${styles.pd__chinese__title} ${styles.pd__form}`}>
					<div className={`${styles.title} ${styles.pd__form__title}`}>商品基本信息：</div>
					<CommonProductTitle detail={productDetail.base} />
					<div style={{ marginTop: 10 }} className={styles.pd__form}>
						<span className={styles.pd__form__title}>&emsp;</span>
						<div className={styles.pd__form__content}>
							<Alert
								style={{ width: 700 }}
								message="机器翻译准确率不高，建议尽量填写英文标题，使用英文标题会获得更多的曝光率。"
								type="info"
								showIcon
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductTitle;
