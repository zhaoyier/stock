
# Bloogger API

导购项目目前移动端最重要的功能需求是：`供达人使用的产品编辑`。

前期甚至考虑的是这样的流程：

- 达人在手机端浏览商品
- 点击编辑Product Details
- 我们后台通过审核
- 其他用户可以在web + 手机端上浏览达人编辑的Product Details

为配合此首要需求，应该需要以下API。

## blogger ProductDetails

blogger编写的Product Details，*默认模板*会是：

* 文字、图片交替
* 显示效果长微博
* 出现图片时，图片会占据一行，并且满屏幕宽度显示

以后可能会有其它模板。

### API

以下仅是API初稿，很可能会不断修改。

```thrift
enum ContentPartType { 
  TEXT = 1,
  IMAGE = 2
}

struct ContentPart {
  1: ContentPartType type,
  2: string value
}

// 当type为TEXT时，value即为文字正文；为IMAGE时，value即为上述的`image key`。

struct BloggerProductDetail {
  1: string id,
  2: List<ContentPart> data,
  3: string userID,
  4: string productID, 
  5: bool isVerified,
  6: bool isEditing
}

service Product {
  bool Product.CreateBloggerProductDetail(1: BloggerProductDetail review);
  bool Product.DeleteBloggerProductDetail(2: string id);
  List<BloggerProductDetail> Product.GetBloggerProductDetail(1: string ProductID);
}
```
