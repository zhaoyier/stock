import * as React from "react";
import "./index.scss";

interface ContainerWrapProps {
	children: React.ReactNode;
	title: React.ReactNode;
}

export default function ContainerWrap(props: ContainerWrapProps) {
	return (
		<div className="ContainerWrap">
			<div className="chidrenWrap">
				<header className="chidrenWrap_header"> { props.title } </header>
				{ props.children }
			</div>
		</div>
	);
}
