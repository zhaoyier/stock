import * as React from "react";

import { Icon, Input, Select, Radio, Upload, Button, Cascader, message} from "antd";
import { shopNamePattern } from "../../../../../util/regexp";

import ShopType from "./shopType";
const Option = Select.Option;
declare const linkData: Array<any>;

const Person = (props) => (
	<div>
		<div className="form">
			<h3 className="title">店铺资料填写</h3>
			{/* 店铺名称 */}
      <div className="form__item">
			<div className="form__item__label"><span>*</span>店铺名称</div>
			<div className="form__item__input" >
				<Input
					maxLength="20"
					value={props.formData.shopName}
					onChange={e => props.getBaseInfo(formData => {
						formData.shopName = e.target.value.replace(/^\s+|\s+$/g, "");
						return formData;
					})}
					onBlur={e => {
						if (shopNamePattern.test(e.target["value"])) {
							message.error("支持英文,数字和空格");
						}
						let value = e.target["value"].replace(shopNamePattern, "");
						props.getBaseInfo(formData => {
							formData.shopName = value;
							return formData;
						});
					}}
				/>
			</div>
			<div className="form__item--info">
				<span className="item__info--default">不超过20个字符，支持英文,数字和空格</span>
				<Icon className="item__error--right" type="check-circle" />
				<span className="item__error--wrong" >
					<Icon type="close-circle" />
				</span>
			</div>
		</div>

			{/* 店铺类型 */}
			<ShopType
				editor={props.editor}
				changeShopType={props.changeShopType.bind(this)}
			/>
			{/* 进货渠道 */}
			<div className="form__item">
				<div className="form__item__label"><span>*</span>主营类目</div>
				<Select className="form__item__input">
					{props.categories.map((item, index) => (<Option key={index} value={item.name}>{item.name}</Option>))}
				</Select>

				<div className="form__item--info">
					<Icon className="item__error--right" type="check-circle" />
					<span className="item__error--wrong"> </span>
				</div>
			</div>
			{/* 仓库地址 */}
			<div className="form__item">
				<div className="form__item__label"><span>*</span>仓库地址</div>
				<Cascader className="form__item__input" placeholder="请选择地区" options={linkData} />
				<Input.TextArea className="form_detail_address_input"
					placeholder="填写详细地址"
					onChange={e => props.getBaseInfo(formData => {
						// "TODO"
						// formData.temp.otherPlatformRadio = e.target["value"]
						return formData;
					})}
				>
				</Input.TextArea>
			</div>
			{/* 可上架商品数 */}
			<div className="form__item">
				<div className="form__item__label"><span>*</span>可上架商品数</div>
				<Select
					className="form__item__input"
					placeholder="选择上架商品数量"
					onChange={e => props.getBaseInfo(formData => {
						// "TODO"
						// formData.temp.otherPlatformRadio = e.target["value"]
						return formData;
					})}
				>
					{props.business.ItemUpshelf.map((item, index) => (<Option key={index} value={item.value}>{item.value}</Option>))}
				</Select>

				<div className="form__item--info">
					<Icon className="item__error--right" type="check-circle" />
					<span className="item__error--wrong"> </span>
				</div>
			</div>
			{/* 通过什么渠道了解到ezbuy */}
			<div className="form__item">
				<div className="form__item__label"><span>*</span>通过什么渠道了解到ezbuy平台的</div>
				<Select
					className="form__item__input"
					placeholder="请选择了解渠道"
				>
					{props.business.KnowChannel.map((item, index) => (<Option key={index} value={item.name}>{item.name}</Option>))}
				</Select>

				<div className="form__item--info">
					<Icon className="item__error--right" type="check-circle" />
					<span className="item__error--wrong"> </span>
				</div>
			</div>
			{/* 目前是否有经营其他平台 */}
			<div className="form__item">
				<div className="form__item__label"><span>*</span>目前是否有经营其他平台</div>
				<Radio.Group
					className="form__item__input"
					value={props.formData.temp.otherPlatformRadio}
					onChange={e => props.getBaseInfo(formData => {
						formData.temp.otherPlatformRadio = e.target["value"];
						return formData;
					})}
				>
					<Radio className="from_other_platform_radio" value={1} >是</Radio>
					<Select
						className="form_other_platform_select"
						placeholder="请选择"
						onChange={e => props.getBaseInfo(formData => {
							/**TODO 记录选择的平台 */
						})}
					>
						{props.business.OtherPlatform.map((item, index) => (<Option key={index} value={item.name}>{item.name}</Option>))}
					</Select>
          { props.formData.temp.otherPlatformRadio === 1 && <Input
            placeholder="填写一个店铺链接"
            className="from_other_platform_url_input"
            onChange={e => props.getBaseInfo(formData => {
              /**TODO 记录店铺地址 */
            })}
            >
            </Input>
            }
          <Radio className="from_other_platform_radio" value={2}>否</Radio>
          {
						props.formData.temp.otherPlatformRadio === 2 && <Upload>
							<Button className="from_other_platform_upload_button">
								<Icon type="upload" /> 上传图片
							</Button>
              <p className="from_other_platform_tip_label">请上传5张图片，每张大小不超过500K</p>
						</Upload>
					}


				</Radio.Group>
			</div>
		</div>
	</div>
);

export default Person;
