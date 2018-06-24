import React, { Component } from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import { ItemTypes } from "../constant";

import { ComponentType } from "../constant";
import { i18nText } from "../../../util/kit";

const cardSource = {
	beginDrag(props, monitor, component) {
		return {
			id: props.id,
			index: props.index,
			component: component
		};
	},
};

const cardTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		// Don't replace items with themselves
		if (dragIndex === hoverIndex || typeof (props.moveDrag) !== "function") {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}
		// 店招 导航 底部占位 不能被拖动
		if (dragIndex < 2 || hoverIndex < 2 || hoverIndex === undefined) {
			return;
		}

		// Time to actually perform the action
		props.moveDrag(dragIndex, hoverIndex, monitor.getItem().component);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
	},

	drop(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		console.log(dragIndex, hoverIndex);
	}
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
export default class Drag extends Component<any, any> {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		// index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
		// id: PropTypes.any.isRequired,
		// text: PropTypes.any.isRequired,
		// moveCard: PropTypes.func.isRequired,
	};

	render() {
		const {
			content,
			isDragging,
			connectDragSource,
			connectDropTarget,
			className,
			deleteDrag,
			editOpen,
			type,
		} = this.props;
		let { canDelete } = this.props;
		const opacity = isDragging ? 0 : 1;
		let typeText = "";
		let ifShowTag = true;
		switch (type) {
			case ComponentType.Banner:
				typeText = i18nText("Store Banner");
				canDelete = false;
				break;
			case ComponentType.Nav:
				typeText = i18nText("Navigation");
				canDelete = false;
				ifShowTag = false;
				break;
			case ComponentType.Carousel:
				typeText = i18nText("Banner Carousel");
				break;
			case ComponentType.ShowCase.One:
			case ComponentType.ShowCase.Two:
			case ComponentType.ShowCase.Three:
			case ComponentType.ShowCase.Four:
				typeText = i18nText("Image");
				break;
		}
		return connectDragSource(
			connectDropTarget(
				<div onClick={e => editOpen(this.props.index)} style={{ opacity, }} className={className ? className : "drag"} >
					{canDelete && (
						<div onClick={e => deleteDrag(this.props.index, e)} className="delete">
							{i18nText("Delete")}
						</div>
					)}
					{ifShowTag && (
						<div className="left__tag">
							{typeText}
						</div>
					)}
					{content}
				</div>
			),
		);
	}
}
