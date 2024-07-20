export class PythonError {

    readonly python_exception: any;

    constructor(python_exception: any) {
        this.python_exception = python_exception;
    }
}


export default {
    PythonError
};