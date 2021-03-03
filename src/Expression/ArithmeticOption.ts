export enum ArithmeticOption {
    /*0*/  MAS,
    /*1*/  MENOS,
    /*2*/  MULTIPLICACION,
    /*3*/  DIV,
    /*4*/  MODULO,
    /*5*/  POT,
    /*6*/  NEGACION
}
/**
 * 
 * @param objeto Enum ArithmeticOption 
 * @return simbolo como string 
 */
export function get_simbolo(objeto: ArithmeticOption): string {
    switch (objeto) {
        case 0:
            return "+"
        case 1:
        case 6:
            return "-"
        case 2:
            return "*"
        case 3:
            return "/"
        case 4:
            return "%"
        case 5:
            return "**"
        default:
            return "";
    }
}
/**
 * 
 * @param objeto Enum ArithmeticOption 
 * @return nombre del simbolo en string
 */
export function getName(objeto: ArithmeticOption): string {
    switch (objeto) {
        case 0:
            return "suma"
        case 1:
        case 6:
            return "resta"
        case 2:
            return "mutiplicacion"
        case 3:
            return "division"
        case 4:
            return "modulo"
        case 5:
            return "potencia"
        default:
            return "";
    }
}