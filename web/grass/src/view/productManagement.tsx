import renderAppEntry from "../util/renderAppEntry";
import ProductManagement from "../component/productManagement";

renderAppEntry(ProductManagement);

if (module.hot) {
	module.hot.accept("../component/productManagement", () => {
		renderAppEntry(ProductManagement);
	});
}