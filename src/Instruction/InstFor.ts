import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/Retorno";
const parser = require('../Grammar/Grammar');
export class InstFor extends Instruction {

    constructor(
        private primerArgumento: Instruction,
        private segundoArgumento: Expression,
        private tercerArgumento : Instruction,
        private code: Instruction,
        line: number, column: number) {
        super(line, column);
    }

    public execute(env: Environment) {
        const newEnv = new Environment(env);
        this.primerArgumento.execute(newEnv);//hace la declaracion 
        let condicion = this.segundoArgumento.execute(newEnv);
        for (let x=0; condicion.value ;x++){
            this.code.execute(newEnv);
            this.tercerArgumento.execute(newEnv);
            condicion = this.segundoArgumento.execute(newEnv);
           // console.log(condicion)
        }   
    }
    public ast(){
        parser.ast += 'node' + this.line + '_' + (this.column) + ' [label="\\<Instruccion\\> \\n for"];\n';
        parser.ast += 'node' + this.line + '_' + (this.column) +'->node'+ this.primerArgumento.line + '_' + (this.primerArgumento.column)+';\n'
        this.primerArgumento.ast();
        parser.ast += 'node' + this.line + '_' + (this.column) +'->node'+ this.tercerArgumento.line + '_' + (this.tercerArgumento.column)+';\n'
        this.tercerArgumento.ast();
        parser.ast += 'node' + this.line + '_' + (this.column) +'->'
        this.segundoArgumento.ast("")
        parser.ast += 'node' + this.line + '_' + (this.column) +'->node'+ this.code.line + '_' + (this.code.column)+';\n'
        this.code.ast()
        
    }
}