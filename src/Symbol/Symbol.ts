import { Type } from "../Abstract/Retorno";

export class Symbol {
  /**
   * Clase que guarda toda la informacion importante de una variable y despues sera almacenada en la tabla de simbolos
   */
  constructor(
    public value: any,
    public id: string,
    public type: Type,
    public edit: boolean
  ) {}
}
