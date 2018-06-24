/**
 * This file is auto-generated by protobufgen
 * Don't change manually
 */

export enum ErrorCode {
	ErrorCodeOK = "ErrorCodeOK",
	ErrorCodeNotFound = "ErrorCodeNotFound",
	ErrorCodeOutOfStock = "ErrorCodeOutOfStock",
	ErrorCodeUnknown = "ErrorCodeUnknown",
	ErrorCodeInvalidCatalog = "ErrorCodeInvalidCatalog",
	ErrorCodeBlock = "ErrorCodeBlock",
	ErrorCodeUnexpected = "ErrorCodeUnexpected",
	ErrorCodeInvalidExchange = "ErrorCodeInvalidExchange"
}

export interface Error {
	code: ErrorCode;
	msg: string;
}
