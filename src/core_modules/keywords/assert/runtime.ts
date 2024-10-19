function assert(cond: boolean) {
    if( cond )
        return;

    throw new Error('Assertion failed');
}


export default {
    assert
};