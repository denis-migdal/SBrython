function assert(cond: boolean) {
    //TODO: if __DEBUG__
    if( cond )
        return;

    throw new Error('Assertion failed');
}


export default {
    assert
};