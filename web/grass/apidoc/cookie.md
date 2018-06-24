## 65_customer cookie

* 手机端用户登陆时，首先调用*厦门端*API，传入账号信息，若验证成功，API返回用户资料时，同时设置此cookie。
* cookie值包括UserID，Token两部分，使用英文逗号划分
  * UserID即系统内部使用的用户ID
  * Token为任意字符串，为未来扩展准备，暂不启任何作用
* cookie需要签名，签名方式兼容django [HttpResponse.set_signed_cookie](https://docs.djangoproject.com/en/1.6/ref/request-response/#django.http.HttpResponse.set_signed_cookie)
  * 即*上海端*API可直接使用[HttpRequest.get_signed_cookie](https://docs.djangoproject.com/en/1.6/ref/request-response/#django.http.HttpRequest.get_signed_cookie)方法获得UserID以及Token， 如

```
user_id, token = request.get_signed_cookie("65_customer").split(",", 1)
```
