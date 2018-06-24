import * as React from 'react'
import { connect } from 'react-redux'
import { switchLanguage } from '../../action/account'


@connect(state => ({ lang: state.lang }))
class LanguageSwitch extends React.Component {
  render () {
    const { lang, dispatch } = this.props
    return (
      <div style={{
        width: '100%',
        textAlign: 'right',
        padding: '1rem'
      }}>
        <span
          style={{
            display: lang === 'en' ? 'none' : 'inherit',
            cursor: 'pointer'
          }}
          className="hover"
          onClick={() => dispatch(switchLanguage('en'))}>English <img style={{width: 4, height: 8}} src="../../static/right-arrow.png" alt="ezbuy is the best"/>
          </span>
        <span
          style={{
            display: lang === 'zh' ? 'none' : 'inherit',
            cursor: 'pointer'
          }}
          className="hover"
          onClick={() => dispatch(switchLanguage('zh'))}>中文 <img style={{width: 4, height: 8}} src="../../static/right-arrow.png" alt="ezbuy is the best"/></span>
      </div>
    )
  }
}

export default LanguageSwitch
