export default {
    floordiv_int: (a: bigint, b: bigint) => {

        let result = a/b;
        if( result > 0 || a%b === 0n)
            return result;

        return --result;
    },
    mod_real: <T>(a: number, b: number) => {

        const mod = (a % b + b) % b;
        if( mod === 0 && b < 0 )
            return -0;
        return mod;
    },
    mod_int: <T>(a: bigint, b: bigint) => {

        return (a % b + b) % b;
    }
}