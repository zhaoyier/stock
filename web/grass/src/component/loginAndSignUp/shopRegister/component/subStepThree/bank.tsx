import * as React from "react";
import { Input, Select, Cascader } from "antd";

const Option = Select.Option;

import { BANKS } from "../../../../../constant/index";
const Options = BANKS.map((item, index) => (
	<Option key={index} value={item}>
		{item}
	</Option>
));

declare const linkData: Array<any>;

const Bank = props => (
	<div>
		<div className="form">
			<h3 className="title">银行资料认证</h3>
			{/* 开户银行 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>
					{props.registerType === "company" ? "公司开户银行" : "开户银行"}
				</div>
				<Select
					className="form__item__input"
					defaultValue={props.formData.form.bankInfo.bankName}
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.form.bankInfo.bankName = e;
							return formData;
						})
					}
				>
					{Options}
				</Select>
			</div>
			{/* 开户行所在地 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>开户行所在地
				</div>
				<Cascader
					className="form__item__input"
					options={linkData}
					value={props.formData.form.bankInfo.agencyAddress.split(",")}
					placeholder="请选择"
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.form.bankInfo.agencyAddress = e.join(",");
							return formData;
						})
					}
				/>
			</div>
			{/* 支行名称 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>支行名称
				</div>
				<Input
					className="form__item__input"
					placeholder="请输入支行名称"
					value={props.formData.form.bankInfo.agencyName}
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.form.bankInfo.agencyName = e.target.value;
							return formData;
						})
					}
				/>
			</div>
			{/* 开户账号 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>
					{props.registerType === "company" ? "公司开户账号" : "开户账号"}
				</div>
				<Input
					className="form__item__input"
					placeholder="请输入开户账号"
					value={props.formData.form.bankInfo.accountNumber}
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.form.bankInfo.accountNumber = e.target.value;
							return formData;
						})
					}
				/>
			</div>
			{/* 开户人姓名 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>
					{props.registerType === "company" ? "公司开户名" : "开户人姓名"}
				</div>
				<Input
					className="form__item__input"
					placeholder="请输入开户人姓名"
					value={props.formData.form.bankInfo.accountName}
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.form.bankInfo.accountName = e.target.value;
							return formData;
						})
					}
				/>
			</div>
		</div>
	</div>
);

export default Bank;
