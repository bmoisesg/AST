import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/Retorno";
const parser = require('../Grammar/Grammar');
export class Print extends Instruction {

    constructor(public value: Expression, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        //graficarAST(this.line, this.column, this.value);
        const value = this.value?.execute(environment);
        if (value != null) {
            if (value.type != Type.error) {
                //console.log(value);
                parser.consola += value.value + "\n";
            }
        } else if (value == null) {
            //console.log();
            parser.consola += "\n";
        }
    }
    public ast(){
        parser.ast += 'node' + this.line + '_' + (this.column) + ' [label="\\<Instruccion\\> \\n console"];\n';
        if (this.value!=null){
            parser.ast+= 'node' + this.line + '_' + (this.column) +"->";
            this.value.ast();
            parser.ast+="\n"
        }
    }
}
