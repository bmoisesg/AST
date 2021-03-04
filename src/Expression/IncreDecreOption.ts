export enum IncreDecreOption {
    /*0*/INCREMENTO1,
    /*1*/INCREMENTO2,
    /*2*/DECREMENTO1,
    /*3*/DECREMENTO2
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