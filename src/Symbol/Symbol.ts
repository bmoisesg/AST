import { Type } from "../Abstract/Retorno";

//guarda toda la informacion importante de una variable y despues sera almacenada en la tabla de simbolos
export class Symbol {
    constructor(
        public value: any,
        public id: string,
        public type: Type,
        public edit: boolean
    ) {

    }
}