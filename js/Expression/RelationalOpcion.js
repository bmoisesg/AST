export var RelationalOption;
(function (RelationalOption) {
    /*0*/ RelationalOption[RelationalOption["IGUAL"] = 0] = "IGUAL";
    /*1*/ RelationalOption[RelationalOption["DIFERENCIACION"] = 1] = "DIFERENCIACION";
    /*2*/ RelationalOption[RelationalOption["MENOR"] = 2] = "MENOR";
    /*3*/ RelationalOption[RelationalOption["MENORIGUAL"] = 3] = "MENORIGUAL";
    /*4*/ RelationalOption[RelationalOption["MAYOR"] = 4] = "MAYOR";
    /*5*/ RelationalOption[RelationalOption["MAYORIGUAL"] = 5] = "MAYORIGUAL";
})(RelationalOption || (RelationalOption = {}));
/**
 *
 * @param objeto el relationalOpcion
 * @returns simbolo del signo relacional en string
 */
export function get_simbolo(objeto) {
    switch (objeto) {
        case 0:
            return "==";
        case 1:
            return "!=";
        case 2:
            return "\\<";
        case 3:
            return "\\<=";
        case 4:
            return "\\>";
        case 5:
            return "\\>=";
        default:
            return "";
    }
}
/**
 *
 * @param objeto enum relacional
 * @returns devuelve el nombre del simbolo relacional como tipo string
 */
export function getName(objeto) {
    switch (objeto) {
        case 0:
            return "igualdad";
        case 1:
            return "diferencia";
        case 2:
            return "menor";
        case 3:
            return "menorIgualQue";
        case 4:
            return "mayor";
        case 5:
            return "mayorIgualQue";
        case 6:
            return "and";
        case 7:
            return "or";
        case 8:
            return "not";
        default:
            return "";
    }
}
