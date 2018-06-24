import * as React from "react";
import { Component } from "react";
import { Link } from "react-router";
import { Radio, Tooltip, Icon, Switch, Button } from "antd";
import accountInfo from "../../../util/accountInfo";
import { toJS } from "mobx";
import { Provider, observer, inject } from "mobx-react";
import update from "immutability-helper";
import { getUrlParams } from "../../../util/url";

import { validateData } from "../validate/publish";

const styles = require("./index.scss");
const RadioGroup = Radio.Group;

// Store
import ProductEditModel from "./models/productEdit";
import { UserProductUpdate } from "services/EzSellerService";

// Component
import ChangeCategory from "./subComponents/common/changeCategory";
import ProductTitle from "./subComponents/spu/productTitle";
import ProductDescAttr from "./subComponents/common/productDescAttr";
import { RichTextEditor } from "common/RichTextEditor";
// import ProductEditor from "../../productEdit/partial/richEditor";
import ProductMainImage from "./subComponents/common/productMainImage";
import ProductColor from "./subComponents/common/productColor";
import ProductLogistics from "./subComponents/common/productLogistics";
import ProductSize from "./subComponents/common/productSize";
import SpuProductSize from "./subComponents/spu/productSize";
import SkuItems from "./subComponents/sku/items";
import { getText } from "util/kit";

@inject("store")
@observer
class ProductEdit extends Component {
	constructor(props) {
		super(props);
		// this.changeShopmentInfo = this.changeShopmentInfo.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// changeShopmentInfo(e) {
	// 	const { updateProductDetail, productDetail, setProductBase } = this.props["store"];
	// 	// productDetail.base = update(productDetail.base, { $merge: { shipmentInfo: e.target.value } });
	// 	// updateProductDetail(productDetail);
	// 	setProductBase("shipmentInfo", e.target.value);
	// }

	handleSubmit() {
		console.log("====>>submit:");
		const { params, productDetail, skuProps, skuRules } = this.props["store"];
		productDetail.base.skuProps = skuProps;
		// 校验参数
		// TODO 校验商品中文标题
		// TODO 校验SPU/SKU主图
		// TODO 校验商品规格: 原价、售价、库存、重量、长、宽、高、货号
		// TODO
		const verify = validateData(
			this,
			{ productData: productDetail.base, productSkus: skuRules },
			getText
		);
		console.log("=====>>verify:", verify);

		switch (params["source"]) {
			case "import":
				UserProductUpdate(productDetail.base, skuRules).then(res => {
					console.log("=====>>UserProductUpdate:", res, productDetail.base, skuRules);

				}).catch(res => {
					console.log("=====>>UserProductUpdate catch:", res);
				});
				break;
			default:
				break;
		}
	}

	render() {
		const { productDetail, setBaseDescription } = this.props["store"];
		const { setSkuOrSpu, isSpu, skuProps, breadcrumb } = this.props["store"];
		console.log("===>>>index:", toJS(productDetail));
		console.log(toJS(productDetail));
		return (
			<div>
				<Switch
					checked={isSpu}
					onChange={value => {
						setSkuOrSpu(value);
					}}
				/>
				<div className={styles.content}>
					<div className={styles.content__title}>自主发布{isSpu ? "SPU" : "SKU"}</div>
					<div className={styles.product__info}>
						<div className={styles.pd__category}>
							发布类目：{breadcrumb ? breadcrumb : <span>【请选择类目】</span>}
							<ChangeCategory />
						</div>

						{/* spu 商品标题 */}
						{isSpu && <ProductTitle />}

						{/* 商品敏感运输 */}
						<ProductLogistics />

						{/* 商品描述 */}
						<ProductDescAttr />

						{/* spu 商品主图 */}
						{isSpu && <ProductMainImage images={productDetail.base.images} index={-1} />}

						{/* 商品规格 */}
						<div className={styles.pd__form}>
							<div className={styles.pd__form__title}>
								<Tooltip placement="top" title={"商品规格"}>
									商品规格&ensp;<Icon className={styles.orange} type="question-circle" />
								</Tooltip>
							</div>
							<div className={`${styles.pd__form__content} ${styles.bg__rect}`}>
								{(skuProps || []).map((item, index) => {
									if (item.propName.indexOf("颜色") !== -1) {
										return <ProductColor data={item} key={index} index={index} />;
									} else {
										return <ProductSize data={item} key={index} index={index} />;
									}
								})}

								{/* only spu */}
								{isSpu && <SpuProductSize />}
							</div>
						</div>
						{/* only sku */}
						{!isSpu && <SkuItems />}

						{/* 编辑器 */}
						<div className={styles.pd__form}>
							<div className={styles.pd__form__title}>
								<Tooltip placement="top" title={"商品详情描述"}>
									商品详情描述&ensp;<Icon className={styles.orange} type="question-circle" />
								</Tooltip>
							</div>
							<div className={styles.pd__form__content}>
								<p style={{color: "#B8B8B8", fontSize: "14px"}}>如有文字详情描述，需要在所有图片的最上方。建议卖家详情页全部使用图片格式</p>
								{/* <ProductEditor accountInfo={accountInfo} /> */}
								<RichTextEditor value={productDetail.base.description} onChange={setBaseDescription}/>
							</div>
						</div>
					</div>
					<div style={{ marginTop: 10, textAlign: "center", borderTop: "1px solid #eee" }}>
						<Button
							type="primary"
							style={{ marginTop: 10, width: 160 }}
							onClick={this.handleSubmit}
						>
							发布
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default class ProviderProdect extends React.PureComponent {
	render() {
		return (
			<Provider store={new ProductEditModel()}>
				<ProductEdit />
			</Provider>
		);
	}
}
