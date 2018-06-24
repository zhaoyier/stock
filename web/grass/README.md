# 卖家后台发布商品信息


## 2017-12-28 商家入驻及框架升级影响范围检查项
### 注：此次改动是全局框架的升级，故不区分卖家国家。下面以中国卖家为例，若国外买家有此业务则同样需要检查。

- 1. 登录/注册 流程，全部重构。[登录](http://ezseller.65emall.net/signin.html#/) [注册](http://ezseller.65emall.net/signin.html#/register)
- 2. 新首页 [链接](http://ezseller.65emall.net/index.html#/)
- 3. [商品信息]    
  - 1. [一键导入] 页面的 【导入】【批量导入】功能。 [链接](http://ezseller.65emall.net/index.html#/importProduct)
  - 2. [商品管理] 页面的 【导出SKU信息】【导入SKU信息】[链接]()
  - 3. [自主发布] 的商品 [新建] [编辑] 功能
- 4. 订单管理
  - 1. 【查看订单】搜索筛选区域 [链接](http://tod.65emall.net/index.html#/allOrders)
  - 2. 【新订单管理】 搜索筛选区域 [链接](http://tod.65emall.net/index.html#/newOrder)
- 5. 发货管理
  - 1. [查看待发货订单] 订单的 【问题订单登记】功能 [链接](http://ezseller.65emall.net/index.html#/checkToDeliveryOrder)
  - 2. [查看已发货订单] 的 打印功能 [链接](http://ezseller.65emall.net/index.html#/checkDeliveredOrder)
- 6. 账户管理
  - 1. [查看账户] 账单的 [提现] [账单申诉功能] [链接](http://ezseller.65emall.net/index.html#/bills)
- 7. 账号管理
  - 1. [修改密码] 功能 [链接](http://ezseller.65emall.net/index.html#/changePassword)
  - 2. [查看银行卡信息] 页面 [链接](http://ezseller.65emall.net/index.html#/changeBankCard)
- 8. 任务中心
  - 1. [表格导出任务中心] 的导出功能 [链接](http://ezseller.65emall.net/index.html#/exportTask)
  - 2. [表格导出任务中心] 的查询功能 [链接](http://ezseller.65emall.net/index.html#/importTask)
- 9. 公告管理
  - 1. [查看公告] 的搜索功能 [链接](http://ezseller.65emall.net/index.html#/viewAnnouncement)

- 其他容易被忽略的部分：
 - 1. 所有打印面单(A4)的二维码显示功能
 - 2. 外国卖家使用新登录界面的场景
 - 3. 涉及到任务中心表格导出的页面
 - 4. 商品编辑的SKU功能

## 2016-12-08 项目构建优化
[x] extract-html，开发时直接访问http://localhost:8090即可。
[x] 发布脚本无需进入到tool再sh releaseuat.sh,直接npm run releaseuat/release发布UAT/生产
[x] 静态资源自动拷贝


> npm run release -- --env 2 另一个测试环境