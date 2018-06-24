import React, {Component} from 'react'
import {changeMenu} from '../../action/common'
import EditExtra from './editExtra'
import { warn, success} from '../../util/antd'
import { getDomain } from '../../util/kit'
import { connect } from 'react-redux'
import { volumeOperate } from '../skit.js'
import {
  Row,
  Col,
  Select,
  Input,
  Button,
  Table,
  Modal
} from 'antd'
import {
  getCategories,
  getSubCategories,
  userMirrorProductList,
  userMirrorProductLink,
  userMirrorProductUnLink,
  productSkusChange,
  userProductQuickUpdate,
  productUpdate
} from '../../action/productManage'
import './coSale.scss'
const Option = Select.Option

@connect(state=>({
  categoryTree: state.productManage.categoryTree,
  coSaleList: state.productManage.coSaleList,
  productSkus: state.productManage.productSkus,
  productData: state.productManage.productData
}))
class CoSale extends Component{
  constructor(props){
    super(props)
    this.state={
      productName:'',
      linked:'',
      visible:false,
      linkProductId:'',
      pid:'',
      current: 1,
    }
  }
  componentWillMount(){
    const {dispatch} = this.props
    dispatch(getSubCategories(0, -1))
    dispatch(userMirrorProductList(0,10,{}))
    dispatch(changeMenu({
      main:0,
      sub: '30'
    }))
  }
  verifiSkus(skus){
    if(skus.length == 0){
      warn('请输入sku数据！')
      return
    }
    let flag = false
    let weightFlag = false
    for (let i = 0; i < skus.length; i++) {
      if(skus[i].isOnSale){
        if(!skus[i].price){
          warn('sku数据不完整！')
          return false
        }
        if(skus[i].quantity){
          flag = true
        }
        if(!skus[i].weight){
          warn('sku数据不完整！')
          return false
        }
        if(skus[i].weight>100){
          weightFlag =  true
        }
      }
    }
    if(!flag){
      if(skus.length==1&&skus[0].name == 'single'){
        warn('库存不能为0!')
      }else{
        warn('不允许每个SKU库存都为0！')
      }
      return false
    }
    if(weightFlag){
      return confirm('您所编辑的商品重量大于100kg，请确认')
    }
    return true
  }
  render(){
    let {
      categoryTree,
      dispatch,
      coSaleList,
      productSkus,
      productData
    } = this.props
    const {
      productName,
      linked,
      visible,
      pid,
      current
    } = this.state
    let selectArea = []
    let cid = 0
    for (let i = 0; i < 4 ; i++) {
      if(categoryTree[i].selected != -1){
        cid = categoryTree[i].selected
      }
      if(categoryTree[i].all.length>0){
        let selectedItem = ''
        if(categoryTree[i].selected){
          for (let j = 0; j < categoryTree[i].all.length; j++) {
            if(categoryTree[i].all[j].cid == categoryTree[i].selected){
              selectedItem = categoryTree[i].all[j].translation.CN
            }
          }
        }
        const Options = categoryTree[i].all.map((item,index)=>(<Option key={index} value={item.cid}>{item.translation.CN}</Option>))
        selectArea.push(
          <Select value={selectedItem} style={{width:200,marginRight:10}} onChange={(v)=>{
            dispatch(getSubCategories(v, i))
          }}>
            {Options}
          </Select>)
      }
    }
    const filterData = {
      productName,
      categoryId: cid,
      linked
    }
    linked === '' && delete filterData.linked
    const columns =[{
      title:'产品名称',
      dataIndex:'name',
      key:'name',
      width:200,
      render:(text,record) => (<a target="_blank" onClick={()=>{
        window.open(getDomain()+'/Shopping/EasyBuy?url='+encodeURIComponent(record.url), '_blank', 'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes')
      }}>{text}</a>)
    },{
      title:'产品主图',
      dataIndex:'primaryImage',
      key:'primaryImage',
      render: (item) => (
        <a target='_blank' href={item}><img src={item} width={100} alt="ezbuy is the best"/></a>
      ),
      width:200
    },{
      title:'类目',
      dataIndex:'categoryId',
      key:'categoryId'
    },{
      title:'价格（¥）',
      dataIndex:'price',
      key:'price'
    },{
      title:'是否跟卖',
      key:'isOnSale',
      dataIndex:'isOnSale',
      render:(text) => {
        switch(text){
          case true:
            return <span>已跟卖</span>
          case false:
            return <span>未跟卖</span>
          default:
          break
        }
      }
    },{
      title:'操作',
      key:'operate',
      render:(text,record)=>{
        if(record.isLinked){
          if(record.isOnSale){
            return <a onClick={()=>{
              Modal.confirm({
                title: '取消跟卖',
                content: '确认取消跟卖？',
                okText: '确定',
                cancelText: '取消',
                onOk: ()=>{
                  dispatch(userProductQuickUpdate(record.linkProductId,{
                    isOnSale:false
                  },()=>{
                    dispatch(userMirrorProductList(0,10,{}))
                  }))

                }
              })
            }}>取消跟卖</a>
          }else{
            return <a onClick={()=>{
              dispatch(userProductQuickUpdate(record.linkProductId,{
                isOnSale:true
              },()=>{
                dispatch(userMirrorProductList(0,10,{}))
              }))
            }}>跟卖</a>
          }
        }else{
          return <a onClick={()=>{
            dispatch(userMirrorProductLink(record.pid,()=>{
              dispatch(userMirrorProductList(0,10,{}))
            }))
            this.setState({
              visible:true,
              pid:record.pid
            })
          }}>跟卖</a>
        }
      }
    }]
    const pagination = {
      total: coSaleList.total,
      current,
      onChange: page => {
        dispatch(userMirrorProductList((page-1)*10, 10, filterData))
        this.setState({ current: page})
      }
    }

    return <section className='coSale'>
      <h1>跟卖管理页面</h1>
      <div className="filter">
        <Row>
          <label style={{marginRight:10}}>产品类目：</label>
          {selectArea}
        </Row>
        <Row style={{marginTop:10}}>
          <Col span="24">
            <label>产品名称：</label>
            <Input style={{width:200,marginRight:10}} onChange={(e)=>this.setState({productName:e.target.value})}/>
            <label>跟卖状态：</label>
            <Select onChange={(v)=>this.setState({linked:v})} style={{width:100,marginRight:10}}>
              <Option key='2' value={''}>全部</Option>
              <Option key='0' value={true}>是</Option>
              <Option key='1' value={false}>否</Option>
            </Select>
            <Button onClick={()=>{
                dispatch(userMirrorProductList(0,10,filterData))
                this.setState({ current: 1})
            }}>确定</Button>
          </Col>
        </Row>
      </div>
      <div className="coSaleList">
        <Table
          columns={columns}
          dataSource={coSaleList.list}
          pagination={pagination} />
      </div>
      <Modal title="产品跟卖" visible={visible} width={1100}
        onOk={()=>{
          productSkus = volumeOperate(productSkus,'join')
          if(!this.verifiSkus(productSkus)){
            return
          }
          dispatch(productUpdate(productData,productSkus,()=>{
            dispatch(userMirrorProductList(0,10,{}))
          }))
          this.setState({visible:false})
        }} onCancel={()=>{
          dispatch(userMirrorProductUnLink(pid,()=>{
            dispatch(userMirrorProductList(0,10,{}))
            this.setState({visible:false})
          }))
        }}
      >
        <EditExtra type={'first'} />
      </Modal>
    </section>
  }
}
export default CoSale
