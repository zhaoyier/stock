const activeRoute = (type, ComponentType) => {
	switch (type) {
		case ComponentType.Banner:
			window.location.hash = "#/custom/banner";
			break;
		case ComponentType.Nav:
			window.location.hash = "#/custom/nav";
			break;
		case ComponentType.ShowCase.One:
		case ComponentType.ShowCase.Two:
		case ComponentType.ShowCase.Three:
		case ComponentType.ShowCase.Four:
			window.location.hash = "#/custom/showcase";
			break;
		case ComponentType.Categories:
			window.location.hash = "#/custom/categories";
			break;
		case ComponentType.Carousel:
			window.location.hash = "#/custom/carousel";
			break;
		case ComponentType.Products:
			window.location.hash = "#/custom/products";
			break;
	}

};

export default activeRoute;