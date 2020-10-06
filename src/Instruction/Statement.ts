import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { InsFuncion } from "./InsFuncion";

const parser = require('../Grammar/Grammar');
export class Statement extends Instruction{

    constructor(private code : Array<Instruction>, line : number, column : number){
        super(line, column);
    }

    public execute(env : Environment) {
        const newEnv = new Environment(env);
        /*for(const instr of this.code){
            if(instr instanceof InsFuncion){
                instr.execute(env)
                console.log(env)
            }
        }*/

        for(const instr of this.code){
            /*if(instr instanceof InsFuncion){
            }
            else {*/
                let instruccion =instr.execute(newEnv);
                if (instruccion == "@si"){
                    return
                }
            //}
        }

    }
    public ast(){
        //onsole.log(this.line, "-- ", this.column);
        parser.ast += 'node' + this.line + '_' + (this.column) + ' [label="Lista Instrucciones"];\n';
        this.code.forEach(element => {
            parser.ast += 'node' + this.line + '_' + (this.column) +'->node' + element.line + '_' + (element.column) +' ;\n' 
            element.ast();
        });
    }
}