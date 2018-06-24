import * as React from 'react'
import { connect } from 'react-redux'
import { Queue } from 'storage.io'
import { warn, success} from '../../util/antd'
import {Row, Col, Button, Input, Breadcrumb, Select, Checkbox} from 'antd'
import { redirect } from '../../util/history'
import getAgreements from './agreements'
import './category.scss'
import {
  getCategories,
  getSubCategories,
  getPrefix,
  updateCategoryTree
} from '../../action/productManage'
import {changeMenu} from '../../action/common'
import { locale } from '../../config/locale'
const Option = Select.Option
const queue = new Queue({
  name: 'local-queue',
  limit: 10,
  type: 'local'
})

import {
  changeCategory,
} from '../../action/productManage'

const categoryItemNormalStyle = {fontSize:'15px',padding:'5px 0',cursor: 'pointer',textAlign:'center'}
const categoryItemSelectedStyle = {fontSize:'15px',padding:'5px 0',background:'rgba(24, 115, 216, 0.7)',cursor: 'pointer',color:'white',textAlign:'center'}

@connect(state=>({
  categoryTree: state.productManage.categoryTree,
  preCategories: state.productManage.preCategories,
  accountInfo: state.common.accountInfo,
}))
class Category extends React.Component{
  constructor(props){
    super(props)
    this.state={
      categoryName: '',
      index : 0,
      cid : '',
      isHistory: false
    }
  }
  componentWillMount(){
    const { accountInfo } = this.props
    const query = {
      prefix: '',
      caseSensitive: false,
      limit: 0
    }
    const {dispatch} = this.props
    dispatch(getCategories(query, 0, 0))
    dispatch(changeMenu({
      main:0,
      sub:'01'
    }))

    this.__ = locale(accountInfo.shop.originCode)
  }

  componentWillReceiveProps(nextProps){
    const { categoryTree } = nextProps
    if (typeof categoryTree !== 'undefined' && categoryTree !== null && categoryTree !== this.props.categoryTree) {
      const cid = Object.keys(categoryTree).reduce(function(pValue, key){
        const cValue = categoryTree[key]
        return cValue.selected !== -1 ? cValue.selected : pValue
      },-1)
      if (cid !== -1 && this.state.cid !== cid) {
          this.setState({cid})
      }
      console.log(cid)
    }
  }

  render(){
    const{
      dispatch,
      categoryTree,
      accountInfo,
      preCategories
    } = this.props
    const translation ={MY:'',CN:''}
    const {
      categoryName,
      index,
      cid
    } = this.state
    const isCN = accountInfo.shop.originCode === 'CN'
    const getText = this.__

    const preCategoriesOptions = preCategories.map((item) =>(<Option key={item.cid}>{isCN ? item.translation.CN : item.name}</Option>))
    let selectArea = []
    for (let i = 0; i < 4; i++) {
      const {
        selected,
        prefix,
        all
      } = categoryTree[i]
      let optionArray = prefix.length>0?prefix:all

      // what a rubbish code to demand me fixed it up.
      if (optionArray.map === undefined) {
        optionArray = [];
      }
      const options = optionArray.map((item) =>{
        const flag = item.cid == selected
        return(
          <li key={item.cid}
            style={flag?categoryItemSelectedStyle : categoryItemNormalStyle}
            onClick ={
              () => {
                this.setState({
                  index : i,
                  cid : item.cid,
                  isHistory: false
                })
                dispatch(getSubCategories(item.cid, i))}
            }>
              <span>{isCN ? item.translation.CN : item.name}</span>
          </li>
        )
      })
      const formFlag = (i==0)||(categoryTree[i-1].selected!=-1)
      const inputArea = formFlag && (
        <section>
          <input className="ant-input inputCategory" onChange ={(e) => {
            const query ={
              prefix: e.target.value,
              caseSensitive: false,
              limit: -1
            }
            dispatch(getPrefix(e.target.value, i))
            if(i>0){
              dispatch(getCategories(query, categoryTree[i-1].selected, i))
            }else{
              dispatch(getCategories(query, 0, 0))
            }
          }} placeholder="输入类目" />
        </section>
        )
        const selectItem = (
          <Col key={i} span="6">
            <div className="inputArea">
              <div className="selectList">
                <ul className="displayUl">
                  {options}
                </ul>
              </div>
            </div>
          </Col>
        )
        selectArea.push(selectItem)
    }
    let breadcrumb = []
    for (let key in categoryTree) {
      if(categoryTree[key].selected != -1){
        categoryTree[key].all.map((item) =>{
          if(item.cid == categoryTree[key].selected){
            breadcrumb.push(
              <Breadcrumb.Item key={item.cid}>{isCN ? item.translation.CN : item.name}</Breadcrumb.Item>
            )
          }
        })
      }
    }
    const optionQueue = queue.all()
    const records = optionQueue.map((item,index)=>(<Option value={index}>{item.name.join('>')}</Option>))
    return(
      <section className="mdCategory">
        <h2 style={{ paddingTop: '1rem' }}>{getText('select_category')}</h2>
        <div style={{marginTop:10,marginBottom:10}}>
          <label style={{ paddingTop: '1rem' }}>{getText('previous_chosen')}</label>
          <Select style={{ width: isCN ? 350 : 500, margin: '0 0.5rem' }} onChange={(index)=>{
            this.setState({
              isHistory: true
            })
            dispatch(updateCategoryTree(optionQueue[index].categoryTree))
          }}>
            {records}
          </Select>
        </div>
        <Row type="flex" className="mdcs">
          {selectArea}
        </Row>
        <Row className="categoryPath">
          <Col span="24">
            <Breadcrumb>
            <b>{getText('current_chosen')}</b>
              {breadcrumb}
            </Breadcrumb>
          </Col>
        </Row>
        <div className="submitButton">
          <Checkbox defaultChecked={true}>{getText('have_read')}</Checkbox>
          <Button type="primary"  disabled={(this.state.isHistory || categoryTree[index+1] === undefined  || categoryTree[index+1].all.length < 1) && cid !== '' ? false : true} onClick={() => {
            if(breadcrumb.length == 0){
              return warn('至少选择一个类目')
            }else{
              let temp = {}
              temp.name = []
              for (let i = 0; i < 4; i++) {
                if(categoryTree[i].selected != -1){
                  categoryTree[i].all.map((item) =>{
                    if(item.cid == categoryTree[i].selected){
                      temp.name.push(isCN ? item.translation.CN : item.name)
                    }
                  })
                }
              }
              temp.categoryTree = categoryTree
              if(optionQueue.length>0){
                let flag = true
                for (let i = 0; i < optionQueue.length; i++) {
                  if(JSON.stringify(optionQueue[i].name) == JSON.stringify(temp.name)){
                    flag = false
                  }
                }
                if(flag){
                  queue.push(temp)
                }
              }else{
                queue.push(temp)
              }

              const { from, subTaskId } = this.props.location.query
              const tempRebuildUrl = '/productEdit'
                let params = {categoryId: this.state.cid}
                if (from) {
                  params = Object.assign(params, {from})
                  if (subTaskId) {
                    params = Object.assign(params, {subTaskId})
                  }
                  redirect(tempRebuildUrl, params)
                } else {
                  dispatch(changeCategory(false))
                  redirect(tempRebuildUrl, {categoryId: this.state.cid})
                }

            }
          }}>{getText('confirm')}</Button>
        </div>
        <div className="settleContent">
          <header style={{marginTop:10}}>{getText('seller_agreements')}</header>
          {accountInfo.shop.originCode === 'CN' ? (
            <iframe style={{margin: '0 auto', width: 880, display: 'block'}} width="100%" height="400" src="/asset/ezbuysellerterms.html"></iframe>
          ) : (
            <iframe style={{margin: '0 auto', width: 880, display: 'block'}} width="100%" height="400" src="https://docs.google.com/document/d/e/2PACX-1vSTdlgE6IXLcm6zr7YcMte6m1X43HRCecVUu1zqpXFJEpmyl6b67MESy0OdeLRA-s4ppmK2Tozcy5T4/pub"></iframe>
          )}
        </div>
      </section>
    )
  }
}

export default Category
