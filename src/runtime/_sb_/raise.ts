export class PythonError extends Error {

    readonly python_exception: any;

    constructor(python_exception: any) {
        super();
        python_exception._raw_err_ = this;
        this.python_exception = python_exception;
    }
}


export default {
    PythonError
};