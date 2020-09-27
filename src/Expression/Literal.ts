import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
const parser = require('../Grammar/Grammar');
export class Literal extends Expression {

    constructor(private value: any, line: number, column: number, private type: number) {
        super(line, column);
    }

    public execute(): Retorno {
        if (this.type == 1 || this.type == 0)
            return { value: Number(this.value), type: Type.NUMBER };
        else if (this.type == 2)
            return { value: this.value, type: Type.STRING };
        else if (this.type == 3) {
            if (this.value == "true") {
                return { value: Boolean(true), type: Type.BOOLEAN };
            }
            else {
                return { value: Boolean(false), type: Type.BOOLEAN };
            }
        }
        else
            return { value: this.value, type: Type.error };

    }
    public ast(id: string) {
        parser.ast += "node" + this.line + '_' + (this.column)+";\n"
            + "node" + this.line + '_' + (this.column) + '[label="' + this.value.toString() + '"];\n'
    }
}