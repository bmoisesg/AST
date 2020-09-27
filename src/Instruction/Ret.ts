import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Function } from "../Instruction/Function";

const parser = require('../Grammar/Grammar');


export class Ret extends Instruction {
    constructor(
        public expresion: Expression,
        line: number,
        column: number) {
        super(line, column);
    }
    public execute(environment: Environment) {
        //console.log("-------------------");
        //console.log(parser.pila_funciones);
        //console.log("-------------------");
        if (parser.pila_funciones.length==0){
            throw new Error("<tr><td>semantico</td><td>Este return  esta fuera de una funcion</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");   
        }
        if (this.expresion == null) {
            //-----------------------------------------------------------
            //  el return no tiene una expresion 
            //-----------------------------------------------------------
            //verficiar que la funcion en donde estoy tambien sea solo una funcion 
            var funcion_analizar = parser.pila_funciones[parser.pila_funciones.length - 1]

            if (funcion_analizar.retorno != "") {
                //hacer el pop
                parser.pila_funciones.pop()
                //mostrar error
                throw new Error("<tr><td>semantico</td><td>Este return tiene que devolver una expresion '" +
                    funcion_analizar.retorno + "'</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            } else {
                //ejecutar todo normal
                parser.pila_funciones.pop()
                return "@si"
            }
        }
        //-----------------------------------------------------------
        //  el return tiene una expresion 
        //-----------------------------------------------------------
        const expre = this.expresion.execute(environment);
        var funcion_analizar = parser.pila_funciones[parser.pila_funciones.length - 1]

        if (
            expre.type == 0 && funcion_analizar.retorno == "number" ||
            expre.type == 1 && funcion_analizar.retorno == "string" ||
            expre.type == 2 && funcion_analizar.retorno == "boolean"
        ) {
            //todo esta bien, significa que retorna una expresion valida
            parser.pila_funciones.pop()
            return "@si"
        }
        else {
            parser.pila_funciones.pop()
            throw new Error("<tr><td>semantico</td><td>Rratas de retornar tipo :" +
            expre.type+ " y tiene que ser '" + funcion_analizar.retorno + "'"+"</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
           
        }
    }
    public ast(){
        
    }
}