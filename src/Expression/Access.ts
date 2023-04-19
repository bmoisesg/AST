import { Expression } from "../Abstract/Expression"
import { Environment } from "../Symbol/Environment"
import { Retorno, Type } from "../Abstract/Retorno"
import { error, TypeError } from "../tool/error"


export class Access extends Expression {

    constructor(
        private id: string,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment): Retorno {

        const variable = env.get_variable(this.id)

        if (variable == null) {
            //Revisar si es un array
            const tmp = env.get_array(this.id)
            if (tmp != null) return { value: tmp.contenido, type: Type.STRING }
            throw new error(TypeError.Semantico, `Variable '${this.id}' no encontrada `, this.line, this.column)
        }

        return { value: variable.value, type: variable.type };
    }
    public ast() {
        const name_nodo = `node_${this.line}_${this.column}_`
        return `
        ${name_nodo};
        ${name_nodo}[label="{${this.id}}"];
        `
    }
}