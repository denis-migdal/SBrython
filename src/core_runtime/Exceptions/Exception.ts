import Py_object from "@SBrython/core_runtime/object";

export default class Py_Exception extends Py_object {

}


// __traceback__
    // tb_next
    // tb_frame
        // f_back ?
        // f_local : enable only in compat mode.
        // f_lineno (line)
        // f_code
            // co_name (fct name ?)
            // co_filename