import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";
import { env } from "process";

export enum ArithmeticOption{
    PLUS,
    MINUS,
    TIMES,
    DIV, 
    MODULO,
    POT,
    NEGACION,
    MAS                 
}
export class Arithmetic extends Expression{

    constructor(private left: Expression, private right: Expression, private type : ArithmeticOption, line: number, column: number){
        super(line,column);
    }

    public execute(environment : Environment) : Retorno{

        const valueIzq = this.left.execute(environment);
        const valueDer = this.right.execute(environment);
        let result : Retorno;

        if(this.type == ArithmeticOption.PLUS){
            result = {value : (valueIzq.value + valueDer.value), type : Type.NUMBER};
        }
        else if(this.type == ArithmeticOption.MINUS){
            result = {value : (valueIzq.value - valueDer.value), type : Type.NUMBER};
        }
        else if(this.type == ArithmeticOption.TIMES){
            result = {value : (valueIzq.value * valueDer.value), type : Type.NUMBER};
        }
        else if(this.type == ArithmeticOption.DIV){
            if(valueDer.value == 0){
                throw new Error("No se puede dividir entre 0");
            }
            result = {value : (valueIzq.value / valueDer.value), type : Type.NUMBER};
        }else if (this.type == ArithmeticOption.POT){
            result = {value : Math.pow(valueIzq.value, valueDer.value), type : Type.NUMBER};
        }else if (this.type == ArithmeticOption.NEGACION){
            result = {value : valueIzq.value*-1, type : Type.NUMBER};
        }else if (this.type == ArithmeticOption.MAS){
            result = {value : valueIzq.value*1, type : Type.NUMBER};
        }else{
            result = {value : (valueIzq.value % valueDer.value), type : Type.NUMBER};
        }
        
        return result;
    }

}