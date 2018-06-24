import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Checkbox, Collapse, Button, Switch, Input, message, Icon } from "antd";
import { locale } from "../../../config/locale";
import "../productEdit.scss";

import {
	productSelected,
	productChange,
	productSkusChange,
} from "../../../action/productManage";
const Panel = Collapse.Panel;

// component
import SkuUploadImage from "./skuUploadImage";

// utility
import { IsNotSingleProps, IsNotSingleState } from "../variableType";
import { countryUnit } from "../utility/constant";
import { skuSelectedHelper } from "../utility/helper/skuSelectedData";
import { findWholeSkuAttrByName } from "../utility/helper/findTranslationBySkuValueName";
import { customSkuAttr } from "../utility/helper/customSkuAttr";
import { formatInputDate } from "../utility/helper/kit";
import { getText } from "util/kit";

@connect(state => ({
	accountInfo: state.common.accountInfo,
	productSkus: state.productManage.productSkus,
	valueOptions: state.productManage.valueOptions,
	skuSelected: state.productManage.skuSelected,
}))
class IsNotSingle extends Component<IsNotSingleProps, IsNotSingleState> {
	private customInput: any;
	constructor(props) {
		super(props);
		this.customInput = {};
		this.state = {
			originOptionMulti: [],
			batch: {
				sellerSkuId: "",
				originalPrice: "",
				price: "",
				quantity: "",
				weight: "",
				volume: {
					length: "",
					width: "",
					height: ""
				}
			}
		};
		this.batchAdd = this.batchAdd.bind(this);
	}

	componentDidMount() {
		this.getSkuOptionsValue(this.props);
	}

	componentWillReceiveProps(next) {
		this.getSkuOptionsValue(next);
	}

	getSkuOptionsValue(next) {
		const skuProps = next.productData.skuProps;
		const data = customSkuAttr(next.valueOptions.multi, skuProps);
		this.setState({
			originOptionMulti: data
		});
	}

	skuSelected(item, sku, index) {
		const { skuSelected, dispatch, productData, accountInfo, productSkus } = this.props;
		let { skuProps } = productData;

		// update skuSelected
		const resultSelect = skuSelectedHelper.productSelected(skuSelected, item, sku, index);
		dispatch(productSelected(resultSelect));

		// update productData.skuProps
		const resultSkuProps = skuSelectedHelper.productChange(skuProps, item, sku);
		dispatch(productChange({ skuProps: resultSkuProps }));

		// update productSkus
		const resultProductSkus = skuSelectedHelper.productSkus(skuSelected, productSkus, accountInfo.shop.originCode);
		dispatch(productSkusChange(resultProductSkus));
	}

	getSkuName(e, pname) {
		if (/(:|;)+/.test(e)) {
			message.warn(getText("Can not contain special characters"));
		}
		else {
			this[pname] = e;
		}
		this.forceUpdate();
	}

	addCustomSkuValue(sku, index) {
		const data = this.state.originOptionMulti;
		console.log("!!!", this.customInput[sku.pname].input.value);
		const inputValue = this.customInput[sku.pname].input.value.replace(/(^\s+|\s+$)/g, "");
		const { accountInfo } = this.props;
		const origin = accountInfo.shop.originCode;
		let isExist = false;
		if (this.customInput[sku.pname].input.value === "") {
			message.warn("not blank!!!");
			return;
		}
		data[index]["pvs"].map(item => {
			if (item.vname === inputValue || item.translation[origin] === inputValue) {
				isExist = true;
			}
		});
		if (isExist) {
			message.warn("do not repeat");
			isExist = false;
			return;
		}
		this.customInput[sku.pname].input.value = "";
		data[index]["pvs"].push({
			pname: sku.pname,
			vname: this[sku.pname],
			translation: {},
		});
		this.setState({
			originOptionMulti: data
		});
	}

	updateProductSku(row, type, value) {
		const { dispatch, productSkus } = this.props;
		switch (type) {
			case "length":
			case "width":
			case "height":
				productSkus[row]["volume"][type] = value;
				break;
			default:
				productSkus[row][type] = value;
				break;
		}
		dispatch(productSkusChange(productSkus));
	}

	blurUpdateProductSku(row, type, value) {
		const { dispatch, productSkus } = this.props;
		formatInputDate(type, productSkus[row], value);
		dispatch(productSkusChange(productSkus));
	}

	switchSale(row, e) {
		const { dispatch, productSkus } = this.props;
		productSkus[row]["isOnSale"] = e;
		dispatch(productSkusChange(productSkus));
	}

	getSkuUploadImage(originCode) {
		const { productData, valueOptions } = this.props;
		let { skuProps } = productData;
		let result = {};
		if (productData.source === 2) {
			// 来自一键导入的内容
			result = findWholeSkuAttrByName(skuProps, valueOptions.multi, /颜色/i);
		} else {
			result = findWholeSkuAttrByName(skuProps, valueOptions.multi, /color|颜色/i);
		}
		if (result === false) {
			return;
		}
		return result["result"].map((item, index) => {
			const name = item.translation[originCode] ? item.translation[originCode] : item.vname;
			return (
				<SkuUploadImage
					colorName={name}
					skuPropsIndex={result["skuPropsIndex"]}
					valueIndex={index}
					productData={this.props.productData}
					dispatch={this.props.dispatch}
				/>
			);
		});
	}

	batchEditChange(e, type) {
		let batch = this.state.batch;
		if (/(:|;)+/.test(e)) {
			message.warn(getText("Can not contain special characters"));
			return;
		}
		//    batch[type] = e;
		switch (type) {
			case "length":
			case "width":
			case "height":
				batch["volume"][type] = parseInt(e);
				break;
			default:
				batch[type] = e;
				break;
		}
		this.setState({
			batch
		});
	}

	blurBatchEditChange(e, type) {
		let batch = this.state.batch;
		switch (type) {
			case "length":
			case "width":
			case "height":
				batch["volume"][type] = parseInt(e);
				break;
			default:
				batch[type] = e;
				break;
		}
		formatInputDate(type, batch, e);
		this.setState({
			batch
		});
	}

	batchAdd() {
		const { dispatch, productSkus } = this.props;
		const { batch } = this.state;
		productSkus.map(item => {
			const oneGroupDate = JSON.parse(JSON.stringify(batch));
			if (oneGroupDate.sellerSkuId === "") {
				oneGroupDate.sellerSkuId = item.sellerSkuId;
			}
			if (oneGroupDate.originalPrice === "") {
				oneGroupDate.originalPrice = item.originalPrice;
			}
			if (oneGroupDate.price === "") {
				oneGroupDate.price = item.price;
			}
			if (oneGroupDate.quantity === "") {
				oneGroupDate.quantity = item.quantity;
			}
			if (oneGroupDate.weight === "") {
				oneGroupDate.weight = item.weight;
			}
			if (oneGroupDate.volume.length === "") {
				oneGroupDate.volume.length = item.volume.length;
			}
			if (oneGroupDate.volume.width === "") {
				oneGroupDate.volume.width = item.volume.width;
			}
			if (oneGroupDate.volume.height === "") {
				oneGroupDate.volume.height = item.volume.height;
			}
			Object.assign(item, oneGroupDate);
		});
		dispatch(productSkusChange(productSkus));
	}

	render() {
		const { accountInfo, productData, productSkus } = this.props;
		const { batch } = this.state;
		const currentUnit = countryUnit[this.props.accountInfo.shop.originCode] || "￥";
		const getText = locale(accountInfo.shop.originCode);
		const origin = accountInfo.shop.originCode;
		const isLocal = this.props.accountInfo.shop.originCode === "SGLocal" || this.props.accountInfo.shop.originCode === "MYLocal";
		return (
			<div>
				<div style={this.props.show ? { display: "block" } : { display: "none" }}>
					{/* 自主发布不允许修改属性 */}
					{productData["source"] !== 2 && (
						<Collapse defaultActiveKey={["0", "1", "2", "4", "5", "6"]}>
							{this.state.originOptionMulti.map((sku, index) => {
								if (sku.pname === "" || sku.pvs.length === 0) {
									return;
								}
								const header = sku.translation[origin] ? sku.translation[origin] : sku.pname;
								let selectedArray: any = [];
								for (let i = 0; i < productData.skuProps.length; i++) {
									if (sku.pname === productData.skuProps[i].propName) {
										selectedArray = productData.skuProps[i].values.map(item => item.valueName);
									}
								}
								return (
									<Panel key={index} header={header} >
										{sku.pvs.map(item => (
											<Checkbox
												checked={selectedArray.includes(item.vname)}
												onChange={e => this.skuSelected(item, sku, index)}>
												{item.translation[origin] ? item.translation[origin] : item.vname}
											</Checkbox>
										))}
										<hr style={{ border: "1px solid #eee", marginBottom: 5 }} />
										<Input ref={input => this.customInput[sku.pname] = input} value={this[sku.pname]} onChange={e => this.getSkuName(e.currentTarget.value, sku.pname)} style={{ width: 100 }} type="text" />
										<Button onClick={() => this.addCustomSkuValue(sku, index)}>{getText("user_define")}</Button>
									</Panel>
								);
							})}
						</Collapse>
					)}
					<table style={{ marginTop: 20, whiteSpace: "nowrap" }} className="isNotSingleTable">
						<tbody>
							<tr style={{ background: "#ECF4FF", color: "#000" }}>
								<th>{getText("sku_name")}</th>
								<th>{getText("sku_id")}</th>
								<th>{getText("origin_price")}({currentUnit})</th>
								<th><span className="require-label">* </span>{getText("selling_price")}({currentUnit})</th>
								<th><span className="require-label">* </span>{productData!.isStocked && isLocal ? `${getText("presale_stock")}` : `${getText("current_stock")}(${getText("unit")})`}</th>
								{/* <th>{getText("shipping_fee")}({currentUnit})</th> */}
								<th><span className="require-label">* </span>{getText("weight")}(kg)</th>
								<th>{getText("length")}(cm)</th>
								<th>{getText("breadth")}(cm)</th>
								<th>{getText("height")}(cm)</th>
								<th>{getText("On Sale")}</th>
							</tr>
							<tr>
								<td>{getText("Bulk Edit")}</td>
								<td>
									<input value={batch.sellerSkuId} className="inputNumber" type="text"
										onChange={e => { this.batchEditChange(e.target.value, "sellerSkuId"); }}
										onBlur={e => { this.blurBatchEditChange(e.currentTarget.value, "sellerSkuId"); }}
									/>
								</td>
								<td>
									<input value={batch.originalPrice} type="number" className="inputNumber"
										onChange={e => { this.batchEditChange(e.target.value, "originalPrice"); }}
										onBlur={e => { this.blurBatchEditChange(e.currentTarget.value, "originalPrice"); }}
									/>
								</td>
								<td>
									<input value={batch.price} type="number" className="inputNumber"
										onChange={e => { this.batchEditChange(e.target.value, "price"); }}
										onBlur={e => { this.blurBatchEditChange(e.currentTarget.value, "price"); }}
									/>
								</td>
								<td>
									<input value={batch.quantity} type="number" className="inputNumber"
										onChange={e => { this.batchEditChange(e.target.value, "quantity"); }}
										onBlur={e => { this.blurBatchEditChange(e.currentTarget.value, "quantity"); }}
									/>
								</td>
								{/* <td>
				<div style={{ width: "100%", height: "100%", background: "#eee" }}>&nbsp;</div>
			  </td> */}
								<td>
									<input value={batch.weight} type="number" className="inputNumber"
										onChange={e => { this.batchEditChange(e.target.value, "weight"); }}
										onBlur={e => { this.blurBatchEditChange(e.currentTarget.value, "weight"); }}
									/>
								</td>
								<td>
									<input value={batch.volume.length} type="number" className="inputNumber"
										onChange={e => { this.batchEditChange(e.target.value, "length"); }}
										onBlur={e => { this.blurBatchEditChange(e.currentTarget.value, "length"); }}
									/>
								</td>
								<td>
									<input value={batch.volume.width} type="number" className="inputNumber"
										onChange={e => { this.batchEditChange(e.target.value, "width"); }}
										onBlur={e => { this.blurBatchEditChange(e.currentTarget.value, "width"); }}
									/>
								</td>
								<td>
									<input value={batch.volume.height} type="number" className="inputNumber"
										onChange={e => { this.batchEditChange(e.target.value, "height"); }}
										onBlur={e => { this.batchEditChange(e.currentTarget.value, "height"); }}
									/>
								</td>
								<td>
									<Button onClick={this.batchAdd}>{getText("Bulk Edit")}</Button>
								</td>
							</tr>
							{productSkus.length === 0 && (
								<tr>
									<td colSpan={11}><Icon type="hourglass" />{getText("Please select SKU details")}</td>
								</tr>
							)}
							{productSkus.map((item, index) => {
								let errorInfo = true;
								const ifSaleOn = (item, input) => {
									return item.isOnSale ? (input) : (<span> -- </span>);
								};
								errorInfo = index === this.props.errorRow;
								return (
									<tr>
										<td>{item.name}</td>
										<td style={errorInfo ? this.props.errorStyle.sellerSkuId : {}}>
											{ifSaleOn(item, (
												<input type="text" className="inputNumber"
													value={item.sellerSkuId}
													onChange={e => this.updateProductSku(index, "sellerSkuId", e.currentTarget.value)}
													onBlur={e => this.blurUpdateProductSku(index, "sellerSkuId", e.currentTarget.value)}
												/>
											))}
										</td>
										<td style={errorInfo ? this.props.errorStyle.originalPrice : {}}>
											{ifSaleOn(item, (
												<input type="number" className="inputNumber"
													value={item.originalPrice}
													onChange={e => this.updateProductSku(index, "originalPrice", e.currentTarget.value)}
													onBlur={e => this.blurUpdateProductSku(index, "originalPrice", e.currentTarget.value)}
												/>
											))}
										</td>
										<td style={errorInfo ? this.props.errorStyle.price : {}}>
											{ifSaleOn(item, (
												<span>
													<input type="number" className="inputNumber"
														value={item.price}
														onChange={e => this.updateProductSku(index, "price", e.currentTarget.value)}
														onBlur={e => this.blurUpdateProductSku(index, "price", e.currentTarget.value)}
													/>
													{(item.originalPrice !== 0 && item.originalPrice !== "") && (
														<i>({(Number(item.price) / Number(item.originalPrice) * 10).toFixed(1)}折)&nbsp;</i>
													)}
												</span>
											))}
										</td>
										<td style={errorInfo ? this.props.errorStyle.quantity : {}}>
											{ifSaleOn(item, (
												<input type="number" className="inputNumber"
													value={item.quantity}
													onChange={e => this.updateProductSku(index, "quantity", e.currentTarget.value)}
													onBlur={e => this.blurUpdateProductSku(index, "quantity", e.currentTarget.value)}
												/>
											))}
										</td>
										{/* <td style={errorInfo ? this.props.errorStyle.shippingFee : {}} >
					<div style={{ width: "100%", height: "100%", background: "#eee" }}>&nbsp;</div>
				  </td> */}
										<td style={errorInfo ? this.props.errorStyle.weight : {}}>
											{ifSaleOn(item, (
												<input type="number" className="inputNumber"
													value={item.weight}
													onChange={e => this.updateProductSku(index, "weight", e.currentTarget.value)}
													onBlur={e => this.blurUpdateProductSku(index, "weight", e.currentTarget.value)}
												/>
											))}
										</td>
										<td style={errorInfo ? this.props.errorStyle.length : {}}>
											{ifSaleOn(item, (
												<input type="number" className="inputNumber"
													value={item.volume.length}
													onChange={e => this.updateProductSku(index, "length", e.currentTarget.value)}
													onBlur={e => this.blurUpdateProductSku(index, "length", e.currentTarget.value)}
												/>
											))}
										</td>
										<td style={errorInfo ? this.props.errorStyle.width : {}}>
											{ifSaleOn(item, (
												<input type="number" className="inputNumber"
													value={item.volume.width}
													onChange={e => this.updateProductSku(index, "width", e.currentTarget.value)}
													onBlur={e => this.blurUpdateProductSku(index, "width", e.currentTarget.value)}
												/>
											))}
										</td>
										<td style={errorInfo ? this.props.errorStyle.height : {}}>
											{ifSaleOn(item, (
												<input type="number" className="inputNumber"
													value={item.volume.height}
													onChange={e => this.updateProductSku(index, "height", e.currentTarget.value)}
													onBlur={e => this.blurUpdateProductSku(index, "height", e.currentTarget.value)}
												/>
											))}
										</td>
										<td>
											<Switch checked={item.isOnSale} checkedChildren={getText("on")} unCheckedChildren={getText("off")}
												onChange={e => this.switchSale(index, e)}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{/* sku图片上传目前只支持sku属性冲包含颜色的 */}
					<div>
						{this.getSkuUploadImage(accountInfo.shop.originCode)}
					</div>
				</div>
			</div>
		);
	}
}

export default IsNotSingle;
