import { Symbol } from "./Symbol"
import { Type } from "../Abstract/Retorno"
import { InsFuncion } from "../Instruction/InsFuncion"
import { Arreglo } from "../Instruction/Arreglo"

export class Environment {

    private variables: Map<string, Symbol>
    public funciones: Map<string, InsFuncion>
    public arreglos: Map<string, Arreglo>

    constructor(public anterior: Environment | null) {
        this.variables = new Map();
        this.funciones = new Map();
        this.arreglos = new Map();
    }

    /**
     * Metodo para guardar una VARIABLE en la tabla de simbolos
     * @param id nombre de la variable
     * @param valor valor de la variable
     * @param type tipo de dato de la variable
     * @param condicion si es editable
     * @returns boolan si se efectuo el almacenamiento de la variable
     */
    public guardar_variable(nombre: string, valor: any, type: Type, condicion: boolean): boolean {

        //revisar que el nombre de la nueva variable se encuentre disponible
        if (this.revisarRepetido(nombre)) return false

        //agrega la variable al MAP 
        this.variables.set(nombre, new Symbol(valor, nombre, type, condicion))
        return true
    }

    /**
     * Metodo para actualizar una VARIABLE almacenada en la tabla de simbolos con un nombre 
     * @param nombre Nombre de la variable que se quiere actualizar
     * @param valor Valor con el que se actualizara
     */
    public actualizar_variable(nombre: string, valor: any) {

        let env: Environment | null = this;

        while (env != null) {
            if (env.variables.has(nombre)) {
                for (let entry of Array.from(env.variables.entries())) {
                    if (entry[0] == nombre) {
                        entry[1].value = valor;
                        return
                    }
                }
            }
            env = env.anterior;
        }
    }

    /**
     * Metodo para retornar una VARIABLE como [Symbol]  
     * @param nombre buscar el nombre de la variable en todos los entornos 
     * @returns Un objeto [Symbol] que tiene la informacion de la variable
     */
    public get_variable(nombre: string): Symbol | undefined | null {
        let env: Environment | null = this;
        while (env != null) {
            if (env.variables.has(nombre)) return env.variables.get(nombre);
            env = env.anterior;
        }
        return null;
    }

    /**
     * 
     * @param nombre nombre de la variable,arreglo o funcion que se quiere declarar
     * @returns si encontro el nombre en la tabla de simbolos retorna un true
     */
    public revisarRepetido(nombre: string): boolean {

        //revisar en los arreglos almacenados
        for (let entry of Array.from(this.arreglos.entries())) {
            if (entry[0] == nombre) return true;
        }
        //revisar en las variables almacenadas
        for (let entry of Array.from(this.variables.entries())) {
            if (entry[0] == nombre) return true;
        }
        //revisar en las funciones almacenadas
        for (let entry of Array.from(this.funciones.entries())) {
            if (entry[0] == nombre) return true;
        }
        //no encontro el nombre , osea que esta disponible para usar
        return false
    }

    /**
     * Guardar la funcion en la tabla de simbolos, literalmente se guardar la instruccion "Instfuncion"
     * @param id Nombre de la funcion con la que se guardara
     * @param funcion clase tipo "InsFunccion"
     */
    public guardar_funcion(id: string, funcion: InsFuncion) {
        this.funciones.set(id, funcion)
    }

    /**
     * Retorna la clase INSFUNCION para ejecutarla
     * @param id nombre de la funcion con la qu ese guardo en la tabla de simbolos
     * @returns Clase INSFUNCION
     */
    public get_funcion(id: string): InsFuncion | undefined | null {
        let env: Environment | null = this
        while (env != null) {
            if (env.funciones.has(id)) return env.funciones.get(id)
            env = env.anterior
        }
        return env
    }

    /**
     * Guardar un arreglo en la tabla de simbolos
     * @param id nombre con el que se quiere guardar
     * @param tmp objeto
     * @returns boolean si se pudo guardar en la tabla de simbolos
     */
    public guardar_arreglo(id: string, tmp: Arreglo): boolean {

        if (this.revisarRepetido(id)) return false
        this.arreglos.set(id, tmp)
        return true
    }

    /**
      * Busca un array en la tabla de simbolos y la retorna
      * @param nombre Nombre del array que se esta buscando
      * @returns 
      */
    public get_array(nombre: string): Arreglo | undefined {
        let env: Environment | null = this
        while (env != null) {
            if (env.arreglos.has(nombre)) return env.arreglos.get(nombre)
            env = env.anterior
        }
        return undefined
    }

    /**
     * Actualizar el array en la tabla de simbolos
     * @param id Nombre del array con el que se guardara en la tabla de simbolos
     * @param arreglo Objeto el cual se guardara
     */
    public update_array(id: string, arreglo: Array<any>) {
        let env: Environment | null = this;
        while (env != null) {
            if (env.arreglos.has(id)) {
                for (let entry of Array.from(env.arreglos.entries())) {
                    if (entry[0] == id) {
                        entry[1].contenido = arreglo
                        return
                    }
                }
            }
            env = env.anterior;
        }
    }
    /**
     * Crear el reporte para la tabla de simbolos
     * @returns string que contiene una tabla html de los entornos en ese momento
     */
    public getEntorno(): string {
        var tmp = "";
        let env: Environment | null = this;
        tmp += "<table border=1 style=\"width: 75%;margin: 0 auto;\" cellpadding =\"5\"><td>"
        while (env != null) {
            tmp += "<table border=1 style=\"width: 75%;margin: 0 auto;\" cellpadding =\"5\"><tr><th>Nombre</th><th>Tipo</th><th>Valor</th></tr>"
            for (let entry of Array.from(env.variables.entries())) {
                tmp += "<tr>"
                let key = entry[0];
                tmp += "<td>" + key + "</td>";
                let value = entry[1];
                tmp += "<td>" + getTipo(value.type) + "</td>"
                tmp += "<td>" + value.value + "</td>"
                tmp += "</tr>"
            }
            for (let entry of Array.from(env.arreglos.entries())) {
                tmp += "<tr>"
                let key = entry[0];
                tmp += "<td>" + key + "</td>";
                let value = entry[1];
                tmp += "<td>" + value.tipo + "</td>"
                tmp += "<td>[" + value.contenido + "]</td>"
                tmp += "</tr>"
            }
            for (let entry of Array.from(env.funciones.entries())) {
                tmp += "<tr>"
                let key = entry[0];
                tmp += "<td>" + key + "</td>";
                let value = entry[1];
                tmp += "<td>" + getTipo(4) + "</td>"
                tmp += "<td>" + value.parametros + "</td>"
                tmp += "</tr>"
            }
            tmp += "</table><br>"
            env = env.anterior;
        }
        tmp += "</td></table><br>"
        return tmp;
    }


}


export function getTipo(id: number): String {
    switch (id) {
        case 0:
            return "Numero"
        case 1:
            return "String"
        case 2:
            return "Boolean"
        default:
            return "void";
    }
}