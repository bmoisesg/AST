import { Symbol } from "./Symbol";
import { Type } from "../Abstract/Retorno";
import { InsFuncion } from "../Instruction/InsFuncion"
import { Arreglo } from "../Instruction/Arreglo";

export class Environment {

    private variables: Map<string, Symbol>;
    public funciones: Map<string, InsFuncion>;
    public arreglos: Map<string, Arreglo>;

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
     * @param nombre nombre de la variable que se quiere declarar
     * @returns si encontro el nombre en las variables almacenadas
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
        //no encontro el nombre repetido, osea que esta disponible
        return false
    }

    public guardarArreglo(id: string, tmp: Arreglo): boolean {
        for (let entry of Array.from(this.variables.entries())) {
            let key = entry[0];
            //console.log("->",key,value);
            //console.log(key +"=="+id+"?");
            if (key == id) {
                //console.log("si");
                return true
            }
        }
        for (let entry of Array.from(this.arreglos.entries())) {
            let key = entry[0];
            //console.log("->",key,value);
            //console.log(key +"=="+id+"?");
            if (key == id) {
                //console.log("si");
                return true
            }
        }
        this.arreglos.set(id, tmp);
        return false
    }
    public getEntorno(): String {
        var tmp = "";
        let env: Environment | null = this;
        tmp += "<table border=1><td>"
        while (env != null) {
            tmp += "<table border=1><tr><th>Nombre</th><th>Tipo</th><th>Valor</th></tr>"
            for (let entry of Array.from(env.variables.entries())) {
                tmp += "<tr>"
                let key = entry[0];
                tmp += "<td>" + key + "</td>";
                let value = entry[1];

                tmp += "<td>" + getTipo(value.type) + "</td>"
                tmp += "<td>" + value.value + "</td>"
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


    public guardarFuncion(id: string, funcion: InsFuncion) {
        this.funciones.set(id, funcion);
    }
    public getExisteIdFuncion(id: string): boolean {

        for (let entry of Array.from(this.funciones.entries())) {
            let key = entry[0];
            //console.log("pregunta:", key,"," ,id, "condicion=",  key == id)
            if (key == id) {
                return true// si encontro una funcion con este nombre
            }
        }
        return false;
    }
    public getExisteIdArray(id: string): boolean {
        let env: Environment | null = this;
        while (env != null) {
            for (let entry of Array.from(env.arreglos.entries())) {
                let key = entry[0];
                //console.log(key,"==",id);
                if (key == id) {
                    //console.log("si");
                    return true// si encontro un array con este nombre
                }
            }
            env = env.anterior;

        }
        return false;
    }

    public getFuncion(id: string): InsFuncion | undefined {
        let env: Environment | null = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }
    public getArray(id: string): Arreglo | undefined {
        let env: Environment | null = this;
        while (env != null) {
            if (env.arreglos.has(id)) {
                return env.arreglos.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }
    public updateArray(id: string, arreglo: Array<any>) {
        let env: Environment | null = this;
        while (env != null) {
            if (env.arreglos.has(id)) {
                for (let entry of Array.from(env.arreglos.entries())) {
                    let key = entry[0];
                    let value = entry[1];
                    if (key == id) {
                        entry[1].contenido = arreglo;
                        return true//significa que si encontro el entorno
                    }
                }
            }
            env = env.anterior;
        }
    }

    public getGlobal(): Environment {
        let env: Environment | null = this;
        while (env?.anterior != null) {
            env = env.anterior;
        }
        return env;
    }
}


function getTipo(id: number): String {
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