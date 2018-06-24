export const defaultPlatforms = [
	{ key: 0, value: "unknown", text: "请选择导入来源" },
	{ key: 1, value: "ImportProductSourceTaobao", text: "淘宝" },
	{ key: 2, value: "ImportProductSourceAmazon", text: "亚马逊" },
	{ key: 3, value: "ImportProductSourceTmall", text: "天猫" }
];

export const defaultConfig = {
	delay: 5000,
	limit: 3,
	skuMainImg: 5
};

export const defaultBundleInput = [
	{ key: "originalPrice", width: 66, placeholder: "原价" },
	{ key: "price", width: 66, placeholder: "售价" },
	{ key: "quantity", width: 66, placeholder: "库存" },
	{ key: "weight", width: 66, placeholder: "重量" },
	{ key: "volume.length", width: 66, placeholder: "长" },
	{ key: "volume.width", width: 66, placeholder: "宽" },
	{ key: "volume.height", width: 66, placeholder: "高" },
	{ key: "skuId", width: 110, placeholder: "货号" }
];

export const colors = [
	{ label: "白色系", color: "#FFFFFF",
		children: [
			{ label: "乳白色", color: "#FFFBF1"},
			{ label: "米白色", color: "#EEDEAF"}
		]
	}, {
		label: "灰色系", color: "#7F7F7F",
		children: [
			{ label: "深灰色", color: "#666666" },
			{ label: "浅灰色", color: "#E4E4E4" },
			{ label: "黑灰色", color: "#808080" },
			{ label: "银色", color: "#C0C0C0" },
			{ label: "棕灰色", color: "#A99E91" },
			{ label: "米灰色", color: "#DED8D1" }
		]
	}, {
		label: "黑色系", color: "#000000",
		children: [{label: "黑色系", color: "#000000"}]
	}, {
		label: "红色系", color: "#F52403",
		children: [
			{ label: "深红色", color: "#CB0021" },
			{ label: "酒红色", color: "#991200" },
			{ label: "玫红色", color: "#E02675" },
			{ label: "西瓜红", color: "#F05553" },
			{ label: "绛红色", color: "#D02447" },
			{ label: "桔红色", color: "#F4490A" },
			{ label: "粉色", color: "#FFA9B7" },
			{ label: "深粉色", color: "#FF5571" },
			{ label: "藕粉色", color: "#EED0D8" }
		]
	}, {
		label: "黄色系", color: "#FFFB01",
		children: [
			{ label: "浅黄色", color: "#FAFC71" },
			{ label: "深黄色", color: "#FFC900" },
			{ label: "土黄色", color: "#CCA512" },
			{ label: "荧光黄", color: "#E9FB56" },
			{ label: "明黄色", color: "#FFFB01" },
			{ label: "柠檬黄", color: "#FFEB42" },
			{ label: "姜黄色", color: "#FBC673" },
			{ label: "橘色", color: "#F9A504" },
			{ label: "橙色", color: "#FFBF7D" },
			{ label: "杏色", color: "#F7EED6" },
			{ label: "米杏", color: "#FFF5DA" },
			{ label: "浅杏色", color: "#FFFAEC" },
			{ label: "茶金色", color: "#DBB161" },
			{ label: "金色", color: "#FDD701" },
			{ label: "香槟色", color: "#F4E1D3" }
		]
	}, {
		label: "绿色系", color: "#288001",
		children: [
			{ label: "浅绿色", color: "#98FB98" },
			{ label: "墨绿色", color: "#1B8F1B" },
			{ label: "军绿色", color: "#5D752A" },
			{ label: "青色", color: "#4BE09E" },
			{ label: "水绿色", color: "#A1EACA" },
			{ label: "翠绿色", color: "#36A343" }
		]
	}, {
		label: "蓝色系", color: "#0432FE",
		children: [
			{ label: "天蓝色", color: "#44CFF6" },
			{ label: "深蓝色", color: "#61890" },
			{ label: "宝蓝色", color: "#4B5CC4" },
			{ label: "水晶蓝", color: "#536CFF" },
			{ label: "孔雀蓝", color: "#30A4C5" },
			{ label: "湖蓝色", color: "#46DFF2" },
			{ label: "藏青色", color: "#2F4E7D" }
		]
	}, {label: "紫色系", color: "#801B80",
			children: [
				{ label: "深紫色", color: "#430D54" },
				{ label: "浅紫色", color: "#EDE0E6" },
				{ label: "紫红色", color: "#8B1A64" },
				{ label: "香芋紫", color: "#967FF5" },
				{ label: "紫罗兰", color: "#B7ACE4" }
			]
	}, { label: "棕色系", color: "#D89A60",
		children: [
			{ label: "浅棕色", color: "#B35B44" },
			{ label: "深棕色", color: "#7C4B00" },
			{ label: "焦糖色", color: "#CB7B00" },
			{ label: "咖啡色", color: "#5F3912" },
			{ label: "卡其色", color: "#EEE572" },
			{ label: "驼色", color: "#A88361" },
			{ label: "巧克力色", color: "#B57344" },
			{ label: "栗色", color: "#886660" },
			{ label: "深卡其布色", color: "#BDB76B" },
			{ label: "褐色", color: "#855B00" }
		]
	}, {
		label: "透明系", color: "#00000000",
		children: [
			{ label: "透明色", color: "#00000000" },
		]
	}
];
