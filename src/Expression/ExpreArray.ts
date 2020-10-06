import { ReadStream } from "fs";
import { env } from "process";
import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";

export class ExpreArray extends Expression {
    constructor(
        public id: string,
        public condicionPop: boolean,
        public condicionAsignacion: boolean,
        public expresion:Expression,
        line: number,
        column: number
    ) {
        super(line, column);
    }
    public execute(environment: Environment): Retorno {
        let result: Retorno;
        var condicion =environment.getExisteIdArray(this.id)
       // console.log(condicion);
        if (condicion==false) {
            throw new Error("<tr><td>semantico</td><td>Este array '" + this.id + "' no existe </td><td>" + (this.line) + "</td><td>" + (this.column + 1) + "</td></tr>");
        }


        //desde este punto si existe el array
        var arregloLocal_tmp = environment.getArray(this.id);
        var arregloLocal = environment.getArray(this.id)?.contenido as Array<any>;
        
        
        if(this.condicionAsignacion){
            const expresion = this.expresion.execute(environment);
            if (expresion.type != 0) {
                throw new Error("<tr><td>semantico</td><td>Tipo de dato de Index no valido , tiene que ser numerico </td><td>" + (this.line) + "</td><td>" + (this.column + 1) + "</td></tr>");
            }
            //ya si es numerico el index ahora solo es de ir a traer el dato y entregarlo
            
            if (arregloLocal_tmp?.tipo=="string") result = { value: arregloLocal[expresion.value], type: Type.STRING };
            else if (arregloLocal_tmp?.tipo=="number") result = { value: arregloLocal[expresion.value], type: Type.NUMBER };
            else result = { value: arregloLocal[expresion.value], type: Type.BOOLEAN };
            return result;
        }
        
        
        
        if (this.condicionPop) {
            //pop
            var enviar = arregloLocal.pop();
            environment.updateArray(this.id, arregloLocal);
            var arregloLocalComprobar = environment.getArray(this.id)?.contenido as Array<String>;
            console.log("ahora el arreglo <" + this.id + "> tiene :", arregloLocalComprobar);
            if (arregloLocal_tmp?.tipo=="string") result = { value: enviar, type: Type.STRING };
            else if (arregloLocal_tmp?.tipo=="number") result = { value: enviar, type: Type.NUMBER };
            else result = { value: enviar, type: Type.BOOLEAN };
            return result;
        } else {
            //legth
            result = { value: arregloLocal.length, type: Type.NUMBER };
            return result;
        }

    }
    public ast() {

    }

}