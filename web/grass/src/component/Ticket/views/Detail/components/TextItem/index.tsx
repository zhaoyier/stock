import * as React from "react";
const styles = require("./index.scss");

export interface TextItemProps {
	label: string;
	value: string;
	width?: number;
	labelWidth?: number | string;
}

export class TextItem extends React.PureComponent<TextItemProps, {}> {
	render() {
		const { label, value, width, labelWidth } = this.props;
		return (
			<div className={styles.container} style={{ width }}>
				<span className={styles.label} style={{ width: labelWidth }}>{`${label}: `}</span>
				<span className={styles.content} title={value}>
					{value}
				</span>
			</div>
		);
	}
}
