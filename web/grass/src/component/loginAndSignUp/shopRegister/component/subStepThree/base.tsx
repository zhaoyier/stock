import * as React from "react";
import { UploadImage } from "./uploadImage";
// import { locale } from '../../../../../config/locale'
import { Icon, Input, Radio, Row, Col, message } from "antd";

import {
	unChineseLiteraryPattern,
	unIdentifierNumPattern,
	emailPattern,
	phonePattern,
	qqPattern
} from "../../../../../util/regexp";
const radioStyle = {
	display: "block",
	height: "30px",
	lineHeight: "30px"
};

const BaseInfo = props => (
	<div>
		<h3 className="title">个人资料填写</h3>
		<div className="form">
			{/* 真实姓名 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>真实姓名
				</div>
				<div className="form__item__input">
					<Input
						placeholder="请输入姓名"
						value={props.formData.requester.realName}
						onChange={e =>
							props.getBaseInfo(formData => {
								formData.requester.realName = e.target.value;
								return formData;
							})
						}
						onBlur={e => {
							if (unChineseLiteraryPattern.test(e.target["value"])) {
								message.error("仅支持中文输入");
							}
							let value = e.target["value"].replace(unChineseLiteraryPattern, "");
							props.getBaseInfo(formData => {
								formData.requester.realName = value;
								return formData;
							});
						}}
					/>
				</div>
				<div className="form__item--info">
					<span className="item__info--default">必填项，仅支持中文输入。</span>
					<Icon className="item__error--right" type="check-circle" />
					<span className="item__error--wrong">
						<Icon type="close-circle" />
					</span>
				</div>
			</div>
			{/* 身份证号 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>身份证号
				</div>
				<Input
					maxLength="18"
					className="form__item__input"
					placeholder="请输入证件号"
					value={props.formData.requester.identifierNum}
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.requester.identifierNum = e.target.value;
							return formData;
						})
					}
					onBlur={e => {
						if (unIdentifierNumPattern.test(e.target["value"]) || e.target["value"].length !== 18) {
							message.error("18 位，支持数字和大写字母");
						}
						let value = e.target["value"].replace(unIdentifierNumPattern, "");
						props.getBaseInfo(formData => {
							formData.requester.identifierNum = value;
							return formData;
						});
					}}
				/>
				<div className="form__item--info">
					<span className="item__info--default">18 位，支持数字和大写字母。</span>
					<Icon className="item__error--right" type="check-circle" />
					<span className="item__error--wrong"> </span>
				</div>
			</div>
			{/*联系QQ号  */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>运营联系人QQ
				</div>
				<Input
					className="form__item__input"
					value={props.formData.requester.qqNumber}
					placeholder="请输入QQ号码"
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.requester.qqNumber = e.target.value;
							return formData;
						})
					}
					onBlur={e => {
						let value = e.target["value"];
						if (!qqPattern.test(e.target["value"])) {
							message.error("QQ号错误");
							value = value.replace(qqPattern, "");
						}
						props.getBaseInfo(formData => {
							formData.requester.qqNumber = value;
							return formData;
						});
					}}
				/>
				<div className="form__item--info">
					<Icon className="item__error--right" type="check-circle" />
					<span className="item__error--wrong"> </span>
				</div>
			</div>
			{/* 联系邮箱 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>运营联系人邮箱
				</div>
				<Input
					placeholder="请输入邮箱地址"
					className="form__item__input"
					value={props.formData.requester.email}
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.requester.email = e.target.value;
							return formData;
						})
					}
					onBlur={e => {
						let value = e.target["value"];
						if (!emailPattern.test(e.target["value"])) {
							message.error("邮箱错误");
							value = value.replace(emailPattern, "");
						}
						props.getBaseInfo(formData => {
							formData.requester.email = value;
							return formData;
						});
					}}
				/>
				<div className="form__item--info">
					<Icon className="item__error--right" type="check-circle" />
					<span className="item__error--wrong"> </span>
				</div>
			</div>
			{/* 运营联系人手机 */}
			<div className={props.registerType === "person" ? "" : "hide"}>
				<div className="form__item">
					<div className="form__item__label">
						<span>*</span>运营联系人手机
					</div>
					<Radio.Group
						value={props.formData.temp.mobileRadio}
						onChange={e =>
							props.getBaseInfo(formData => {
								formData.temp.mobileRadio = e.target["value"];
								if (formData.temp.mobileRadio === 1) {
									formData.requester.phone = formData.registerPhone;
								}

								return formData;
							})
						}
					>
						<Radio style={radioStyle} className="ez_form_item_radioGroup" value={1}>
							跟注册手机一致
						</Radio>
						<Radio style={radioStyle} className="ez_form_item_radioGroup" value={2}>
							不一致
							{props.formData.temp.mobileRadio === 2 ? (
								<Input
									type="number"
									placeholder="请输入手机号"
									value={props.formData.requester.phone}
									className="ez_form_item_radio_input"
									onChange={e =>
										props.getBaseInfo(formData => {
											formData.requester.phone = e.target.value;
											return formData;
										})
									}
									onBlur={e => {
										let value = e.target["value"];
										if (!phonePattern.test(e.target["value"])) {
											message.error("手机号码错误");
											value = value.replace(phonePattern, "");
										}
										props.getBaseInfo(formData => {
											formData.requester.phone = value;
											return formData;
										});
									}}
								/>
							) : null}
						</Radio>
					</Radio.Group>
					<div className="form__item--info">
						<Icon className="item__error--right" type="check-circle" />
						<span className="item__error--wrong"> </span>
					</div>
				</div>
			</div>
			{/* * 身份证照片 */}
			<div className={props.registerType === "person" ? "" : "hide"}>
				<div className="form__item">
					<div className="form__item__label">
						<span>*</span>身份证照片
					</div>
					<div className="form__item__input">
						<Row>
							<Col span={12}>
								<div style={{ width: 150, height: 90 }}>
									<UploadImage
										width={150}
										height={90}
										title="上传身份证头像面"
										value={props.formData.form.responsibleInfo.idImages.front}
										onChange={e =>
											props.getBaseInfo(formData => {
												formData.form.responsibleInfo.idImages.front = e;
												return formData;
											})
										}
									/>
								</div>
							</Col>
							<Col span={12}>
								<div style={{ width: 150, height: 90 }}>
									<UploadImage
										width={150}
										height={90}
										title="上传身份证国徽面"
										value={props.formData.form.responsibleInfo.idImages.opposite}
										onChange={e =>
											props.getBaseInfo(formData => {
												formData.form.responsibleInfo.idImages.opposite = e;
												return formData;
											})
										}
									/>
								</div>
							</Col>
						</Row>
						<p>* 为确保是您本人操作，请手持身份证进行拍摄</p>
						<Row>
							<Col span={12}>
								<div style={{ width: 150, height: 90 }}>
									<UploadImage
										width={150}
										height={90}
										title="上传手持身份证照"
										value={props.formData.form.responsibleInfo.idImages.handHeld}
										onChange={e =>
											props.getBaseInfo(formData => {
												formData.form.responsibleInfo.idImages.handHeld = e;
												return formData;
											})
										}
									/>
								</div>
							</Col>
							<Col span={12}>
								<div style={{ width: 150, height: 90 }}>
									<img src={require("../../../image/handPhoto.png")} alt="" />
								</div>
							</Col>
						</Row>
						<div className="person__photo__info">
							<ol>
								<li>
									拍摄时，手持本人身份证，将持证的手臂上半身整个拍进照片，脸部清晰且不能被遮挡;
								</li>
								<li> 确保身份证上的所有信息清晰可见、完整(没有被遮挡或者被手指捏住); </li>
								<li> 照片内容要求真实有效，不得做任何修改; </li>
								<li> 仅支持 .jpg .jpeg .png .gif 的图片格式，图片大小不超过 500K。</li>
							</ol>
						</div>
					</div>
					<div className="form__item--info">
						<Icon className="item__error--right" type="check-circle" />
						<span className="item__error--wrong"> </span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default BaseInfo;
