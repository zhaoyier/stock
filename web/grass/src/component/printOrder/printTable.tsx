import * as React from "react";
import * as queryString from "query-string";
import KrPrintTable from "./sub/krPrintTable";
import LocalPrintTable from "./sub/localPrintTable";
import DefaultPrintTable from "./sub/defaultPrintTable";
import JpPrintTable from "./sub/jpPrintTable";

import "./style/printTable.scss";

interface PrintTableProps {
	pkg: any;
}

class PrintTable extends React.Component<PrintTableProps, {}> {
	renderPrintTable() {
		const { pkg } = this.props;
		const country = queryString.parse(location.search).country;

		switch (country) {
			case "KR":
				return <KrPrintTable pkg={pkg} />;
			case "SGLocal":
				return <LocalPrintTable pkg={pkg} />;
			case "MYLocal":
				return <LocalPrintTable pkg={pkg} />;
			case "JP":
				return <JpPrintTable pkg={pkg} />;
			default:
				return <DefaultPrintTable pkg={pkg} />;
		}
	}
	render() {
		return (
			<div className="subpagewrap">
				{this.renderPrintTable()}
			</div>
		);
	}
}


export default PrintTable;
