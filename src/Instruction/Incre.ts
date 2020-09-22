import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/Retorno";

export class Incre extends Instruction{

    constructor(private id : Instruction, line : number, column : number){
        super(line, column);
    }

    public execute(env : Environment) {
            
    }
}