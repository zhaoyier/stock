interface ProductData {
	pid: number;
	categoryId: number;
	name: string;
	enName: string;
	description: string;
	primaryImage: string;
	isStocked: boolean;
	isOnSale: boolean;
	attributes: Object;
	saleRegion: Array<any>;
	originCode: string;
	shipmentInfo: number;
	images: Array<string>;
	source: Number;
	sellType: number;
	url: string;
	skuProps: Array<any>;
}

export interface ProductProps {
	productData: ProductData;
	productSkus: Array<any>;
	isReplaceCategory: boolean;
	accountInfo: any;
	categoryTree: any;
	category: any;
	location: any;
	dispatch: Function;
	valueOptions: any;
}

export interface ProductSku {
	skuId: number;
	name: string;
	skuImage?: string;
	images?: string[];
	isOnSale: boolean;
	attributes: {[key: string]: string};
	price: number;
	originalPrice?: number;
	weight: number;
	quantity: number;
	shippingFee: number;
	volume: any;
	sellerSkuId: string;
}

export interface ProductStates {
	isSingleProduct: boolean;
	loading: boolean;
	errorCategory: Object;
	errorName: Object;
	errorProductImage: Object;
	errorDescription: Object;
	errorStyle: Object;
	errorRow: Number;
}

// uploadImage.tsx
export interface UploadImageProps {
	accountInfo: any;
	productData: ProductData;
	productChange: Function;
	error: Object;
}

// skuUploadImage.tsx
export interface SkuUploadImageProps {
	dispatch: Function;
	accountInfo?: any;
	productData: ProductData;
	colorName: string;
	skuPropsIndex: number;
	valueIndex: number;
}

interface ErrorSingleStyle {
	sellerSkuId?: Object;
	originalPrice?: Object;
	price?: Object;
	quantity?: Object;
	shippingFee?: Object;
	weight?: Object;
	length?: Object;
	width?: Object;
	height?: Object;
}

// isSingle.tsx
export interface IsSingleProps {
	accountInfo: any;
	productData: any;
	productSkus: Array<any>;
	errorStyle: ErrorSingleStyle;
	dispatch?: any;
	show: boolean;
}

// isNotSingle.tsx
export interface IsNotSingleProps {
	valueOptions?: any;
	accountInfo?: any;
	productData: ProductData;
	productSkus: Array<any>;
	skuSelected?: any;
	dispatch?: any;
	errorStyle: ErrorSingleStyle;
	errorRow: Number;
	show: boolean;
}

export interface IsNotSingleState {
	originOptionMulti: any;
	batch: any;
}


// productEditor.tsx
export interface ProductEditorProps {
	errorDescription?: Object;
	productData?: ProductData;
	productChange?: Function;
	accountInfo?: any;
}
