export const TYPEID_None               = 0;
export const TYPEID_NoneType           = 1;
export const TYPEID_NotImplemented     = 2;
export const TYPEID_NotImplementedType = 3;
export const TYPEID_int                = 4;
export const TYPEID_jsint              = 5;
export const TYPEID_float              = 6;
export const TYPEID_bool               = 7;
export const TYPEID_str                = 8;
export const TYPEID_type               = 9;
export const TYPEID_type_int_          =10;
export const TYPEID_type_jsint_        =11;
export const TYPEID_type_float_        =12;
export const TYPEID_type_str_          =13;
export const TYPEID_type_bool_         =14;

const TYPES = new Array(15);
for(let i = 0; i < 15; ++i)
    TYPES[i] = Object.create(null);

export default TYPES;