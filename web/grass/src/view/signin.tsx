import * as React from "react";
import ReactDOM from "react-dom";

import { rootRoutes } from "../route/register";
import { Router, hashHistory } from "react-router";
import "antd/dist/antd.min.css";

const container = document.querySelector("#container");
ReactDOM.render(<Router routes={rootRoutes} history={hashHistory} />, container);
