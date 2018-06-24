import renderAppEntry from "../util/renderAppEntry";
import ShopDecorate from "../component/shopDecorate";

const renderOptions = {
	hideMenu: true
};

renderAppEntry(ShopDecorate, renderOptions);

if (module.hot) {
	module.hot.accept("../component/shopDecorate", () => {
		renderAppEntry(ShopDecorate, renderOptions);
	});
}