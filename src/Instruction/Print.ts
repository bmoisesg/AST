import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/Retorno";
import { Singleton } from "../Singleton/Singleton";

export class Print extends Instruction {

    constructor(
        public value: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {

        const s = Singleton.getInstance()
        const expresion = this.value?.execute(env);
        if (expresion != null) {
            if (expresion.type != Type.error) s.add_consola(expresion.value)
        }
        s.add_consola("\n")
    }

    public ast() {
        const s = Singleton.getInstance()
        const nombreNodo = `node_${this.line}_${this.column}_`
        s.add_ast(`
        ${nombreNodo}[label="\\<Instruccion\\>\\nconsole"];`)
        if (this.value!= null){s.add_ast(`${nombreNodo}->${this.value.ast()}`)}
    }
}
