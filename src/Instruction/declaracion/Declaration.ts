import { Instruction } from "../../Abstract/Instruction"
import { Environment } from "../../Symbol/Environment"
import { Expression } from "../../Abstract/Expression"
import { error, TypeError } from "../../tool/error"
import { TypetoString, Type } from "../../Abstract/Retorno"
import { Singleton } from "../../Singleton/Singleton"

export class Declaration extends Instruction {

    constructor(
        public nombre: string,
        public expre: Expression, //siempre tiene que tener una expresion como es una declaracion CONST
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

        const expression = this.expre.execute(env)

        if (this.tipo == null) {

            //cuando la declaracion no tiene un tipo de dato definido, entonces se toma el que retorna la expresion
            env.guardar_variable(this.nombre, expression.value, expression.type, false)

        } else {

            //cuando la declaracion si tiene un tipo de dato definido
            if (expression.type == Type.NUMBER && this.tipo == "number" ||
                expression.type == Type.STRING && this.tipo == "string" ||
                expression.type == Type.BOOLEAN && this.tipo == "boolean"
            ) {

                env.guardar_variable(this.nombre, expression.value, expression.type, false)

            } else throw new error(TypeError.Semantico, `La expresion es de tipo [${TypetoString(expression.type)}] y se intenta asignar a una variable tipo [${this.tipo}]`, this.line, this.column)

        }
    }

    public ast() {
        const s = Singleton.getInstance()
        const nombreNodo = `node_${this.line}_${this.column}_`
        s.add_ast(`
        ${nombreNodo}[label="\\<Instruccion\\>\\nDeclaracion const"];
        ${nombreNodo}1[label="\\<Nombre\\>\\n${this.nombre}"];
        ${nombreNodo}2[label="\\<Tipo\\>\\n${this.tipo}"];
        ${nombreNodo}->${nombreNodo}1
        ${nombreNodo}->${nombreNodo}2
        ${nombreNodo}->${this.expre.ast()}`)

    }
}