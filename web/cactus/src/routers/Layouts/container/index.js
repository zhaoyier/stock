import React, { Component } from 'react'
import Header from "../components/Header"
import Content from "../components/Content"
import Footer from "../components/Footer"
import Left from '../components/Left'
import Right from '../components/Right'
import './index.less'
import Cookies from 'js-cookie'

class Layouts extends Component {
    logout = () =>{
        Cookies.remove('JSESSIONID', { path: '/' })
        Cookies.remove('userName', { path: '/' })
        this.props.history.replace('/login')
    }
    render() {
        return (
            <div className='Layouts_wrap clearFix'>
                {/* <Left />
                <Right logout={this.logout}/> */}
                <Header />
                <Content />
                <Footer />
                {/* <Right logout={this.logout}/> */}
            </div>
        )
    }
}

export default Layouts
