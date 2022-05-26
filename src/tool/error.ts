export class error {
  constructor(
    //TODO quitar el tipo string
    public titulo: string | TypeError,
    public descripcion: string,
    public linea: number,
    public columna: number
  ) {}
}

export enum TypeError {
  Lexico,
  Sintactico,
  Semantico,
}
