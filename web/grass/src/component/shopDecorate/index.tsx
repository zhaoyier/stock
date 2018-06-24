import * as React from "react";
import { Router, Route, hashHistory } from "react-router";

import Model from "./model";
import Custom from "./custom/index";
import Banner from "./custom/banner";
import Nav from "./custom/nav";
import Showcase from "./custom/showcase";
import Carousel from "./custom/carousel";
import Products from "./custom/products";
import Categories from "./custom/categories";

const ShopDecorate = () => (
	<Router history={hashHistory}>
		<Route path="/" component={Custom} />
		<Route path="/model" component={Model} />
		<Route path="/custom" component={Custom}>
			<Route path="/custom/banner" component={Banner}/>
			<Route path="/custom/nav" component={Nav}/>
			<Route path="/custom/showcase" component={Showcase} />
			<Route path="/custom/carousel" component={Carousel} />
			<Route path="/custom/products" component={Products} />
			<Route path="/custom/categories" component={Categories} />
		</Route>
	</Router>
);

export default ShopDecorate;