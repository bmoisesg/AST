import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
const parser = require('../Grammar/Grammar');
export class InsFuncion extends Instruction {

    constructor(
        public id: string,
        public statment: Instruction,
        public parametros: Array<string>,
        public retorno:string,
        line: number,
        column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        //revisar que no exista un id repetido
        let condicion=environment.getExisteIdFuncion(this.id); 
        //console.log(this.id);
        if(condicion){
            //error semantico
            throw new Error("<tr><td>semantico</td><td>La funcion  '" + this.id + "' ya existe </td><td>" + (this.line) + "</td><td>" + (this.column+1) + "</td></tr>");
        }
        //revisar que los parametros no se repitan
        let arraySplit:string[]=[]
        this.parametros.forEach(x => {
            let tmp= x.split(",")
            arraySplit.push(tmp[0])
        });
        //acabo de llenar el array con el nombre de todos los parametros, ahora tengo que revisar que no se repitan
        condicion=false
        var i=0
        arraySplit.forEach(x => {
            //console.log(x,arraySplit.indexOf(x));
            if(i!=arraySplit.indexOf(x)&& arraySplit.indexOf(x)>=0){
                throw new Error("<tr><td>semantico</td><td>La funcion  '" + this.id + "' tiene un parametro repetido '"+x+"' </td><td>" + this.line + "</td><td>" + (this.column+1) + "</td></tr>");
            }
            i++;
        });
        //console.log("--\n");
        environment.guardarFuncion(this.id, this);
    }
    public ast(){
        parser.ast += 'node' + this.line + '_' + (this.column) + ' [label="\\<Instruccion\\> \\n funcion"];\n';
        parser.ast += 'node' + this.line + '_' + (this.column) + '1[label="'+this.id+'"];\n';
        parser.ast += 'node' + this.line + '_' + (this.column) + '2[label="parametros"];\n';
        parser.ast += 'node' + this.line + '_' + (this.column) +'->node'+ this.line + '_' + (this.column)+"1;\n"
        parser.ast += 'node' + this.line + '_' + (this.column) +'->node'+ this.line + '_' + (this.column)+"2;\n"
        this.statment.ast();
        
        parser.ast += 'node' + this.line + '_' + (this.column) +'->node'+ this.statment.line + '_' + (this.statment.column)+';\n'
        var x=0;
        this.parametros.forEach(element => {
            parser.ast += 'node' + this.line + '_' + (this.column) + '_'+x+' [label="'+element+'"];\n';
            parser.ast += 'node' + this.line + '_' + (this.column) +'2->node' + this.line + '_' + (this.column) + '_'+x+";\n"
            x++;
        });
    }
}