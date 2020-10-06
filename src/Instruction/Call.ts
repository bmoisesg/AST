import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
const parser = require('../Grammar/Grammar');
export class Call extends Instruction {

    constructor(
        private id: string,
        private expresiones: Array<Expression>,
        line: number,
        column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        const func = environment.getFuncion(this.id);
        if (func != undefined) {
            //console.log("encontre la funcion", this.id);

            //verificar que los parametros esten correctos
            let arrayTipos: number[]=[];
            this.expresiones.forEach(element => {
                const expre=element.execute(environment);
                arrayTipos.push(expre.type);
            });
            //console.log(arrayTipos)
            
            if (arrayTipos.length!=func.parametros.length){
                throw new Error("<tr><td>semantico</td><td>No enconte la funcion  '" + this.id + "' con todos estos parametros</td><td>" + (this.line) + "</td><td>" + (this.column+1) + "</td></tr>");
            }
            for (let i = 0; i < func.parametros.length; i++) {
                const element = func.parametros[i].split(",")[1];

                if (
                    element== "number"  && arrayTipos[i]==0 ||
                    element== "string"  && arrayTipos[i]==1 ||
                    element== "boolean" && arrayTipos[i]==2    
                ){

                }else{
                    throw new Error("<tr><td>semantico</td><td>Error de parametro no se esperba un tipo '"+arrayTipos[i]+ "' en la posicion "+(i+1)+" de la funcion</td><td>" + (this.line) + "</td><td>" + (this.column+1) + "</td></tr>"); 
                }
            }

            const newEnv = new Environment(environment.getGlobal());
            //declara los parametros con el valor 
           // console.log("---------")
            let y=0;
            this.expresiones.forEach(element => {
                const x = element.execute(environment);
                //console.log(condition);
                newEnv.guardar(func.parametros[y].split(",")[0], x.value, x.type,true);
                y++;
            });

            for (let i = 0; i < this.expresiones.length; i++) {
                const value = this.expresiones[i].execute(environment);
                // newEnv.guardar(func.parametros[i], value.value, value.type);
            }
            const parser = require('../Grammar/Grammar');
            parser.pila_funciones.push(func);
            func.statment.execute(newEnv);


        }else{
            throw new Error("<tr><td>semantico</td><td>No enconte la funcion  '" + this.id + "' </td><td>" + (this.line) + "</td><td>" + (this.column+1) + "</td></tr>");
        }
    }
    public ast(){
        parser.ast += 'node' + this.line + '_' + (this.column) + ' [label="\\<Instruccion\\> \\n Llamada funcion"];\n';
        parser.ast += 'node' + this.line + '_' + (this.column) + '1 [label="' + this.id + '"];\n';
        parser.ast += 'node' + this.line + '_' + (this.column) + '2 [label="Parametros"];\n';
        parser.ast += 'node' + this.line + '_' + (this.column) + '->node' + this.line + '_' + (this.column) + '2;\n'
        parser.ast += 'node' + this.line + '_' + (this.column) + '->node' + this.line + '_' + (this.column) + '1;\n'
        this.expresiones.forEach(element => {
            parser.ast += 'node' + this.line + '_' + (this.column) + "2-> ";
            element.ast("");
        });
       
    }
}
