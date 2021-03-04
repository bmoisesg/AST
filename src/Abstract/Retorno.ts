export enum Type {
    /*0*/NUMBER,
    /*1*/STRING,
    /*2*/BOOLEAN,
    /*3*/error
}
/**
 * 
 * @param objeto Objeto tipo Type
 * @returns String con el nombre del tipo 
 */
export function get(objeto: Type): string {
    switch (objeto) {
        case 0:
            return "number"
        case 1:
            return "string"
        case 2:
            return "boolean"
        default:
            return ""
    }
}

export type Retorno = {
    value: any,
    type: Type
}