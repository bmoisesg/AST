import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/Retorno";
import { Environment } from "../Symbol/Environment";

export enum RelationalOption {
    IGUAL,
    DIFERENCIACION,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL,
    AND,
    OR,
    NOT
}
const parser = require('../Grammar/Grammar');
export class Relational extends Expression {

    constructor(private left: Expression, private right: Expression, private type: RelationalOption, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {

        const valueIzq = this.left.execute(environment);
        if (Boolean(valueIzq.value) == false && this.type == RelationalOption.AND) {
            //console.log("pase por el corto circuito del and")
            const result = Boolean(false);
            return { value: result, type: Type.BOOLEAN };
        } else if (Boolean(valueIzq.value) == true && this.type == RelationalOption.OR) {
            //console.log("pase por el corto circuito del or")
            const result = Boolean(true);
            return { value: result, type: Type.BOOLEAN };
        }
        const valueDer = this.right.execute(environment);
        //parser.ast += 'node'+(this.line)+'_'+(this.column+1)+ '[label="'+get(this.type) +'"]\n'
        //parser.ast += 'node'+(this.line)+'_'+(this.column+1)+"->node"+this.left.line+"_"+(this.left.column+1) +';\n';
        //parser.ast += 'node'+(this.line)+'_'+(this.column+1)+"->node"+this.right.line+"_"+(this.right.column+1) +';\n';
        if (this.type == RelationalOption.IGUAL) {
            const result = valueIzq.value == valueDer.value;
            return { value: result, type: Type.BOOLEAN };

        } else if (this.type == RelationalOption.DIFERENCIACION) {
            const result = valueIzq.value != valueDer.value;
            return { value: result, type: Type.BOOLEAN };

        } else if (this.type == RelationalOption.MENOR) { 
            const result = valueIzq.value < valueDer.value;
            return { value: result, type: Type.BOOLEAN };

        } else if (this.type == RelationalOption.MENORIGUAL) {
            const result = valueIzq.value <= valueDer.value;
            return { value: result, type: Type.BOOLEAN };

        } else if (this.type == RelationalOption.MAYOR) {
            const result = valueIzq.value > valueDer.value;
            return { value: result, type: Type.BOOLEAN };

        } else if (this.type == RelationalOption.MAYORIGUAL) {
            const result = valueIzq.value >= valueDer.value;
            return { value: result, type: Type.BOOLEAN };
        }

        /*logicas*/
        else if (this.type == RelationalOption.AND) {
            const result = valueIzq.value && valueDer.value;
            return { value: result, type: Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.OR) {
            const result = valueIzq.value || valueDer.value;
            return { value: result, type: Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.NOT) {
            const result = !valueDer.value;
            return { value: result, type: Type.BOOLEAN };
        }
        return { value: 0, type: Type.NUMBER }
    }
    public ast(id: string) {
        parser.ast += ' node' + (this.line) + '_' + (this.column) + ";\n"
            + 'node' + (this.line) + '_' + (this.column) + '[label="' + get(this.type) + '"];\n';

        parser.ast += 'node' + (this.line) + '_' + (this.column) + "->"
        this.left.ast("");
        if (this.type != RelationalOption.NOT) {
            parser.ast += 'node' + (this.line) + '_' + (this.column) + "->"
            this.right.ast("");
        }
    }
}
function get(tipo: RelationalOption): string {
    switch (tipo) {
        case 0:
            return "=="
        case 1:
            return "!="
        case 2:
            return "\\<"
        case 3:
            return "\\<="
        case 4:
            return "\\>"
        case 5:
            return "\\>="
        case 6:
            return "&&"
        case 7:
            return "\\|\\|"
        case 8:
            return "!"
        default:
            return "";
    }
}