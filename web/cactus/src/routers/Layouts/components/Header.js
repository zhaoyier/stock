import React, { Component } from "react"
import { Route, withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import logo from "../assets/logo.png"
import Cookies from 'js-cookie'
import TopMenu from "../../../components/TopMenu/index"

@withRouter
@inject('Store')
@observer
class Header extends Component {
	componentWillMount() {
		let { userInfo,updateName } = this.props.Store
		if (userInfo.name == '') {
				updateName(Cookies.get('userName'))
		}
	}
	logout = () =>{
			this.props.logout()
	}

	render() {
		const { name } = this.props.Store.userInfo

		return (
			<div className="header">
				<span className="left">
					<img style={{width: "100%", height: "100%"}} src={logo} />
				</span>
				<span className="center">
				<TopMenu className="menu"></TopMenu>
				</span>
				<span className="right">{name}</span>
			</div>
		)
	}
	
}

export default Header