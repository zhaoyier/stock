import * as React from 'react'
import { Spin } from 'antd'
import './index.scss'

class Loading extends React.Component {
  render() {
    const { visible, children, mask } = this.props

    return (
      <div
        className="loadingContainer"
        style={{ display: visible ? 'block' : 'none' }}
        >
        { mask &&  <div className="mask"></div> }
        <div className="content">
          { children ? children : <Spin /> }
        </div>
      </div>
    )
  }
}

export default Loading
