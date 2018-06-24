import * as React from "react";
import { Radio } from "antd";

const RadioGroup = Radio.Group;

const ShopType = props => {
	return (
		<div>
			{props.editor && (
				<div className="form__item">
					<div className="form__item__label"><span>*</span>店铺类型</div>
					<div className="form__item__input">
						<RadioGroup
							defaultValue="person"
							onChange={e => props.changeShopType(e.target.value)}
							value={window.sessionStorage.getItem("registerType")}
						>
							<Radio value="person">个人</Radio>
							<Radio value="company">公司</Radio>
						</RadioGroup>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShopType;