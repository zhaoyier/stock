# 导购手机端API需求

* 使用[JSON-RPC 2.0](http://www.jsonrpc.org/specification)实现手机端API

# JSON-RPC

厦门端、上海端各提供一个HTTP API end point供客户端调用，比方说：

  http://www.65daigou.com/mobile.rpc
  http://product.65daigou.com/mobile.rpc

* *理想上*厦门、上海各一个end-point，不会有第三个
  * *实际上*对于照片上传，现有API兼容等情况必须做特殊处理
* 可提供HTTPS
* 仅接受http post请求
* request使用*named parameters*
* 本文档使用[thrift](http://diwakergupta.github.io/thrift-missing-guide/)严格定义所有RPC方法
  * 仅借用thrift的IDL语法，并不使用thrift实现
* API区分两种类型请求：
  * 公共方法（Public Methods）：未登陆用户亦可调用，如：
    * Product.ListCategory(...)
  * 验证方法（Authenticated Methods）：仅登陆后用户方可调用，方法名*必须*在`User`命名空间下，如：
    * User.PostComment(...)
用户登陆与否，通过`65_customer`cookie识别。

# API 规范

1.定义namespace
2.struct 以T开头，代表用来transfer的结构
3.struct名与{中间有个空格，每个field的定义各占一行，以tab键缩进
4.service以模块名命名，service名与{中间有个空格，每个方法的定义各占一行，以tab键缩进

# 厦门端 API

```
struct TUser {
    1: required int id;
    2: required string UserName;
    ...
}

service TAmoy {
    TUser Login(1:string username, 2: string password) throws (1:string loginError),
    void User.Logout()
}
```

# 上海端 API

```
struct TProduct {
    1: required int id;
    2: required string sku;
    ...
}

service TShangHai {
    int User.CommentProduct(1:int product_id, 2: string comment, 3: List<int> photo_ids)
}
```

# 总结

上述的：

* JSON-RPC
* 65_customer cookie
* Thrift IDL

的三点是mobile API的核心。

# API文档

* 图片服务，使用[七牛云存储](http://developer.qiniu.com/docs/v6/api/reference/fop/image/imageview2.html)，以确保客户端可以方便的调用任意规格的图片

* [HomePage](homepage.md)
* [Product Review](ProductReviewDetail.thrift)
* [Blogger](blogger.md)
