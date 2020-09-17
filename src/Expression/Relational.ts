import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";

export enum RelationalOption{
    IGUAL,
    DIFERENCIACION,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL
}

export class Relational extends Expression{

    constructor(private left: Expression, private right: Expression, private type : RelationalOption, line: number, column: number){
        super(line,column);
    }

    public execute(environment : Environment) : Retorno{

        const valueIzq = this.left.execute(environment);
        const valueDer = this.right.execute(environment);

        if(this.type == RelationalOption.IGUAL){
            const result =valueIzq.value == valueDer.value;
            return {value : result, type : Type.BOOLEAN};

        }else if(this.type == RelationalOption.DIFERENCIACION){
            const result =valueIzq.value != valueDer.value;
            return {value : result, type : Type.BOOLEAN};
            
        }else if(this.type == RelationalOption.MENOR){
            const result =valueIzq.value < valueDer.value;
            return {value : result, type : Type.BOOLEAN};
            
        }else if(this.type == RelationalOption.MENORIGUAL){
            const result =valueIzq.value <= valueDer.value;
            return {value : result, type : Type.BOOLEAN};
            
        }else if(this.type == RelationalOption.MAYOR){
            const result =valueIzq.value > valueDer.value;
            return {value : result, type : Type.BOOLEAN};
            
        }else if(this.type == RelationalOption.MAYORIGUAL){
            const result =valueIzq.value >= valueDer.value;
            return {value : result, type : Type.BOOLEAN};
        } 
        return {value:0, type : Type.NUMBER}
    }
}