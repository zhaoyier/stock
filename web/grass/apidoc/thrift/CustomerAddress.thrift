namespace csharp Zen.DataAccess.CustomerAddress
namespace java com.daigou.sg.rpc.customeraddress
namespace objc TRCustomerAddress
namespace javascript TRPC
namespace go customeraddress
namespace swift TR

// BuildingType,Block,Street,UnitStart as Floor,UnitEnd as Unit,BuildingName,CustomerAddressId, CustomerId, ZipCode, [Address], IsMajor, AddressToName, AddressToPhone, DestCode as Region, 
//                    Company as CompanyName,Remark as Instruction,PreferedDeliveryTime
struct TAddress {
	1:required string zipCode;			//邮编
	2:required string address;			//地址
	3:required bool isMajor;			//是否为默认
	4:required string addressToName;	//姓名
	5:required string addressToPhone;	//电话
	6:required string shipToAddress1;	//地址1
	7:required string shipToAddress2;	//地址2
	8:required string shipToCity;		//城市
	9:required string shipToState;		//州
	10:required string destCode;		//东马、西马
	11:required string subdistrict;		//区
	12:required string district;		//街道
}

struct TSGAddress {
	1:required string zipCode;
	2:required string addressToName;
	3:required string addressToPhone;
	4:required string floor;
	5:required string block;
	6:required string street;
	7:required string unit;
	8:required string companyName;
	9:required string buildingName;
	10:required string preferedDeliveryTime;
	11:required string instruction;
	12:required string buildingType;
	13:required bool isMajor;
}
 
 //地址详情
struct TAddressDetail {
	1:required string buildingType
	2:required string block;
	3:required string street;
	4:required string unitStart;
	5:required string unitEnd;
	6:required string buildingName;
	7:required i32 customerAddressId;
	8:required i32 customerId;
	9:required string zipCode;
	10:required string address;
	11:required string addressToName;
	12:required string addressToPhone;
	13:required string destCode;
	14:required string company;
	15:required string remark;
	16:required string shipToAddress1;
	17:required string shipToAddress2;
	18:required string shipToCity;
	19:required string shipToState;
	20:required string floor;
	21:required string instruction;
	22:required string preferedDeliveryTime;
	23:required string subdistrict;
	24:required string district;
	25:required bool isMajor;
	26:required string region; //马来 east malaysia 和 west malaysia
	27:required string unit;
}


service CustomerAddress {
	/// <summary>
	/// 新增用户地址
	/// </summary>
	/// <param name="address">地址信息</param>
	/// <returns>地址id</returns>
	/// 添加成功时，返回address Id，否则返回0
	i32 UserAddMYNewAddress(1:TAddress address),
	i32 UserAddAUNewAddress(1:TAddress address),
	i32 UserAddSGNewAddress(1:TSGAddress address),
	i32 UserAddIDNewAddress(1:TAddress address),

	/// <summary>
	/// 修改用户地址 
	/// </summary>
	/// <param name="address">地址信息</param>
	bool UserUpdateAddress(1:i32 addressId, 2:TAddress address),

	//获取用户下的地址信息
	list<TAddressDetail> UserGetAddressList(),
	
	/// <summary>
	/// 删除地址 implements by go
	/// <param name="addressId">地址id</param>
	/// </summary>
	void UserDeleteAddress(1:i32 addressId),

	/// <summary>
	/// 根据邮编获取地址 implements by go
	/// <param name="postcode">邮编</param>
	/// </summary>
	TAddressDetail GetAddressByPostCode(1:string postcode),

	/// <summary>
	/// 获取指定收货地址的详细信息 implements by go
	/// <param name="addressId">地址id</param>
	/// </summary>
	TAddressDetail UserGetAddressDetail(1:i32 addressId),

	/// <summary>
	/// 设为默认地址 implements by go
	/// <param name="addressId">地址id</param>
	/// </summary>
	void UserSetDefaultAddress(1:string addressId),
	
	i32 UserSGUpdateNewAddress(1:i32 addressId, 2:TSGAddress address)

}
