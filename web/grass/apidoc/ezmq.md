# ezmq

用于记录消息队列中传递的消息类型，以确保：

* 我们mq中传递的消息也是**强类型**
* 同时便于开发
* 有统一的地方记录mq中传递的所有消息类型、queue-name

所有的mq服务定义文件都必须保存在 `apidoc/ezmq` 路径下

如果我们要定义一个服务：

* 服务名必须**全小写**

假设服务名为`sample`，这个服务的定义文件必须：

* 放在`samplemq`子目录中，即**服务名+mq**子目录
* 子目录中可以有多个pb文件
* 只能在名为 `sample.proto`的pb文件中定义服务
  * 即**服务名.proto**
  * 里面只能定义一个service
  * service中的rpc方法return必须为`common.Empty`
* 服务中可以直接引用现有apidoc/proto中的任意类型

定义可以参考：

https://gitlab.1dmy.com/65daigou/apidoc/tree/feature/ezmq/ezmq/samplemq

## 代码生成

```bash

protoc -I apidoc/proto -I apidoc/ezmq apidoc/ezmq/samplemq/*.proto --go_out=dep_path=gitlab.1dmy.com/ezbuy/%[1]v/rpc/%[1]v,plugins=ezmq:输出路径
```

跟目前grpc的生成命令差别在于，指定多 apidoc/ezmq 的proto_path，同时plugins从grpc变成ezmq

## 内部实现

* queue-name为 `service名.方法名`

# 设计考量

上面提到的对于ezmq服务名、文件名等的规定，目的是为了：

* 保持mq的使用范围尽量精简，不容易被滥用
* 确保`service名 + 方法名`唯一
* 仅有服务 -> 方法两个层级，而不是像`grpc proto`那样有三个层级

这是刻意添加的功能限制，技术上也完全做得给mq内置成对的pub/sub去实现rpc把mq这一传输层给透明化掉。

强制增加`mq`的命名空间后缀，强制在新的目录独立定义通过mq传递的调用等等也都是为了给mq刷存在感。

这是为了让我们在通过mq调用远程服务时，去明确：

* 这个服务是否适合使用mq？
* 超时怎么办？
  * 当前业务可以容忍多少超时？
* 连mq都写入失败时怎么办？
* Pub/Sub两端是否在同一个机房？
* job消费是at most once还是at least once？
  * 如果是后者话，sub的实现**需要幂等**


# 使用场景

## 跨数据中心数据同步

腾讯云中数据若有变化，可以通过mq传递给hostsg中的服务，服务负责回写数据入hostsg中的数据库。

这样数据同步可以做到实时，并且无需关心数据中心之间的网络稳定性。

# todo

* mqClient依赖的[disque-go](https://github.com/zencoder/disque-go/)实际上是把mq传递过来的bytes强制[转为string](https://github.com/zencoder/disque-go/blob/master/disque/connection.go#L168)，这个应该改掉，bytes跟string反复相互转换很浪费
* 消息必须处理成功后才ack，即需要修改mqClient的Fetch方法
* 区分群发以及pub sub
* 嵌入statsd统计（或者干脆把 statsd / grafana换掉？）
* 这其实也可以认为是ezrpc2
  * [ezrpc](https://github.com/ezbuy/ezrpc)是 thrift over nats
  * 这里是 pb over disque
