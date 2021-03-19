import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";
import { error } from "../tool/error";

export class ExpreArray extends Expression {
    constructor(
        public id: string,
        public condicionPop: boolean,
        public condicionAsignacion: boolean,
        public expresion: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
    }
    public execute(environment: Environment): Retorno {

        let result: Retorno
        var objeto = environment.get_array(this.id)
        if (objeto == undefined) {
            throw new error("Semantico", `Este array '${this.id}' no existe `, this.line, this.column)
        }
        //return { type: 0, value: 0 }


        var array = objeto.contenido as Array<any>


        if (this.condicionAsignacion) {
            //...= ID . [ Expre ]
            const expresion = this.expresion.execute(environment)
            if (expresion.type != Type.NUMBER) throw new error("Semantico", `El tipo de dato del index no valido, debe ser tipo [NUMBER]`, this.line, this.column)

            if (objeto.tipo == "string") result = { value: array[expresion.value], type: Type.STRING }
            else if (objeto.tipo == "number") result = { value: array[expresion.value], type: Type.NUMBER }
            else result = { value: array[expresion.value], type: Type.BOOLEAN }
            return result
        }



        if (this.condicionPop) {
            var enviar = array.pop();
            environment.update_array(this.id, array)

            if (objeto.tipo == "string") result = { value: enviar, type: Type.STRING }
            else if (objeto.tipo == "number") result = { value: enviar, type: Type.NUMBER }
            else result = { value: enviar, type: Type.BOOLEAN }
        } else {
            //length
            result = { value: array.length, type: Type.NUMBER }
        }

        return result
    }
    public ast() {
        const name_nodo = `node_${this.line}_${this.column}_`
        
        if(this.condicionAsignacion){
            return `
            ${name_nodo};
            ${name_nodo}[label="${this.id}\\n<\\array\\> "];
            ${name_nodo}
            ${name_nodo}->${this.expresion.ast()}
            `
        }
        if(this.condicionPop){
            return`
            ${name_nodo};
            ${name_nodo}[label="${this.id}\\n<\\array pop\\> "];
            `
        }else{
            return `
            ${name_nodo};
            ${name_nodo}[label="${this.id}\\n<\\array length\\> "];
            `

        }
    }

}