import * as React from "react";
import './logoTitle.scss'
class LogoTitle extends React.Component{
  render(){
    const {
      title
    } = this.props
    return(<div className="logo">
      <img src="../../../resources/static/ezbuyR.png" alt="ezbuy is the best" width={150}/>
      <span className="title">{title}</span>
    </div>)
  }
}
export default LogoTitle
