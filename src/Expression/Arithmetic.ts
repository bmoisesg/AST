import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";
import { env } from "process";
import { type } from "os";
import { toNamespacedPath } from "path";

export enum ArithmeticOption {
    PLUS,  //mas
    MINUS,  //menos
    TIMES,   //multiplicacion
    DIV,    //division
    MODULO,
    POT,
    NEGACION,
    MAS,
    INCREMENTO1,
    INCREMENTO2,
    DECREMENTO1,
    DECREMENTO2
}
const parser = require('../Grammar/Grammar');
export class Arithmetic extends Expression {

    constructor(
        private left: Expression,
        private right: Expression,
        private type: ArithmeticOption,
        private cadena: string,
        line: number,
        column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        //parser.ast += 'node'+(this.line)+'_'+(this.column+1)+ '[label="'+get(this.type) +'"];\n'
        let result: Retorno;
        if (this.type == ArithmeticOption.INCREMENTO1) {
            const variable = environment.getVar(this.cadena);
            //validar que exista
            if (variable == null) {
                throw new Error("<tr><td>semantico</td><td>La variable '" + this.cadena + "' no existe </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            if (variable.condicion == false) {
                throw new Error("<tr><td>semantico</td><td>La variable '" + this.cadena + "' es const, no se puede operar </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            //validar que sea numerico
            if (variable?.type != 0) {
                throw new Error("<tr><td>semantico</td><td>La variable '" + this.cadena + "' tiene que ser de tipo numero</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            //retornar
            result = { value: variable.valor, type: Type.NUMBER };
            variable.valor++;
            //actualiza 
            environment.actualizar(this.cadena, variable.valor, variable.type, true);
            return result;

        } else if (this.type == ArithmeticOption.DECREMENTO1) {
            const variable = environment.getVar(this.cadena);
            //validar que exista
            if (variable == null) {
                throw new Error("<tr><td>semantico</td><td>La variable '" + this.cadena + "' no existe </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            if (variable.condicion == false) {
                throw new Error("<tr><td>semantico</td><td>La variable '" + this.cadena + "' es const, no se puede operar </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            //validar que sea numerico
            if (variable?.type != 0) {
                throw new Error("<tr><td>semantico</td><td>La variable '" + this.cadena + "' tiene que ser de tipo numero</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            //retornar
            result = { value: variable.valor, type: Type.NUMBER };
            variable.valor--;
            //actualiza 
            environment.actualizar(this.cadena, variable.valor, variable.type, true);
            return result;

        } else if (this.type == ArithmeticOption.INCREMENTO2) {
            const variable = environment.getVar(this.cadena);
            //validar que exista
            if (variable == null) {
                throw new Error("<tr><td>semantico</td><td>La variable '" + this.cadena + "' no existe </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            if (variable.condicion == false) {
                throw new Error("<tr><td>semantico</td><td>La variable '" + this.cadena + "' es const, no se puede operar </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            //validar que sea numerico
            if (variable?.type != 0) {
                throw new Error("<tr><td>semantico</td><td>La variable '" + this.cadena + "' tiene que ser de tipo numero</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            //retornar
            variable.valor++;
            result = { value: variable.valor, type: Type.NUMBER };
            //actualiza 
            environment.actualizar(this.cadena, variable.valor, variable.type, true);
            return result;

        } else if (this.type == ArithmeticOption.DECREMENTO2) {
            const variable = environment.getVar(this.cadena);
            //validar que exista
            if (variable == null) {
                throw new Error("<tr><td>semantico</td><td>La variable '" + this.cadena + "' no existe </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            if (variable.condicion == false) {
                throw new Error("<tr><td>semantico</td><td>La variable '" + this.cadena + "' es const, no se puede operar </td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            //validar que sea numerico
            if (variable?.type != 0) {
                throw new Error("<tr><td>semantico</td><td>La variable '" + this.cadena + "' tiene que ser de tipo numero</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            //retornar
            variable.valor--;
            result = { value: variable.valor, type: Type.NUMBER };
            //actualiza 
            environment.actualizar(this.cadena, variable.valor, variable.type, true);
            return result;

        }
        const valueIzq = this.left.execute(environment);
        //parser.ast+='node'+(this.line)+'_'+(this.column+1)+'->node'+(this.left.line)+'_'+(this.left.column+1)+';\n';
        const valueDer = this.right.execute(environment);
        //parser.ast+='node'+(this.line)+'_'+(this.column+1)+'->node'+(this.right.line)+'_'+(this.right.column+1)+';\n';
        //console.log("->",this.type);
        if (this.type == ArithmeticOption.PLUS) {
            if (valueIzq.type == Type.BOOLEAN && valueDer.type == Type.BOOLEAN ||
                valueIzq.type == Type.BOOLEAN && valueDer.type == Type.NUMBER ||
                valueIzq.type == Type.NUMBER && valueDer.type == Type.BOOLEAN
            ) {
                result = { value: 0, type: Type.error };
                throw new Error("<tr><td>semantico</td><td>Error de tipos [suma], no se pude " + valueIzq.type + " con " + valueDer.type + "</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
            if (valueDer.type == Type.NUMBER && valueIzq.type == Type.NUMBER) {
                result = { value: (valueIzq.value + valueDer.value), type: Type.NUMBER };
            } else {
                result = { value: (valueIzq.value + valueDer.value), type: Type.STRING };

            }
        }
        //-----------------------------------------------------------
        //                      resta
        //-----------------------------------------------------------   
        else if (this.type == ArithmeticOption.MINUS) {
            //verificar que sean entre numero
            if (valueDer.type == 0 && valueIzq.type == 0) {
                result = { value: (valueIzq.value - valueDer.value), type: Type.NUMBER };
            }
            else {
                result = { value: 0, type: Type.error };
                throw new Error("<tr><td>semantico</td><td>Error de tipos [resta], no se pude " + valueIzq.type + " con " + valueDer.type + "</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
        }
        //-----------------------------------------------------------
        //                      multiplicacion
        //-----------------------------------------------------------
        else if (this.type == ArithmeticOption.TIMES) {
            if (valueDer.type == 0 && valueIzq.type == 0) {
                result = { value: (valueIzq.value * valueDer.value), type: Type.NUMBER };
            } else {
                result = { value: 0, type: Type.error };
                throw new Error("<tr><td>semantico</td><td>Error de tipos [multiplicacion], no se pude " + valueIzq.type + " con " + valueDer.type + "</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
        }
        //-----------------------------------------------------------
        //                       division
        //-----------------------------------------------------------
        else if (this.type == ArithmeticOption.DIV) {
            if (valueDer.type == 0 && valueIzq.type == 0) {
                if (valueDer.value == 0) {
                    result = { value: 0, type: Type.error };
                    throw new Error("No se puede dividir entre 0");
                }
                result = { value: (valueIzq.value / valueDer.value), type: Type.NUMBER };
            } else {
                result = { value: 0, type: Type.error };
                throw new Error("<tr><td>semantico</td><td>Error de tipos [division], no se pude " + valueIzq.type + " con " + valueDer.type + "</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
        }
        //-----------------------------------------------------------
        //                  potenciacion
        //-----------------------------------------------------------
        else if (this.type == ArithmeticOption.POT) {
            if (valueDer.type == 0 && valueIzq.type == 0) {
                result = { value: Math.pow(valueIzq.value, valueDer.value), type: Type.NUMBER };
            } else {
                result = { value: 0, type: Type.error };
                throw new Error("<tr><td>semantico</td><td>Error de tipos [potencia], no se pude " + valueIzq.type + " con " + valueDer.type + "</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
        }
        else if (this.type == ArithmeticOption.NEGACION) {
            result = { value: valueIzq.value * -1, type: Type.NUMBER };
        }
        else if (this.type == ArithmeticOption.MAS) {
            result = { value: valueIzq.value * 1, type: Type.NUMBER };
        }
        //-----------------------------------------------------------
        //                   modulo
        //-----------------------------------------------------------
        else {
            if (valueDer.type == 0 && valueIzq.type == 0) {
                result = { value: (valueIzq.value % valueDer.value), type: Type.NUMBER };
            } else {
                result = { value: 0, type: Type.error };
                throw new Error("<tr><td>semantico</td><td>Error de tipos [modulo], no se pude " + valueIzq.type + " con " + valueDer.type + "</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
        }
        return result;
    }
    public ast() {
        parser.ast += ' node' + (this.line) + '_' + (this.column) + ";\n"
                    + 'node' + (this.line) + '_' + (this.column) + '[label="' + get(this.type) + '"];\n';

        parser.ast += 'node' + (this.line) + '_' + (this.column) + "->"
        this.left.ast("");
        parser.ast += 'node' + (this.line) + '_' + (this.column) + "->"
        this.right.ast("");

    }

}
function get(tipo: ArithmeticOption): string {
    switch (tipo) {
        case 0:
            return "+"
        case 1:
            return "-"
        case 2:
            return "*"
        case 3:
            return "/"
        case 4:
            return "%"
        case 5:
            return "**"
        case 6:
            return "-"
        case 7:
            return "+"
        case 8:
            return "++"
        case 9:
            return "++"
        case 10:
            return "--"
        case 11:
            return "--"
        default:
            return "";
    }
}