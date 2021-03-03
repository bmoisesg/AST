import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/Retorno";
const parser = require('../Grammar/Grammar');
export class If extends Instruction{

    constructor(private condition : Expression, private code : Instruction, private elsSt : Instruction | null,
        line : number, column : number){
        super(line, column);
    }

    public execute(env : Environment) {
        
        const condition = this.condition.execute(env);
        if(condition.type != Type.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.line, columna : this.column};
        }

        if(condition.value == true){
            this.code.execute(env);
        }
        else{
            this.elsSt?.execute(env);
        }
    }
    public ast(){
        parser.ast += 'node' + this.line + '_' + (this.column) + ' [label="\\<Instruccion\\> \\n if"];\n';
        parser.ast += 'node' + this.line + '_' + (this.column) + '->'
        this.condition.ast();
        parser.ast+='node' + this.line + '_' + (this.column)+'->node'+ this.code.line + '_' + (this.code.column) +";\n"
        this.code.ast()
        if(this.elsSt!=null){
            parser.ast+='node' + this.line + '_' + (this.column)+'->node'+ this.elsSt.line + '_' + (this.elsSt.column) +";\n"
            this.elsSt.ast()        
        }
    }
}