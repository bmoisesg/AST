export var IncreDecreOption;
(function (IncreDecreOption) {
    /*0*/ IncreDecreOption[IncreDecreOption["INCREMENTO1"] = 0] = "INCREMENTO1";
    /*1*/ IncreDecreOption[IncreDecreOption["INCREMENTO2"] = 1] = "INCREMENTO2";
    /*2*/ IncreDecreOption[IncreDecreOption["DECREMENTO1"] = 2] = "DECREMENTO1";
    /*3*/ IncreDecreOption[IncreDecreOption["DECREMENTO2"] = 3] = "DECREMENTO2"; /*--ID*/
})(IncreDecreOption || (IncreDecreOption = {}));
export function getname(objeto) {
    switch (objeto) {
        case 0:
        case 1:
            return "incremento";
        case 2:
        case 3:
            return "decremetno";
        default:
            return "";
    }
}
export function getsimbol(objeto) {
    switch (objeto) {
        case 0:
        case 1:
            return "++";
        case 2:
        case 3:
            return "--";
        default:
            return "";
    }
}
