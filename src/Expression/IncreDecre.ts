import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Incre } from "../Instruction/Incre";
import { Environment } from "../Symbol/Environment";
import { IncreDecreOption } from "./IncreDecreOption";

export class IncreDecre extends Expression {

    constructor(
        private expresion: Expression,
        private type: IncreDecreOption,
        private nombrevariable: string,
        line: number,
        column: number) {
        super(line, column)

    }
    public execute(env: Environment): Retorno {
        let result: Retorno


        const variable = env.getVar(this.nombrevariable);
        //validar que exista
        if (variable == null) {
            throw new Error("<tr><td>semantico</td><td>La variable '" + this.nombrevariable + "' no existe </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
        }
        if (variable.edit == false) {
            throw new Error("<tr><td>semantico</td><td>La variable '" + this.nombrevariable + "' es const, no se puede operar </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
        }
        //validar que sea numerico
        if (variable?.type != 0) {
            throw new Error("<tr><td>semantico</td><td>La variable '" + this.nombrevariable + "' tiene que ser de tipo numero</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
        }
        //retornar
        if (this.type == IncreDecreOption.INCREMENTO1) {
            result = { value: variable.value, type: Type.NUMBER };
            variable.value++;
        } else if (this.type == IncreDecreOption.INCREMENTO2) {
            variable.value++;
            result = { value: variable.value, type: Type.NUMBER };
        } else if (this.type == IncreDecreOption.DECREMENTO1) {
            result = { value: variable.value, type: Type.NUMBER };
            variable.value--
        } else /*if (this.type == IncreDecreOption.DECREMENTO2)*/ {
            variable.value--
            result = { value: variable.value, type: Type.NUMBER };
        }

        //actualiza 
        env.actualizar(this.nombrevariable, variable.value, variable.type, true);
        return result

    }
    public ast() { }

}