import * as React from "react";
import "./index.scss";

interface CommonWrapProps {
	title: string;
	children: any;
}

export default function CommonWrap (props: CommonWrapProps) {
	const {
		title,
		children
	} = props;

	return (
		<div className="CommonWrap">
			<div>
				<header> {title} </header>
				<section> {children} </section>
			</div>
		</div>
	);
}