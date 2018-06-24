import * as React from "react";
import "./index.scss";

interface CircleProps {
	label: string;
	total: number;
}

export default function Circle (props: CircleProps) {
	return (
		<div
			className="CircleWrap">
			<div>
				{props.total}
			</div>
			<div>
				{props.label}
			</div>
		</div>
	);
}