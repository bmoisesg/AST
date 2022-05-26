import { Instruction } from "../../Abstract/Instruction"
import { Environment } from "../../Symbol/Environment"
import { Expression } from "../../Abstract/Expression"
import { Singleton } from "../../Singleton/Singleton"
import { error, TypeError } from "../../tool/error"
import { Type, TypetoString, StringToType } from "../../Abstract/Retorno"

export class Declaracion2 extends Instruction {

    constructor(
        public nombre: string,
        public expre: Expression,
        public tipo: string,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment) {

        if (env.revisarRepetido(this.nombre)) {
            
            throw new error(TypeError.Semantico, `La variable '${this.nombre}' ya existe en el entorno actual`, this.line, this.column)
        }

        if (this.expre == null) {

            if (this.tipo == null) {

                env.guardar_variable(this.nombre, null, -1, true)

            } else {

                env.guardar_variable(this.nombre, null, StringToType(this.tipo) , true)

            }

        } else {

            const expression = this.expre.execute(env)

            if (this.tipo == null) {

                env.guardar_variable(this.nombre, expression.value, expression.type, true)

            } else {

                if (expression.type == Type.NUMBER && this.tipo == "number" ||
                    expression.type == Type.STRING && this.tipo == "string" ||
                    expression.type == Type.BOOLEAN && this.tipo == "boolean"
                ) {

                    env.guardar_variable(this.nombre, expression.value, expression.type, true)

                } else throw new error(TypeError.Semantico, `La expresion tiene un tipo de dato [${TypetoString(expression.type)}] y no coincide con el tipo ha asiganar [${this.tipo}]`, this.line, this.column)

            }
        }
    }

    public ast() {
        const s = Singleton.getInstance()
        const nombreNodo = `node_${this.line}_${this.column}_`
        s.add_ast(`
        ${nombreNodo}[label="\\<Instruccion\\>\\nDeclaracion let"];
        ${nombreNodo}1[label="\\<Nombre\\>\\n${this.nombre}"];
        ${nombreNodo}2[label="\\<Tipo\\>\\n${this.tipo}"];
        ${nombreNodo}->${nombreNodo}1
        ${nombreNodo}->${nombreNodo}2
        `)
        if (this.expre != null) {
            s.add_ast(`${nombreNodo}->${this.expre.ast()}`)
        }
    }
}