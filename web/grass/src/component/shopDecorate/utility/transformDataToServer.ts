import { LayoutType, } from "../../../services/ezseller/sellerStore_public";
import { ComponentType, } from "../constant";

const toViewData = (server) => {
	let result: any = [];
	if (!server) {
		return;
	}
	server.forEach((dragItem, i) => {
		let drag: any = {
			id: i,
			type: "",
			data: []
		};
		switch (dragItem.groupLayoutInfo.layoutType) {
			case LayoutType.LayoutTypeTop:
				drag.type = ComponentType.Banner;
				break;
			case LayoutType.LayoutTypeCarousel:
				drag.type = ComponentType.Carousel;
				break;
			case LayoutType.LayoutTypeBanner:
				drag.type = ComponentType.ShowCase.One;
				break;
			// LayoutTypeFlow
			case LayoutType.LayoutTypeFlow:
				drag.type = ComponentType.ShowCase.Two;
				break;
			case LayoutType.LayoutTypeGrid:
				switch (dragItem.groupLayoutInfo.columnCount) {
					case 2:
						drag.type = ComponentType.ShowCase.Three;
						break;
					case 4:
						drag.type = ComponentType.ShowCase.Four;
						break;
				}
				break;
		}
		if (dragItem.entranceList) {
			for (let i = 0; i < dragItem.entranceList.length; i++) {
				drag.data.push({
					img: dragItem.entranceList[i].image,
					link: dragItem.entranceList[i].link,
					gpid: dragItem.entranceList[i].gpid,
				});
			}
		}
		result.push(drag);
	});

	// 特殊处理，添加导航
	const nav = {
		id: server.length,
		type: ComponentType.Nav,
		data: [],
	};
	result.splice(1, 0, nav);
	console.log("view data", result);
	return result;
};

const toServerImage = (data) => {
	let result: any = [];
	const imageLength = data.length;
	for (let i = 0; i < imageLength; i++) {
		let imageObj = {
			image: data[i].img,
			gpid: data[i].gpid,
			link: data[i].link || "",
		};
		result.push(imageObj);
	}
	return result;
};

const toServerData = (view) => {
	let result: any = [];
	view.forEach(dragItem => {
		let single: any = {
			groupLayoutInfo: {
				cellRatio: 0,
			},
			entranceList: [],
		};
		switch (dragItem.type) {
			// LayoutTypeTop
			case ComponentType.Banner:
				single.groupLayoutInfo.layoutType = LayoutType.LayoutTypeTop;
				break;
			case ComponentType.Nav:
				// 导航栏不可配置
				break;
			// LayoutTypeCarousel
			case ComponentType.Carousel:
				single.groupLayoutInfo.layoutType = LayoutType.LayoutTypeCarousel;
				break;
			// LayoutTypeBanner
			case ComponentType.ShowCase.One:
				single.groupLayoutInfo.layoutType = LayoutType.LayoutTypeBanner;
				break;
			// LayoutTypeFlow
			case ComponentType.ShowCase.Two:
				single.groupLayoutInfo.layoutType = LayoutType.LayoutTypeFlow;
				break;
			// LayoutTypeGrid // columnCount 2
			case ComponentType.ShowCase.Three:
				single.groupLayoutInfo.layoutType = LayoutType.LayoutTypeGrid;
				single.groupLayoutInfo.columnCount = 2;
				break;
			// LayoutTypeGrid // columnCount 4
			case ComponentType.ShowCase.Four:
				single.groupLayoutInfo.layoutType = LayoutType.LayoutTypeGrid;
				single.groupLayoutInfo.columnCount = 4;
				break;
		}
		single.entranceList = toServerImage(dragItem.data);
		result.push(single);
	});
	// 特殊处理，去掉导航
	result.splice(1, 1);
	console.log("server data", result);
	return result;
};


export {
	toViewData,
	toServerData,
};