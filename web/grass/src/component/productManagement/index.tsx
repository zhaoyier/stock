import * as React from "react";
import { Router, Route, hashHistory } from "react-router";

import ImportProduct from "./importProduct";
import ImportRecord from "./importProduct/importRecord";
import ImportResult from "./importProduct/result/index";
import ChooseCategory from "./productEdit/chooseCategory";
import ProductEdit from "./productEdit/index";

const ProductManagement = () => (
	<Router history={hashHistory}>
		<Route path="/" component={ChooseCategory} />
		<Route path="/importProduct" component={ImportProduct} />
		<Route path="/importRecord" component={ImportRecord} />
		<Route path="/importResult" component={ImportResult} />
		<Route path="/chooseCategory" component={ChooseCategory} />
		<Route path="/productEdit" component={ProductEdit} />
	</Router>
);

export default ProductManagement;
