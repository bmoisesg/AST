import { Instruction } from "../Abstract/Instruction"

export class Singleton {
    private static instance: Singleton
    private error: string = ""
    private ast: string = ""
    private consola: string = ""
    private pila: Instruction[] = []

    private constructor() { }

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    /**
   * Agrega un error a la lista.
   *
   * @remarks
   * Recibe un objeto {tipo,descripcion, linea, columna} el cual es almacenado con un formato <tr> para presentar como una table en html
   *
   */
    public add_error(data: any) {
        this.error +=
            "<tr>" +
            "<td>" + data.titulo + "</td>" +
            "<td>" + data.descripcion + "</td>" +
            "<td>" + data.linea + "</td>" +
            "<td>" + data.columna + "</td>" +
            "</tr>"
    }

    /**
     * 
     * @returns un string con el codigo con el formato html para reportar
     */
    public get_error() {
        return `
        <table border=1  border=1 style="width: 75%;margin: 0 auto;" cellpadding ="5">
            <tr>
                <td>Tipo</td>
                <td>Descipcion</td>
                <td>Linea</td>
                <td>Columna</td>
            </tr>${this.error}
        </table>`
    }

    public add_ast(data: string) {
        this.ast += data
    }
    public get_ast(): string {
        return this.ast
    }
    public add_consola(data: string) {
        this.consola += data
    }
    public get_consola(): string {
        return this.consola
    }
    /**
     * add_pila
     */
    public add_pila(data:Instruction) {
        this.pila.push(data)
    }
}
