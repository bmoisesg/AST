import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { env } from "process";
import { Type } from "../Abstract/Retorno";
import { parse } from "path";
const parser = require('../Grammar/Grammar');

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
        parser.ast += 'node' + this.line + '_' + (this.column) + ' [label="\\<Instruccion\\> \\n Operacion ternario"];\n';
        parser.ast += 'node' + this.line + '_' + (this.column) + '1[label="instruccion1"];\n';
        parser.ast += 'node' + this.line + '_' + (this.column) + '2[label="instruccion2"];\n';
        parser.ast += 'node' + this.line + '_' + (this.column) + '->node' + this.line + '_' + (this.column) + '1;\n'
        parser.ast += 'node' + this.line + '_' + (this.column) + '->node' + this.line + '_' + (this.column) + '2;\n'
        parser.ast += 'node' + this.line + '_' + (this.column) + "-> ";
        this.condicon.ast("");
        parser.ast += 'node' + this.line + '_' + (this.column) +'1->node' + this.valor1.line + '_' + (this.valor1.column)+";\n" 
        this.valor1.ast();
        parser.ast += 'node' + this.line + '_' + (this.column) +'2->node' + this.valor2.line + '_' + (this.valor2.column)+";\n" 
        this.valor2.ast();
    }
}