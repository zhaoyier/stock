import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Alert, Breadcrumb, Form, Select, Button,Radio, Input, Icon, Checkbox, InputNumber, Table, Upload, Row, Col, Tooltip, Switch} from 'antd'
import { getToken } from '../../api/other'
import {
  productChange,
  productSkusChange,
  changeSkuToAll,
  changeSkuPictures,
  changeSkuSwitch,
  changeColorKey
} from '../../action/productManage'
import {
  volumeOperate,
  volumeSplit,
  volumeJoin,
} from '../skit.js'
import { warn, success} from '../../util/antd'
import { equal } from '../../util/kit'
import { QINIU_UPLOAD_URL } from '../../constant/index'
import {
  COUNTRY_CODE_MAP,
  SHIPMENT_INFO
} from '../../constant'
const assign = Object.assign
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

@connect(state => ({
  productData: state.productManage.productData,
  productSkus: state.productManage.productSkus,
  skuSelected: state.productManage.skuSelected,
  skuPictures: state.productManage.skuPictures,
  skuToAll: state.productManage.skuToAll,
  skuSwitch: state.productManage.skuSwitch,
  colorKey: state.productManage.colorKey
}))
class EditExtra extends Component{
  constructor(props){
    super(props)
    this.state={
      baseUrl: '',
      token: ''
    }
  }
  componentDidMount(){
    getToken((info)=>{
      this.setState({
        baseUrl: info.baseUrl,
        token: info.token
    })
    })
  }
  render(){
    const {
      baseUrl,
      token
    } = this.state
    const {
      skuSwitch,
      colorKey,
      dispatch
    } = this.props
    let {
      productData,
      skuSelected
    } = this.props
    let {
      skuToAll,
      skuPictures,
      type
     } = this.props
    let {productSkus} = this.props
    productSkus = volumeOperate(productSkus,'split')
    const props = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: {token: token},
      listType: 'picture-card'
    }
    let attributeAry = []
    for (let i = 0; i < skuSelected.length; i++) {
      let newAray = []
      for (let key in skuSelected[i]) {
        for (let j = 0; j < skuSelected[i][key].length; j++) {
          let tmp = {}
          tmp[key] = skuSelected[i][key][j]
          if(attributeAry.length>0){
            for (let k = 0; k < attributeAry.length; k++) {
              newAray.push(assign({},attributeAry[k],tmp))
            }
          }else{
            newAray.push(tmp)
          }
        }
      }
      attributeAry = newAray
    }
    const skuList = () =>{
        return productSkus.map((productSku,index)=>{
          return (<Row className='skuList' key={index}>
            <Col span="1">
              {productSku.name}
            </Col>
            <Col span="2">
              <InputNumber max={type=='first'?productSku.originalPrice:Infinity} disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.originalPrice?productSku.originalPrice:''} min={0} style={{width:80}} onChange={(v)=>{
                productSkus[index].originalPrice = v
                dispatch(productSkusChange(productSkus))
              }}/>
            </Col>
            <Col span="2">
              <InputNumber max={type=='first'?productSku.price:Infinity} disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.price?productSku.price:''} min={0}  style={{width:80}} onChange={(v)=>{
                productSkus[index].price = v
                dispatch(productSkusChange(productSkus))
              }}/>
              {
                typeof(productSku.price/productSku.originalPrice) === 'number' &&
                !isNaN(productSku.price/productSku.originalPrice) &&
                productSku.price/productSku.originalPrice !== Infinity &&
                (<span>
                  {(productSku.price*10/productSku.originalPrice).toFixed(1)}折
                </span>)
              }
            </Col>
            <Col span="2">
              <InputNumber disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.quantity?productSku.quantity:''} min={0} step={1} style={{width:80}} onChange={(v)=>{
                productSkus[index].quantity = v
                dispatch(productSkusChange(productSkus))
              }}/>
            </Col>
            <Col span="2">
              <InputNumber disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false}  value={productSku.weight?productSku.weight:''} min={0} style={{width:80}} onChange={(v)=>{
                productSkus[index].weight = v
                dispatch(productSkusChange(productSkus))
              }}/>
            </Col>
            <Col span="2">
              <InputNumber disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false}  value={productSku.length?productSku.length:''} min={0} step={1} style={{width:80}} onChange={(v)=>{
                productSkus[index].length = v
                productSkus[index] = volumeJoin(productSkus[index])
                dispatch(productSkusChange(productSkus))
              }}/>
            </Col>
            <Col span="2">
              <InputNumber disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false}  value={productSku.width?productSku.width:''} min={0} step={1} style={{width:80}} onChange={(v)=>{
                productSkus[index].width = v
                productSkus[index] = volumeJoin(productSkus[index])
                dispatch(productSkusChange(productSkus))
              }}/>
            </Col>
            <Col span="2">
              <InputNumber disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false}  value={productSku.height?productSku.height:''} min={0} step={1} style={{width:80}} onChange={(v)=>{
                productSkus[index].height = v
                productSkus[index] = volumeJoin(productSkus[index])
                dispatch(productSkusChange(productSkus))
              }}/>
            </Col>
            <Col span="2">
              <Switch checked={productSku.hasOwnProperty('isOnSale')?productSku.isOnSale:true} onChange={(v)=>{
                productSkus[index].isOnSale = v
                dispatch(productSkusChange(productSkus))
              }} />
            </Col>
          </Row>)
        })
    }
    const skuHead = () => {
        return <Row className='skuDetail'>
          <Col span="1">
            sku名称
          </Col>
          <Col span="2">
            <label>原价(¥):</label>
            <InputNumber min={0} style={{width:80}} onChange={(v=>{
              skuToAll.originalPrice = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title="应用到全部sku">
              <Icon onClick={()=>{
                if(!skuToAll.originalPrice){
                  warn('请输入单价')
                  return
                }
                if(type == 'first'){
                  for (let i = 0; i < productSkus.length; i++) {
                    if(productSkus[i].isOnSale != false){
                      if(productSkus[i].originalPrice < skuToAll.originalPrice){
                        warn('价格不可高于原价！')
                        return
                      }
                    }
                  }
                }
                for (let i = 0; i < productSkus.length; i++) {
                  if(productSkus[i].isOnSale != false){
                    productSkus[i].originalPrice = skuToAll.originalPrice
                  }
                }
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>售卖价(¥):</label>
            <InputNumber min={0} style={{width:80}} onChange={(v=>{
              skuToAll.price = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title="应用到全部sku">
              <Icon onClick={()=>{
                if(!skuToAll.price){
                  warn('请输入单价')
                  return
                }
                if(type == 'first'){
                  for (let i = 0; i < productSkus.length; i++) {
                    if(productSkus[i].isOnSale != false){
                      if(productSkus[i].price < skuToAll.price){
                        warn('价格不可高于原价！')
                        return
                      }
                    }
                  }
                }
                for (let i = 0; i < productSkus.length; i++) {
                  if(productSkus[i].isOnSale != false){
                    productSkus[i].price = skuToAll.price
                  }
                }
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>库存(件):</label>
            <InputNumber min={0} step={1} style={{width:80}} onChange={(v=>{
              skuToAll.quantity = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title="应用到全部sku">
              <Icon onClick={()=>{
                if(!skuToAll.quantity){
                  warn('请输入库存')
                  return
                }
                for (let i = 0; i < productSkus.length; i++) {
                  if(productSkus[i].isOnSale != false){
                    productSkus[i].quantity = skuToAll.quantity
                  }
                }
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>重量(kg):</label>
            <InputNumber min={0}  style={{width:80}} onChange={(v=>{
              skuToAll.weight = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title="应用到全部sku">
              <Icon onClick={()=>{
                if(!skuToAll.weight){
                  warn('请输入重量')
                  return
                }
                for (let i = 0; i < productSkus.length; i++) {
                  if(productSkus[i].isOnSale != false){
                    productSkus[i].weight = skuToAll.weight
                  }
                }
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>长度(cm):</label>
            <InputNumber min={0} step={1} style={{width:80}} onChange={(v=>{
              skuToAll.length = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title="应用到全部sku">
              <Icon onClick={()=>{
                if(!skuToAll.length){
                  warn('请输入长度')
                  return
                }
                for (let i = 0; i < productSkus.length; i++) {
                  if(productSkus[i].isOnSale != false){
                    productSkus[i].length = skuToAll.length
                  }
                }
                productSkus = volumeOperate(productSkus,'join')
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>宽度(cm):</label>
            <InputNumber min={0} step={1} style={{width:80}} onChange={(v=>{
              skuToAll.width = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title="应用到全部sku">
              <Icon onClick={()=>{
                if(!skuToAll.width){
                  warn('请输入宽度')
                  return
                }
                for (let i = 0; i < productSkus.length; i++) {
                  if(productSkus[i].isOnSale != false){
                    productSkus[i].width = skuToAll.width
                  }
                }
                productSkus = volumeOperate(productSkus,'join')
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>高度(cm):</label>
            <InputNumber min={0} step={1} style={{width:80}} onChange={(v=>{
              skuToAll.height = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title="应用到全部sku">
              <Icon onClick={()=>{
                if(!skuToAll.height){
                  warn('请输入高度')
                  return
                }
                for (let i = 0; i < productSkus.length; i++) {
                  if(productSkus[i].isOnSale != false){
                    productSkus[i].height = skuToAll.height
                  }
                }
                productSkus = volumeOperate(productSkus,'join')
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
        </Row>
    }
    return (<section className='skus'>
        {
          type == 'first' && (<p style={{color:'red'}}>如果价格设置高于产品原价，系统将不会给此产品派单</p>)
        }
        {
          productSkus.length>0 && (<div>
            <p>跟卖商品{productData.name},请补充以下信息
              <span style={{fontWeight:'bold'}}>(向右滑动，填写产品长宽高信息):</span>
            </p>
            <section className="skuScrollContainer">
              <section className="skuScroll">
                {skuHead()}
                {skuList()}
              </section>
            </section>
          </div>)
        }
        {
          productSkus.length == 0 && (<p>没有sku</p>)
        }
      </section>)
  }
}
export default EditExtra
