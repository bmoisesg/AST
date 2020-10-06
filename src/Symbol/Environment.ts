import { env } from "process"
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

    public guardar(id: string, valor: any, type: Type, condicion: boolean): boolean {
        for (let entry of Array.from(this.variables.entries())) {
            let key = entry[0];
            let value = entry[1];
            //console.log("->",key,value);
            //console.log(key +"=="+id+"?");
            if (key == id) {
                //console.log("si");
                return false
            }
        }
        this.variables.set(id, new Symbol(valor, id, type, condicion));
        return true
    }
    public guardarArreglo(id: string, tmp:Arreglo): boolean {
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
        this.arreglos.set(id,tmp);
        return false
    }
    public getEntorno(): String {
        var tmp = "";
        let env: Environment | null = this;
        tmp+="<table border=1><td>"
        while (env != null) {
            tmp+="<table border=1><tr><th>Nombre</th><th>Tipo</th><th>Valor</th></tr>"
            for (let entry of Array.from(env.variables.entries())) {
                tmp+="<tr>"
                let key = entry[0];
                tmp+="<td>"+key+"</td>";
                let value = entry[1];
                 
                tmp+="<td>"+getTipo(value.type)+"</td>"
                tmp+="<td>"+value.valor+"</td>"
                tmp+="</tr>"
            }
            for (let entry of Array.from(env.funciones.entries())) {
                tmp+="<tr>"
                let key = entry[0];
                tmp+="<td>"+key+"</td>";
                let value = entry[1];
                
                tmp+="<td>"+getTipo(4)+"</td>"
                tmp+="<td>"+value.parametros+"</td>"
                tmp+="</tr>"
            }
            tmp+="</table><br>"
            env = env.anterior;
        }
        tmp+="</td></table><br>"
        return tmp;
    }

    public actualizar(id: string, valor: any, type: Type, condicion: boolean): boolean {
        let env: Environment | null = this;

        while (env != null) {
            if (env.variables.has(id)) {
                for (let entry of Array.from(env.variables.entries())) {
                    let key = entry[0];
                    let value = entry[1];
                    if (key == id) {
                        entry[1].valor = valor;
                        entry[1].type = type;
                        entry[1].condicion = condicion;
                        //console.log("supuestamente actuazlice el valor de la variable " + id + " por el valor " + entry[1].valor);
                        return true//significa que si encontro el entorno
                    }
                }
            }
            env = env.anterior;
        }
        return false;
    }


    public getVar(id: string): Symbol | undefined | null {
        let env: Environment | null = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
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
    public updateArray(id: string, arreglo:Array<any>) {
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


function getTipo(id:number):String {
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