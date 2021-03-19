export var ArithmeticOption;
(function (ArithmeticOption) {
    /*0*/ ArithmeticOption[ArithmeticOption["MAS"] = 0] = "MAS";
    /*1*/ ArithmeticOption[ArithmeticOption["MENOS"] = 1] = "MENOS";
    /*2*/ ArithmeticOption[ArithmeticOption["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    /*3*/ ArithmeticOption[ArithmeticOption["DIV"] = 3] = "DIV";
    /*4*/ ArithmeticOption[ArithmeticOption["MODULO"] = 4] = "MODULO";
    /*5*/ ArithmeticOption[ArithmeticOption["POT"] = 5] = "POT";
    /*6*/ ArithmeticOption[ArithmeticOption["NEGACION"] = 6] = "NEGACION";
})(ArithmeticOption || (ArithmeticOption = {}));
/**
 *
 * @param objeto Enum ArithmeticOption
 * @return simbolo como string
 */
export function get_simbolo(objeto) {
    switch (objeto) {
        case 0:
            return "+";
        case 1:
        case 6:
            return "-";
        case 2:
            return "*";
        case 3:
            return "/";
        case 4:
            return "%";
        case 5:
            return "**";
        default:
            return "";
    }
}
/**
 *
 * @param objeto Enum ArithmeticOption
 * @return nombre del simbolo en string
 */
export function getName(objeto) {
    switch (objeto) {
        case 0:
            return "suma";
        case 1:
        case 6:
            return "resta";
        case 2:
            return "mutiplicacion";
        case 3:
            return "division";
        case 4:
            return "modulo";
        case 5:
            return "potencia";
        default:
            return "";
    }
}
