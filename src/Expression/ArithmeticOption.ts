export enum ArithmeticOption {
    MAS,
    MENOS,
    MULT,
    DIV,
    MODULO,
    POT,
    NEGACION,
}

//Pasar el enum a un simbolo
export function optionToSymbol(option: ArithmeticOption): string {
    switch (option) {
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

//Pasar el enum a una cadena
export function optionToString(option: ArithmeticOption): string {
    switch (option) {
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
