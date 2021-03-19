import { Expression } from "../Abstract/Expression";
import { get, Type } from "../Abstract/Retorno";
import { error } from "../tool/error";
import { RelationalOption, get_simbolo, getName } from "./RelationalOpcion";
export class Relational extends Expression {
    constructor(left, right, type, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.type = type;
    }
    execute(env) {
        const valueIzq = this.left.execute(env);
        const valueDer = this.right.execute(env);
        if (valueIzq.type == Type.STRING && valueDer.type == Type.STRING ||
            valueIzq.type == Type.BOOLEAN && valueDer.type == Type.BOOLEAN) {
            switch (this.type) {
                case RelationalOption.IGUAL:
                    return { value: valueIzq.value == valueDer.value, type: Type.BOOLEAN };
                case RelationalOption.DIFERENCIACION:
                    return { value: valueIzq.value != valueDer.value, type: Type.BOOLEAN };
            }
        }
        if (valueIzq.type == Type.NUMBER && valueDer.type == Type.NUMBER) {
            switch (this.type) {
                case RelationalOption.IGUAL:
                    return { value: valueIzq.value == valueDer.value, type: Type.BOOLEAN };
                case RelationalOption.DIFERENCIACION:
                    return { value: valueIzq.value != valueDer.value, type: Type.BOOLEAN };
                case RelationalOption.MENOR:
                    return { value: valueIzq.value < valueDer.value, type: Type.BOOLEAN };
                case RelationalOption.MENORIGUAL:
                    return { value: valueIzq.value <= valueDer.value, type: Type.BOOLEAN };
                case RelationalOption.MAYOR:
                    return { value: valueIzq.value > valueDer.value, type: Type.BOOLEAN };
                case RelationalOption.MAYORIGUAL:
                    return { value: valueIzq.value >= valueDer.value, type: Type.BOOLEAN };
            }
        }
        throw new error("Semantico", `Error tipo de datos en operando ${getName(this.type)}, tipo [${get(valueIzq.type)}] con tipo [${get(valueDer.type)}]`, this.line, this.column);
    }
    ast() {
        const nombreNodo = `node_${this.line}_${this.column}_`;
        return `
        ${nombreNodo};
        ${nombreNodo}[label="${get_simbolo(this.type)}"];
        ${nombreNodo}->${this.left.ast()}
        ${nombreNodo}->${this.right.ast()}
        `;
    }
}
