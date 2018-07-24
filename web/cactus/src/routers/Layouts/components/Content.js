import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

class Content extends Component {
	render() {
		return (
			<div className="body">
				<div className="left"></div>
				<div className="center">
				内容
				</div>
				<div className="right"></div>
			</div>
		)
	}
}

export default Content;