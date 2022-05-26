import { Instruction } from "../Abstract/Instruction"
import { Environment } from "../Symbol/Environment"
import { Expression } from "../Abstract/Expression"
import { TypetoString, Type } from "../Abstract/Retorno"
import { error } from "../tool/error"
import { Singleton } from "../Singleton/Singleton"

export class OperadorTernario extends Instruction {

    constructor(
        private condicion: Expression,
        private valor1: Instruction,
        private valor2: Instruction,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment) {
        const condition = this.condicion.execute(env);

        if (condition.type != Type.BOOLEAN) throw new error("Semantico", `La condicion de la instruccion ternaria tiene que ser tipo [BOOLEAN] y se reconocio el tipo [${TypetoString(condition.type)}}]]`, this.line, this.column)

        if (condition.value) this.valor1.execute(env)
        else this.valor2.execute(env)

    }

    public ast() {
        const s= Singleton.getInstance()
        const name_nodo = `node_${this.line}_${this.column}_`
        s.add_ast(`
        ${name_nodo} [label="\\<Instruccion\\>\\n Operador ternario"];
        ${name_nodo}1[label="\\<Instruccion verdadera\\>"];
        ${name_nodo}2[label="\\<Instruccion falsa\\>"];
        ${name_nodo}->${name_nodo}1;
        ${name_nodo}->${name_nodo}2;
        ${name_nodo}->${this.condicion.ast()}
        ${name_nodo}1->node_${this.valor1.line}_${this.valor1.column}_;
        ${name_nodo}2->node_${this.valor2.line}_${this.valor2.column}_;
        `)
        this.valor1.ast();
        this.valor2.ast();
    }
}