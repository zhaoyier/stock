curl --cookie '65_customer="0EA0D320F16F7F9D,web:1Zboc4:B_ZmA6QTjHfBkThfh1_M1xpez8g"' -d '
{"method": "Checkout.UserGetCartShippingMethods", "params": ["CN"], "id": 1} 
' http://localhost:1444/SG.ashx | json

curl --cookie '65_customer="1D5CCDAA52FDA1E7,web:1ZdrAN:5Anbrutf-PW8EzNWYEcCBXgFKLU"' -d '
{"method": "Parcel.UserGetParcelSummaryList", "params": [0, 10], "id": 1} 
' http://localhost:1444/SG.ashx | json

curl --cookie '65_customer="1D5CCDAA52FDA1E7,web:1ZdrAN:5Anbrutf-PW8EzNWYEcCBXgFKLU"' -d '
{"method": "Product.Search", "params":  ["Korean", [{"filterName":"Location", "fieldName":"China"}], {"sort": "price", "isDesc": false}, 0, 1], "id": 1} 
' http://192.168.199.104:8051/SG.ashx | json

curl -d '
{"method": "Category.GetProducts", "params":  [1213, 0, 5, "CN"], "id": 1} 
' http://android.65daigou.com/SG_android.ashx | json


curl -d '
{"method": "Category.GetProducts", "params":  [171, 0, 5, "CN"], "id": 1} 
' http://192.168.199.104:8051/SG.ashx | json

curl --cookie '65_customer="1D5CCDAA52FDA1E7,web:1ZdrAN:5Anbrutf-PW8EzNWYEcCBXgFKLU"' -d '
{"method": "Product.SearchByCategory", "params":  [1213, [{"filterName":"Location", "fieldName":"China"}], {"sort": "price", "isDesc": false}, 0, 1], "id": 1} 
' http://192.168.199.104:8051/SG.ashx | json

curl --cookie '65_customer="1D5CCDAA52FDA1E7,web:1ZdrAN:5Anbrutf-PW8EzNWYEcCBXgFKLU"' -d '
{"method": "Product.SearchBySeller", "params":  [854, "", [{"filterName":"Location", "fieldName":"China"}], {"sort": "price", "isDesc": false}, 0, 1], "id": 1} 
' http://192.168.199.104:8051/SG.ashx | json


curl --cookie '65_customer="1D5CCDAA52FDA1E7,web:1ZdrAN:5Anbrutf-PW8EzNWYEcCBXgFKLU"' -d '
{"method": "Product.GetHotSearch", "params":  [], "id": 1} 
' http://localhost:1444/SG.ashx | json


curl --cookie '65_customer="1D5CCDAA52FDA1E7,web:1ZdrAN:5Anbrutf-PW8EzNWYEcCBXgFKLU"' -d '
{"method": "PartnerShop.GetProductsBySeller", "params":  [854, 0, 10], "id": 1} 
' http://192.168.199.104:8051/SG.ashx | json

curl --cookie '65_customer="1D5CCDAA52FDA1E7,web:1ZdrAN:5Anbrutf-PW8EzNWYEcCBXgFKLU"' -d '
{"method": "PartnerShop.GetNewHomePageSellers", "params":  [0, 10, "CN"], "id": 1} 
' http://android.65daigou.com/SG_android.ashx | json

curl --cookie '65_customer="1D5CCDAA52FDA1E7,web:1ZdrAN:5Anbrutf-PW8EzNWYEcCBXgFKLU"' -d '
{"method": "Product.GetProductDetail", "params":  ["https://item.taobao.com/item.htm?id=522899612488", "hot"], "id": 1} 
' http://192.168.199.104:8051/SG.ashx | json


curl --cookie '65_customer="0EA0D320F16F7F9D,web:1ZeecP:5FK8gWGhktuBPyzUe2okI5vRDCg"' -d '
{"method": "Checkout.UserGetCartCheckoutBill", "params": [0, 10], "id": 1} 
' http://localhost:1444/SG.ashx | json


("ezbuy", , 3: string shippingMethod, 4: string deliveryMethod, 5: i32 deliveryMethodId, 5: bool insured, 6: i32 credit, 7: string couponCode),


curl --cookie '65_customer="1D5CCDAA52FDA1E7,web:1ZcBvU:mrA0xQ6pQtx_Xjn6v4ARY4K3Pvc"' -d '
{"method": "Parcel.UserGetParcelDeliveryInfo", "params": ["QE9161910580"], "id": 1} 
' http://localhost:1444/SG.ashx | json

curl --cookie '65_customer="27A077A5E6941276,web:1Zdyfr:_zp--zRyMZFrYk63fJZKnU7jXCY"' -d '
{"method": "Checkout.GetDeliveryMethods", "params": ["CN"], "id": 1} 
' http://localhost:1444/SG.ashx | json

curl --cookie '65_customer="03EDDEAADE9232A4,web:1ZcAZR:VvXnko2VvNUHy0xxx-8BVYsNL6s"' -d '
{"method": "Collection.GetFeatured", "params": ["CN", 0, 10], "id": 1} 
' http://192.168.199.104:8051/SG.ashx | json

curl --cookie '65_customer="03EDDEAADE9232A4,web:1ZcAZR:VvXnko2VvNUHy0xxx-8BVYsNL6s"' -d '
{"method": "Collection.GetProducts", "params": ["55faae3be3c3188454000001", 0, 10], "id": 1} 
' http://192.168.199.104:8051/SG.ashx | json



curl --cookie '65_customer="9E1E09B86832EF95,web:1Zc8L4:UXCBiwPsly4bM0fF_FmU5yLVdk4"' -d '
{"method": "Parcel.UserGetDeliveryTimeSlots", "params": ["QE9151815507", "30-09-2015 Wednesday"], "id": 1} 
' http://localhost:1444/SG.ashx | json


curl --cookie '65_customer="A46F0A896C5D6523,web:1ZcsDJ:1tLohsFglzOV4_nzC8qPXTPlxrc"' -d '
{"method": "Checkout.UserGetCartCheckoutBill", "params": ["ezbuy", "CN", "EconomicAir", "", 0, true, 0, ""], "id": 1} 
' http://android.65daigou.com/SG_android.ashx | json

curl --cookie '65_customer="A46F0A896C5D6523,web:1ZcsDJ:1tLohsFglzOV4_nzC8qPXTPlxrc"' -d '
{"method": "Checkout.UserCartCheckout", "params": [ {"checkoutType": "ezbuy", "originCode":"CN", "shippingMethod": "EconomicAir", "deliveryMethod": "TaisengOffice", "deliveryMethodId": 5,
 "receipient": "sdfasd", "phone": "91923549", "coupon": "", "credit":0, "deliveryDate":"", "deliveryTimeSlot":"", "insured":true, "warehouse":""  }], "id": 1} 
' http://android.65daigou.com/SG_android.ashx | json

curl --cookie '65_customer="8B0B95B24E8D7D3F,web:1ZcDdj:uSExWH9eUjz2iuSN2gmsohZ-pDE"' -d '
{"method": "Checkout.UserCartCheckout", "params": {"checkoutType": "ezbuy", "originCode":"CN", "shippingMethod": "EconomicAir", "deliveryMethod": "TaisengOffice", "deliveryMethodId": 5,
 "receipient": "sdfasd", "phone": "91923549", "coupon": "", "credit":0, "deliveryDate":"", "deliveryTimeSlot":"", "insured":true, "warehouse":""  }, "id": 1} 
' http://localhost:1444/SG.ashx | json


	7:optional string receipient;			// 收货人
	8:optional string phone;				// 收货人电话
	9:optional string coupon;				//折扣券
	10:optional i32 credit;  				//积分 - 需要抵扣的当地货币金额如果不需要抵扣，则为0
	11:optional string deliveryDate			//派送日期
	12:optional string deliveryTimeSlot;	//送货时间段
	13:optional bool insured;  				//保险
	14:optional string warehouse;  			//仓库
}

UserCartCheckout

curl --cookie '65_customer="49D217E6EEEE5526,web:1ZcoZG:hjTF5AYYfv9qt_q9wVU4UG0fILk"' -d '
{"method":"MYShipment.GetCollectionMethods","id":69398,"params":["CN"]}
' http://www.65emall.net:8051/MY.ashx | json

curl --cookie '65_customer="4FF51F5CF5952EEC,web:1Zcs9I:yWNEl-SCp-HORGxi-2EI4xw3FGQ"' -d '
{"method":"Checkout.UserGetCartShippingMethods","id":69398,"params":["CN"]}
' http://dpns.65daigou.com/SG_android.ashx | json

curl --cookie '65_customer="1D5CCDAA52FDA1E7,web:1ZcTe8:l9RzgvrgDCMxc2ZfjgPbAhxN1z0"' -d '
{"method":"Collection.GetFeatured","id":69398,"params":["US", 0, 10]}
' http://android.65daigou.com/SG_android.ashx | json


curl -d '
{"method": "Collection.GetFeaturedForList", "params": ["cn", 0, 10], "id": 1} 
' http://dps-sg.65dg.com/SG.ashx | json

curl -d '
{"method": "Collection.List", "params": ["warm-home-essential", 0, 1], "id": 1} 
' http://127.0.0.1:8000/rpc/json/ | json

curl -d '
{"method": "ProductReview.GetReviewStat", "params": ["1212"], "id": 1} 
' http://dps-sg.65dg.com/SG.ashx | json

curl -d '
{"method": "ProductReview.GetReviewStat", "params": ["1212"], "id": 1} 
' http://192.168.1.104:8051/SG.ashx | json


curl -d '
{ "method": "ProductReview.GetReviews", "params": ["http://taobao.com/xxs", false, 0, 10], "id": 1}
' http://192.168.1.104:8051/SG.ashx | json

curl -d '
{ "method": "User.ReviewProduct", "params": [{
    "productUrl": "1212",
    "rating": 2,
    "pictures": ["pci1", "pic3"],
    "comment": "hello world"
}], "id": 1}
' http://127.0.0.1:8000/rpc/json/ | json


curl -d '
{ "method": "User.ReviewProduct", "params": [{
    "productUrl": "1212",
    "rating": 2,
    "comment": "no pic"
}], "id": 1}
' http://127.0.0.1:8000/rpc/json/ | json

curl -d '
{ "method": "User.SetProductReviewHelpful", "params": [1, true], "id": 1}
' http://127.0.0.1:8000/rpc/json/ | json

curl -d '
{ "method": "User.SetProductReviewHelpful", "params": [1, false], "id": 1}
' http://127.0.0.1:8000/rpc/json/ | json
