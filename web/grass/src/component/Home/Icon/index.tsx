import * as React from "react";
import "./index.scss";

interface IconProps {
	href: string;
	icon: string;
	label: string;
	total: number;
	overtime?: number;
}

export default function Icon (props: IconProps) {
	return (
		<a
			href={props.href}
			className="IconWrap">
			<img src={props.icon} alt=""/>
			<div>
				<span> {props.total} </span>
				{
					props.overtime ?
					<a
						href="/index.html#/newOrder?orderItemTrackStatus=1003000&overtime=true"
						className="overtime"> 超时: {props.overtime} </a>
					: null
				}
			</div>
			<div>
				{props.label}
			</div>
		</a>
	);
}