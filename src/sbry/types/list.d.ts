import type {Type} from './utils/types';

//@ts-ignore
import {BRAND} from '@SBrython/dop';


declare const LIST: Type[];
export default LIST;

export declare const TYPEID_None              : BRAND<0  , "TYPE_ID">;
export declare const TYPEID_NoneType          : BRAND<1  , "TYPE_ID">;
export declare const TYPEID_NotImplemented    : BRAND<2  , "TYPE_ID">;
export declare const TYPEID_NotImplementedType: BRAND<3  , "TYPE_ID">;
export declare const TYPEID_int               : BRAND<4  , "TYPE_ID">;
export declare const TYPEID_jsint             : BRAND<5  , "TYPE_ID">;
export declare const TYPEID_float             : BRAND<6  , "TYPE_ID">;
export declare const TYPEID_bool              : BRAND<7  , "TYPE_ID">;
export declare const TYPEID_str               : BRAND<8  , "TYPE_ID">;
export declare const TYPEID_type              : BRAND<9  , "TYPE_ID">;
export declare const TYPEID_type_int_         : BRAND<10 , "TYPE_ID">;
export declare const TYPEID_type_jsint_       : BRAND<11 , "TYPE_ID">;
export declare const TYPEID_type_float_       : BRAND<12 , "TYPE_ID">;
export declare const TYPEID_type_str_         : BRAND<13 , "TYPE_ID">;
export declare const TYPEID_type_bool_        : BRAND<14 , "TYPE_ID">;
