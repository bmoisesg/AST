import { env } from "process"
import { Symbol } from "./Symbol";
import { Type } from "../Abstract/Retorno";

export class Environment {

    private variables: Map<string, Symbol>;
    public funciones : Map<string, Function>;

    constructor(public anterior: Environment | null) {
        this.variables = new Map();
        this.funciones = new Map();
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

    public actualizar(id: string, valor: any, type: Type, condicion: boolean): boolean {
        let env: Environment | null = this;

        while (env != null) {
            if (env.variables.has(id)) {
                for (let entry of Array.from(env.variables.entries())) {
                    let key = entry[0];
                    let value = entry[1];
                    if (key == id) {
                        entry[1].valor = valor;
                        entry[1].type= type;
                        entry[1].condicion= condicion;
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

    public guardarFuncion(id: string, funcion : Function){
        //TODO ver si la funcion ya existe, reportar error
        this.funciones.set(id, funcion);
        console.log(this.funciones)
    }

    public getFuncion(id: string) : Function | undefined{
        let env : Environment | null = this;
        while(env != null){
            if(env.funciones.has(id)){
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }

    public getGlobal() : Environment{
        let env : Environment | null = this;
        while(env?.anterior != null){
            env = env.anterior;
        }
        return env;
    }
}