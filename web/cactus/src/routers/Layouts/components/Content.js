import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import routerConfig from '@/config/routes'
import Loading from '@/components/Loading'

class Content extends Component {
	render() {
		return (
			<div className="body">
				<div className="left"></div>
				<div className="center">
					<Loading>
							{routerConfig.map((item,i)=>
									<Route key={i} path={item.path} component={item.component} exact/>
							)}
					</Loading>
				</div>
				<div className="right"></div>
			</div>
		)
	}
}

export default Content;