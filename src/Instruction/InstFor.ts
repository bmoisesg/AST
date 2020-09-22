import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/Retorno";
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
}