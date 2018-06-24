import * as React from 'react'
import { connect } from 'react-redux'
import { MONEY_MAP } from '../../constant'
import {redirect} from '../../util/history'
import {
  Button,
  InputNumber,
  Input
} from 'antd'
import './preview.scss'

@connect(state=>({
  productData: state.productManage.productData
}))
class Preview extends React.Component {
  render(){
    const {productData} = this.props
    const {
      name,
      description,
      price,
      originCode,
      primaryImage
    } = productData
    const createMarkup = function() { return {__html: description} }
    return(
      <section className="preview">
        <div className="contents">
          <div className="topContent clearfix">
            <div className="params clearfix">
              <div className="imgInfo">
                <div className="img">
                  <img src={primaryImage} width='300px' height='300px' alt="购物就来ezbuy" />
                </div>
                <h4>65eday – A day of shopping adventure on 05/06/2016</h4>
                <p>Check out this item on 65eday to enjoy even greater savings! $6.5 million worth of cash vouchers are up for grab now. </p>
                <p style={{marginTop:5}}><a href="##">Find out more on 65eday event page.</a></p>
              </div>
              <div className="sku">
                <p className="title">{name}</p>
                <table>
                  <tbody>
                    <tr style={{height:43}}>
                      <td className="label">Price:</td>
                      <td className="value">{MONEY_MAP[originCode]} <span style={{color:'#f87e0b',fontSize:'29px',fontWeight:'normal'}}>{price}</span></td>
                    </tr>
                    <tr style={{height:32}}>
                      <td className="label">Domestic Shipping:</td>
                      <td className="value">{MONEY_MAP[originCode]} 0</td>
                    </tr>
                    <tr style={{height:36}}>
                      <td className="label">QTY:</td>
                      <td className="value"><InputNumber disabled defaultValue={0} min={0} step={1}/></td>
                    </tr>
                    <tr style={{height:106}}>
                      <td className="label" style={{verticalAlign:'top',paddingTop:5}}>Special Instruction:</td>
                      <td className="value" style={{verticalAlign:'top',paddingTop:5}}><Input.TextArea disabled /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="shoppingCart">
              SHOPPING CART
            </div>
          </div>
          <div className='description'>
            <div dangerouslySetInnerHTML={createMarkup()} />
          </div>
          <div className="refer">
            <Button size="large" type="primary" onClick={()=>{
              redirect('/selectArea',{
                todo:'edit'
              })
            }}>返回</Button>
          </div>
        </div>
      </section>
    )
  }
}

export default Preview
