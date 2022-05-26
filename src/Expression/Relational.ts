import { Expression } from "../Abstract/Expression"
import { TypetoString, Retorno, Type } from "../Abstract/Retorno"
import { Environment } from "../Symbol/Environment"
import { error } from "../tool/error"
import { RelationalOption, optionToSymbol, optionToString } from "./RelationalOpcion"

export class Relational extends Expression {

    constructor(
        private left: Expression,
        private right: Expression,
        private type: RelationalOption,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment): Retorno {

        const valueIzq = this.left.execute(env)
        const valueDer = this.right.execute(env)

        if (valueIzq.type == Type.STRING && valueDer.type == Type.STRING ||
            valueIzq.type == Type.BOOLEAN && valueDer.type == Type.BOOLEAN) {

            switch (this.type) {
                case RelationalOption.IGUAL:
                    return { value: valueIzq.value == valueDer.value, type: Type.BOOLEAN }
                case RelationalOption.DIFERENCIACION:
                    return { value: valueIzq.value != valueDer.value, type: Type.BOOLEAN }
            }
        }

        if (valueIzq.type == Type.NUMBER && valueDer.type == Type.NUMBER) {

            switch (this.type) {
                case RelationalOption.IGUAL:
                    return { value: valueIzq.value == valueDer.value, type: Type.BOOLEAN }
                case RelationalOption.DIFERENCIACION:
                    return { value: valueIzq.value != valueDer.value, type: Type.BOOLEAN }
                case RelationalOption.MENOR:
                    return { value: valueIzq.value < valueDer.value, type: Type.BOOLEAN }
                case RelationalOption.MENORIGUAL:
                    return { value: valueIzq.value <= valueDer.value, type: Type.BOOLEAN }
                case RelationalOption.MAYOR:
                    return { value: valueIzq.value > valueDer.value, type: Type.BOOLEAN }
                case RelationalOption.MAYORIGUAL:
                    return { value: valueIzq.value >= valueDer.value, type: Type.BOOLEAN }
            }

        }
        throw new error("Semantico", `Error tipo de datos en operando ${optionToString(this.type)}, tipo [${TypetoString(valueIzq.type)}] con tipo [${TypetoString(valueDer.type)}]`, this.line, this.column)

    }
    public ast() {
        const nombreNodo = `node_${this.line}_${this.column}_`
        return `
        ${nombreNodo};
        ${nombreNodo}[label="${optionToSymbol(this.type)}"];
        ${nombreNodo}->${this.left.ast()}
        ${nombreNodo}->${this.right.ast()}
        `
    }
}