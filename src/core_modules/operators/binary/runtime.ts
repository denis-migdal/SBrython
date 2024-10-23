export default {
    floordiv_int: (a: bigint, b: bigint) => {

        let result = a/b;
        if( result > 0 || a%b === 0n)
            return result;

        return --result;
    },
    mod_real: <T>(a: number, b: number) => {
        // @ts-ignore
        return (a%b)+b*(a < 0 !== b < 0);
    },
    mod_int: <T>(a: bigint, b: bigint) => {

        if( a < 0 !== b < 0)
            return (a%b)+b;

        // @ts-ignore
        return a%b;
    }
}