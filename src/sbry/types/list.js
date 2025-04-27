export const TYPEID_unknown            = 0;
export const TYPEID_NoneType           = 1;
export const TYPEID_None               = 2;
export const TYPEID_NotImplementedType = 3;
export const TYPEID_NotImplemented     = 4;
export const TYPEID_type               = 5;
export const TYPEID_type_int_          = 6;
export const TYPEID_int                = 7;
export const TYPEID_type_jsint_        = 8;
export const TYPEID_jsint              = 9;
export const TYPEID_type_float_        =10;
export const TYPEID_float              =11;
export const TYPEID_type_bool_         =12;
export const TYPEID_bool               =13;
export const TYPEID_type_str_          =14;
export const TYPEID_str                =15;

const TYPES = new Array(16);
for(let i = 0; i < 16; ++i)
    TYPES[i] = Object.create(null);

export default TYPES;