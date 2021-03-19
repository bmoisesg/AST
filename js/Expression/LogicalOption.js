export var LogicalOption;
(function (LogicalOption) {
    /*0*/ LogicalOption[LogicalOption["AND"] = 0] = "AND";
    /*1*/ LogicalOption[LogicalOption["OR"] = 1] = "OR";
    /*2*/ LogicalOption[LogicalOption["NOT"] = 2] = "NOT";
})(LogicalOption || (LogicalOption = {}));
/**
 *
 * @param objeto logicaloption
 * @returns el simbolo logico que se envio y retorna como string
 */
export function getSimbol(objeto) {
    switch (objeto) {
        case 0:
            return "&&";
        case 1:
            return "\\|\\|";
        case 2:
            return "!";
    }
    return "";
}
/**
 *
 * @param objeto logicalOption
 * @returns nombre del simbolo que se envio y retorna como string
 */
export function getName(objeto) {
    switch (objeto) {
        case 0:
            return "AND";
        case 1:
            return "OR";
        case 2:
            return "NOT";
    }
    return "";
}
