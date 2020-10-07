import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Retorno, Type } from "../Abstract/Retorno";
import { type } from "os";
const parser = require('../Grammar/Grammar');
export class Access extends Expression{

    constructor(private id: string, line : number, column: number){
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const value = environment.getVar(this.id);
        if(value == null){
            const tmp= environment.getArray(this.id);
            //console.log("-> ",tmp?.contenido);
            if(tmp!=null){
                return {value : tmp.contenido, type : Type.STRING};
            }
            throw new Error("<tr><td>semantico</td><td>La variable '" + this.id + "' no existe [Acceso] </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
        }
            //throw new Error("La variable no existe");
            //const value1= environment.getArray();
        return {value : value.valor, type : value.type};
    }
    public ast(id:string){
        parser.ast += "node" + this.line + '_' + (this.column)+";\n"
        + "node" + this.line + '_' + (this.column) + '[label="' + this.id + '"];\n'
    }
}