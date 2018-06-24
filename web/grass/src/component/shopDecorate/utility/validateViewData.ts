import { message } from "antd";
import { ComponentType } from "../constant";
import { i18nText } from "util/kit";

const validateImage = (imgArray, info) => {
	let validate = true;
	for (let i = 0; i < imgArray.length; i++) {
		if (imgArray[i].img === "") {
			message.error(`${i18nText("No.")}${i + 1}${i18nText("张,")}${info}`);
			validate = false;
			break;
		}
	}
	return validate;
};

const validateViewData = (viewData) => {
	let result: boolean = true;
	for (let i = 0; i < viewData.length; i++) {
		const item = viewData[i];
		if (result) {
			switch (item.type) {
				case ComponentType.Banner:
					// result = validateImage(item.data, "店招图片不能为空");
					break;
				case ComponentType.ShowCase.One:
				case ComponentType.ShowCase.Two:
				case ComponentType.ShowCase.Three:
				case ComponentType.ShowCase.Four:
					result = validateImage(item.data, `${i18nText("Image")}${i18nText("Image can not be empty")}`);
					break;
				case ComponentType.Carousel:
					result = validateImage(item.data, `${i18nText("Banner Carousel")}${i18nText("Image can not be empty")}`);
					break;
			}
		}
	}
	return result;
};

export {
	validateViewData
};
