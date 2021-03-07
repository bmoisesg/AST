import { Expression } from "../Abstract/Expression"
import { Environment } from "../Symbol/Environment"
import { Retorno, Type } from "../Abstract/Retorno"
import { error } from "../tool/error"


export class Access extends Expression {

    constructor(
        private id: string,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(environment: Environment): Retorno {

        //traer la variable
        const value = environment.get_variable(this.id)

        if (value == null) {
            //verificar si es un array
            const tmp = environment.get_array(this.id)
            if (tmp != null) return { value: tmp.contenido, type: Type.STRING }
            throw new error("Semantico", `Variable '${this.id}' no encontrada `, this.line, this.column)
        }

        return { value: value.value, type: value.type };
    }
    public ast() {
        const name_nodo = `node_${this.line}_${this.column}_`
        return `
        ${name_nodo};
        ${name_nodo}[label="{${this.id}}"];
        `
    }
}