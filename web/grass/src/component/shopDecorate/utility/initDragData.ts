import { ComponentType } from "../constant";
import { outputArrImg } from "./genEmptyImgArray";

const initDragData = (type) => {
	let data = [];
	switch (type) {
		case ComponentType.Carousel:
			data = outputArrImg(2);
			break;
		case ComponentType.ShowCase.One:
			data = outputArrImg(1);
			break;
		case ComponentType.ShowCase.Two:
			data = outputArrImg(3);
			break;
		case ComponentType.ShowCase.Three:
			data = outputArrImg(4);
			break;
		case ComponentType.ShowCase.Four:
			data = outputArrImg(8);
			break;
		default:
			break;
	}
	return data;
};

export {
	initDragData,
};