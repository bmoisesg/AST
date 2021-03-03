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
        default:
            return "decremetno"
    }
}