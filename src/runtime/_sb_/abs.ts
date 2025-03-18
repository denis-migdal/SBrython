export default {
    abs: (n: bigint) => {
        if( n >= 0)
            return n;
        return -n;
    }
}