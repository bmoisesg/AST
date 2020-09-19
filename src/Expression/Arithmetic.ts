import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";
import { env } from "process";
import { type } from "os";
import { toNamespacedPath } from "path";

export enum ArithmeticOption {
    PLUS,
    MINUS,
    TIMES,
    DIV,
    MODULO,
    POT,
    NEGACION,
    MAS
}
export class Arithmetic extends Expression {

    constructor(private left: Expression, private right: Expression, private type: ArithmeticOption, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {

        const valueIzq = this.left.execute(environment);
        const valueDer = this.right.execute(environment);
        let result: Retorno;

        if (this.type == ArithmeticOption.PLUS) {
            result = { value: (valueIzq.value + valueDer.value), type: Type.NUMBER };
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

}
