import { ReadStream } from "fs";
import { env } from "process";
import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";

export class ExpreArray extends Expression {
    constructor(
        public id: string,
        public condicionPop: boolean,
        line: number,
        column: number
    ) {
        super(line, column);
    }
    public execute(environment: Environment): Retorno {
        let result: Retorno;

        var arregloLocal = environment.getArray(this.id)?.contenido as Array<String>;
        if (this.condicionPop) {

            var enviar = arregloLocal.pop();
            environment.updateArray(this.id, arregloLocal);
            var arregloLocalComprobar = environment.getArray(this.id)?.contenido as Array<String>;
            console.log("ahora el arreglo <" + this.id + "> tiene :", arregloLocalComprobar);
             result = { value: enviar, type: Type.STRING };
             return result;
        } else {
            result = { value: arregloLocal.length, type: Type.NUMBER };
            return result;
        }
        
    }
    public ast() {

    }

}