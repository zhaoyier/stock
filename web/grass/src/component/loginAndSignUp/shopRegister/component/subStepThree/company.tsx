import * as React from "react";
import { Component } from "react";
import { Icon, Input, Radio, message, Row, Col, Button, Popover, Divider } from "antd";

import { UploadImage } from "./uploadImage";
import { unIdentifierNumPattern, unChineseLiteraryPattern } from "../../../../../util/regexp";

const RadioGroup = Radio.Group;

interface CompanyProps {
	getBaseInfo: Function;
	changeShopType: Function;
	editor: boolean;
	formData: any;
}

class Company extends Component<CompanyProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		const { formData } = this.props;
		return (
			<div>
				<Divider />
				<div className="form">
					<h3 className="title">公司资料认证</h3>
					{/* 公司名称 */}
					<div className="form__item">
						<div className="form__item__label">
							<span>*</span>公司名称
						</div>
						<div className="form__item__input">
							<Input
								value={formData.form.orgInfo.orgName}
								onChange={e =>
									this.props.getBaseInfo(formData => {
										formData.form.orgInfo.orgName = e.target["value"];
										return formData;
									})
								}
								placeholder=""
							/>
						</div>
						<div className="form__item--info">
							<Icon className="item__error--right" type="check-circle" />
							<span className="item__error--wrong">
								<Icon type="close-circle" />
							</span>
						</div>
					</div>
					{/* 是否三证合一 */}
					<div className="form__item">
						<div className="form__item__label">
							<span>*</span>是否三证合一
						</div>
						<div className="form__item__input">
							<RadioGroup
								value={formData.form.orgInfo.approvalCrts.combined}
								onChange={(e: any) => {
									this.props.getBaseInfo(formData => {
										formData.form.orgInfo.approvalCrts.combined = e.target["value"];
										return formData;
									});
								}}
							>
								<Radio value={true}>是</Radio>
								<Radio value={false}>否</Radio>
							</RadioGroup>
						</div>
					</div>
					{/* 公司资质照片 */}
					<div className="form__item">
						<div className="form__item__label">
							<span>*</span>公司资质照片
						</div>
						<div className="form__item__input">
							{formData.form.orgInfo.approvalCrts.combined ? (
								<div key={1}>
									<Row type="flex" align="middle">
										<Col span={12}>
											<UploadImage
												title="公司营业执照"
												width={150}
												height={150}
												value={formData.form.orgInfo.approvalCrts.combinedBusinessLicense}
												onChange={e =>
													this.props.getBaseInfo(formData => {
														formData.form.orgInfo.approvalCrts.combinedBusinessLicense = e;
														return formData;
													})
												}
											/>
										</Col>
										<Col span={12}>
											<Popover
												style={{ display: "inline-block" }}
												content={
													<div>
														<img src={require("../../../image/businessLicense.png")} alt="" />
													</div>
												}
												title="公司资质照片"
												trigger="click"
											>
												<Button type="primary">查看示例</Button>
											</Popover>
										</Col>
									</Row>
								</div>
							) : (
								<div key={2}>
									<Row type="flex" align="middle">
										<Col span={12}>
											<UploadImage
												width={150}
												height={150}
												title={"公司营业执照"}
												value={formData.form.orgInfo.approvalCrts.businessLicense}
												onChange={e =>
													this.props.getBaseInfo(formData => {
														formData.form.orgInfo.approvalCrts.businessLicense = e;
														return formData;
													})
												}
											/>
										</Col>
										<Col span={12}>
											<Popover
												style={{ display: "inline-block" }}
												content={
													<div>
														<img src={require("../../../image/businessLicense.png")} alt="" />
													</div>
												}
												title="公司资质照片"
												trigger="click"
											>
												<Button type="primary">查看示例</Button>
											</Popover>
										</Col>
									</Row>
									<Row type="flex" align="middle">
										<Col span={12}>
											<UploadImage
												width={150}
												height={150}
												title={"组织机构代码证"}
												value={formData.form.orgInfo.approvalCrts.orgCodeCrt}
												onChange={e =>
													this.props.getBaseInfo(formData => {
														formData.form.orgInfo.approvalCrts.orgCodeCrt = e;
														return formData;
													})
												}
											/>
										</Col>
										<Col span={12}>
											<Popover
												style={{ display: "inline-block" }}
												content={
													<div>
														<img src={require("../../../image/orgCodeCrt.png")} alt="" />
													</div>
												}
												title="组织机构代码证"
												trigger="click"
											>
												<Button type="primary">查看示例</Button>
											</Popover>
										</Col>
									</Row>
									<Row type="flex" align="middle">
										<Col span={12}>
											<UploadImage
												width={150}
												height={150}
												title={"税务登记证"}
												value={formData.form.orgInfo.approvalCrts.taxRegistrationCrt}
												onChange={e =>
													this.props.getBaseInfo(formData => {
														formData.form.orgInfo.approvalCrts.taxRegistrationCrt = e;
														return formData;
													})
												}
											/>
										</Col>
										<Col span={12}>
											<Popover
												style={{ display: "inline-block" }}
												content={
													<div>
														<img src={require("../../../image/taxRegistrationCrt.png")} alt="" />
													</div>
												}
												title="税务登记证"
												trigger="click"
											>
												<Button type="primary">查看示例</Button>
											</Popover>
										</Col>
									</Row>
								</div>
							)}
							<Row type="flex" align="middle">
								<Col span={12}>
									<UploadImage
										width={150}
										height={150}
										title={"银行开户证明"}
										value={formData.form.orgInfo.approvalCrts.bankAccountCrt}
										onChange={e =>
											this.props.getBaseInfo(formData => {
												formData.form.orgInfo.approvalCrts.bankAccountCrt = e;
												return formData;
											})
										}
									/>
								</Col>
								<Col span={12}>
									<Popover
										style={{ display: "inline-block" }}
										content={
											<div>
												<img src={require("../../../image/bankAccountCrt.png")} alt="" />
											</div>
										}
										title="银行开户证明"
										trigger="click"
									>
										<Button type="primary">查看示例</Button>
									</Popover>
								</Col>
							</Row>
						</div>
						<div className="form__item--info">
							<Icon className="item__error--right" type="check-circle" />
							<span className="item__error--wrong"> </span>
						</div>
					</div>
					{/* 法人身份证号码 */}
					<div className="form__item">
						<div className="form__item__label">
							<span>*</span>法人代表身份证号码
						</div>
						<div className="form__item__input">
							<Input
								maxLength="18"
								value={formData.form.responsibleInfo.identifierNum}
								onChange={e =>
									this.props.getBaseInfo(formData => {
										formData.form.responsibleInfo.identifierNum = e.target.value;
										return formData;
									})
								}
								onBlur={e => {
									if (
										unIdentifierNumPattern.test(e.target["value"]) ||
										e.target["value"].length !== 18
									) {
										message.error("18 位，支持数字和大写字母");
									}
									let value = e.target["value"].replace(unIdentifierNumPattern, "");
									this.props.getBaseInfo(formData => {
										formData.form.responsibleInfo.identifierNum = value;
										return formData;
									});
								}}
							/>
						</div>
					</div>
					{/* 法人代表身份证姓名 */}
					<div className="form__item">
						<div className="form__item__label">
							<span>*</span>法人代表身份证姓名
						</div>
						<div className="form__item__input">
							<Input
								value={formData.form.responsibleInfo.realName}
								onChange={e =>
									this.props.getBaseInfo(formData => {
										formData.form.responsibleInfo.realName = e.target.value;
										return formData;
									})
								}
								onBlur={e => {
									if (unChineseLiteraryPattern.test(e.target["value"])) {
										message.error("仅支持中文输入");
									}
									let value = e.target["value"].replace(unChineseLiteraryPattern, "");
									this.props.getBaseInfo(formData => {
										formData.form.responsibleInfo.realName = value;
										return formData;
									});
								}}
							/>
						</div>
					</div>
					{/* 法人代表身份证照片 */}
					<div className="form__item">
						<div className="form__item__label">
							<span>*</span>法人代表身份证照片
						</div>
						<div className="form__item__input">
							<Row>
								<Col span={12}>
									<UploadImage
										title={"头像面"}
										value={formData.form.responsibleInfo.idImages.front}
										onChange={e =>
											this.props.getBaseInfo(formData => {
												formData.form.responsibleInfo.idImages.front = e;
												return formData;
											})
										}
									/>
								</Col>
								<Col span={12}>
									<UploadImage
										title={"国徽面"}
										value={formData.form.responsibleInfo.idImages.opposite}
										onChange={e =>
											this.props.getBaseInfo(formData => {
												formData.form.responsibleInfo.idImages.opposite = e;
												return formData;
											})
										}
									/>
								</Col>
							</Row>
						</div>
					</div>
					{/* 紧急联系人姓名[1] */}
					<div className="form__item">
						<div className="form__item__label">
							<span>*</span>紧急联系人姓名[1]
						</div>
						<div className="form__item__input">
							<Input
								value={formData.form.contacts[0].name}
								onChange={e =>
									this.props.getBaseInfo(formData => {
										formData.form.contacts[0].name = e.target.value;
										return formData;
									})
								}
							/>
						</div>
					</div>
					{/* 紧急联系人电话[1] */}
					<div className="form__item">
						<div className="form__item__label">
							<span>*</span>紧急联系人电话[1]
						</div>
						<div className="form__item__input">
							<Input
								value={formData.form.contacts[0].phone}
								onChange={e =>
									this.props.getBaseInfo(formData => {
										formData.form.contacts[0].phone = e.target.value;
										return formData;
									})
								}
							/>
						</div>
					</div>
					{/* 紧急联系人姓名[2] */}
					<div className="form__item">
						<div className="form__item__label">紧急联系人姓名[2]</div>
						<div className="form__item__input">
							<Input
								value={formData.form.contacts[1].name}
								onChange={e =>
									this.props.getBaseInfo(formData => {
										formData.form.contacts[1].name = e.target.value;
										return formData;
									})
								}
							/>
						</div>
					</div>
					{/* 紧急联系人电话[2] */}
					<div className="form__item">
						<div className="form__item__label">紧急联系人电话[2]</div>
						<div className="form__item__input">
							<Input
								value={formData.form.contacts[1].phone}
								onChange={e =>
									this.props.getBaseInfo(formData => {
										formData.form.contacts[1].phone = e.target.value;
										return formData;
									})
								}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export { Company };
