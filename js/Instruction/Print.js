import { Instruction } from "../Abstract/Instruction";
import { Type } from "../Abstract/Retorno";
import { Singleton } from "../Singleton/Singleton";
export class Print extends Instruction {
    constructor(value, line, column) {
        super(line, column);
        this.value = value;
    }
    execute(environment) {
        var _a;
        const s = Singleton.getInstance();
        const expresion = (_a = this.value) === null || _a === void 0 ? void 0 : _a.execute(environment);
        if (expresion != null) {
            if (expresion.type != Type.error)
                s.add_consola(expresion.value);
        }
        s.add_consola("\n");
    }
    ast() {
        const s = Singleton.getInstance();
        const nombreNodo = `node_${this.line}_${this.column}_`;
        s.add_ast(`
        ${nombreNodo}[label="\\<Instruccion\\>\\nconsole"];`);
        if (this.value != null) {
            s.add_ast(`${nombreNodo}->${this.value.ast()}`);
        }
    }
}
