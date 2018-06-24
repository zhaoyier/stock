import * as React from "react";
import { TextItemProps, TextItem } from "../TextItem";
import { renderRows } from "component/Ticket/utils";

interface TicketInfoProps {
	title: string;
	items: TextItemProps[];
}

export class TicketInfo extends React.PureComponent<TicketInfoProps, {}> {
	renderItem = (item: TextItemProps) => {
		return <TextItem labelWidth={"25%"} {...item} />;
	};

	render() {
		const { items, title } = this.props;
		return (
			<div style={{ marginBottom: 40 }}>
				<h2 style={{ margin: "20px 0", fontSize: 20 }}>{title}</h2>
				<div>{renderRows(items, this.renderItem, "label")}</div>
			</div>
		);
	}
}
