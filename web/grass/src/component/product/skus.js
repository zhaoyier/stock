/*
  这个模块在页面上的位置在sku属性列表上，然而包含了近1000行代码，其中有很多复杂，晦涩的业务逻辑，需要加注释，这个坑到我这里了，那就开始加吧，不敢轻易重构，怕直接崩了……
    1. selectArea?todo=edit 是从【查看产品】点【编辑】按钮跳转过来
      selectArea?todo=subEdit 是从 【一键导入】点【编辑详情】按钮跳转过来
    2. 下面1000行的代码中，相当多的部分违背了DRY原则，don't repeat yourself.
    3. 现在sku这个item里面有两种ID，一种是skuId是给数据库用的，还有一种叫sellerSkuId是用户自己填的。
    -- Todd Mark
*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Breadcrumb, Form, Select, Button,Radio, Input, Icon, Checkbox, InputNumber, Table, Upload, Row, Col, Tooltip, Switch} from 'antd'
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
  getAttributeAry,
  volumeOperate,
  volumeSplit,
  volumeJoin,
} from '../skit.js'
import { warn, success} from '../../util/antd'
import { equal, getPriceSymbol } from '../../util/kit'
import { QINIU_UPLOAD_URL } from '../../constant/index'
import { locale } from '../../config/locale'
import {
  COUNTRY_CODE_MAP,
  SHIPMENT_INFO
} from '../../constant'
import './skus.scss'
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
  colorKey: state.productManage.colorKey,
  accountInfo: state.common.accountInfo
}))
class Skus extends Component{
  constructor(props){
    super(props)
    this.state={
      baseUrl: '',
      token: ''
    }
  }
  componentWillMount() {
    this.__ = locale(this.props.accountInfo.shop.originCode)
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
      dispatch,
      todo
    } = this.props
    let {
      productData,
      skuSelected
    } = this.props
    let {
      skuToAll,
      skuPictures
     } = this.props
    let {productSkus} = this.props
    const getText = this.__
    productSkus = volumeOperate(productSkus,'split')
    let {
      skuProps
    } = productData
    const props = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: {token: token},
      listType: 'picture-card'
    }
    let attributeAry = getAttributeAry(skuSelected)
    const skuList = () =>{

      if(todo != 'subEdit' && productData.source !== 2){
        // 查看产品 自主发布 批量编辑
        return attributeAry.map((item,index)=>{
          let name = ' '
          let productSku = {}
          for (let key in item) {
            name += item[key]+';'
          }
          for (let i = 0; i < productSkus.length; i++) {
            if(equal(productSkus[i].attributes,item)){
              productSku = productSkus[i]
            }
          }
          // 这里的逻辑用来处理如果sku属性来自批量上传，并且没有数据，那么则使按钮不可用
          let disabledSKUFromBundleEdit = false
          let ifItIsEditPage = (todo === 'bundleEdit' ? true : false)
          if (ifItIsEditPage && !productSku.hasOwnProperty('sellerSkuId')) {
            disabledSKUFromBundleEdit = true
          } else {
            disabledSKUFromBundleEdit = false
          }
          return (<Row className='skuList' key={index}>
              <Col span="1">
                <p style={{lineHeight:'15px',marginTop:11}}>{name}</p>
              </Col>
              {/* sellerSkuId */}
              <Col span="2">
                <Input disabled={disabledSKUFromBundleEdit || productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.sellerSkuId?productSku.sellerSkuId:''} min={0}  style={{width:80}} onChange={(v)=>{
                  let sku = {}
                  sku.attributes = item
                  sku.sellerSkuId = v.target.value
                  sku.name = name
                  if(productSkus.length == 0){
                    productSkus.push(sku)
                  }else{
                    let flag = true
                    for (let i = 0; i < productSkus.length; i++) {
                      if(equal(productSkus[i].attributes,sku.attributes)){
                        flag = false
                        productSkus[i] = assign({},productSkus[i],sku)
                        break
                      }
                    }
                    if(flag){
                      productSkus.push(sku)
                    }
                  }
                  dispatch(productSkusChange(productSkus))
                }}/>
              </Col>
              <Col span="2">
                <InputNumber disabled={disabledSKUFromBundleEdit || productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.originalPrice?productSku.originalPrice:''} min={0}  style={{width:80}} onChange={(v)=>{
                  let sku = {}
                  sku.attributes = item
                  sku.originalPrice = v
                  sku.name = name
                  if(productSkus.length == 0){
                    productSkus.push(sku)
                  }else{
                    let flag = true
                    for (let i = 0; i < productSkus.length; i++) {
                      if(equal(productSkus[i].attributes,sku.attributes)){
                        flag = false
                        productSkus[i] = assign({},productSkus[i],sku)
                        break
                      }
                    }
                    if(flag){
                      productSkus.push(sku)
                    }
                  }
                  dispatch(productSkusChange(productSkus))
                }}/>
              </Col>
              <Col span="2">
                <InputNumber disabled={disabledSKUFromBundleEdit || productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.price?productSku.price:''} min={0}  style={{width:80}} onChange={(v)=>{
                  let sku = {}
                  sku.attributes = item
                  sku.price = v
                  sku.name = name
                  if(productSkus.length == 0){
                    productSkus.push(sku)
                  }else{
                    let flag = true
                    for (let i = 0; i < productSkus.length; i++) {
                      if(equal(productSkus[i].attributes,sku.attributes)){
                        flag = false
                        productSkus[i] = assign({},productSkus[i],sku)
                        break
                      }
                    }
                    if(flag){
                      productSkus.push(sku)
                    }
                  }
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
                <InputNumber disabled={disabledSKUFromBundleEdit || productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={(productSku.quantity || productSku.quantity == 0)?productSku.quantity:''} min={0} step={1} style={{width:80}} onChange={(v)=>{
                  let sku = {}
                  sku.attributes = item
                  sku.quantity = v
                  sku.name = name
                  if(productSkus.length == 0){
                    productSkus.push(sku)
                  }else{
                    let flag = true
                    for (let i = 0; i < productSkus.length; i++) {
                      if(equal(productSkus[i].attributes,sku.attributes)){
                        flag = false
                        productSkus[i] = assign({},productSkus[i],sku)
                        break
                      }
                    }
                    if(flag){
                      productSkus.push(sku)
                    }
                  }
                  dispatch(productSkusChange(productSkus))
                }}/>
              </Col>
              <Col span="2">
                <InputNumber disabled={true} value={productSku.shippingFee?productSku.shippingFee:''} min={0}  style={{width:80}} onChange={(v)=>{
                  let sku = {}
                  sku.attributes = item
                  sku.shippingFee = v
                  sku.name = name
                  if(productSkus.length == 0){
                    productSkus.push(sku)
                  }else{
                    let flag = true
                    for (let i = 0; i < productSkus.length; i++) {
                      if(equal(productSkus[i].attributes,sku.attributes)){
                        flag = false
                        productSkus[i] = assign({},productSkus[i],sku)
                        break
                      }
                    }
                    if(flag){
                      productSkus.push(sku)
                    }
                  }
                  dispatch(productSkusChange(productSkus))
                }}/>
              </Col>

              {/* weight */}
              <Col span="2">
                <InputNumber disabled={disabledSKUFromBundleEdit || productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false}  value={productSku.weight?productSku.weight:''} min={0}  style={{width:80}} onChange={(v)=>{
                  let sku = {}
                  sku.attributes = item
                  sku.weight = v
                  sku.name = name
                  if(productSkus.length == 0){
                    productSkus.push(sku)
                  }else{
                    let flag = true
                    for (let i = 0; i < productSkus.length; i++) {
                      if(equal(productSkus[i].attributes,sku.attributes)){
                        flag = false
                        productSkus[i] = assign({},productSkus[i],sku)
                        break
                      }
                    }
                    if(flag){
                      productSkus.push(sku)
                    }
                  }
                  dispatch(productSkusChange(productSkus))
                }}/>
              </Col>

              {/* length */}
              <Col span="2">
                <InputNumber disabled={disabledSKUFromBundleEdit || productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.length?productSku.length:''} min={0} step={1} style={{width:80}} onChange={(v)=>{
                  let sku = {}
                  sku.attributes = item
                  sku.length = v
                  sku.name = name
                  if(productSkus.length == 0){
                    productSkus.push(sku)
                  }else{
                    let flag = true
                    for (let i = 0; i < productSkus.length; i++) {
                      if(equal(productSkus[i].attributes,sku.attributes)){
                        flag = false
                        productSkus[i] = assign({},productSkus[i],sku)
                        productSkus[i] = volumeJoin(productSkus[i])
                        break
                      }
                    }
                    if(flag){
                      productSkus.push(sku)
                    }
                  }
                  dispatch(productSkusChange(productSkus))
                }}/>
              </Col>

              {/* width */}
              <Col span="2">
                <InputNumber disabled={disabledSKUFromBundleEdit || productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.width?productSku.width:''} min={0} step={1} style={{width:80}} onChange={(v)=>{
                  let sku = {}
                  sku.attributes = item
                  sku.width = v
                  sku.name = name
                  if(productSkus.length == 0){
                    productSkus.push(sku)
                  }else{
                    let flag = true
                    for (let i = 0; i < productSkus.length; i++) {
                      if(equal(productSkus[i].attributes,sku.attributes)){
                        flag = false
                        productSkus[i] = assign({},productSkus[i],sku)
                        productSkus[i] = volumeJoin(productSkus[i])
                        break
                      }
                    }
                    if(flag){
                      productSkus.push(sku)
                    }
                  }
                  dispatch(productSkusChange(productSkus))
                }}/>
              </Col>

              {/* height */}
              <Col span="2">
                <InputNumber disabled={disabledSKUFromBundleEdit || productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.height?productSku.height:''} min={0} step={1} style={{width:80}} onChange={(v)=>{
                  let sku = {}
                  sku.attributes = item
                  sku.height = v
                  sku.name = name
                  if(productSkus.length == 0){
                    productSkus.push(sku)
                  }else{
                    let flag = true
                    for (let i = 0; i < productSkus.length; i++) {
                      if(equal(productSkus[i].attributes,sku.attributes)){
                        flag = false
                        productSkus[i] = assign({},productSkus[i],sku)
                        productSkus[i] = volumeJoin(productSkus[i])
                        break
                      }
                    }
                    if(flag){
                      productSkus.push(sku)
                    }
                  }
                  dispatch(productSkusChange(productSkus))
                }}/>
              </Col>
              <Col span="2">
                <Switch checked={disabledSKUFromBundleEdit || productSku.hasOwnProperty('isOnSale')?productSku.isOnSale:true} onChange={(v)=>{
                  let sku = {}
                  sku.attributes = item
                  sku.isOnSale = v
                  sku.name = name
                  if(productSkus.length == 0){
                    productSkus.push(sku)
                  }else{
                    let flag = true
                    for (let i = 0; i < productSkus.length; i++) {
                      if(equal(productSkus[i].attributes,sku.attributes)){
                        flag = false
                        productSkus[i] = assign({},productSkus[i],sku)
                        break
                      }
                    }
                    if(flag){
                      productSkus.push(sku)
                    }
                  }
                  dispatch(productSkusChange(productSkus))
                }} />
              </Col>
            </Row>)
        })
      }else{
        // 一键导入
        return productSkus.map((productSku,index)=>{
          return (<Row className='skuList' key={index}>
            <Col span="1">
              <p style={{lineHeight:'15px',marginTop:11}}>{productSku.name}</p>
            </Col>
            {/* sellerSkuId */}
            <Col span="2">
              <Input disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.sellerSkuId?productSku.sellerSkuId:''} min={0} style={{width:80}} onChange={(v)=>{
                productSkus[index].sellerSkuId = v.target.value
                dispatch(productSkusChange(productSkus))
              }}/>
            </Col>
            <Col span="2">
              <InputNumber disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.originalPrice?productSku.originalPrice:''} min={0}  style={{width:80}} onChange={(v)=>{
                productSkus[index].originalPrice = v
                dispatch(productSkusChange(productSkus))
              }}/>
            </Col>
            <Col span="2">
              <InputNumber disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.price?productSku.price:''} min={0}  style={{width:80}} onChange={(v)=>{
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
              <InputNumber dispatch={true} value={productSku.shippingFee?!productSku.shippingFee:''} min={0} style={{width:80}} onChange={(v)=>{
                productSkus[index].shippingFee = v
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
              <InputNumber disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.length?productSku.length:''} min={0} style={{width:80}} onChange={(v)=>{
                productSkus[index].length = v
                productSkus[index] = volumeJoin(productSkus[index])
                dispatch(productSkusChange(productSkus))
              }}/>
            </Col>
            <Col span="2">
              <InputNumber disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.width?productSku.width:''} min={0} style={{width:80}} onChange={(v)=>{
                productSkus[index].width = v
                productSkus[index] = volumeJoin(productSkus[index])
                dispatch(productSkusChange(productSkus))
              }}/>
            </Col>
            <Col span="2">
              <InputNumber disabled={productSku.hasOwnProperty('isOnSale')?!productSku.isOnSale:false} value={productSku.height?productSku.height:''} min={0} style={{width:80}} onChange={(v)=>{
                productSkus[index].height = v
                productSkus[index] = volumeJoin(productSkus[index])
                dispatch(productSkusChange(productSkus))
              }}/>
            </Col>
            <Col span="2">
              <Switch checked={productSku.hasOwnProperty('isOnSale')?productSku.isOnSale:false} onChange={(v)=>{
                productSkus[index].isOnSale = v
                dispatch(productSkusChange(productSkus))
              }} />
            </Col>
          </Row>)
        })
      }
    }

    const skuPicture = () => {
      let {
        skuProps
      } = productData
      if(skuProps.length>0){
        return skuProps.map((skuProp,i)=>{
          let pattern = /color|颜色/i
          if(pattern.test(skuProp.propName)){
            return skuProp.values.map((item,j)=>{
              let key = i.toString() + j.toString()
              return(<Row className='skuList' key={key}>
                <div span="24">
                  <label>{item.valueName}：</label>
                  <Upload name='file' accept='.jpg,.jpeg,.png,.gif' action={QINIU_UPLOAD_URL} data={{token}}
                    listType={'picture'} showUploadList={false} onChange={(info)=>{
                        if (info.file.status === 'done') {
                          success(`${info.file.name} ${getText('upload_success')}`)
                          skuProps[i].values[j].image = baseUrl+info.file.response.key
                          productData.skuProps = skuProps
                          dispatch(productChange(productData))
                        } else if (info.file.status === 'error') {
                          warn(`${info.file.name} ${getText('upload_fail')}。`)
                        }
                      }
                    } >
                    <Button type="ghost">
                      <Icon type="upload" /> {getText('click_to_upload')}
                    </Button>
                    <span>&nbsp;&nbsp;{getText('you_can_upload')}{item.image ? 1 : 0}/1{getText('picture')}&nbsp;</span>
                  </Upload>
                  {
                    item.image && (<section className='dragTarget' style={{marginTop:10}} >
                      <div className='dragItem'  style={{borderRadius:5}}>
                        <div className="foot">
                        </div>
                        <a href={item.image} target='_blank'><img src={item.image}  alt="ezbuy is the best"/></a>
                      </div>
                    </section>)
                  }
                </div>
              </Row>)
            })
          }else{
            return ''
          }
        })
      }
    }
    const countryUnit = {
      'CN': "￥",
      "SGLocal": "S$",
      "MYLocal": "RM",
      "US": "$",
      "KR": "₩"
    }
    const currentUnit = countryUnit[this.props.accountInfo.shop.originCode] || '￥';
    const isLocal = this.props.accountInfo.shop.originCode === 'SGLocal'
      || this.props.accountInfo.shop.originCode === 'MYLocal'
    const skuHead = () => {
      if(todo != 'edit' && todo != 'bundleEdit' && todo!= 'subEdit'){
        // 自主发布
        return <Row className='skuDetail'>
          <Col span="1">
            {getText('sku_name')}
          </Col>
          <Col span="2">
            <label>{getText('sku_id')}</label>
            <div></div>
            <Input disabled={true} style={{width:80}} onChange={((item)=>{
              skuToAll.sellerSkuId = item.target.value
              dispatch(changeSkuToAll(skuToAll))
            })} />
          </Col>
          <Col span="2">
            <label>{getText('origin_price')}({currentUnit}):</label>
            <div></div>
            <InputNumber min={0}  style={{width:80}} onChange={(v=>{
              skuToAll.originalPrice = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.originalPrice){
                  warn(getText('need_origin_price'))
                  return
                }
                for (let i = 0; i < attributeAry.length; i++) {
                  let flag = true
                  for (let j = 0; j < productSkus.length ; j++) {
                    if(equal(productSkus[j].attributes,attributeAry[i])){
                      flag = false
                      if(productSkus[j].isOnSale == false){
                        break
                      }
                      productSkus[j] = assign({},productSkus[j],{originalPrice:skuToAll.originalPrice})
                      break
                    }
                  }
                  if(flag){
                    let item = {}
                    item.attributes =  attributeAry[i]
                    item.originalPrice = skuToAll.originalPrice
                    productSkus.push(item)
                  }
                }
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>{getText('selling_price')}({currentUnit}):</label>
            <div></div>
            <InputNumber min={0}  style={{width:80}} onChange={(v=>{
              skuToAll.price = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.price){
                  warn(getText('need_selling_price'))
                  return
                }
                for (let i = 0; i < attributeAry.length; i++) {
                  let flag = true
                  for (let j = 0; j < productSkus.length ; j++) {
                    if(equal(productSkus[j].attributes,attributeAry[i])){
                      flag = false
                      if(productSkus[j].isOnSale == false){
                        break
                      }
                      productSkus[j] = assign({},productSkus[j],{price:skuToAll.price})
                      break
                    }
                  }
                  if(flag){
                    let item = {}
                    item.attributes =  attributeAry[i]
                    item.price = skuToAll.price
                    productSkus.push(item)
                  }
                }
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{ marginLeft: 5, cursor: 'pointer' }} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>{!productData.isStocked && isLocal ? `${getText('presale_stock')}` : `${getText('current_stock')}(${getText('unit')}):`}</label>
            <div></div>
            <InputNumber min={0} step={1} style={{width:80}} onChange={(v=>{
              skuToAll.quantity = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.quantity){
                  warn(getText('need_stock'))
                  return
                }
                for (let i = 0; i < attributeAry.length; i++) {
                  let flag = true
                  for (let j = 0; j < productSkus.length ; j++) {
                    if(equal(productSkus[j].attributes,attributeAry[i])){
                      flag = false
                      if(productSkus[j].isOnSale == false){
                        break
                      }
                      productSkus[j] = assign({},productSkus[j],{quantity:skuToAll.quantity})
                      dispatch(productSkusChange(productSkus))
                      break
                    }
                  }
                  if(flag){
                    let item = {}
                    item.attributes =  attributeAry[i]
                    item.quantity = skuToAll.quantity
                    productSkus.push(item)
                  }
                }
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>{getText('shipping_fee')}({currentUnit}):</label>
            <div></div>
            <InputNumber min={0} style={{width:80}} disabled onChange={(v=>{
              skuToAll.shippingFee = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.shippingFee){
                  warn(getText('need_shipping_fee'))
                  return
                }
                for (let i = 0; i < attributeAry.length; i++) {
                  let flag = true
                  for (let j = 0; j < productSkus.length; j++) {
                    if(equal(productSkus[j].attributes,attributeAry[i])){
                      flag = false
                      if(productSkus[j].isOnSale == false){
                        break
                      }
                      productSkus[j] = assign({},productSkus[j],{shippingFee:skuToAll.shippingFee})
                      dispatch(productSkusChange(productSkus))
                      break
                    }
                  }
                  if(flag){
                    let item = {}
                    item.attributes =  attributeAry[i]
                    item.shippingFee = skuToAll.shippingFee
                    productSkus.push(item)
                  }
                }
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>{getText('weight')}(kg):</label>
            <div></div>
            <InputNumber min={0} style={{width:80}} onChange={(v=>{
              skuToAll.weight = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.weight){
                  warn(getText('need_weight'))
                  return
                }
                for (let i = 0; i < attributeAry.length; i++) {
                  let flag = true
                  for (let j = 0; j < productSkus.length ; j++) {
                    if(equal(productSkus[j].attributes,attributeAry[i])){
                      flag = false
                      if(productSkus[j].isOnSale == false){
                        break
                      }
                      productSkus[j] = assign({},productSkus[j],{weight:skuToAll.weight})
                      dispatch(productSkusChange(productSkus))
                      break
                    }
                  }
                  if(flag){
                    let item = {}
                    item.attributes =  attributeAry[i]
                    item.weight = skuToAll.weight
                    productSkus.push(item)
                  }
                }
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>{getText('length')}(cm):</label>
            <div></div>
            <InputNumber min={0} step={1} style={{width:80}} onChange={(v=>{
              skuToAll.length = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.length){
                  warn(getText('need_length'))
                  return
                }
                for (let i = 0; i < attributeAry.length; i++) {
                  let flag = true
                  for (let j = 0; j < productSkus.length ; j++) {
                    if(equal(productSkus[j].attributes,attributeAry[i])){
                      flag = false
                      if(productSkus[j].isOnSale == false){
                        break
                      }
                      productSkus[j] = assign({},productSkus[j],{length:skuToAll.length})
                      break
                    }
                  }
                  if(flag){
                    let item = {}
                    item.attributes =  attributeAry[i]
                    item.length = skuToAll.length
                    productSkus.push(item)
                  }
                }
                productSkus = volumeOperate(productSkus,'join')
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>{getText('breath')}(cm):</label>
            <div></div>
            <InputNumber min={0} step={1} style={{width:80}} onChange={(v=>{
              skuToAll.width = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.width){
                  warn(getText('need_width'))
                  return
                }
                for (let i = 0; i < attributeAry.length; i++) {
                  let flag = true
                  for (let j = 0; j < productSkus.length ; j++) {
                    if(equal(productSkus[j].attributes,attributeAry[i])){
                      flag = false
                      if(productSkus[j].isOnSale == false){
                        break
                      }
                      productSkus[j] = assign({},productSkus[j],{width:skuToAll.width})
                      break
                    }
                  }
                  if(flag){
                    let item = {}
                    item.attributes =  attributeAry[i]
                    item.width = skuToAll.width
                    productSkus.push(item)
                  }
                }
                productSkus = volumeOperate(productSkus,'join')
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>{getText('height')}(cm):</label>
            <div></div>
            <InputNumber min={0} step={1} style={{width:80}} onChange={(v=>{
              skuToAll.height = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.height){
                  warn(getText('need_height'))
                  return
                }
                for (let i = 0; i < attributeAry.length; i++) {
                  let flag = true
                  for (let j = 0; j < productSkus.length ; j++) {
                    if(equal(productSkus[j].attributes,attributeAry[i])){
                      flag = false
                      if(productSkus[j].isOnSale == false){
                        break
                      }
                      productSkus[j] = assign({},productSkus[j],{height:skuToAll.height})
                      dispatch(productSkusChange(productSkus))
                      break
                    }
                  }
                  if(flag){
                    let item = {}
                    item.attributes =  attributeAry[i]
                    item.height = skuToAll.height
                    productSkus.push(item)
                  }
                }
                productSkus = volumeOperate(productSkus,'join')
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
        </Row>
      } else {
        // 一键导入 查看产品
        return <Row className='skuDetail'>
          <Col span="1">
            {getText('sku_name')}
          </Col>
          <Col span="2">
            <label>{getText('sku_id')}</label>
            <div></div>
            <Input disabled={true} style={{width:80}} onChange={((item)=>{
              skuToAll.sellerSkuId = item.target.value
              dispatch(changeSkuToAll(skuToAll))
            })} />
          </Col>
          <Col span="2">
            <label>{`${getText('origin_price')}(${getPriceSymbol(this.props.accountInfo.shop.originCode)}):`}</label>
            <div></div>
            <InputNumber min={0} style={{width:80}} onChange={(v=>{
              skuToAll.originalPrice = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.originalPrice){
                  warn(getText('need_origin_price'))
                  return
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
            <label>{`${getText('selling_price')}(${getPriceSymbol(this.props.accountInfo.shop.originCode)}):`}</label>
            <div></div>
            <InputNumber min={0} style={{width:80}} onChange={(v=>{
              skuToAll.price = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.price){
                  warn(getText('need_selling_price'))
                  return
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
            <label>{!productData.isStocked && isLocal ? `${getText('presale_stock')}` : `${getText('current_stock')}(${getText('unit')}):`}</label>
            <div></div>
            <InputNumber min={0} step={1} style={{width:80}} onChange={(v=>{
              skuToAll.quantity = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.quantity){
                  warn(getText('need_stock'))
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
            <label>{`${getText('shipping_fee')}(${getPriceSymbol(this.props.accountInfo.shop.originCode)}):`}</label>
            <div></div>
            <InputNumber min={0} style={{width:80}} disabled onChange={(v=>{
              skuToAll.shippingFee = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.shippingFee){
                  warn(getText('need_shipping_fee'))
                  return
                }
                for (let i = 0; i < productSkus.length; i++) {
                  if(productSkus[i].isOnSale != false){
                    productSkus[i].shippingFee = skuToAll.shippingFee
                  }
                }
                dispatch(productSkusChange(productSkus))
              }} type="setting" style={{marginLeft:5,cursor:'pointer'}} />
            </Tooltip>
          </Col>
          <Col span="2">
            <label>{getText('weight')}(kg):</label>
            <div></div>
            <InputNumber min={0} style={{width:80}} onChange={(v=>{
              skuToAll.weight = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.weight){
                  warn(getText('need_weight'))
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
            <label>{getText('length')}(cm):</label>
            <div></div>
            <InputNumber min={0} step={1} style={{width:80}} onChange={(v=>{
              skuToAll.length = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.length){
                  warn(getText('need_'))
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
            <label>{getText('breath')}(cm):</label>
            <div></div>
            <InputNumber min={0} step={1} style={{width:80}} onChange={(v=>{
              skuToAll.width = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.width){
                  warn(getText('need_width'))
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
            <label>{getText('height')}(cm):</label>
            <div></div>
            <InputNumber min={0} step={1} style={{width:80}} onChange={(v=>{
              skuToAll.height = v
              dispatch(changeSkuToAll(skuToAll))
            })} />
            <Tooltip title={getText('apply_to_all_skus')} placement="rightBottom">
              <Icon onClick={()=>{
                if(!skuToAll.height){
                  warn(getText('need_height'))
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
    }
    return (
      <section className='skus'>
        <p style={{fontWeight:'bold'}}>{getText('scroll_right')}</p>
        <section
          style={{ maxWidth: window.innerWidth - 235 - 20 - 130 - 100 }}
          className='skuScrollContainer'>
          <section className='skuScroll'>
            {skuHead()}
            {skuList()}
          </section>
        </section>
        <p className='addSkuImg'>{getText('add_sku_image')}<var>({getText('picture_ratio')})</var></p>
        {skuPicture()}
      </section>
    )
  }
}
export default Skus
