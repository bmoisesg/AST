import { Instruction } from "../Abstract/Instruction";
import { Singleton } from "../Singleton/Singleton";
export class GraficarTablaSimbolos extends Instruction {
    constructor(line, column) {
        super(line, column);
    }
    execute(env) {
        const s = Singleton.getInstance();
        s.add_entorno(env.getEntorno());
    }
    ast() {
        const s = Singleton.getInstance();
        s.add_ast(`node_${this.line}_${this.column}_[label="\\<Instruccion\\>\\nGraficar_TS"];`);
    }
}
