import { Instruction } from "../Abstract/Instruction"
import { Expression } from "../Abstract/Expression"
import { Environment } from "../Symbol/Environment"
import { Singleton } from "../Singleton/Singleton"
import { TypetoString, Type } from "../Abstract/Retorno"
import { error } from "../tool/error"

export class InstFor extends Instruction {

    constructor(
        private declaracion: Instruction,
        private condicion_seguir: Expression,
        private iterador: Instruction,
        private code: Instruction,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Environment) {

        //crear un nuevo entorno para ejecutar solo la variable del for 
        const newEnv = new Environment(env)
        //ejecuta la declacion o podria ser una asignacion
        this.declaracion.execute(newEnv)
        let condicion = this.condicion_seguir.execute(newEnv)
        //verificar que la expresion sea de tipo boolean
        if (condicion.type != Type.BOOLEAN) throw new error("Semantico", `La instruccion for necesita una expresion booleana para ejecutarse y se reconocio el typo [${TypetoString(condicion.type)}] en la expresion`, this.line, this.column)
        while (condicion.value) {
            this.code.execute(newEnv)
            this.iterador.execute(newEnv)
            //ejecutar la condicion otra vez para saber si seguir o salir 
            condicion = this.condicion_seguir.execute(newEnv)
        }
    }

    public ast() {

        const s = Singleton.getInstance()
        const name_node = `node_${this.line}_${this.column}_`
        s.add_ast(`
        ${name_node}[label="\\<Instruccion\\>\\nFor"];
        ${name_node}->node_${this.declaracion.line}_${this.declaracion.column}_;
        ${name_node}->node_${this.iterador.line}_${this.iterador.column}_;
        ${name_node}->node_${this.code.line}_${this.code.column}_;
        ${name_node}->${this.condicion_seguir.ast()}
        `)
        this.declaracion.ast();
        this.iterador.ast();
        this.code.ast()

    }
}