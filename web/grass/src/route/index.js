import Index from '../component/Index'
import Category from '../component/product/category'
import BulkUpload from '../component/product/bulkUpload'
import Editbulkupload from '../component/product/editbulkupload'
// import SelectArea from '../component/product/selectArea'
import AllOrders from '../component/order/allOrders'
import ArrangeProduct from '../component/product/arrangeProduct'
import ImportProduct from '../component/product/importProduct'
import OrderDetail from '../component/order/orderDetail'
import Preview from '../component/preview/preview'

import ChangePassword from '../component/account/changePassword'
import EditContactEmail from '../component/account/editContactEmail'
import ChangeBankCard from '../component/account/changeBankCard'

import SubImportProduct from '../component/product/subImportProduct'
import CheckToDeliveryOrder from '../component/order/checkToDeliveryOrder'
import CheckDeliveredOrder from '../component/order/checkDeliveredOrder'
import { PackageDelivery } from '../component/korea'
import CoSale from '../component/coSale/coSale'
import MyAccount from '../component/bill/myAccount.jsx'
import BillDetail from '../component/bill/billDetail.jsx'
import { SuspendBusiness } from '../component/shopSetting'
import Announcement from '../component/notice/announcement'
import AnnouncementDetail from '../component/notice/announcementDetail'
import Message from '../component/notice/message'
import MessageDetail from '../component/notice/messageDetail'
import ExportTask from '../component/taskCenter/exportTask/index.tsx'
import ImportTask from '../component/taskCenter/importTask/index.tsx'
import ProductEdit from '../component/productEdit/productEdit.tsx'
import Order from '../component/orderManagement/component/order/index.tsx'

import SingleProduct from '../component/report/singleProduct/index.tsx'
import AllProduct from '../component/report/allProduct/index.tsx'
import INV from '../component/INV/index.tsx'
import Home from '../component/Home'
import CostAdjustment from '../component/costAdjustment'
import Address from '../component/address'

import ProductsRecommend from "../component/hotProducts/productsRecommend";
import CopyProductsList from "../component/hotProducts/copyProductsList";

import {
  isCN
} from '../util/kit'

import StepOne from '../component/loginAndSignUp/shopRegister/component/stepOne'
import StepTwo from '../component/loginAndSignUp/shopRegister/component/stepTwo'
import StepThree from '../component/loginAndSignUp/shopRegister/component/stepThree'
import StepFour from '../component/loginAndSignUp/shopRegister/component/stepFour'

const rootRoutes = [{
  path: '/',
  component: Index,
  indexRoute: {
    component: isCN ? Home : Category
  },
  childRoutes: [{
    path: '/registerOne',
    component: StepOne,
  },{
    path: '/registerTwo',
    component: StepTwo,
  },{
    path: '/registerThree',
    component: StepThree,
  },{
    path: '/registerFour',
    component: StepFour,
  },{
    path: '/addNewProduct',
    component: Category
  }, {
    path: '/productEdit',
    component: ProductEdit
  }, {
    path: '/category',
    component: Category
  }, {
    path: '/bulkupload',
    component: BulkUpload
  }, {
    path: '/editbulkupload',
    component: Editbulkupload
  }, {
    path: '/allOrders',
    component: AllOrders
  },{
    path: '/bills',
    component: MyAccount
  },{
    path: '/bill-detail/:billNum',
    component: BillDetail
  },{
    path: '/arrangeProduct',
    component: ArrangeProduct
  },{
    path: '/importProduct',
    component: ImportProduct
  },{
    path: '/order-detail/:id',
    component: OrderDetail
  },{
    path: '/korea-delivery',
    component: PackageDelivery
  },{
    path: '/preview',
    component: Preview
  },{
    path: '/changePassword',
    component: ChangePassword
  },{
    path: '/editContactEmail',
    component: EditContactEmail
  },{
    path: '/changeBankCard',
    component: ChangeBankCard
  },{
    path: '/singleProduct',
    component: SingleProduct
  },{
    path: '/allProduct',
    component: AllProduct
  },{
    path: '/subImportProduct/:taskId',
    component: SubImportProduct
  },{
    path: '/checkToDeliveryOrder',
    component: CheckToDeliveryOrder
  },{
    path: '/checkDeliveredOrder',
    component: CheckDeliveredOrder
  },{
    path: '/coSale',
    component: CoSale
  },{
    path: '/suspendBusiness',
    component: SuspendBusiness
  },{
    path: '/viewAnnouncement',
    component: Announcement
  },{
    path: '/viewMessage',
    component: Message
  },{
    path: '/message_detail',
    component: MessageDetail
  },{
    path: '/notice_detail',
    component: AnnouncementDetail
  },{
    path: '/exportTask',
    component: ExportTask
  },{
    path: '/importTask',
    component: ImportTask
  },{
    path: '/newOrder',
    component: Order
  },{
    path: '/INV',
    component: INV
  },{
    path: '/productsRecommend',
    component: ProductsRecommend
  },{
    path: '/copyProductsList',
    component: CopyProductsList
  },{
    path: '/costAdjustment',
    component: CostAdjustment
  },{
    path: '/address',
    component: Address
  }]
}]

export {
  rootRoutes
}
