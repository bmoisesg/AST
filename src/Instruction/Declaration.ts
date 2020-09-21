import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { env } from "process";

export class Declaration extends Instruction {
    //este es codigo de bmoisesg
    private id: string;
    private value: Expression;
    private valorSeteando: string;

    constructor(id: string, value: Expression, valorSeteando: string, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.valorSeteando = valorSeteando;
    }

    public execute(environment: Environment) {
        if (this.valorSeteando == null) {
            const val = this.value.execute(environment);
            let condicion = environment.guardar(this.id, val.value, val.type, false);
            if (!condicion) {
                throw new Error("<tr><td>semantico</td><td>Esta variable '" + this.id + "' ya existe en el entorno actual</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
        } else {
            //yo le estoy diciendo el tipo, tengo que validar eso, sino es un error semantico
            const val = this.value.execute(environment);

            if (val.type == 0 && this.valorSeteando == "number" ||
                val.type == 1 && this.valorSeteando == "string" ||
                val.type == 2 && this.valorSeteando == "boolean"
            ) {
                let condicion=environment.guardar(this.id, val.value, val.type, false);
                if (!condicion) {
                    throw new Error("<tr><td>semantico</td><td>Esta variable '" + this.id + "' ya existe en el entorno actual</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
                }
            } else {
                throw new Error("<tr><td>semantico</td><td>Type '" + val.type + "' is not assignable to type '" + this.valorSeteando + "'</td><td>" + this.value.line + "</td><td>" + this.value.column + "</td></tr>");
            }
        }
    }

}