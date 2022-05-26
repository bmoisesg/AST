import { Instruction } from "../Abstract/Instruction"
import { Expression } from "../Abstract/Expression"
import { Environment } from "../Symbol/Environment"
import { TypetoString, Type } from "../Abstract/Retorno"
import { error } from "../tool/error"
import { Singleton } from "../Singleton/Singleton"

export class While extends Instruction {

    constructor(
        private condicion: Expression,
        public code: Instruction,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment) {

        let c = this.condicion.execute(env)
        if (c.type != Type.BOOLEAN) throw new error("Semantico", `La condicion de la instruccion while tiene que ser tipo [BOOLEAN] y se reconocio el tipo [${TypetoString(c.type)}]`, this.line, this.column)

        while (c.value) {
            this.code.execute(env)
            c = this.condicion.execute(env)
            if (c.type != Type.BOOLEAN) throw new error("Semantico", `La condición de la instruccion while tiene que ser tipo [BOOLEAN] y se reconocio el tipo [${TypetoString(c.type)}]`, this.line, this.column)
        }
    }
    public ast() {
        const s = Singleton.getInstance()
        const name_node = `node_${this.line}_${this.column}_`
        s.add_ast(`
        ${name_node}[label="\\<Instruccion\\>\\nwhile"];
        ${name_node}1[label="\\<Condicion\\>"];
        ${name_node}->${name_node}1;
        ${name_node}1->${this.condicion.ast()}
        ${name_node}->node_${this.code.line}_${this.code.column}_;        
        `)
        this.code.ast()

    }
}