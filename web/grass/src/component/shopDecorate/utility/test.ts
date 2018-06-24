
const json = [ { "id": 0, "type": "banner", "data": [ { "img": "http://7xiata.com1.z0.glb.clouddn.com/FqPrJFOg8Q9Vo7ZW6TMLl7f0HuqJ", "link": "", "gpid": "0" } ] }, { "id": 5, "type": "nav", "data": [] }, { "id": 1, "type": "showcase__one", "data": [ { "img": "http://7xiata.com1.z0.glb.clouddn.com/FpUB8Dfi1n8o26jZxWgO1C_kyDPb", "link": "", "gpid": "0" } ] }, { "id": 2, "type": "showcase__two", "data": [ { "img": "http://7xiata.com1.z0.glb.clouddn.com/Ft4vo0sjAvHETu8GrQ9FR2Um6zC4", "link": "", "gpid": "0" }, { "img": "http://7xiata.com1.z0.glb.clouddn.com/FpUB8Dfi1n8o26jZxWgO1C_kyDPb", "link": "", "gpid": "0" }, { "img": "http://7xiata.com1.z0.glb.clouddn.com/FncLV1RdhtrqZ7EIe4aeomRqP8Zs", "link": "", "gpid": "0" } ] }, { "id": 3, "type": "showcase__four", "data": [ { "img": "http://7xiata.com1.z0.glb.clouddn.com/FsrVze87P9WpZtJGtKCZ9ve6LjtR", "link": "http://sg.65emall.net/product/230326.html", "gpid": "230326" }, { "img": "http://7xiata.com1.z0.glb.clouddn.com/FjcN5AtnpNhUwG9tsmntUuYx6RGK", "link": "", "gpid": "0" }, { "img": "http://7xiata.com1.z0.glb.clouddn.com/FqPrJFOg8Q9Vo7ZW6TMLl7f0HuqJ", "link": "", "gpid": "0" }, { "img": "http://7xiata.com1.z0.glb.clouddn.com/FqInLFVqaVi881Vj12dsYt3rnmGz", "link": "XXX", "gpid": "0" }, { "img": "http://7xiata.com1.z0.glb.clouddn.com/FpUB8Dfi1n8o26jZxWgO1C_kyDPb", "link": "", "gpid": "0" }, { "img": "http://7xiata.com1.z0.glb.clouddn.com/FncLV1RdhtrqZ7EIe4aeomRqP8Zs", "link": "xxx", "gpid": "0" }, { "img": "http://7xiata.com1.z0.glb.clouddn.com/FhQrDvyAEuAor6f7EJ9GL8Uyxpws", "link": "", "gpid": "0" }, { "img": "http://7xiata.com1.z0.glb.clouddn.com/FlWe0bswfm7qohe_8qdzaDBYkDS3", "link": "", "gpid": "0" } ] }, { "id": 4, "type": "carousel", "data": [ { "img": "http://7xiata.com1.z0.glb.clouddn.com/FpUB8Dfi1n8o26jZxWgO1C_kyDPb", "link": "", "gpid": "0" }, { "img": "http://7xiata.com1.z0.glb.clouddn.com/FqPrJFOg8Q9Vo7ZW6TMLl7f0HuqJ", "link": "", "gpid": "0" }, { "img": "http://7xiata.com1.z0.glb.clouddn.com/FncLV1RdhtrqZ7EIe4aeomRqP8Zs", "link": "", "gpid": "0" } ] } ]

enum LayoutType {
	LayoutTypeTop = "LayoutTypeTop",
	LayoutTypeCarousel = "LayoutTypeCarousel",
	LayoutTypeBanner = "LayoutTypeBanner",
	LayoutTypeGrid = "LayoutTypeGrid",
	LayoutTypeFlow = "LayoutTypeFlow",
}
const DeviceType = {
	PC: "pc",
	APP: "app",
};
const { PC, APP } = DeviceType;

const ComponentType = {
	Banner: "banner",
	Nav: "nav",
	Carousel: "carousel",
	Products: "products",
	Categories: "categories",
	ShowCase: {
		One: "showcase__one",
		Two: "showcase__two",
		Three: "showcase__three",
		Four: "showcase__four",
	}
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
			groupLayoutInfo: {},
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
toServerData(json);