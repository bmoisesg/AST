import { env } from "process"
import { Symbol } from "./Symbol";
import { Type } from "../Abstract/Retorno";

export class Environment{
    
    private variables : Map<string, Symbol>;
    
    constructor(public anterior : Environment | null){
        this.variables = new Map();
    }

    public guardar(id: string, valor: any, type: Type, condicion:boolean) : boolean{
        for (let entry of Array.from(this.variables.entries())) {
            let key = entry[0];
            let value = entry[1];
            //console.log("->",key,value);
            //console.log(key +"=="+id+"?");
            if(key == id){
                //console.log("si");
                return false
            }
        }
        this.variables.set(id, new Symbol(valor, id, type, condicion));
        return true
    }
    
    public getVar(id: string) : Symbol | undefined | null{
        let env : Environment | null = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }   
}
/*envGlobal

function X() {
    env
    env.anterior = envGlobal;
    if(1){
        envIf
        envIf.anterior = env

    }
}*/ 