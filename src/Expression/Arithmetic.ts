import { Expression } from "../Abstract/Expression"
import { Retorno, Type, get } from "../Abstract/Retorno"
import { Singleton } from "../Singleton/Singleton"
import { Environment } from "../Symbol/Environment"
import { error } from "../tool/error"
import { ArithmeticOption, get_simbolo, getName } from "./ArithmeticOption"

const parser = require('../Grammar/Grammar')
export class Arithmetic extends Expression {

    constructor(
        private left: Expression,
        private right: Expression,
        private type: ArithmeticOption,
        line: number,
        column: number) {
        super(line, column)
    }

    public execute(env: Environment): Retorno {

        let result: Retorno

        const nodoIzq = this.left.execute(env)
        const nodoDer = this.right.execute(env)

        /**
         * suma
         */
        if (this.type == ArithmeticOption.MAS) {
            if (nodoIzq.type == Type.BOOLEAN || nodoDer.type == Type.BOOLEAN) {
                throw new error("Semantico", "Error de tipos en el operando suma, tipo [" + get(nodoIzq.type) + "] con tipo [" + get(nodoDer.type) + "] ", this.line, this.column)
            }
            if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.NUMBER) {
                result = { value: (nodoIzq.value + nodoDer.value), type: Type.NUMBER }
            }
            else result = { value: (nodoIzq.value + nodoDer.value), type: Type.STRING }
        }
        /**
        * Negacion
        */
        else if (this.type == ArithmeticOption.NEGACION) {
            if (nodoDer.type == Type.NUMBER)
                result = { value: nodoIzq.value * -1, type: Type.NUMBER }
            else throw new error("Semantico", "Error de tipos con operando resta , no se puede negar un tipo [" + get(nodoDer.type) + "]", this.line, this.column)
        }
        /**
         * Potencia, modulo, multiplicacion, resta, division
         */
        else {

            if (nodoDer.type == Type.NUMBER && nodoIzq.type == Type.NUMBER) {

                if (this.type == ArithmeticOption.POT) { result = { value: Math.pow(nodoIzq.value, nodoDer.value), type: Type.NUMBER } }
                else if (this.type == ArithmeticOption.MODULO) { result = { value: (nodoIzq.value % nodoDer.value), type: Type.NUMBER } }
                else if (this.type == ArithmeticOption.MULTIPLICACION) { result = { value: (nodoIzq.value * nodoDer.value), type: Type.NUMBER } }
                else if (this.type == ArithmeticOption.DIV) {
                    if (nodoDer.value == 0) {
                        throw new error("Semantico", "No se puede realizar una division entre 0", this.line, this.column)
                    }
                    result = { value: (nodoIzq.value / nodoDer.value), type: Type.NUMBER }
                }
                else /*(this.type == ArithmeticOption.RESTA)*/ { result = { value: (nodoIzq.value - nodoDer.value), type: Type.NUMBER } }

            } else throw new error("Semantico", `Error de tipos en el operando ${getName(this.type)}, tipo [${get(nodoIzq.type)}] con tipo [${get(nodoDer.type)}]`, this.line, this.column)

        }

        return result
    }

    public ast() {

        const s = Singleton.getInstance();
        const name_nodo=`node${this.line}_${this.column}_`
        s.add_ast(`
        ${name_nodo};
        ${name_nodo}[label="${get_simbolo(this.type)}"];
        ${name_nodo}->${this.left.ast()};
        ${name_nodo}->${this.right.ast()};
        `)
    }
}