import * as React from "react";
import { Router, hashHistory } from "react-router";

interface TicketRoute {
	routePath: string;
	componentName: string;
}

function convertRouter(item: TicketRoute) {
	return {
		path: item.routePath,
		getComponent(nextState, cb) {
			require.ensure([], require => {
				cb(null, require<any>(`./views/${item.componentName}`).default);
			});
		}
	};
}

const ticketRoutes: TicketRoute[] = [
	{
		routePath: "/list",
		componentName: "List"
	},
	{
		routePath: "/detail/:id",
		componentName: "Detail"
	}
];

export default class Ticket extends React.PureComponent<{}, {}> {
	render() {
		return (
			<Router
				routes={{
					childRoutes: ticketRoutes.map(convertRouter)
				}}
				history={hashHistory}
			/>
		);
	}
}
