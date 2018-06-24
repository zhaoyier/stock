import * as React from 'react'
import './meun.scss'
import { getMessageCount } from 'util/seller'

// key键自增，保证不重复
let GlobalKey = 0
function setKey() {
	return `${GlobalKey++}`
}

export function getMenuItems(data) {

return ({
  0: [{
    names: {
      'CN': '首页',
      'KR': 'Home',
      'SGLocal': 'Home',
      'MYLocal': 'Home',
      'US': 'Home',
    },
    originCodes: ['CN'],
    address: '/',
    key: setKey(),
  },{
    names: {
      'CN': "热销商品",
    },
    originCodes: ['CN'],
    key: setKey(),
    childs: [{
      names: {
        'CN': '热销商品推荐',
      },
      key: setKey(),
      address: '/productsRecommend',
      originCodes: ['CN']
    },{
      names: {
        'CN': '复制商品编辑',
      },
      key: setKey(),
      address: '/copyProductsList',
      originCodes: ['CN']
    }]
  },{
    names: {
      'CN': '商品信息',
      'KR': 'Product Management',
      'SGLocal': 'Product Management',
      'MYLocal': 'Product Management',
      'US': 'Product Management',
      'JP': 'Product Management',
    },
    key: setKey(),
    originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',],
    childs: [{
      names: {
        'CN': "一键导入(new)",
      },
      key: setKey(),
      address: "/productManagement.html#/importProduct",
      originCodes: ['CN']
    }, {
      names: {
        'CN': "自主发布(new)",
      },
      key: setKey(),
      address: "/productManagement.html#/chooseCategory",
      originCodes: ['CN']
    }, {
      names: {
        'CN': '一键导入',
        'US': 'Product Upload'
      },
      key: setKey(),
      address: '/importProduct',
      originCodes: ['CN', 'US']
    }, {
      names: {
        'CN': '自主发布',
        'KR': 'Single Product Upload',
        'SGLocal': 'Single Product Upload',
        'MYLocal': 'Single Product Upload',
        'US': 'Single Product Upload',
        'JP': 'Single Product Upload',
      },
      key: setKey(),
      address: '/addNewProduct',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',]
    }, {
      names: {
        'CN': '批量上传',
        'KR': 'Bulk Product Upload',
        'SGLocal': 'Bulk Product Upload',
        'MYLocal': 'Bulk Product Upload',
        'US': 'Bulk Product Upload',
        'JP': 'Bulk Product Upload',
      },
      key: setKey(),
      address: '/bulkupload',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'JP',]
    }, {
      names: {
        'CN': '查看商品',
        'KR': 'Browse Products',
        'SGLocal': 'Browse Products',
        'MYLocal': 'Browse Products',
        'US': 'Browse Products',
        'JP': 'Browse Products',
      },
      key: setKey(),
      address: '/arrangeProduct',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',]
    }],
    open: true
  }, {
    names: {
      'CN': '店铺装修',
      'KR': 'Store Builder',
      'SGLocal': 'Store Builder',
      'MYLocal': 'Store Builder',
      'US': 'Store Builder',
      'JP': 'Store Builder',
    },
    key: setKey(),
    originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',],
    childs: [{
      names: {
        'CN': '模板装修',
        'KR': 'Page Template',
        'SGLocal': 'Page Template',
        'MYLocal': 'Page Template',
        'US': 'Page Template',
        'JP': 'Page Template',
      },
      key: setKey(),
      address: '/shopDecorate.html#/model',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',],
    }, {
      names: {
        'CN': '自定义装修',
        'KR': 'Self-design page',
        'SGLocal': 'Self-design page',
        'MYLocal': 'Self-design page',
        'US': 'Self-design page',
        'JP': 'Self-design page',
      },
      key: setKey(),
      address: '/shopDecorate.html#/custom',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',],
    }]
  },{
    names: {
      'CN': '订单管理',
      'MYLocal': 'Order Management',
      'SGLocal': 'Order Management',
      'US': 'Order Management',
      'KR': 'Order Management',
      'JP': 'Order Management',
    },
    key: setKey(),
    originCodes: ['CN', 'SGLocal', 'MYLocal', 'US', 'KR', 'JP',],
    childs: [{
      names:
      {
        'CN': '查看订单',
        'KR': 'Browse Orders',
        'SGLocal': 'Browse Orders',
        'MYLocal': 'Browse Orders',
        'US': 'Browse Orders',
        'JP': 'Browse Orders',
      },
      key: setKey(),
      address: '/allOrders',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP']
    },
    {
      names:
      {
        'CN': '新订单管理',
        'KR': 'Order Management',
        'SGLocal': 'Order Management',
        'MYLocal': 'Order Management',
        'US': 'Order Management',
        'JP': 'Order Management',
      },
      key: setKey(),
      address: '/newOrder',
      originCodes: ['CN', 'US']
    }
  ],
  open: true
  }, {
    names: {
      'KR': 'Parcel Management',
      'SGLocal': 'Parcel Management',
      'MYLocal': 'Parcel Management',
      'JP': 'Parcel Management',
    },
    key: setKey(),
    originCodes: ['KR', 'SGLocal', 'MYLocal', 'JP',],
    childs: [{
      names: {
        'KR': 'Parcel Dispatchment',
        'SGLocal': 'Parcel Dispatchment',
        'MYLocal': 'Parcel Dispatchment',
        'JP': 'Parcel Dispatchment',
      },
      key: setKey(),
      address: '/korea-delivery',
      originCodes: ['KR', 'SGLocal', 'MYLocal', 'JP',],
    }],
    open: false,
  }, {
    names: {
      'CN': '发货管理',
      'US': '发货管理',
      'KR': 'fahuoguanli',
    },
    key: setKey(),
    originCodes: ['Hello Word'],
    childs: [{
      names: {
        'CN': '查看待发货订单',
        'US': '查看待发货订单'
      },
      key: setKey(),
      address: '/checkToDeliveryOrder',
      originCodes: ['US']
    }, {
      names: {
        'CN': '查看已发货订单',
        'US': '查看已发货订单'
      },
      key: setKey(),
      address: '/checkDeliveredOrder',
      originCodes: ['US']
    }],
    open: false
  }, {
    names: {
      'CN': '报表管理',
      'KR': 'Report management',
      'SGLocal': 'Report management',
      'MYLocal': 'Report management',
      'US': 'Report management',
      'JP': 'Report management',
    },
    key: setKey(),
    originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',],
    childs: [{
      names: {
       'CN': '商品信息总况',
       'KR': 'Information on merchandise',
       'SGLocal': 'Information on merchandise',
       'MYLocal': 'Information on merchandise',
       'US': 'Information on merchandise',
       'JP': 'Information on merchandise',
      },
      key: setKey(),
      address: '/allProduct',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',]
    },{
      names: {
       'CN': '单品分析报表',
       'KR': 'Single product analysis report',
       'SGLocal': 'Single product analysis report',
       'MYLocal': 'Single product analysis report',
       'US': 'Single product analysis report',
       'JP': 'Single product analysis report',
      },
      key: setKey(),
      address: '/singleProduct',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',]
    }],
    open: true
  }, {
    names: {
      'CN': '账户管理',
      'KR': 'Account Management',
      'SGLocal': 'Account Management',
      'MYLocal': 'Account Management',
      'US': 'Account Management',
      'JP': 'Account Management',
    },
    key: setKey(),
    originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',],
    childs: [{
      names: {
        'CN': '查看账户',
        'KR': 'Check Account',
        'SGLocal': 'Check Account',
        'MYLocal': 'Check Account',
        'US': 'Check Account',
        'JP': 'Check Account',
      },
      key: setKey(),
      address: '/bills',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',]
    }],
    open: false
  }, {
    names: {
      'CN': '账号管理',
      'KR': 'Login Management',
      'SGLocal': 'Login Management',
      'MYLocal': 'Login Management',
      'US': 'Login Management',
      'JP': 'Login Management',
    },
    key: setKey(),
    originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',],
    childs: [{
      names: {
        'CN': '修改密码',
        'KR': 'Edit Password',
        'SGLocal': 'Edit Password',
        'MYLocal': 'Edit Password',
        'US': 'Edit Password',
        'JP': 'Edit Password',
      },
      key: setKey(),
      address: '/changePassword',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',]
    }, {
      names: {
        'KR': 'Edit Contact Email',
        'SGLocal': 'Edit Contact Email',
        'MYLocal': 'Edit Contact Email',
        'US': 'Edit Contact Email',
        'JP': 'Edit Contact Email',
      },
      key: setKey(),
      address: '/editContactEmail',
      originCodes: ['KR', 'SGLocal', 'MYLocal', 'US', 'JP',]
    }, {
      names: {
        'CN': '查看银行卡信息',
        'KR': 'View Bank Details',
        'SGLocal': 'View Bank Details',
        'MYLocal': 'View Bank Details',
        'US': 'View Bank Details',
        'JP': 'View Bank Details',
      },
      key: setKey(),
      address: '/changeBankCard',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',]
    }],
    open: false
  }, {
    names: {
      'CN': '任务中心',
      'KR': 'Download/Upload Task',
      'SGLocal': 'Download/Upload Task',
      'MYLocal': 'Download/Upload Task',
      'US': 'Download/Upload Task',
      'JP': 'Download/Upload Task',
    },
    key: setKey(),
    originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',],
    childs: [{
      names: {
        'CN': '表格导出任务中心',
        'KR': 'Download Task',
        'SGLocal': 'Download Task',
        'MYLocal': 'Download Task',
        'US': 'Download Task',
        'JP': 'Download Task',
      },
      key: setKey(),
      address: '/exportTask',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP']
    }, {
      names: {
        'CN': '表格导入任务中心',
        'KR': 'Upload Task',
        'SGLocal': 'Upload Task',
        'MYLocal': 'Upload Task',
        'US': 'Upload Task',
        'JP': 'Upload Task',
      },
      key: setKey(),
      address: '/importTask',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US', 'JP',]
    }],
    open: false
  }, {
    names: {
      'CN': '消息管理',
      'KR': 'Notification Center',
      'SGLocal': 'Notification Center',
      'MYLocal': 'Notification Center',
      'US': 'Notification Center',
    },
    key: setKey(),
    originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US'],
    childs: [{
      names: {
        'CN':
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span> 查看公告 </span>
            {
              data.announcementCount ?
              <span className="menu_announcement_count"> {getMessageCount(data.announcementCount)}</span>
              :
              null
            }
          </div>,
        'KR':
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span> View Announcement </span>
          {
            data.announcementCount ?
            <span className="menu_announcement_count"> {getMessageCount(data.announcementCount)}</span>
            :
            null
          }
        </div>,
        'SGLocal':
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span> View Announcement </span>
          {
            data.announcementCount ?
            <span className="menu_announcement_count"> {getMessageCount(data.announcementCount)}</span>
            :
            null
          }
        </div>,
        'MYLocal':
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span> View Announcement </span>
          {
            data.announcementCount ?
            <span className="menu_announcement_count"> {getMessageCount(data.announcementCount)}</span>
            :
            null
          }
        </div>,
        'US':
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span> View Announcement </span>
          {
            data.announcementCount ?
            <span className="menu_announcement_count"> {getMessageCount(data.announcementCount)}</span>
            :
            null
          }
        </div>
      },
      key: setKey(),
      address: '/viewAnnouncement',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US']
    }, {
      names: {
        'CN':
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span> 查看消息 </span>
          {
            data.mailCount ?
            <span className="menu_announcement_count"> {getMessageCount(data.mailCount)}</span>
            :
            null
          }
        </div>,
        'KR':
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span> View Notification </span>
          {
            data.mailCount ?
            <span className="menu_announcement_count"> {getMessageCount(data.mailCount)}</span>
            :
            null
          }
        </div>,
        'SGLocal':
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span> View Notification </span>
          {
            data.mailCount ?
            <span className="menu_announcement_count"> {getMessageCount(data.mailCount)}</span>
            :
            null
          }
        </div>,
        'MYLocal':
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span> View Notification </span>
          {
            data.mailCount ?
            <span className="menu_announcement_count"> {getMessageCount(data.mailCount)}</span>
            :
            null
          }
        </div>,
        'US':
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span> View Notification </span>
          {
            data.mailCount ?
            <span className="menu_announcement_count"> {getMessageCount(data.mailCount)}</span>
            :
            null
          }
        </div>
      },
      key: setKey(),
      address: '/viewMessage',
      originCodes: ['CN', 'KR', 'SGLocal', 'MYLocal', 'US']
    }],
    open: false
  }, {
    names: {
      'CN': '店铺设置'
    },
    key: setKey(),
    originCodes: [''],
    childs: [{
      names: {
        'CN': '暂停营业'
      },
      key: setKey(),
      address: '/suspendBusiness',
      originCodes: ['CN']
    }],
    open: false
  }]
  })
}
