export class Singleton {
    constructor() {
        this.error = "";
        this.ast = "";
        this.entorno = "";
        this.consola = "";
        this.pila = [];
    }
    static getInstance() {
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
    add_error(data) {
        this.error +=
            "<tr>" +
                "<td>" + data.titulo + "</td>" +
                "<td>" + data.descripcion + "</td>" +
                "<td>" + data.linea + "</td>" +
                "<td>" + data.columna + "</td>" +
                "</tr>";
    }
    /**
     *
     * @returns un string con el codigo con el formato html para reportar
     */
    get_error() {
        return `
        <table border=1 style="width: 75%;margin: 0 auto;" cellpadding ="5">
            <tr>
                <th>Tipo error</th>
                <th>Descripcion</th>
                <th>Linea</th>
                <th>Columna</th>
            </tr>${this.error}
        </table>`;
    }
    add_ast(data) {
        this.ast += data;
    }
    get_ast() {
        return this.ast;
    }
    add_consola(data) {
        this.consola += data;
    }
    get_consola() {
        return this.consola;
    }
    /**
     * add_pila
     */
    add_pila(data) {
        this.pila.push(data);
    }
    add_entorno(data) {
        this.entorno += data;
    }
    get_entorno() {
        return this.entorno;
    }
}
