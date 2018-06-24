require('../../node_modules/trumbowyg/dist/trumbowyg.min')
require('../../node_modules/trumbowyg/plugins/upload/trumbowyg.upload')
require('../../node_modules/trumbowyg/dist/langs/zh_cn.min')
$.trumbowyg.svgPath = '../../asset/icons.svg'

import * as React from 'react'
import { getToken } from '../../api/other'
import SanitizeHtml from 'sanitize-html'

export default class Trumbowyg extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      baseUrl: '',
      token: '',
      changeEvent: false
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
    const { action, data } = this.props.uploadImage
    const { dataHtml } = this.props
    getToken((info)=>{
      this.setState({
        baseUrl: info.baseUrl,
        token: info.token
      })
      this.init(action, info.token)
    })
  }
  componentDidUpdate(props, state) {
    const { dataHtml } = this.props
    if (!this.state.changeEvent) {
      $('#editor-dropdown').trumbowyg('html', dataHtml)
    }
  }
  sanitizeHtml() {
    const {dispatch} = this.props
    let value = SanitizeHtml(this.props.productData.description, {
      allowedTags: SanitizeHtml.defaults.allowedTags.concat([ 'img', 'div', 'h1', 'h2', 'span' ])
    })
    dispatch(productChange({description: value}))
  }
  init(action, token){
    let editor = $('#editor-dropdown')
    .trumbowyg({
        btnsDef: {
            // Create a new dropdown
            image: {
                dropdown: ['insertImage', 'upload'],
                ico: 'insertImage'
            }
        },
        // Redefine the button pane
        lang: 'zh_cn',
        btns: ['viewHTML',
          '|', 'formatting',
          '|', 'btnGrp-semantic',
          '|', 'link',
          '|', 'image',
          '|', 'btnGrp-justify',
          '|', 'btnGrp-lists',
          '|', 'horizontalRule',
          '|', 'fullscreen'],
        plugins: {
          upload: {
            serverPath: action,
            fileFieldName: 'file',
            data: [{name: 'token', value: token}],
            success: (e) => {
              const imgUrl = this.state.baseUrl + e.key
              const html = editor.trumbowyg('html')
              editor.trumbowyg('html', html + `<div><img src='${imgUrl}' /></div>`)
              this.props.onChange(editor.trumbowyg('html'))
            },
            error: function() {
              console.log('error')
            }
          }
        }
    })
    // .off('tbwchange')
    .on('tbwchange',  () => {
      const content = editor.trumbowyg('html')
      this.props.onChange(content)
    })
    // .off('tbwpaste')
    .on('tbwpaste', (e) => {
      // this.props.onChange(e)
    })
    .on('tbwfocus', () => {
      this.setState({
        changeEvent: true
      })
    })
  }

  render() {
    return (
      <div>
        <div id="editor-dropdown"></div>
      </div>
    )
  }
}
