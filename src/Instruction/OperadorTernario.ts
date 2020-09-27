import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { env } from "process";
import { Type } from "../Abstract/Retorno";


export class OperadorTernario extends Instruction {
    //este es codigo de bmoisesg nunca lo compartire o comparti

    private condicon: Expression;
    private valor1: Instruction;
    private valor2: Instruction;

    constructor(condicion: Expression, valor1: Instruction, valor2: Instruction, line: number, column: number) {
        super(line, column);

        this.condicon = condicion;
        this.valor1 = valor1;
        this.valor2 = valor2;
    }

    public execute(environment: Environment) {
        const condition = this.condicon.execute(environment);
        //console.log("->",condition, condition.type);
        if (condition.type != Type.BOOLEAN) {
            //console.log("entre");
            throw new Error("<tr><td>semantico</td><td>La expresion del ternario no es una condiicon 'boolean' en el entorno para poder asignar</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
        }

        if (condition.value) {
            this.valor1.execute(environment);
        } else {
            this.valor2.execute(environment);
        }
    }
    public ast(){
        
    }
}