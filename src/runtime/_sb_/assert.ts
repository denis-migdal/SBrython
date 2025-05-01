function assert(cond: boolean, msg: string = 'Assertion failed') {

    if( ! cond )
        throw new Error(msg);
}


export default {
    assert
};