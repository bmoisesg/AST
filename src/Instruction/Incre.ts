import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/Retorno";
const parser = require('../Grammar/Grammar');
export class Incre extends Instruction {

    constructor(
        private tipo: string,
        private id: string,
        line: number,
        column: number) {
        super(line, column);
    }

    public execute(env: Environment) {
        //console.log("---------------metodo incremento ->"+this.id, " con "+this.tipo);
        const value = env.getVar(this.id);
        
        if (value == null) {
            throw new Error("<tr><td>semantico</td><td>La variable '" + this.id + "' no existe </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
        }
        if (value.edit==false){
            throw new Error("<tr><td>semantico</td><td>La variable '" + this.id + "' es const, no se puede operar </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
        }
        //console.log(value.type, this.id)
        if (value?.type != 0) {
            //error semantico
            throw new Error("<tr><td>semantico</td><td>La variable '" + this.id + "' tiene que ser de tipo numero</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
        }
        this.tipo=="++"? value.value++: value.value--;
        //console.log(value.valor)
        env.actualizar(this.id, value.value,value.type,true);
    }
    public ast(){
        if (this.tipo=="++") parser.ast += 'node' + this.line + '_' + (this.column) + ' [label="\\<Instruccion\\> \\n Incremento"];\n';
        else parser.ast += 'node' + this.line + '_' + (this.column) + ' [label="\\<Instruccion\\> \\n Decremento"];\n';
             parser.ast += 'node' + this.line + '_' + (this.column) + '1 [label="' + this.id + '"];\n';
             parser.ast += 'node' + this.line + '_' + (this.column) + '->node' + this.line + '_' + (this.column)+"1;\n" ;
    }
}