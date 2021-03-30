 var Type;
(function (Type) {
    /*0*/ Type[Type["NUMBER"] = 0] = "NUMBER";
    /*1*/ Type[Type["STRING"] = 1] = "STRING";
    /*2*/ Type[Type["BOOLEAN"] = 2] = "BOOLEAN";
    /*3*/ Type[Type["error"] = 3] = "error";
})(Type || (Type = {}));
/**
 *
 * @param objeto Objeto tipo Type
 * @returns String con el nombre del tipo
 */
 function get(objeto) {
    switch (objeto) {
        case 0:
            return "number";
        case 1:
            return "string";
        case 2:
            return "boolean";
        default:
            return "";
    }
}
