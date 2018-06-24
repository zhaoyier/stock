import renderAppEntry from "../util/renderAppEntry";
import Test from "../component/Test";

const renderOptions = {
	hideMenu: true 
};

renderAppEntry(Test, renderOptions);

if (module.hot) {
	module.hot.accept("../component/Test", () => {
		renderAppEntry(Test, renderOptions);
	});
}
