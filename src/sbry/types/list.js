export const TYPEID_unknown            = 0;
export const TYPEID_None               = 1;
export const TYPEID_NoneType           = 2;
export const TYPEID_NotImplemented     = 3;
export const TYPEID_NotImplementedType = 4;
export const TYPEID_int                = 5;
export const TYPEID_jsint              = 6;
export const TYPEID_float              = 7;
export const TYPEID_bool               = 8;
export const TYPEID_str                = 9;
export const TYPEID_type               =10;
export const TYPEID_type_int_          =11;
export const TYPEID_type_jsint_        =12;
export const TYPEID_type_float_        =13;
export const TYPEID_type_str_          =14;
export const TYPEID_type_bool_         =15;

const TYPES = new Array(16);
for(let i = 0; i < 16; ++i)
    TYPES[i] = Object.create(null);

export default TYPES;