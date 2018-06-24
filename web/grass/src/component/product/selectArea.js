// !important 不要在这个页面以及其子页上尝试修改bug，我已经在这里浪费了数个月。如果时间允许，计划重构中。 -- Todd Mark

import * as React from 'react'
import { redirect } from '../../util/history'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import { warn, success} from '../../util/antd'
import {insertSort,getDomain} from '../../util/kit'
import { message, BackTop, Tooltip, Alert, Breadcrumb, Form, Select, Button,Radio, Input, Icon, Checkbox, InputNumber, Table, Upload, Switch, Row, Col} from 'antd'
import Config from '../../config'
import { getToken } from '../../api/other'
import Skus from './skus'
// ediotr
// import Trumbowyg from '../common/editor'
import {
  volumeOperate,
  volumeJoin,
  getAttributeAry,
  filterSkus,
} from '../skit.js'
import { equal } from '../../util/kit'
import { QINIU_UPLOAD_URL } from '../../constant/index'
import { locale } from '../../config/locale'
import {
  COUNTRY_CODE_MAP,
  SHIPMENT_INFO
} from '../../constant'
import './selectArea.scss'
import {
  getCategoryPathValueOptions,
  getValueOptions,
  productChange,
  productUpdate,
  userUnCommitedProductUpdate,
  productSelected,
  productSkusChange,
  productGet,
  bundleProductGet,
  userImportSubTaskProductUpdate,
  userImportSubTaskProductDetail,
  getCategory,
  changeCategory,
  changeSkuPictures,
} from '../../action/productManage'
import {changeMenu} from '../../action/common'
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const assign = Object.assign
const ButtonGroup = Button.Group

@connect(state => ({
  accountInfo: state.common.accountInfo,
  category:state.productManage.category,
  valueOptions: state.productManage.valueOptions,
  categoryTree: state.productManage.categoryTree,
  productData: state.productManage.productData,
  skuSelected: state.productManage.skuSelected,
  productSkus: state.productManage.productSkus,
  skuPictures: state.productManage.skuPictures,
  skuToAll: state.productManage.skuToAll,
  skuSwitch: state.productManage.skuSwitch,
  colorKey: state.productManage.colorKey,
  isReplaceCategory:state.productManage.isReplaceCategory,
}))
class SelectArea extends React.Component{
  constructor(props){
    super(props)
    this.state={
      baseUrl: '',
      token: '',
      isSingleProduct:false,
      sourceIndex:-1,
      singleProductSku:{
        skuId:0,
        name:'single',
        isOnSale:true,
        shipmentInfo:1,
        volume: {},
        attributes:{},
        sellType:1,
        url:'',
      },
      selfDefine:{},
      tempInputValue:'',
      pressedSubmit:false,
      pressedSave:false,
      showImportHTML: false
    }
  }
  componentDidMount(){
    const uploadInside = document.querySelector('#quillUpload')
    uploadInside.addEventListener('click', function(){
      const uploadOutside = document.querySelector('.quill-upload-external')
      uploadOutside.click()
    })
    // const isCN = this.props.accountInfo.shop.originCode === 'CN'
    // if (!isCN) document.querySelector('#quillUpload span').innerHTML = 'Click To Upload'
   const {
      categoryTree
    } = this.props
    const {
      todo
    } = this.props.location.query
    // 下面的逻辑实现了，如果参数不在if条件中，那么要跳转当前页面，去category，只是为何用location跳转，我也觉得奇怪
    if(todo!='edit' && todo!='subEdit' && todo != 'bundleEdit'){
      let categoryPath = []
      for (let i = 0; i < 4; i++) {
        if(categoryTree[i].selected != -1){
          for (let j = 0; j < categoryTree[i].all.length; j++) {
            if(categoryTree[i].all[j].cid == categoryTree[i].selected){
              categoryPath.push(categoryTree[i].all[j])
            }
          }
        }
      }
      if(categoryPath.length == 0){
        location.hash = 'category'
      }
    }
  }
  componentWillMount(){
    this.__ = locale(this.props.accountInfo.shop.originCode)

    getToken((info)=>{
      this.setState({
        baseUrl: info.baseUrl,
        token: info.token
      })
    })
    const {
      dispatch,
      categoryTree,
      valueOptions,
      isReplaceCategory,
    } = this.props
    let {
      productData
    } = this.props
    const {
      todo,
      pid,
      categoryId
    } = this.props.location.query
    //选择类目进来不应带任何属性
    dispatch(getValueOptions(Number(categoryId)))
    // 一键导入 = 2
    const isImport = productData.source == 2 ? true : false
    if(todo !='edit' && todo != 'subEdit' && todo != 'bundleEdit'){
      let categoryPath = []
      let categoryId = 0
      for (let i = 0; i < 4; i++) {
        if(categoryTree[i].selected != -1){
          categoryId = categoryTree[i].selected
          for (let j = 0; j < categoryTree[i].all.length; j++) {
            if(categoryTree[i].all[j].cid == categoryTree[i].selected){
              dispatch(productChange({categoryId:categoryTree[i].all[j].cid}))
              categoryPath.push(categoryTree[i].all[j])
            }
          }
        }
      }
      dispatch(productChange({categoryId}))
      //回调添加固有属性，方便后端查询
      dispatch(getCategoryPathValueOptions(categoryPath))

     const data = {
        pid: 0,
        name:'',
        enName:'',
        description: '',
        isOnSale: true,
        isStocked: true,
        attributes: {},
        saleRegion:['MY','SG','AU','ID','TH'],
        originCode:'CN',
        shipmentInfo: 1,
        images:[],
        sellType:1,
        url:'',
        skuProps:[]
      }
      const clearSelected = []
      dispatch(productSelected(clearSelected))
      if(!isReplaceCategory){
        dispatch(productChange(data))
        dispatch(productSkusChange([]))
      }else{
        dispatch(productChange({skuProps:[]}))
        dispatch(changeCategory(false))
      }
    }else if(todo == 'edit' || todo == 'bundleEdit'){
      const self = this
      function callback(base, skus) {
        let newSelected = []
        let skuProps = base.skuProps
        if(skuProps.length>0){
          for (let i = 0; i < skuProps.length; i++) {
            let temp = {}
            temp[skuProps[i].propName] = skuProps[i].values.map((item)=>(item.valueName))
            newSelected.push(temp)
          }
          dispatch(productSelected(newSelected))
        }else{
          if(skus.length == 1 && skus[0].name == 'single'){
            self.setState({
              isSingleProduct:true,
              singleProductSku:skus[0]
            })
          }
        }
      }
      dispatch(getCategory(Number(categoryId)))
      if (todo === 'bundleEdit') {
        dispatch(bundleProductGet(Number(pid),callback))
      } else {
        dispatch(productGet(Number(pid),callback))
      }
    }else if(todo == 'subEdit'){
      const {
        subTaskId = ''
      } = this.props.location.query
      dispatch(userImportSubTaskProductDetail(subTaskId,(data)=>{
        let skus = data.skus
        dispatch(productChange(data.base))
        dispatch(getCategory(Number(data.base.categoryId)))
        if(skus.length == 1 && skus[0].name == 'single'){
          this.setState({
            isSingleProduct:true,
            singleProductSku:skus[0]
          })
        }else{
          dispatch(productSkusChange(skus))
        }
      }))
    }
  }

  componentWillUnmount() {
    // 这就是过渡使用redux的后果，害得我还要重置state里面的某些数据
    const { dispatch } = this.props;
    dispatch(productSelected([]));
  }

  verifiData(data){
    const getText = this.__

    const keys = [{
      key:'name',
      label: getText('name_of_product')
    },{
      key: 'description',
      label: getText('description_of_product')
    },{
      key:'images',
      label: getText('image_of_product')
    }]
    let flag = true
    for (let i = 0; i < keys.length; i++) {
      if(!data[keys[i].key] || data[keys[i].key].length == 0){
        flag = false
        warn(`${keys[i].label}${getText(' is_necessary')}`)
        break
      }
    }
    return flag
  }
  verifiSkus(skus){
    const getText = this.__
    if(skus.length == 0){
      warn(getText('please_input_sku_data'))
      return
    }
    const {
      todo
    } = this.props.location.query
    let flag = false
    let weightFlag = false
    let attributeAry = getAttributeAry(this.props.skuSelected)
    for (let i = 0; i < skus.length; i++) {
    // strangeresult 是后来维护新加的，没有改逻辑，只是把这一条三目抽出来便于理解，然而，我还是看不懂
    let strangeResult = (
      todo === 'subEdit' || this.props.productData.source == 2 || skus[0].name === 'single'
      ) ?
      true :
      !!attributeAry.find(attr => equal(attr, skus[i].attributes))
      if(strangeResult ){
        if (skus[i].isOnSale) {
          if(!skus[i].price){
            warn(`${getText('sku_not_complete')}(${getText('selling_price')})`)
            return false
          }
          if(!skus[i].originalPrice){
            warn(`${getText('sku_not_complete')}(${getText('origin_price')})`)
            return false
          }
          if (skus[i].originalPrice < skus[i].price) {
            warn(getText('Retail price must ≥ seling price'))
            return false
          }
          if(skus[i].quantity){
            flag = true
          }
          if(!skus[i].weight){
            warn(`${getText('sku_not_complete')}(${getText('weight')})`)
            return false
          }
          if(skus[i].weight>100){
            weightFlag =  true
          }
          if (
            skus[i].volume.height !== undefined && skus[i].volume.height % 1 !== 0 ||
            skus[i].volume.width !== undefined && skus[i].volume.width % 1 !== 0 ||
            skus[i].volume.length !== undefined && skus[i].volume.length % 1 !== 0
          ) {
            warn(getText('Products length width and height must be integer'))
            return false
          }
        }
      }
    }
    if(!flag && todo !== 'bundleEdit'){
      if(skus.length==1&&skus[0].name == 'single'){
        warn(getText('stock_cannot_be_zero'))
      }else{
        warn(getText('at_least_one_stock_not_zero'))
      }
      return false
    }
    if(weightFlag){
      return confirm(getText('weight_more_than_hundred'))
    }
    return true
  }
  trumbowygOnchange(content) {
    const {dispatch} = this.props
    dispatch(productChange({description: content}))
  }
  render(){
    const {
      categoryTree,
      valueOptions,
      accountInfo,
      skuSelected,
      dispatch,
      skuPictures,
      skuToAll,
      skuSwitch,
      colorKey,
      productData,
      category
    } = this.props
    const {
      token,
      baseUrl,
      isSingleProduct,
      sourceIndex,
      urlToPrimary,
      pressedSubmit,
      pressedSave,
    } = this.state
    let {singleProductSku,selfDefine,tempInputValue} = this.state
    let {productSkus} = this.props
    const {
      todo
    } = this.props.location.query

    const isCN = this.props.accountInfo.shop.originCode === 'CN'
    const isLocal = accountInfo.shop.originCode === 'SGLocal'
      || accountInfo.shop.originCode === 'MYLocal'
    const getText = this.__

    const {
      pid,
      categoryId,
      name,
      enName,
      description,
      isOnSale,
      attributes,
      saleRegion = [],
      originCode,
      price,
      quantity,
      weight,
      shipmentInfo,
      images = []
    } = this.props.productData
    let {skuProps} = this.props.productData
    const propsToImages = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: {token: token},
      accept:'.jpg,.jpeg,.png,.gif',
      listType: 'picture',
      multiple: true,
      showUploadList:false,
      beforeUpload: () => {
        let {images} = this.props.productData
        if(images.length>4){
          warn(getText('at_most_five_image'))
          return false
        }
      },
      onChange: (info) => {
        let {images} = this.props.productData
        if (images.length > 4) {
          warn(getText('have_uploaded_five_images'))
          return false
        }
        if (info.file.status === 'done') {
          // success(`${info.file.name} 上传成功。`)
          images.push(baseUrl+info.file.response.key)
          dispatch(productChange({images}))
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} ${getText('upload_fail')}`)
        }
      }
    }
    const propsToEditor = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: {token: token},
      accept:'.jpg,.jpeg,.png,.gif',
      listType: 'picture',
      onChange: (info) => {
         if (info.file.status === 'done') {
          success(`${info.file.name} ${getText('upload_success')}`)
          const tmpImgUrl = baseUrl+info.file.response.key
          const editorInput = document.querySelector('#editorInput')
          editorInput.value = tmpImgUrl
          let inputChange = document.createEvent('HTMLEvents')
          inputChange.initEvent( 'input', true, true)
          editorInput.dispatchEvent(inputChange)
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} ${getText('upload_fail')}`)
        }
      }
    }
    let imagesList = images.map((item,index)=>{
      if(index == 0){
        return <section key={index} className='dragTarget' onDrop={()=>{
          let {images} = this.props.productData
          images = insertSort(images,sourceIndex,index)
          dispatch(productChange({images}))
        }} onDragOver={(e)=>e.preventDefault()}>
          <div className='dragItem' draggable="true" onDragStart={()=>this.setState({sourceIndex:index})} style={{borderRadius:5}}>
            <div className="head">{getText('main_image')}</div>
            <div className="foot">
              <Button size='small' onClick={()=>{
                let {images} = this.props.productData
                images.splice(index,1)
                dispatch(productChange({images}))
              }} style={{marginRight:5}}>{getText('delete')}</Button>
              <Button size='small' onClick={()=>{
                window.open(item)
              }}>{getText('check_origin_picture')}</Button>
            </div>
            <img src={item} alt="ezbuy is the best"/>
          </div>
        </section>
      } else {
        return <section key={index} className='dragTarget' onDrop={()=>{
          let {images} = this.props.productData
          images = insertSort(images,sourceIndex,index)
          dispatch(productChange({images}))
        }} onDragOver={(e)=>e.preventDefault()}>
          <div className='dragItem' draggable="true" onDragStart={()=>this.setState({sourceIndex:index})} style={{borderRadius:5}}>
            <div className="foot">
              <Button size='small' onClick={()=>{
                let {images} = this.props.productData
                images.splice(index,1)
                dispatch(productChange({images}))
              }} style={{marginRight:5}}>{getText('delete')}</Button>
              <Button size='small' onClick={()=>{
                window.open(item)
              }}>{getText('check_origin_picture')}</Button>
            </div>
            <img src={item} alt="ezbuy is the best"/>
          </div>
        </section>
      }
    })
    let breadcrumb = []
    for (let key in categoryTree) {
      if(categoryTree[key].selected != -1){
        categoryTree[key].all.map((item) =>{
          if(item.cid == categoryTree[key].selected){
            breadcrumb.push(
              <Breadcrumb.Item key={key}>{isCN ? item.translation.CN : item.name}</Breadcrumb.Item>
            )
          }
        })
      }
    }
    const naviState = () =>{
      switch (todo){
        case 'subEdit':
          // return <span>{getText('edit_additional_data')}</span>
        case 'edit':
        case 'bundleEdit':
          if(category.breadcrumb){
            return category.breadcrumb.map((item,key)=>(<Breadcrumb.Item key={key}>{isCN ? item.translation.CN : item.name}</Breadcrumb.Item>))
          }else{
            return breadcrumb
          }
        default:
          return breadcrumb
      }
    }
    const contries = []
    for (let i = 0; i < saleRegion.length; i++) {
      if(saleRegion[i]){
        contries.push(COUNTRY_CODE_MAP[saleRegion[i]])
      }
    }
    const multi = ()=>{
      if(todo!='subEdit' && !isSingleProduct && productData.source !== 2){
        //恶心的逻辑，用来处理自定义sku -- 张雁峰
        let skuData = valueOptions.multi
        for (let i = 0; i < skuProps.length; i++) {
          /*
            @pname: 当前sku属性的分类名
            @vnames: 该sku属性下的枚举
          */
          let pname = skuProps[i].propName
          let vnames = skuProps[i].values
          // @skuData eg: {pname: 'color name', pvs: [], translation: object}
          for(let j = 0; j < skuData.length; j++){
            if(skuData[j].pname == pname){
              for(let l = 0; l < vnames.length;l++){
                let flag = false
                for(let m = 0; m < skuData[j].pvs.length;m++){
                  if(vnames[l].valueName==skuData[j].pvs[m].vname){
                    flag = true
                    break
                  }
                }
                if(!flag){
                  // 如果sku属性不在GetCategoryValueOptions里面，那么就属于自定义
                  skuData[j].pvs.push({
                    vname:vnames[l].valueName
                  })
                }
              }
            }
          }
        }
        // 这里处理用于显示的在checkbox中的文本和值
        return skuData.map((item,index)=>{
          // 下面这行用于支持多语言情况下，显示和存取时，处理sku属性的情况，默认显示当前语言的名称，如果没有，则显示vname，具体如下三目：
          let vnames = item.pvs.map(text => {
            if (!text.translation) {
              text.translation = {}
            }
            return {label: text.translation[accountInfo.shop.originCode] ? text.translation[accountInfo.shop.originCode] : text.vname, value: text.vname}
          })
          if(selfDefine[item.pname]){
            vnames = vnames.concat(selfDefine[item.pname])
          }

          let vnamesChecked = []
          for (let i = 0; i < skuProps.length; i++) {
            // 这里需要判断国家的原因，是因为sku props显示的时候，使用了多语言版本，这个是产品的锅。
            // const whichCountry = accountInfo.shop.originCode;
            // let transPropName = (whichCountry === 'CN') ? item.translation.CN : item.pname;
            if(skuProps[i].propName == item.pname){
              for(let j = 0; j < skuProps[i].values.length; j++){
                vnamesChecked.push(skuProps[i].values[j].valueName)
              }
            }
          }
          if(vnames.length>0){
            return(
              <tr key={index+'multi'}>
                <td>{item.translation[accountInfo.shop.originCode] ? item.translation[accountInfo.shop.originCode] : item.pname}:</td>
                <td>
                  <CheckboxGroup options={vnames} value={vnamesChecked} onChange={(v)=>{
                      let newAray = skuSelected
                      newAray[index] = {}
                      newAray[index][item.pname] = v
                      dispatch(productSelected(newAray))
                      let skuProp = {}
                      skuProp.propId = 0
                      skuProp.propName = item.pname
                      let skuPropTarget
                      for (let i = 0; i < skuProps.length; i++) {
                        if(skuProps[i].propName == item.pname){
                          skuPropTarget = skuProps[i]
                        }
                      }
                      skuProp.values = v.map((item)=>{
                        if(skuPropTarget != undefined){
                          let index
                          for (let i = 0; i < skuPropTarget.values.length; i++) {
                            if(skuPropTarget.values[i].valueName == item){
                              index = i
                              break
                            }
                          }
                          if(index!=undefined){
                            return skuPropTarget.values[index]
                          }else{
                            return {
                              valueId:0,
                              valueName:item,
                              image:''
                            }
                          }
                        }else{
                          return {
                            valueId:0,
                            valueName:item,
                            image:''
                          }
                        }
                      })
                      if(skuProps.length == 0){
                        skuProps.push(skuProp)
                      }else{
                        let flag = true
                        for (let i = 0; i < skuProps.length; i++) {
                          if(skuProps[i].propName == item.pname){
                            flag = false
                            skuProps[i] = skuProp
                          }
                        }
                        if(flag){
                          skuProps.push(skuProp)
                        }
                      }
                      dispatch(productChange({skuProps}))

                      let isAddSku = false, newSkuIndex = 0
                      skuProp.values.forEach((sp, index) => {
                        if (!productSkus.find(oneSku => oneSku.attributes[skuProp.propName] === sp.valueName)) {
                          isAddSku = true
                          newSkuIndex = index
                        }
                      })
                      if (isAddSku) {
                        let attributes = {}
                        attributes[skuProp.propName] = skuProp.values[newSkuIndex].valueName
                        productSkus.push({
                          name: skuProp.values[newSkuIndex].valueName,
                          attributes
                        })
                        dispatch(productSkusChange(productSkus))
                      }
                  }} />
                  <br/>
                  <div>
                    <Input onChange={(e)=>{
                      this.setState({tempInputValue:e.target.value})
                    }} style={{width:100,marginRight:10}}/><Button onClick={()=>{
                      if(tempInputValue){
                        if(selfDefine[item.pname]){
                          selfDefine[item.pname].push({label: tempInputValue, value: tempInputValue})
                        }else{
                          selfDefine[item.pname] = [{label: tempInputValue, value: tempInputValue}]
                        }
                        this.setState({selfDefine})
                        success(getText('add_success'))
                      }
                    }}>{getText('user_define')}</Button>
                  </div>
                </td>
              </tr>
            )
          }
        })
      }
    }
  const countryUnit = {
    'CN': '￥',
    'SGLocal': 'S$',
    'MYLocal': 'RM',
    'US': '$',
    'KR': '₩'
  }
  const currentUnit = countryUnit[accountInfo.shop.originCode] || '￥'
  const isChinese = accountInfo.shop.originCode === 'CN' ? true : false
  return(
    <section className="infoArea">
      <div>
        {/*{(breadcrumb.length === 0 && category.breadcrumb === undefined) && (
          <Alert style={{marginBottom: 15}} message="请选择类目" type="error" />
        )}*/}
        <Breadcrumb>
          <b>{getText('current_chosen')}：</b>
          {naviState()}
          <Button
            style={{marginLeft:10}}
            size='small'
            type='primary'
            onClick={()=>{
              dispatch(changeCategory(true))
              redirect('/category')
          }}>{getText('edit_category')}</Button>
        </Breadcrumb>
      </div>
      <h4>1.{getText('product_summary')}</h4>
      <div className="struct">
        <table>
          <tbody>
            <tr>
              {isChinese ? (
                <td><i>*</i>{getText('product_chinese_name')}</td>
              ) : (
                <td><i>*</i>{getText('Product Name')}</td>
              )}
              <td><Input style={{width: 650}} value = {name}
                onChange={(e)=>dispatch(productChange({name:e.target.value}))}/>
              </td>
            </tr>
            <tr>
              <td></td>
              {isChinese ? (
                <td style={{color:'#999'}}>{getText('chinese_title_hint')}</td>
              ) : (
                <td style={{color:'#999'}}>{getText('english_title_hint')}</td>
              )}
            </tr>
            {isChinese && (
              <tr>
                <td>{getText('product_english_name')}</td>
                <td><Input style={{width: 650}} value = {enName}
                  onChange={(e)=>dispatch(productChange({enName:e.target.value}))}/>
                </td>
              </tr>
            )}
            {isChinese &&(
              <tr>
                <td></td>
                <td style={{color:'#999'}}>{getText('english_title_hint')}</td>
              </tr>
            )}
            <tr>
              <td><i>*</i>{getText('product_picture')}</td>
              <td>
                <Upload {...propsToImages} listType={'text'}  >
                  <Button type="ghost">
                    <Icon type="upload" /> {getText('click_to_upload')}
                  </Button>
                  <span>&nbsp;&nbsp;{getText('you_can_upload')}{imagesList.length}/5{getText('picture')}&nbsp;</span>
                </Upload>
                {
                  imagesList.length>1 && (<div style={{marginTop:10}}><Alert message={getText('drag_to_order')} type='info' /></div>)
                }
                <div className='dragContent'>
                  {imagesList}
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td style={{color:'#999'}}>
                <div style={{ maxWidth: 800 }}>
                  {getText('picture_quality')}
                </div>
                <var>({getText('picture_ratio')})</var>
              </td>
            </tr>
            {/*
            <tr>
              <td><i>*</i>国家（和货币价格计算相关）：</td>
              <td>
                <Select defaultValue={"中国"} value={COUNTRY_CODE_MAP[originCode]} style={{ width: 100 }} onChange={(v)=>dispatch(productChange({originCode:v}))} >
                  <Option key={1} value={'CN'}>中国</Option>
                  <Option key={2} value={'TW'}>台湾</Option>
                  <Option key={3} value={'US'}>美国</Option>
                  <Option key={4} value={'MYLocal'}>马来本地</Option>
                  <Option key={5} value={'SGLocal'}>新加坡本地</Option>
                </Select>
              </td>
            </tr>
            */}
            {
              isLocal &&
                <tr>
                  <td><i>*</i>
                    <span>{getText('is_presale')}？</span>
                  </td>
                  <td>
                    <Switch checked={!productData.isStocked} onChange={v => dispatch(productChange({ isStocked: !v }))} />
                  </td>
                </tr>
            }
            <tr>
              <td><i>*</i><Tooltip title={getText('activate_hotkey')}>
                <a>{getText('is_single')}</a>
              </Tooltip></td>
              <td>
                <Switch checked={isSingleProduct} onChange={(v)=>this.setState({isSingleProduct:v})} />
              </td>
            </tr>
            <tr>
              <td><i>*</i><Tooltip title="">
                <a>{getText('is_sensitive')}</a>
              </Tooltip></td>
              <td>
                <Switch checked={shipmentInfo == 2} onChange={(v)=>{
                  if(v){
                    dispatch(productChange({shipmentInfo:2}))
                  }else{
                    dispatch(productChange({shipmentInfo:1}))
                  }
                }} />
              </td>
            </tr>
            {
              !isSingleProduct&&(<tr>
                <td>{getText('product_spicifications')}：</td>
                <td>
                  <div className="props" style={{borderBottom:'none',paddingBottom:'5px'}}>
                    <table className="property">
                      <tbody>
                        {multi()}
                      </tbody>
                    </table>
                  </div>
                  <Skus todo = {todo} accountInfo = {accountInfo} />
                </td>
              </tr>)
            }
            {
              isSingleProduct&&(<tr>
                <td><i>*</i>{getText('single_product')}：</td>
                <td>
                  <Row style={{width:1000}}>
                    <Col span="3">
                      <label style={{width: 56, display: 'block'}}>{getText('sku_id')}：</label>
                      <Input value={singleProductSku.hasOwnProperty('sellerSkuId')?singleProductSku.sellerSkuId:''} min={0} style={{width:80}} onChange={(v)=>{
                        singleProductSku.sellerSkuId = v.target.value
                        this.setState({singleProductSku})
                      }}/>
                    </Col>
                    <Col span="3">
                      <label>{getText('origin_price')}({currentUnit})：</label>
                      <InputNumber value={singleProductSku.hasOwnProperty('originalPrice')?singleProductSku.originalPrice:''} min={0} style={{width:80}} onChange={(v)=>{
                        singleProductSku.originalPrice = v
                        this.setState({singleProductSku})
                      }}/>
                    </Col>
                    <Col span="3">
                      <label>{getText('selling_price')}({currentUnit})：</label>
                      <InputNumber value={singleProductSku.hasOwnProperty('price')?singleProductSku.price:''} min={0} style={{width:80}} onChange={(v)=>{
                        singleProductSku.price = v
                        this.setState({singleProductSku})
                      }}/>
                      {
                        typeof(singleProductSku.price/singleProductSku.originalPrice) === 'number' &&
                        !isNaN(singleProductSku.price/singleProductSku.originalPrice) &&
                        singleProductSku.price/singleProductSku.originalPrice !== Infinity &&
                        (<span>
                          {(singleProductSku.price*10/singleProductSku.originalPrice).toFixed(1)}折
                        </span>)
                      }
                    </Col>
                    <Col span="3">
                      <label>
                        {!productData.isStocked && isLocal ? `${getText('presale_stock')}` : `${getText('current_stock')}(${getText('unit')}):`}
                      </label>
                      <InputNumber value={singleProductSku.hasOwnProperty('quantity')?singleProductSku.quantity:''} min={0} step={1} style={{width:80}} onChange={(v)=>{
                        singleProductSku.quantity = v
                        this.setState({singleProductSku})
                      }}/>
                    </Col>
                    <Col span="3">
                      <label>{getText('shipping_fee')}({currentUnit})：</label>
                      <InputNumber value={singleProductSku.hasOwnProperty('shippingFee')?singleProductSku.shippingFee:''} min={0} disabled style={{width:80}} onChange={(v)=>{
                        singleProductSku.shippingFee = v
                        this.setState({singleProductSku})
                      }}/>
                    </Col>
                    <Col span="3">
                      <label>{getText('weight')}(kg)：</label>
                      <InputNumber value={singleProductSku.hasOwnProperty('weight')?singleProductSku.weight:''} min={0} style={{width:80}} onChange={(v)=>{
                        singleProductSku.weight = v
                        this.setState({singleProductSku})
                      }}/>
                    </Col>
                    <Col span="3">
                      <label>{getText('length')}(cm)：</label>
                      <InputNumber value={singleProductSku.hasOwnProperty('volume')?singleProductSku.volume.length:''} min={0} style={{width:80}} onChange={(v)=>{
                        singleProductSku.volume.length = v
                        this.setState({ singleProductSku })
                      }}/>
                    </Col>
                    <Col span="3">
                      <label>{getText('breath')}(cm)：</label>
                      <InputNumber value={singleProductSku.hasOwnProperty('volume')?singleProductSku.volume.width:''} min={0} style={{width:80}} onChange={(v)=>{
                        singleProductSku.volume.width = v
                        this.setState({ singleProductSku })
                      }}/>
                    </Col>
                    <Col span="3">
                      <label>{getText('height')}(cm)：</label>
                      <InputNumber value={singleProductSku.hasOwnProperty('volume')?singleProductSku.volume.height:''} min={0} style={{width:80}} onChange={(v)=>{
                        singleProductSku.volume.height = v
                        this.setState({ singleProductSku })
                      }}/>
                    </Col>
                  </Row>
                </td>
              </tr>)
            }
            <tr>
              <td><i>*</i>{getText('product_detail')}</td>
              <td>
                <section className='quilEditor'>
                  {/*<div className="masker" style={this.state.showImportHTML ? {display: 'block'} : { display: 'none'}}>
                    <Alert message="注意，请不在标签外修改代码，为了安全起见，标签外的内容，编辑器会自动包含在div标签中!" type="error"/>
                    <Alert message="目前支持的标签有：'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img', 'div','h1', 'h2', 'span'" type="info" closable />
                    <Input type="textarea" style={{width: '100%', height: '75%'}} value={description} onChange={(e)=> {
                      dispatch(productChange({description: e.target.value}))
                    }} />
                  </div>*/}
                  <ReactQuill theme='snow' value={description} onChange={(v)=>{
                    const pattern = /<img.*base64.*alt="">/i
                    let value = v.replace(pattern,'')
                    dispatch(productChange({description:value}))
                  }}/>
                  {/*<Trumbowyg
                    dataHtml = {description}
                    uploadImage={propsToEditor}
                    onChange={(e)=> { this.trumbowygOnchange(e) }} />*/}
                  {/*<ButtonGroup className="button-group">
                    <Button type={this.state.showImportHTML ? '' : 'primary'} onClick={()=> {
                      this.setState({
                        showImportHTML: !this.state.showImportHTML
                      })
                    }}>文本</Button>
                    <Button type={this.state.showImportHTML ? 'primary' : ''} onClick={() => {
                      this.setState({
                        showImportHTML: !this.state.showImportHTML
                      })
                    }}>代码</Button>
                  </ButtonGroup>*/}
                </section>
              </td>
            </tr>
             <tr style={{display: 'none'}}>
              <td><span>编辑器图片上传</span></td>
              <td>
                <Upload {...propsToEditor} >
                  <Button className="ant-upload-text">
                    <Icon type="upload" className='quill-upload-external'/>
                    {getText('upload_image')}
                  </Button>
                </Upload>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    <div className="submit">
      <div className="buttons">
      {/*{
        todo != 'subEdit' && (
          // edit or bundleEdit
          <Button type='primary' disabled={pressedSave} style={{marginRight:15,display:'none'}}
          onClick={()=>{
            if(isSingleProduct){
              singleProductSku.skuId = 0
              singleProductSku.name = 'single'
              singleProductSku.isOnSale = true
              singleProductSku.shipmentInfo = 1
              singleProductSku.attributes = {}
              singleProductSku.sellType = 1
              singleProductSku.url = ''
              singleProductSku = volumeJoin(singleProductSku)
              productData.skuProps = []
              productSkus = [singleProductSku]
            }
            if(!isSingleProduct){
              let attributeAry = getAttributeAry(skuSelected)
              if(attributeAry.length>productSkus.length){
                warn(getText('sku_not_complete'))
                return
              }else if(attributeAry.length < productSkus.length){
                productSkus = filterSkus(attributeAry,productSkus)
              }
        }
            for (let i = 0; i < productSkus.length; i++) {
              if(!productSkus[i].hasOwnProperty('isOnSale')){
                productSkus[i].isOnSale = true
              }
            }
            if(!this.verifiData(productData)){
              return
            }
            if(!this.verifiSkus(productSkus)){
              return
            }
            this.setState({pressedSave:true})
            switch(todo){
              case 'edit':
                dispatch(productUpdate(productData,productSkus,(productDetail)=>{
                  this.setState({pressedSave:false})
                  redirect('/arrangeProduct')
                  const pattern = /id=(\d*)/i
                  window.open(getDomain()+'/product/'+pattern.exec(productDetail.base.url)[1]+'.html', '_blank', 'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes')
                }))
                break
              case 'bundleEdit':
                dispatch(userUnCommitedProductUpdate(productData,productSkus,(productDetail)=>{
                  this.setState({pressedSave:false})
                  redirect('/arrangeProduct')
                  const pattern = /id=(\d*)/i
                  window.open(getDomain()+'/product/'+pattern.exec(productDetail.base.url)[1]+'.html', '_blank', 'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes')
                }))
              case 'subEdit':
                const {
                  subTaskId = ''
                } = this.props.location.query
                dispatch(userImportSubTaskProductUpdate(subTaskId,productData,productSkus,()=>{
                  this.setState({pressedSave:false})
                  redirect('/arrangeProduc')
                }))
                break
              default :
                dispatch(productUpdate(productData,productSkus,(productDetail)=>{
                  this.setState({pressedSave:false})
                  const pattern = /id=(\d*)/i
                  window.open(getDomain()+'/product/'+pattern.exec(productDetail.base.url)[1]+'.html', '_blank', 'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes')
                }))
                break
            }

          }} >{getText('save_and_preview')}</Button>
        )
      }*/}
        <Button type='primary' disabled={pressedSubmit} style={{marginRight:15}}
          onClick={()=>{
            if(isSingleProduct){
              productData.skuProps = []
              productSkus = [singleProductSku]
              // 对单品sku部分信息做非空限制
              if(!this.verifiData(productData)){
                return
              }
              if (!this.verifiSkus(productSkus)) {
                return
              }
            }
            for (let i = 0; i < productSkus.length; i++) {
              if(!productSkus[i].hasOwnProperty('isOnSale')){
                productSkus[i].isOnSale = true
              }
            }
            if(!isSingleProduct){
              productSkus = volumeOperate(productSkus,'join')
              if(!this.verifiData(productData)){
                return
              }
              if(!this.verifiSkus(productSkus)){
                return
              }
              // 如果是一键导入的，就不要替换sku，name，至于以前的逻辑，我也不知道为啥要替换name -- Todd Mark
              if (productData.source !== 2) {
                productSkus = productSkus.map((item)=>{
                  let pre = item.attributes
                  let name = ''
                  for (let key in pre) {
                    name += pre[key] + ';'
                  }
                  return assign({},item,{name})
                })
              }
            }
            if(todo !== 'subEdit' && productData.source !== 2){
              if(!isSingleProduct){
                let attributeAry = getAttributeAry(skuSelected)
                if(attributeAry.length>productSkus.length){
                  // 去掉bundleedit的验证
                  if (todo !== 'bundleEdit') {
                    warn(getText('sku_not_complete'))
                    return
                  }
                }else if(attributeAry.length < productSkus.length){
                  productSkus = filterSkus(attributeAry,productSkus)
                }
              }
            }
            this.setState({pressedSubmit:true})
            switch(todo){
              case 'edit':
                dispatch(productUpdate(productData,productSkus,()=>{
                  this.setState({pressedSubmit:false})
                  redirect('/arrangeProduct')
                }, () => {
                  this.setState({pressedSubmit:false})
                }))
                break
              case 'bundleEdit':
                dispatch(userUnCommitedProductUpdate(productData,productSkus,()=>{
                  this.setState({pressedSubmit:false})
                  redirect('/editbulkupload')
                }))
                break
              case 'subEdit':
                const {
                  subTaskId = ''
                } = this.props.location.query
                {/*if (breadcrumb.length === 0) {
                  message.warn('请选择类目')
                  this.setState({pressedSubmit: false})
                  window.scroll(0, 0)
                  return
                }*/}
                dispatch(userImportSubTaskProductUpdate(subTaskId,productData,productSkus,()=>{
                  this.setState({pressedSubmit:false})
                  redirect('/arrangeProduct')
                }))
                break
              default :
                dispatch(productUpdate(productData,productSkus,()=>{
                  this.setState({pressedSubmit:false})
                  redirect('/arrangeProduct')
                }, () => {
                  this.setState({pressedSubmit:false})
                }))
                break
            }
          }} >{getText('submit')}</Button>
      </div>
    </div>
    <BackTop />
    </section>
    )
  }
}
export default SelectArea
