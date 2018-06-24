import * as React from "react";
import { Row, Form, Col, Input, Alert, Button, Icon, Switch, Tooltip, Modal, message } from "antd";
import { locale } from "../../config/locale";
import { connect } from "react-redux";

// API
import {
	getValueOptions,
	changeCategory,
	productChange,
	productSkusChange,
	productUpdate,
	productSelected,
	userUnCommitedProductUpdate,
	userImportSubTaskProductUpdate
	// productGet,
	// getCategory,
	// setValueOptions,
} from "../../action/productManage";

// component
import IsNotSingle from "./partial/isNotSingle";
import IsSingle from "./partial/isSingle";
import UploadgImage from "./partial/uploadImage";
import ProductEditor from "./partial/richEditor";
import Bread from "./partial/breadcrumb";

// utility
import { redirect } from "../../util/history";
import { initData } from "./utility/constant";
import { validateData } from "./utility/validate/validate";
import { differentEntrance } from "./utility/helper/differentEntranceForPrdouctEdit";
import "./productEdit.scss";

// constant
import { singleProductSku, Entrance } from "./utility/constant";
import { ProductProps, ProductStates } from "./variableType";
const FormItem = Form.Item;

@connect(state => ({
	accountInfo: state.common.accountInfo,
	isReplaceCategory: state.productManage.isReplaceCategory,
	categoryTree: state.productManage.categoryTree,
	productData: state.productManage.productData,
	productSkus: state.productManage.productSkus,
	valueOptions: state.productManage.valueOptions,
	category: state.productManage.category
}))
class Product extends React.Component<ProductProps, ProductStates> {
	constructor(props) {
		super(props);
		this.state = {
			isSingleProduct: false,
			loading: false,
			errorCategory: {},
			errorName: {},
			errorProductImage: {},
			errorDescription: {},
			errorStyle: {},
			errorRow: 0
		};
		this.changeCategory = this.changeCategory.bind(this);
		this.submitProduct = this.submitProduct.bind(this);
	}

	componentDidMount() {
		const { from, pid, categoryId, subTaskId } = this.props.location.query;
		const { dispatch, isReplaceCategory, productData } = this.props;
		if (productData["source"] !== 2) {
			// 一键导入
			dispatch(productSkusChange([]));
		}
		dispatch(productSelected([]));
		// 获取当前类目sku属性
		// 这个地方重构后逻辑仍然复杂，因为起初的流程设计做的很烂，把修改类目和新建类目的入口做在一个页面，导致后面有很多恶心的逻辑，less j zombie yellow f**k
		dispatch(
			getValueOptions(Number(categoryId), valueOptions => {
				if (!isReplaceCategory) {
					// 来源判断
					switch (from) {
						case Entrance.checkProduct:
							differentEntrance(dispatch, categoryId, pid, valueOptions, this).checkProduct();
							break;
						case Entrance.bundleEdit:
							differentEntrance(dispatch, categoryId, pid, valueOptions, this).bundleEdit();
							break;
						case Entrance.importEdit:
							differentEntrance(dispatch, categoryId, pid, valueOptions, this).importEdit(
								subTaskId
							);
							break;
						default:
							// 初始化数据
							initData.categoryId = Number(categoryId);
							dispatch(productChange(initData));
							dispatch(productSkusChange([]));
							break;
					}
				} else {
					// 更换类目
					switch (from) {
						case Entrance.importEdit:
							dispatch(productChange({ categoryId: Number(categoryId) }));
							break;
						default:
							dispatch(productChange({ categoryId: Number(categoryId), skuProps: [] }));
					}
				}
			})
		);
	}

	changeCategory() {
		const { dispatch } = this.props;
		const { from, subTaskId } = this.props.location.query;
		let params: any = {};
		dispatch(changeCategory(true));
		if (from) {
			params = Object.assign({}, { from });
		}
		if (subTaskId) {
			params = Object.assign(params, { subTaskId });
		}
		redirect("/addNewProduct", params);
	}

	isSingleProduct(e) {
		const state = this.state.isSingleProduct;
		const { accountInfo, dispatch, productSkus } = this.props;
		const getText = locale(accountInfo.shop.originCode);
		const self = this;
		Modal.confirm({
			title: state
				? getText("Are you sure to switch to product spicifications?")
				: getText("Are you sure to switch to Single Product Upload?"),
			content: getText("this action might untick those already selected products"),
			okText: getText("confirm"),
			cancelText: getText("cancel"),
			onOk() {
				self.setState({ isSingleProduct: !state });
				productSkus[0] = singleProductSku;
				if (!state) {
					// 单品
					dispatch(productSelected([]));
					dispatch(productSkusChange(productSkus));
				} else {
					dispatch(productChange({ skuProps: [] }));
					dispatch(productSkusChange([]));
				}
			},
			onCancel() {
				self.setState({ isSingleProduct: state });
			}
		});
	}

	submitProduct() {
		const { dispatch, productData, productSkus, accountInfo } = this.props;
		const { from, subTaskId } = this.props.location.query;

		const getText = locale(accountInfo.shop.originCode);
		const errorData: Function = validateData(this, { productData, productSkus }, getText);
		const isLocal =
			accountInfo.shop.originCode === "SGLocal" || accountInfo.shop.originCode === "MYLocal";
		if (isLocal) {
			productData.isStocked = true;
		}
		if (errorData) {
			errorData(message);
			return;
		}
		this.setState({
			loading: true
		});
		console.log("=====>1301:", from);
		switch (from) {
			case Entrance.checkProduct:
				dispatch(
					productUpdate(
						productData,
						productSkus,
						() => {
							redirect("/arrangeProduct");
						},
						() => {
							this.setState({ loading: false });
						}
					)
				);
				break;
			case Entrance.bundleEdit:
				dispatch(
					userUnCommitedProductUpdate(productData, productSkus, () => {
						redirect("/editbulkupload");
					})
				);
				break;
			case Entrance.importEdit:
				dispatch(
					userImportSubTaskProductUpdate(subTaskId, productData, productSkus, () => {
						redirect("/arrangeProduct");
					})
				);
				break;
			default:
				dispatch(
					productUpdate(
						productData,
						productSkus,
						() => {
							redirect("/arrangeProduct");
						},
						() => {
							this.setState({ loading: false });
						}
					)
				);
				break;
		}
	}

	getRequireMarkForLabel(data) {
		return (
			<span>
				<span style={{ color: "#f00", verticalAlign: "middle" }}> * </span>
				{data}
			</span>
		);
	}

	changeDescription(value) {
		const { dispatch } = this.props;
		// 1. 不知道为啥，这个函数在编辑完商品提交后，再次新建商品，会触发。
		// 2. 需要判断字符串不为<div><br></div>, 因为编辑器添加再清空后，会残留<div><br></div>
		if (value === "<div><br></div>") {
			value = "";
		}
		dispatch(productChange({ description: value }));
	}

	render() {
		const {
			dispatch,
			categoryTree,
			productData,
			accountInfo,
			category,
			isReplaceCategory
		} = this.props;
		const { from } = this.props.location.query;
		const formItemLayout = { labelCol: { xs: { span: 5 } }, wrapperCol: { xs: { span: 19 } } };
		const getText = locale(accountInfo.shop.originCode);
		const isChinese = accountInfo.shop.originCode === "CN" ? true : false;
		const isLocal =
			accountInfo.shop.originCode === "SGLocal" || accountInfo.shop.originCode === "MYLocal";
		return (
			<div style={{ width: 1100, padding: 15 }}>
				<Row>
					<Col span={24}>
						{/* <Icon style={{ fontSize: 32 }} type="file-add" /> */}
						<Form style={{ paddingBottom: 100 }}>
							<div style={{ background: "#ECF4FF", fontWeight: "bold" }}>
								<FormItem
									{...formItemLayout}
									label={getText("current_chosen")}
									style={this.state.errorCategory}
								>
									<Bread
										productData={productData}
										isReplaceCategory={isReplaceCategory}
										categoryTree={categoryTree}
										category={category}
										isChinese={isChinese}
										from={from}
									/>
									<Button size="small" onClick={this.changeCategory}>
										{getText("edit_category")}
									</Button>
								</FormItem>
							</div>
							{/* 产品标题 */}
							<FormItem
								{...formItemLayout}
								label={this.getRequireMarkForLabel(
									isChinese ? getText("product_chinese_name") : getText("Product Name")
								)}
							>
								<Input
									type="text"
									id="productName"
									value={productData.name}
									style={this.state.errorName}
									onChange={e => dispatch(productChange({ name: e.currentTarget.value }))}
								/>
								<Alert
									message={
										isChinese ? getText("chinese_title_hint") : getText("english_title_hint")
									}
									type="warning"
								/>
							</FormItem>
							{/* 产品英文标题 */}
							{isChinese && (
								<FormItem {...formItemLayout} label={getText("product_english_name")}>
									<Input
										type="text"
										id="product_english_name"
										value={productData.enName}
										onChange={e => dispatch(productChange({ enName: e.currentTarget.value }))}
									/>
									<Alert message={getText("english_title_hint")} type="warning" />
								</FormItem>
							)}
							{/* 商品主图 */}
							<FormItem
								{...formItemLayout}
								label={this.getRequireMarkForLabel(getText("product_picture"))}
							>
								<UploadgImage
									error={this.state.errorProductImage}
									accountInfo={this.props.accountInfo}
									productData={this.props.productData}
									productChange={data => this.props.dispatch(productChange(data))}
								/>
							</FormItem>
							{/* 是否预售 local */}
							{false &&
								isLocal && (
									<FormItem {...formItemLayout} label={getText("is_presale")}>
										<Switch
											checked={productData.isStocked}
											onChange={v => {
												if (v) {
													Modal.confirm({
														title:
															"As the pre-sale of goods need to be shipped separately, the choice of pre-sale may result in you pay more local delivery fee, if you mistakenly choose to be ezbuy will not be liable, are you sure? In addition the function will be March 19, 2018 offline, if you have questions or you need to use this function, please contact our operations staff.",
														onOk() {
															dispatch(productChange({ isStocked: v }));
														},
														width: 900
													});
												} else {
													dispatch(productChange({ isStocked: v }));
												}
											}}
										/>
									</FormItem>
								)}
							{/* 单品 & 非单品 开关 */}
							<FormItem
								{...formItemLayout}
								label={
									<Tooltip title={getText("activate_hotkey")}>
										<a>{getText("is_single")}</a>
									</Tooltip>
								}
							>
								<Switch
									checkedChildren={getText("on")}
									unCheckedChildren={getText("off")}
									checked={this.state.isSingleProduct}
									onChange={e => this.isSingleProduct(e)}
								/>
							</FormItem>
							{/* 敏感品 */}
							<FormItem {...formItemLayout} label={<a>{getText("is_sensitive")}</a>}>
								<Switch
									checkedChildren={getText("on")}
									unCheckedChildren={getText("off")}
									checked={productData.shipmentInfo === 2}
									onChange={v => {
										dispatch(productChange({ shipmentInfo: v ? 2 : 1 }));
									}}
								/>
							</FormItem>
							{/* 产品规格 模块*/}
							<FormItem
								{...formItemLayout}
								label={this.getRequireMarkForLabel(
									this.state.isSingleProduct
										? getText("single_product")
										: getText("product_spicifications")
								)}
							>
								<IsSingle
									show={this.state.isSingleProduct}
									accountInfo={this.props.accountInfo}
									productData={this.props.productData}
									productSkus={this.props.productSkus}
									errorStyle={this.state.errorStyle}
								/>
								<IsNotSingle
									show={!this.state.isSingleProduct}
									productData={this.props.productData}
									productSkus={this.props.productSkus}
									errorStyle={this.state.errorStyle}
									errorRow={this.state.errorRow}
								/>
							</FormItem>
							{/* 产品详情 编辑器 */}
							<FormItem
								{...formItemLayout}
								label={this.getRequireMarkForLabel(getText("product_detail"))}
							>
								<ProductEditor
									accountInfo={this.props.accountInfo}
									errorDescription={this.state.errorDescription}
									productData={productData}
									productChange={value => this.changeDescription(value)}
								/>
							</FormItem>
						</Form>
						<div
							style={{
								position: "fixed",
								left: 255,
								bottom: 0,
								width: "90%",
								height: 50,
								background: "#f2f2f2",
								paddingTop: 12,
								textAlign: "center"
							}}
						>
							<Button type="primary" onClick={this.submitProduct}>
								{this.state.loading ? (
									<Icon style={{ fontSize: 16 }} type="loading" />
								) : (
									<Icon style={{ fontSize: 16 }} type="check" />
								)}
								{getText("submit")}
							</Button>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Product;
