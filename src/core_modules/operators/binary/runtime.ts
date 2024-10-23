export default {
    floordiv: (a: bigint, b: bigint) => {

        let result = a/b;
        if( result > 0 || a%b === 0n)
            return result;

        return result - 1n;
    }
}