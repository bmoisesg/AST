import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Retorno } from "../Abstract/Retorno";
import { type } from "os";
const parser = require('../Grammar/Grammar');
export class Access extends Expression{

    constructor(private id: string, line : number, column: number){
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const value = environment.getVar(this.id);
        if(value == null)
            //throw new Error("La variable no existe");
            throw new Error("<tr><td>semantico</td><td>La variable '" + this.id + "' no existe </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
        return {value : value.valor, type : value.type};
    }
    public ast(id:string){
        parser.ast += "node" + this.line + '_' + (this.column)+";\n"
        + "node" + this.line + '_' + (this.column) + '[label="' + this.id + '"];\n'
    }
}