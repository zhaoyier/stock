import * as React from "react";
import {
	Button
} from "antd";
import * as Cookies from "js-cookie";
import {
	UserBillOrderList,
	UserBillOrder
} from "../../services/EzSellerService";
import {
    quickPrint
} from "../../util/print";
import "./index.scss";

interface INVState {
	orders: UserBillOrder[];
}

function getINVData() {
	let INVData;
	try {
		INVData = JSON.parse(sessionStorage.getItem("INV") as any);
	} catch (err) {
		INVData = null;
	}
	return INVData;
}

class INV extends React.Component<{}, INVState> {
	state: INVState = {
		orders: []
    };
	node: HTMLDivElement | null = null;
	shopName: string = "";

	componentDidMount() {
		this.getBillDetail();
		this.getShopName();
        if ( this.node ) {
            quickPrint(this.node);
        }
	}
	getShopName() {
		try {
			const accountInfo = JSON.parse(Cookies.get("data"));
			this.shopName = accountInfo.shop.shopName || "";
		}
		catch (err) {}
	}
	getBillDetail() {
		const state = getINVData();
		const billNum = state ? state.billNum : "";
		UserBillOrderList(billNum)
			.then(result => {
				this.setState({
					orders: result.orders
				});
			});
	}
	getDate(createdAt) {
		const date = new Date(createdAt * 1000);
		return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
	}
	getNumber(createdAt, key) {
		const date = new Date(createdAt * 1000);
		return `${date.getFullYear()}${date.getMonth() + 1}000000${key + 1}`;
	}
	getAdjustment(state) {
		const { finalAmount, approvedAmount } = state;
		return approvedAmount === 0 ? approvedAmount : finalAmount - approvedAmount;
	}
	getBillDetailSum(key) {
		const { orders } = this.state;
		return orders.reduce((preVal, cVal) => {
			return preVal + cVal[key];
		}, 0);
	}
	render() {
		let { state } = history;
		state = getINVData() ? getINVData() : {
			createdAt: 0,
			key: 0,
			finalAmount: 0,
			approvedAmount: 0
		};
		const totalAmount = this.getBillDetailSum("totalAmount");
		const offsetAmount = this.getBillDetailSum("offsetAmount");
		const serviceFee = this.getBillDetailSum("serviceFee");
		const localDeliveryFee = this.getBillDetailSum("localDeliveryFee");
		const adjustment = this.getAdjustment(state);

		return (
			<div className="INVWrap" ref={ node => this.node = node }>
				<div className="download">
					<Button
						type="primary"
						onClick={ () => window.print() }>
						下载
					</Button>
				</div>
				<h1>
					INV 1
				</h1>
				<div className="tableWrap">
					<table className="table">
						<tr>
							<td colSpan={2}>
								<p><b>HONG KONG</b></p>
								<p>Ezbuy Holdings Ltd</p>
								<p>C/O 136 Joo Seng Road, 06-01</p>
								<p>368360</p>
								<p>Singapore</p>
							</td>
							<td colSpan={2}>
								<p><b>SETTLEMENT ADVICE</b></p>
								<p>Date: { this.getDate(state.createdAt) }</p>
								<p>Number: { this.getNumber(state.createdAt, state.key) }</p>
							</td>
						</tr>
						<tr style={{borderTop: "2px solid #000"}}>
							<th colSpan={2}>
								BILL TO
							</th>
							<td colSpan={2}>
								<b>REMARKS</b>
							</td>
						</tr>
						<tr style={{border: "none"}}>
							<td colSpan={4} style={{border: "none"}}>{ this.shopName }&nbsp;</td>
						</tr>
						<tr style={{border: "none"}}>
							<td colSpan={4} style={{border: "none"}}>&nbsp;</td>
						</tr>
						<tr>
							<th>
								<p> ORDER </p>
								<p> NUMBER </p>
							</th>
							<th>
								<p> PARCEL </p>
								<p> NUMBER </p>
							</th>
							<th>
								<p> PRODUCT </p>
								<p> DESCRIPTION </p>
							</th>
							<th>
								<p> AMOUNT </p>
								<p> SGD </p>
							</th>
						</tr>
						<tr style={{borderBottom: "2px solid #000"}}>
							<td colSpan={4}>&nbsp;</td>
						</tr>
						<tr>
							<td colSpan={2} style={{border: "none"}}>
							</td>
							<th style={{border: "none"}}>
								<p> Goods inclusive GST: </p>
								<p> Adjustment: </p>
								<p> Platform usage commissior: </p>
								<p> Parcels delivery charges: </p>
							</th>
							<td style={{border: "none"}}>
								<p> {(totalAmount - offsetAmount).toFixed(2)} </p>
								<p> {adjustment.toFixed(2)} </p>
								<p> {serviceFee ? `-${serviceFee.toFixed(2)}` : "0.00"} </p>
								<p> {localDeliveryFee ? -localDeliveryFee.toFixed(2) : "0.00"} </p>
							</td>
						</tr>
						<tr style={{borderTop: "2px solid #000"}}>
							<td colSpan={2} style={{border: "none"}}>
							</td>
							<th style={{border: "none"}}>
								Total:
							</th>
							<td style={{border: "none"}}>
								{(totalAmount - offsetAmount + adjustment - serviceFee - localDeliveryFee).toFixed(2)}
							</td>
						</tr>
						<tr>
							<td colSpan={4} style={{border: "none", textAlign: "center"}}>
								<p style={{marginTop: "200px"}}> This is a computer generated advice/invoice. </p>
							</td>
						</tr>
					</table>
				</div>
				<h1>
					INV 2
				</h1>
				<div className="tableWrap">
					<table className="table">
						<tr>
							<td colSpan={2}>
								<p><b>SINGAPORE</b></p>
								<p>Avant Logistic Service Pte Ltd</p>
								<p>136 Joo Seng Road</p>
								<p>#06-01</p>
								<p>Singapore</p>
								<p>368360</p>
								<p>GST Reg.No.:TBA</p>
							</td>
							<td colSpan={2}>
								<p><b>TAX/COMMERCIAL INVOICE</b></p>
								<p> Date: { this.getDate(state.createdAt) } </p>
								<p> Number: { this.getNumber(state.createdAt, state.key) } </p>
							</td>
						</tr>
						<tr style={{borderTop: "2px solid #000"}}>
							<td colSpan={2}>
								<p><b>BILL TO</b></p>
								<p>{ this.shopName }</p>
							</td>
							<td colSpan={2}>
								<b>REMARKS</b>
							</td>
						</tr>
						<tr style={{border: "none"}}>
							<td colSpan={4} style={{border: "none"}}>&nbsp;</td>
						</tr>
						<tr style={{border: "none"}}>
							<td colSpan={4} style={{border: "none"}}>&nbsp;</td>
						</tr>
						<tr>
							<th>
								<p> ORDER </p>
								<p> NUMBER </p>
							</th>
							<th>
								<p> PARCEL </p>
								<p> NUMBER </p>
							</th>
							<th>
								<p> PRODUCT </p>
								<p> DESCRIPTION </p>
							</th>
							<th>
								<p> AMOUNT </p>
								<p> SGD </p>
							</th>
						</tr>
						<tr style={{borderBottom: "2px solid #000"}}>
							<td colSpan={4}>&nbsp;</td>
						</tr>
						<tr>
							<td colSpan={2} style={{border: "none"}}>
							</td>
							<th style={{border: "none"}}>
								<p> Platform usage commissior: </p>
								<p> Parcels delivery charges: </p>
								<p> Subtotal:  </p>
								<p> GST payable: </p>
							</th>
							<td style={{border: "none"}}>
								<p> {serviceFee.toFixed(2)} </p>
								<p> {localDeliveryFee.toFixed(2)} </p>
								<p> {(localDeliveryFee + serviceFee).toFixed(2)} </p>
								<p> {((localDeliveryFee + serviceFee) * 0.07).toFixed(2)} </p>
							</td>
						</tr>
						<tr style={{borderTop: "2px solid #000"}}>
								<td colSpan={2} style={{border: "none"}}>
								</td>
								<th style={{border: "none"}}>
									Total:
								</th>
								<td style={{border: "none"}}>
									{ ((localDeliveryFee + serviceFee) +  (localDeliveryFee + serviceFee) * 0.07).toFixed(2)}
								</td>
							</tr>
						<tr>
							<td colSpan={4}>
								<p style={{marginTop: "200px", textAlign: "center"}}> This is a computer generated advice/invoice. </p>
							</td>
						</tr>
					</table>
				</div>
			</div>
		);
	}
}

export default INV;
