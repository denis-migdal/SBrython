let KW: Record<string, any> = {};

export default {
    kw: (keywords: Record<string, any>) => {
        KW = keywords;
    },
    getKW: () => {
        const _ = KW;
        KW = {};
        return _;
    }
}