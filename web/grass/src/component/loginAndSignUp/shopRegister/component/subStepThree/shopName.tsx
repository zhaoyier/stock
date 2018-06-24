import * as React from "react";
import { Input, Icon, message } from "antd";

const ShopName = props => (
	<div>
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
						const regexp = /[^a-z0-9\s]/gi;
						if (regexp.test(e.target["value"])) {
							message.error("支持英文,数字和空格");
						}
						let value = e.target["value"].replace(regexp, "");
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
		{/* 主营类目 */}
		{/* <div className="form__item">
			<div className="form__item__label"><span>*</span>主营类目</div>
			<div className="form__item__input" >
				<Input
					value={props.formData.mainCats}
					onChange={e => props.getBaseInfo(formData => {
							formData.mainCats = e.target.value;
							return formData;
					})}
				/>
			</div>
			<div style={{width: 270, height: 30, verticalAlign: "top"}} className="form__item--info">
				<span className="item__info--default">参考填写类目：男装，女装，母婴，鞋包配饰，家具家居，3C数码，运动户外，办公文具，美容个护，汽车配件</span>
				<Icon className="item__error--right" type="check-circle" />
				<span className="item__error--wrong" >
					<Icon type="close-circle" />
				</span>
			</div>
		</div> */}
	</div>
);

export default ShopName;
