export enum IncreDecreOption {
    /*0*/INCREMENTO1,/*ID++*/
    /*1*/INCREMENTO2,/*++ID*/
    /*2*/DECREMENTO1,/*ID--*/
    /*3*/DECREMENTO2 /*--ID*/
}

export function getname(objeto: IncreDecreOption): string {
    switch (objeto) {
        case 0:
        case 1:
            return "incremento"
        case 2:
        case 3:
            return "decremetno"
        default:
            return ""
    }
}

export function getsimbol(objeto: IncreDecreOption): string {
    switch (objeto) {
        case 0:
        case 1:
            return "++"
        case 2:
        case 3:
            return "--"
        default:
            return ""
    }
}