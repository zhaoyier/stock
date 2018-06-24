import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "../store";
import "antd/dist/antd.min.css";
import accountInfo from "../util/accountInfo";
import Index from "../component/Index";

function checkLogin() {
	return accountInfo && accountInfo.username;
}

interface RenderOptions {
	hideMenu: boolean;
}

export default function render(App, options: Partial<RenderOptions> = {}) {
	const target = document.getElementById("container");
	if (!checkLogin()) {
		window.location.href = "/signin.html";
		return;
	}
	if (target !== null) {
		ReactDOM.unmountComponentAtNode(target);
		ReactDOM.render(
			<Provider store={store}>
				<Index {...options}>
					<App />
				</Index>
			</Provider>,
			target
		);
	}else {
		console.log("Can't find mount dom..");
	}
}
