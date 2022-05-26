export enum Type {
    NUMBER,
    STRING,
    BOOLEAN,
    error
}

export function TypetoString(objeto: Type): string {
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