import * as React from "react";
import { Provider } from "mobx-react";
import { SearchHeader } from "./components/SearchHeader";
import { TicketTable } from "./components/TicketTable";
import { Model } from "./model";

const model = new Model();

class TicketList extends React.PureComponent<{}, {}> {
	render() {
		return (
			<div>
				<SearchHeader />
				<TicketTable />
			</div>
		);
	}
}

export default function List() {
	return (
		<Provider model={model}>
			<TicketList />
		</Provider>
	);
}
