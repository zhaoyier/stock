export const emailPattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

export const phonePattern = /^(0|86|17951)?(1[0-9][0-9])[0-9]{8}$/;

export const chineseLiteraryPattern = /[\u4e00-\u9fa5]/;

export const unChineseLiteraryPattern = /[^\u4e00-\u9fa5]/g;

export const unIdentifierNumPattern = /[^A-Z0-9]/g;

export const passwordPattern = /[0-9A-Za-z]{6,20}/;

export const letterAndNumPattern = /^[0-9A-Za-z]+$/;

export const verifyCodePattern = /^[0-9]{4}$/;

export const qqPattern = /^[1-9][0-9]{4,}$/;
export const shopNamePattern = /^[a-zA-Z0-9][a-zA-Z0-9'\s]{1,19}[a-zA-Z0-9]$/;
