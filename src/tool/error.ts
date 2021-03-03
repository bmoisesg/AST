export class error {
    /**
     * 
     * @param titulo Clasifica el tipo de error que se detecto, puede ser: lexico, sintactico o semantico
     * @param descripcion Detalle del error que se detecto
     * @param linea Linea en donde se encontro el error
     * @param columna Columna en donde se encontro el errors
     */
    constructor(
        public titulo: string,
        public descripcion: string,
        public linea: number,
        public columna: number
    ) { }
}