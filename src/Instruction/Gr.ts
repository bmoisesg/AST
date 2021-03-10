import { Instruction } from "../Abstract/Instruction";
import { Singleton } from "../Singleton/Singleton";
import { Environment } from "../Symbol/Environment";

export class GraficarTablaSimbolos extends Instruction {

    constructor(
        line: number,
        column: number) {
        super(line, column);
    }

    public execute(env: Environment) {
        const s = Singleton.getInstance()
        s.add_entorno(env.getEntorno())
    }

    public ast() {
        const s = Singleton.getInstance()
        s.add_ast(`node_${this.line}_${this.column}_[label="\\<Instruccion\\>\\nGraficar_TS"];`)
    }
}
