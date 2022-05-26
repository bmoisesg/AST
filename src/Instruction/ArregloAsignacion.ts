import { Expression } from "../Abstract/Expression"
import { Instruction } from "../Abstract/Instruction"
import { TypetoString, Type } from "../Abstract/Retorno"
import { Singleton } from "../Singleton/Singleton"
import { Environment } from "../Symbol/Environment"
import { error } from "../tool/error"
import { get_num } from "./Arreglo"

export class ArregloAsignacion extends Instruction {

    constructor(
        public nombre: string,
        public array: Array<Expression>,
        public expresionIndex: Expression,
        public expresionAsignar: Expression,
        line: number,
        column: number
    ) {
        super(line, column)
    }
    public execute(env: Environment) {

        let objeto = env.get_array(this.nombre)
        if (objeto == undefined) throw new error("Semantico", `Este array '${this.nombre}' no se pudo encontrar`, this.line, this.column)
        var array = objeto.contenido as Array<any>

        if (this.array == null) {

            //Es una asignacion a una posicion en especifico
            const expre_index = this.expresionIndex.execute(env)
            const expre_asig = this.expresionAsignar.execute(env)
            if (expre_index.type != Type.NUMBER) throw new error("Semantico", `El tipo de dato del index no es valido, tiene que ser [NUMBER]`, this.line, this.column)
            if (expre_asig.type != get_num(objeto.tipo)) throw new error("Semantico", `La asignacion es de tipo [${TypetoString(expre_asig.type)}] pero el array tiene que ser tipo [${objeto.tipo}]`, this.line, this.column)
            array[expre_index.value] = expre_asig.value

        } else {

            //Es una asignacion y meter un conjunto de datos
            var tmp: Array<any> = []
            this.array.forEach(element => {
                const x = element.execute(env)
                if (x.type != get_num(objeto?.tipo as string)) throw new error("Semantico", `Tipo de dato no valido,todos los elementos tienen que ser tipo  [${objeto?.tipo}]`, this.line, this.column)
                tmp.push(x.value)
            })
            array = tmp
        }
        env.update_array(this.nombre, array)
    }

    public ast() {
        const s = Singleton.getInstance()
        const name_node = `node_${this.line}_${this.column}_`
        if (this.array == null) {
            s.add_ast(`
            ${name_node}[label="\\<Instruccion\\>\\nArray asignacion"];
            ${name_node}1[label="\\<Index\\>"];
            ${name_node}2[label="\\<Asignar\\>"];
            ${name_node}->${name_node}1;
            ${name_node}->${name_node}2;
            ${name_node}1->${this.expresionIndex.ast()}
            ${name_node}2->${this.expresionAsignar.ast()}
            `)
        } else {
            s.add_ast(`
            ${name_node}[label="\\<Instruccion\\>\\nArray asignacion"];
            `)
            this.array.forEach(element => {
                s.add_ast(`
                ${name_node}->${element.ast()}
                `)
            });
        }

    }
}

