import { Instruction } from "../Abstract/Instruction"
import { Environment } from "../Symbol/Environment"
import { Expression } from "../Abstract/Expression"
import { error } from "../tool/error"
import { TypetoString } from "../Abstract/Retorno"
import { Singleton } from "../Singleton/Singleton"

export class Asignacion extends Instruction {

    constructor(
        public nombre: string,
        public value: Expression,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment) {

        const expresion = this.value.execute(env)

        var variable = env.get_variable(this.nombre)
        //validar que todo este bien antes de actualizar la variable
        if (variable == null || variable == undefined) throw new error("Semantico", `No encontre una variable con este nombre '${this.nombre}'`, this.line, this.column)
        if (!variable?.edit) throw new error("Semantico", `Asignacion incorrecta, la variable con nombre '${this.nombre}' es una const y no puede cambiar valor`, this.line, this.column)
        if (variable?.type != expresion.type) throw new error("Semantico", `Asignacion incorrecta, la variable con nombre '${this.nombre}' es de tipo [${TypetoString(variable?.type)}] y se le esta tratando de asignar un tipo [${TypetoString(expresion.type)}]`, this.line, this.column)

        env.actualizar_variable(this.nombre, expresion.value)

    }

    public ast() {

        const s = Singleton.getInstance()
        const nombre_nodo =`node_${this.line}_${this.column}_`
        s.add_ast(`
        ${nombre_nodo}[label="\\<Instruccion\\>\\nAsignacion"];
        ${nombre_nodo}1[label="\\<Nombre\\>\\n${this.nombre}"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${this.value.ast()}
        `)

    }
}