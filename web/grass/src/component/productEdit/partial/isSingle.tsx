import * as React from "react";
import { connect } from "react-redux";
import { Input, message } from "antd";
import { locale } from "../../../config/locale";
import "../productEdit.scss";

// action
import {
	productSkusChange,
} from "../../../action/productManage";

// utility
import { singleProductSku } from "../utility/constant";
import { IsSingleProps } from "../variableType";
import { formatInputDate } from "../utility/helper/kit";
import { getText } from "util/kit";

@connect()
class IsSingle extends React.Component<IsSingleProps> {
	constructor(props) {
		super(props);
		this.updateSingleSKU = this.updateSingleSKU.bind(this);
	}

	updateSingleSKU(e, attr) {
		const { productSkus } = this.props;
		if (/(:|;)+/.test(e.target.value)) {
			message.warn(getText("Can not contain special characters"));
			return;
		}
		let single = productSkus[0] ? productSkus[0] : singleProductSku;
		const value = e.target.value;
		const { dispatch } = this.props;
		switch (attr) {
			case "length":
			case "width":
			case "height":
				single.volume[attr] = value;
				break;
			default:
				single[attr] = value;
				break;
		}
		dispatch(productSkusChange([single]));
	}

	blurUpdateSingleSKU(e, attr) {
		const { productSkus } = this.props;
		let single = productSkus[0] ? productSkus[0] : singleProductSku;
		const value = e.target.value;
		const { dispatch } = this.props;
		formatInputDate(attr, single, value);
		dispatch(productSkusChange([single]));
	}

	render() {
		const { accountInfo, productData, productSkus, errorStyle } = this.props;
		const getText = locale(this.props.accountInfo.shop.originCode);
		const isLocal = accountInfo.shop.originCode === "SGLocal" || accountInfo.shop.originCode === "MYLocal";
		let single = productSkus[0] ? productSkus[0] : singleProductSku;
		return (
			<div>
				<div style={this.props.show ? { display: "block" } : { display: "none" }}>
					<table className="isSingleTable">
						<tbody>
							<tr>
								<th>{getText("sku_id")}</th>
								<th>{getText("origin_price")}</th>
								<th>{getText("selling_price")}</th>
								<th> {!productData.isStocked && isLocal ? `${getText("presale_stock")}` : `${getText("current_stock")}(${getText("unit")}):`} </th>
								{/* <th>{getText("shipping_fee")}</th> */}
								<th>{getText("weight")}(kg)</th>
								<th>{getText("length")}(cm)</th>
								<th>{getText("breadth")}(cm)</th>
								<th>{getText("height")}(cm)</th>
							</tr>
							<tr>
								<td style={errorStyle.sellerSkuId}>
									<Input value={single.sellerSkuId} className="input"
										onChange={e => this.updateSingleSKU(e, "sellerSkuId")}
										onBlur={e => this.blurUpdateSingleSKU(e, "sellerSkuId")}
									/>
								</td>
								<td style={errorStyle.originalPrice}>
									<Input value={single.originalPrice} className="input"
										onChange={e => this.updateSingleSKU(e, "originalPrice")}
										onBlur={e => this.blurUpdateSingleSKU(e, "originalPrice")}
									/>
								</td>
								<td style={errorStyle.price}>
									<Input value={single.price} className="input"
										onChange={e => this.updateSingleSKU(e, "price")}
										onBlur={e => this.blurUpdateSingleSKU(e, "price")}
									/>
								</td>
								<td style={errorStyle.quantity}>
									<Input value={single.quantity} className="input"
										onChange={e => this.updateSingleSKU(e, "quantity")}
										onBlur={e => this.blurUpdateSingleSKU(e, "quantity")}
									/>
								</td>
								{/* <td style={errorStyle.shippingFee}>
                <div style={{ width: "150px", height: "100%", background: "#eee" }}>&nbsp;</div>
              </td> */}
								<td style={errorStyle.weight}>
									<Input value={single.weight} className="input"
										onChange={e => this.updateSingleSKU(e, "weight")}
										onBlur={e => this.blurUpdateSingleSKU(e, "weight")}
									/>
								</td>
								<td style={errorStyle.length}>
									<Input value={single.volume.length} className="input"
										onChange={e => this.updateSingleSKU(e, "length")}
										onBlur={e => this.blurUpdateSingleSKU(e, "length")}
									/>
								</td>
								<td style={errorStyle.width}>
									<Input value={single.volume.width} className="input"
										onChange={e => this.updateSingleSKU(e, "width")}
										onBlur={e => this.blurUpdateSingleSKU(e, "width")}
									/>
								</td>
								<td style={errorStyle.height}>
									<Input value={single.volume.height} className="input"
										onChange={e => this.updateSingleSKU(e, "height")}
										onBlur={e => this.blurUpdateSingleSKU(e, "height")}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default IsSingle;
