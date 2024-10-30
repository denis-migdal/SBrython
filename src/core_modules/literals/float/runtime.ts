export default {
    float2str: (f: number) => {
        if( f <= 1e-5 || f >= 1e16) {

            let str = f.toExponential();
            const sign_idx = str.length-2;
            if(str[sign_idx] === '-' || str[sign_idx] === '+')
                str = str.slice(0,sign_idx+1) + '0' + str.slice(sign_idx+1);
            return str;
        }

        let str = f.toString();
        if( ! str.includes('.'))
            str += ".0";
        return str;
    }
}