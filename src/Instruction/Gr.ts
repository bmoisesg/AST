import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
const parser = require('../Grammar/Grammar');

export class GraficarTablaSimbolos extends Instruction {

    constructor(
        line: number,
        column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        parser.graficarTS += environment.getEntorno();
    }

    public ast(){
        parser.ast += 'node' + this.line + '_' + (this.column) + ' [label="\\<Instruccion\\> \\n Graficar_TS"];\n';
    }
}
