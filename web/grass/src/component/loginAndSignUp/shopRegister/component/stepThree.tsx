import * as React from "react";
import { Component } from "react";
import { Button, Divider, message, Modal } from "antd";
import { isCN } from "../../../../util/kit";
import * as Business from "../../../../constant/business";
import Container from "../container";
import "../../css/register.scss";

// API
import { getToken } from "../../../../api/other";
import { QINIU_UPLOAD_URL } from "../../../../constant/index";

// API
import {
	UserShopValidShopName,
	UserShopApprovalPersonalUpsert,
	UserShopApprovalOriganizationUpsert,
	UserShopApprovalFormGet
} from "../../../../services/EzSellerService";
import { commonValidate } from "./subStepThree/registerValidate";

// sub component
import BaseInfo from "./subStepThree/base";
import { ShopBase } from "./subStepThree/shopBase";
import Bank from "./subStepThree/bank";
import { Company } from "./subStepThree/company";

interface FormData {
	shopName: string;
	form: any;
	requester: any;
	registerPhone: string;
	temp: any;
}
interface StepThreeState {
	status: number;
	business: any;
	formData: FormData;
}

function getregisterType() {
	return window.sessionStorage.getItem("registerType") || "person";
}

class StepThree extends Component<{}, StepThreeState> {
	constructor(props) {
		super(props);
		this.state = {
			status: 0,
			business: { Business },
			formData: {
				shopName: "",
				registerPhone: "",
				form: {
					contacts: [{ name: "", phone: "" }, { name: "", phone: "" }],
					responsibleInfo: {
						identifierNum: "",
						idImages: {},
						realName: ""
					},
					personInfo: {
						stockChan: "",
						warehouseAddr: {},
						prodCount: "",
						awareChan: "",
						srcPlat: {}
					},
					orgInfo: {
						orgName: "",
						approvalCrts: {
							combined: true,
							combinedBusinessLicense: "",
							businessLicense: ""
						}
					},
					bankInfo: {
						bankName: "中国银行",
						agencyAddress: "",
						agencyName: "",
						accountNumber: "",
						accountName: ""
					},
					surveyInfo: {
						mainCat: "",
						stockChan: "",
						warehouseAddr: { areas: [], address: "" },
						prodCount: "",
						awareChan: "",
						srcPlat: { platform: [], shopUrl: "" },
						samplePics: []
					}
				},
				requester: {
					realName: "",
					identifierNum: "",
					qqNumber: "",
					email: "",
					phone: ""
				},
				temp: {
					mobileRadio: 1,
					otherPlatformRadio: 1,
					qnToken: "",
					qnBaseUrl: "",
					action: QINIU_UPLOAD_URL
				}
			}
		};
	}

	componentDidMount() {
		UserShopApprovalFormGet().then(res => {
			const { requester, appliedShopName } = res;
			const { formData } = this.state;
			if (requester) {
				if (res.status === 0) {
					requester.phone = "";
				}
				formData.requester = requester;
				formData.shopName = appliedShopName;
				formData.registerPhone = res.registerPhone;

				if (res.hasOwnProperty("orgForm")) {
					formData.form = Object.assign({}, formData.form, res.orgForm);
					// 判断是否选择了没有其他经营平台
					if (
						formData.form.surveyInfo &&
						formData.form.surveyInfo.samplePics &&
						formData.form.surveyInfo.samplePics.length > 0
					) {
						formData.temp.otherPlatformRadio = 2;
					}
				} else if (res.hasOwnProperty("personalForm")) {
					formData.form = Object.assign({}, formData.form, res.personalForm);
				}

				this.setState({
					formData,
					status: res.status
				});
			}
			switch (res["type"]) {
				case 1:
					window.sessionStorage.setItem("registerType", "person");
					this.forceUpdate();
					break;
				case 2:
					window.sessionStorage.setItem("registerType", "company");
					this.forceUpdate();
					break;
			}
		});

		getToken(info => {
			const { formData } = this.state;
			formData.temp.qnToken = info.token;
			formData.temp.qnBaseUrl = info.baseUrl;
			this.setState({
				formData
			});
		});
	}

	changeShopType(type) {
		const now = window.sessionStorage.getItem("registerType");
		const { formData } = this.state;
		if (now !== type) {
			Modal.confirm({
				title: "确认要切换店铺类型吗？",
				content: "提示：切换将无法保存现有数据",
				okText: "确认",
				cancelText: "取消",
				onOk: () => {
					window.sessionStorage.setItem("registerType", type);
					formData.form.responsibleInfo.idImages = {};
					this.setState({ formData });
				}
			});
		}
	}

	rollbackTwoStep() {
		Modal.confirm({
			title: "确认要返回上一步吗？",
			content: "提示：返回上一步有可能会丢失填写数据",
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				window.location.href = "/index.html#/registerTwo";
			}
		});
	}

	getBaseInfo(getNewState) {
		const { formData } = this.state;
		const newState = getNewState(formData);
		if (!(newState instanceof Object)) {
			console.error("错误的formData返回, 请检查 getBaseInfo 调用");
			return;
		}
		this.setState({
			formData: newState
		});
	}

	submit() {
		const registerType = getregisterType();
		const { formData } = this.state;
		const { shopName, requester, form } = formData;
		const originCode = "CN";
		function submitAfter(res) {
			if (res) {
				window.location.href = "/index.html#registerFour";
			} else {
				message.error("信息有误");
			}
		}
		const resultCommon = commonValidate(formData, registerType);
		if (!resultCommon) {
			console.log("resultCommon:");
			return;
		}
		UserShopValidShopName(shopName).then(res => {
			if (form.responsibleInfo.approvalImages) {
				delete form.responsibleInfo.approvalImages;
			}
			if (form.orgInfo.approvalImages) {
				delete form.orgInfo.approvalImages;
			}
			if (res) {
				if (registerType === "person") {
					UserShopApprovalPersonalUpsert(shopName, requester, form, originCode).then(res => {
						submitAfter(res);
					});
				} else {
					if (form.orgInfo.approvalCrts.combined) {
						delete form.orgInfo.approvalCrts.businessLicense;
						delete form.orgInfo.approvalCrts.orgCodeCrt;
						delete form.orgInfo.approvalCrts.taxRegistrationCrt;
					} else {
						delete form.orgInfo.approvalCrts.combinedBusinessLicense;
					}
					UserShopApprovalOriganizationUpsert(shopName, requester, form, originCode).then(res => {
						submitAfter(res);
					});
				}
			} else {
				message.error("店铺名重复请重新填写");
			}
		});
	}

	render() {
		const registerType = getregisterType();
		const { formData } = this.state;
		return (
			<div>
				<Container step={3}>
					<div className="approve">
						{/* 基础信息 */}
						<BaseInfo
							formData={formData}
							registerType={registerType}
							getBaseInfo={this.getBaseInfo.bind(this)}
							requester={formData.requester}
						/>
					</div>
					<Divider />
					<div className="approve">
						<ShopBase
							editor={this.state.status === 3}
							formData={formData}
							business={Business}
							isCN={isCN}
							getBaseInfo={this.getBaseInfo.bind(this)}
							changeShopType={this.changeShopType.bind(this)}
						/>
						{/* 企业用户填写企业资料 */}
						{registerType === "company" && (
							<Company
								editor={this.state.status === 3}
								formData={formData}
								getBaseInfo={this.getBaseInfo.bind(this)}
								changeShopType={this.changeShopType.bind(this)}
							/>
						)}
					</div>
					<Divider />
					<div className="approve">
						{/* 银行信息 */}
						<Bank
							getBaseInfo={this.getBaseInfo.bind(this)}
							registerType={registerType}
							formData={formData}
						/>
					</div>
					<Divider />
					<div className="approve">
						<div className="form">
							<div className="form__item">
								<div className="form__item__label">&nbsp;</div>
								<div className="step__two__button" style={{ marginTop: 30 }}>
									<Button className="button" onClick={this.rollbackTwoStep.bind(this)}>
										返回上一步
										{/* <a href="/index.html#/registerTwo">返回上一步</a> */}
									</Button>
									<Button onClick={this.submit.bind(this)} className="button" type="primary">
										{" "}
										提交注册信息{" "}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</div>
		);
	}
}

export default StepThree;
