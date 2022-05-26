export enum RelationalOption {
    IGUAL,
    DIFERENCIACION,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL
}

export function optionToSymbol(option: RelationalOption): string {
    switch (option) {
        case 0:
            return "=="
        case 1:
            return "!="
        case 2:
            return "\\<"
        case 3:
            return "\\<="
        case 4:
            return "\\>"
        case 5:
            return "\\>="
        default:
            return ""
    }
}

export function optionToString(option: RelationalOption): string {
    switch (option) {
        case 0:
            return "igualdad"
        case 1:
            return "diferencia"
        case 2:
            return "menor"
        case 3:
            return "menorIgualQue"
        case 4:
            return "mayor"
        case 5:
            return "mayorIgualQue"
        default:
            return ""
    }
}