import {observable, computed, action, } from "mobx";
import { message } from "antd";
import store from "../../../../../node_modules/store";
import {
  GetCategories,
  GetSubCategories,
} from "../../../../services/BootyBayService";
import accountInfo from '../../../../util/accountInfo';

interface History {
  name: Array<string>;
  categoryTree: Array<any>;  
}

export default class CategoryStore {
  @observable public history: Array<History>;
  @observable public categoryTree: Array<any>;
  constructor () {
    this.history = store.get("category_history") || [];
    this.categoryTree = [
      {selected: -1, all: []},
      {selected: -1, all: []},
      {selected: -1, all: []},
      {selected: -1, all: []},
    ];
    const query: any = {
      prefix: '',
      caseSensitive: false,
      limit: 0
    }

    // category类目数据初始化
    GetCategories(query, 0)
      .then(res => {
        const categoryTree = this.categoryTree;
        this.categoryTree[0].all = res;
        this.updateCategoryTree(categoryTree);
      })
      .catch(res => {
        console.error("服务错误", res);
      })
  }

  @computed get breadCrumb() {
    const breadCrumb: any = [];
    const isCN = accountInfo.shop && accountInfo.shop.originCode === 'CN';
    this.categoryTree.map(categoryItem => {
      categoryItem.all.map(item => {
        if (categoryItem.selected === item.cid) {
          breadCrumb.push(isCN ? item.translation.CN : item.name)
        }
      })
    })
    return breadCrumb;
  }

  @computed get selectCategoryId() {
    let id = -1;
    for (let i = this.categoryTree.length - 1; i >= 0; i--) {
      if (this.categoryTree[i].selected !== -1) {
        id = this.categoryTree[i].selected; 
        break;
      } 
    }
    return id;
  }

  @action.bound updateHistory(data) {
    // save data to localStorage
    // data {name: "", categoryTree: []}
    if (this.history.length === 10) {
      this.history.shift();
    }
    for (let i = 0; i < this.history.length; i++) {
      if (this.history[i].name.join() === data.name.join()) {
        return;        
      }
    }
    this.history.push(data);
    store.set("category_history", this.history);
  }

  @action.bound updateCategoryTree(categoryTree) {
    // console.log(JSON.parse(JSON.stringify(categoryTree)));
    this.categoryTree = categoryTree;
  }

  @action.bound getSubCategories(cid, cateIndex) {
    GetSubCategories(cid)
    .then(res => {
      const categoryTree = this.categoryTree;
      for (let i = cateIndex; i < 3; i++) {
        categoryTree[i + 1].all = [];
        categoryTree[i + 1].selected = -1;
      }
      if (cateIndex < 3) {
        categoryTree[cateIndex + 1].all = res;
        if (res.length > 0) {
          message.success("子类目已更新");
        } else {
          message.warn("没有更多子类目了");
        }
      }
      categoryTree[cateIndex].selected = cid;
      this.updateCategoryTree(categoryTree);
    })
  }
}
