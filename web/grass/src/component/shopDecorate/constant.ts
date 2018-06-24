import { outputArrImg } from "./utility/genEmptyImgArray";
const ItemTypes = {
	CARD: "card",
};
const DeviceType = {
	PC: "pc",
	APP: "app",
};

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

let keyId = 1;
const setKey = () => {
	return keyId++;
};
const Banner = {
	id: setKey(),
	type: ComponentType.Banner,
	data: outputArrImg(1),
};

const Nav = {
	id: setKey(),
	type: ComponentType.Nav,
	data: outputArrImg(1),
};

const Carousel = {
	id: setKey(),
	type: ComponentType.Carousel,
	data: outputArrImg(2),
};

const ShowCaseOne = {
	id: setKey(),
	type: ComponentType.ShowCase.One,
	data: outputArrImg(1),
};

const ShowCaseTwo = {
	id: setKey(),
	type: ComponentType.ShowCase.Two,
	data: outputArrImg(3),
};

const defaultTemplate = [
	[Banner, Nav, Carousel, ],
	[Banner, Nav, Carousel, ShowCaseOne],
	[Banner, Nav, Carousel, ShowCaseTwo],
];

const TemplateData = "template_data";

export {
	ItemTypes,
	ComponentType,
	DeviceType,
	defaultTemplate,
	TemplateData,
};