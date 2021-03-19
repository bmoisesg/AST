import { Instruction } from "../Abstract/Instruction";
import { get, Type } from "../Abstract/Retorno";
import { error } from "../tool/error";
import { Singleton } from "../Singleton/Singleton";
export class OperadorTernario extends Instruction {
    constructor(condicion, valor1, valor2, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.valor1 = valor1;
        this.valor2 = valor2;
    }
    execute(env) {
        const condition = this.condicion.execute(env);
        if (condition.type != Type.BOOLEAN)
            throw new error("Semantico", `La condicion de la instruccion ternaria tiene que ser tipo [BOOLEAN] y se reconocio el tipo [${get(condition.type)}}]]`, this.line, this.column);
        if (condition.value)
            this.valor1.execute(env);
        else
            this.valor2.execute(env);
    }
    ast() {
        const s = Singleton.getInstance();
        const name_nodo = `node_${this.line}_${this.column}_`;
        s.add_ast(`
        ${name_nodo} [label="\\<Instruccion\\>\\n Operador ternario"];
        ${name_nodo}1[label="\\<Instruccion verdadera\\>"];
        ${name_nodo}2[label="\\<Instruccion falsa\\>"];
        ${name_nodo}->${name_nodo}1;
        ${name_nodo}->${name_nodo}2;
        ${name_nodo}->${this.condicion.ast()}
        ${name_nodo}1->node_${this.valor1.line}_${this.valor1.column}_;
        ${name_nodo}2->node_${this.valor2.line}_${this.valor2.column}_;
        `);
        this.valor1.ast();
        this.valor2.ast();
    }
}
