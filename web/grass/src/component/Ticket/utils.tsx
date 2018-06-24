import * as React from "react";
import { Col, Row, Modal } from "antd";

export function renderRows<T>(items: T[], renderItem: (item: T) => any, colKey: keyof T) {
	const rows: any[] = [];
	let rowItems: any[] = [];
	let count = 0;

	for (let item of items) {
		rowItems.push(
			<Col span={8} key={item[colKey].toString()}>
				{renderItem(item)}
			</Col>
		);
		count++;
		if (count === 3) {
			rows.push(
				<Row key={rows.length} style={{ marginBottom: 20 }}>
					{rowItems}
				</Row>
			);
			rowItems = [];
			count = 0;
		}
	}

	if (rowItems.length > 0) {
		rows.push(<Row key={rows.length}>{rowItems}</Row>);
	}

	return rows;
}

export function checkAPIStatus(resp: any): void {
	if (resp.code && resp.message) {
		Modal.error({
			title: resp.message
		});

		throw new Error(resp.message);
	}
}
