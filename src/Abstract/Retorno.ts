export enum Type {
    NUMBER,
    STRING,
    BOOLEAN,
    error,
    DEFAULT
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

export function StringToType(cadena:string):Type {
    switch (cadena) {
        case "number":
            return Type.NUMBER
        case "string":
            return Type.STRING
        case "boolean":
            return Type.BOOLEAN
        default:
            return Type.error
    }
}