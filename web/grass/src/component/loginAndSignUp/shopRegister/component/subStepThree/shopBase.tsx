import * as React from "react";

import { Icon, Input, Select, Radio, message } from "antd";
import { shopNamePattern } from "../../../../../util/regexp";
import { UploadImageList } from "./uploadImage";
import Address from "../../../../address/area";
import ShopType from "./shopType";
const Option = Select.Option;

const ShopBase = props => (
	<div>
		<div className="form">
			<h3 className="title">店铺资料填写</h3>
			{/* 店铺名称 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>店铺名称
				</div>
				<div className="form__item__input">
					<Input
						maxLength="20"
						value={props.formData.shopName}
						onChange={e =>
							props.getBaseInfo(formData => {
								formData.shopName = e.target.value.replace(/^\s+|\s+$/g, "");
								return formData;
							})
						}
						onBlur={e => {
							let value = e.target["value"];
							if (!shopNamePattern.test(value)) {
								message.error("支持英文,数字,空格和英文'");
								value = value.replace(shopNamePattern, "");
							}
							props.getBaseInfo(formData => {
								formData.shopName = value;
								return formData;
							});
						}}
					/>
				</div>
				<div className="form__item--info">
					<span className="item__info--default">不超过20个字符，支持英文,数字,空格和英文'</span>
					<Icon className="item__error--right" type="check-circle" />
					<span className="item__error--wrong">
						<Icon type="close-circle" />
					</span>
				</div>
			</div>

			{/* 店铺类型 */}
			<ShopType editor={props.editor} changeShopType={props.changeShopType.bind(this)} />
			{/* 主营类目 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>主营类目
				</div>
				<Select
					className="form__item__input"
					placeholder="选择主营类目"
					value={props.formData.form.surveyInfo.mainCat}
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.form.surveyInfo.mainCat = e.toString();
							return formData;
						})
					}
					onBlur={() => {
						if (props.formData.form.surveyInfo.mainCat === "") {
							message.error("请选择一项目主营类目");
						}
					}}
				>
					{props.business.Categories.map((item, index) => (
						<Option key={index} value={item.name}>
							{item.name}
						</Option>
					))}
				</Select>
				<div className="form__item--info">
					<Icon className="item__error--right" type="check-circle" />
					<span className="item__error--wrong"> </span>
				</div>
			</div>
			{/* 进货渠道 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>进货渠道
				</div>
				<Select
					className="form__item__input"
					placeholder="选择进货渠道"
					value={props.formData.form.surveyInfo.stockChan}
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.form.surveyInfo.stockChan = e.toString();
							return formData;
						})
					}
					onBlur={() => {
						if (props.formData.form.surveyInfo.stockChan === "") {
							message.error("请选择一个进货渠道");
						}
					}}
				>
					{props.business.Purchase.map((item, index) => (
						<Option key={index} value={item.name}>
							{item.name}
						</Option>
					))}
				</Select>
				<div className="form__item--info">
					<Icon className="item__error--right" type="check-circle" />
					<span className="item__error--wrong"> </span>
				</div>
			</div>
			{/* 仓库地址 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>仓库地址
				</div>
				<Address
					value={props.formData.form.surveyInfo.warehouseAddr.areasVal || []}
					onChange={e => {
						props.getBaseInfo(formData => {
							formData.form.surveyInfo.warehouseAddr.areasVal = e.areasVal;
							formData.form.surveyInfo.warehouseAddr.areasCode = e.areasCode;
							return formData;
						});
					}}
				/>
				<Input.TextArea
					className="form_detail_address_input"
					placeholder="填写详细地址（该地址将默认为问题件退货仓库地址）"
					value={props.formData.form.surveyInfo.warehouseAddr.address}
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.form.surveyInfo.warehouseAddr.address = e.target["value"];
							return formData;
						})
					}
					onBlur={e => {
						let value = e.target["value"];
						if (value === "") {
							message.error("请填写详细地址信息");
						}
					}}
				/>
			</div>
			{/* 可上架商品数 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>可上架商品数
				</div>
				<Select
					className="form__item__input"
					placeholder="选择上架商品数量"
					value={props.formData.form.surveyInfo.prodCount}
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.form.surveyInfo.prodCount = e.toString();
							return formData;
						})
					}
					onBlur={() => {
						if (props.formData.form.surveyInfo.prodCount === "") {
							message.error("请选择可上架商品数量");
						}
					}}
				>
					{props.business.ItemUpshelf.map((item, index) => (
						<Option key={index} value={item.value}>
							{item.value}
						</Option>
					))}
				</Select>
				<div className="form__item--info">
					<Icon className="item__error--right" type="check-circle" />
					<span className="item__error--wrong"> </span>
				</div>
			</div>
			{/* 通过什么渠道了解到ezbuy */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>通过什么渠道了解到ezbuy平台的
				</div>
				<Select
					className="form__item__input"
					placeholder="请选择了解渠道"
					value={props.formData.form.surveyInfo.awareChan}
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.form.surveyInfo.awareChan = e.toString();
							return formData;
						})
					}
					onBlur={() => {
						if (props.formData.form.surveyInfo.awareChan === "") {
							message.error("请选择了解渠道");
						}
					}}
				>
					{props.business.KnowChannel.map((item, index) => (
						<Option key={index} value={item.name}>
							{item.name}
						</Option>
					))}
				</Select>

				<div className="form__item--info">
					<Icon className="item__error--right" type="check-circle" />
					<span className="item__error--wrong"> </span>
				</div>
			</div>
			{/* 目前是否有经营其他平台 */}
			<div className="form__item">
				<div className="form__item__label">
					<span>*</span>目前是否有经营其他平台
				</div>
				<Radio.Group
					className="form__item__input"
					value={props.formData.temp.otherPlatformRadio}
					onChange={e =>
						props.getBaseInfo(formData => {
							formData.temp.otherPlatformRadio = e.target["value"];
							return formData;
						})
					}
				>
					<Radio className="from_other_platform_radio" value={1}>
						是
					</Radio>
					<Select
						mode="multiple"
						className="form_other_platform_select"
						placeholder="请选择"
						value={
							props.formData.form.surveyInfo.srcPlat &&
							props.formData.form.surveyInfo.srcPlat.platform
						}
						onChange={e =>
							props.getBaseInfo(formData => {
								formData.form.surveyInfo.samplePics = [];
								formData.form.surveyInfo.srcPlat.platform = e;
								return formData;
							})
						}
						onBlur={() => {
							if (props.formData.form.surveyInfo.srcPlat.platform.length === 0) {
								message.error("请选择一个当前经营的平台");
							}
						}}
					>
						{props.business.OtherPlatform.map((item, index) => (
							<Option key={index} value={item.name}>
								{item.name}
							</Option>
						))}
					</Select>
					{props.formData.temp.otherPlatformRadio === 1 && (
						<Input
							placeholder="填写一个店铺链接"
							className="from_other_platform_url_input"
							value={
								props.formData.form.surveyInfo.srcPlat &&
								props.formData.form.surveyInfo.srcPlat.shopUrl
							}
							onChange={e =>
								props.getBaseInfo(formData => {
									formData.form.surveyInfo.srcPlat.shopUrl = e.target["value"];
									return formData;
								})
							}
							onBlur={e => {
								if (e.target["value"] === "") {
									message.error("请填写具体的店铺地址");
								}
							}}
						/>
					)}
					<Radio className="from_other_platform_radio" value={2}>
						否
					</Radio>
					<span className="form_no_other_platform_tip">请上传5张商品图片，每张不超过500K</span>
					{props.formData.temp.otherPlatformRadio === 2 && (
						<UploadImageList
							fileList={props.formData.form.surveyInfo.samplePics}
							onChange={e =>
								props.getBaseInfo(formData => {
									formData.form.surveyInfo.samplePics = e.map(item => {
										return item.url;
									});
									formData.form.surveyInfo.srcPlat.shopUrl = "";
									formData.form.surveyInfo.srcPlat.platform = [];
									return formData;
								})
							}
						/>
					)}
				</Radio.Group>
			</div>
		</div>
	</div>
);

export { ShopBase };
