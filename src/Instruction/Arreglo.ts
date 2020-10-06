import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction"
import { Environment } from "../Symbol/Environment";

export class Arreglo extends Instruction {


    constructor(
        public id: string,
        public arrayExpresiones: Array<Expression>,
        public tipo: string,
        public contenido: Array<any>,
        line: number,
        column: number) {
        super(line, column);

    }
    public execute(environment: Environment) {
        //console.log(this.tipo);
        var condicion= false;
        this.arrayExpresiones?.forEach(element => {
            const tmp = element.execute(environment);
            if (tmp.type!=metodo1(this.tipo)){
                throw new Error("<tr><td>semantico</td><td>Tipo no validao, el contenido de este array tiene que ser ["+this.tipo+"]</td><td>" + (this.line) + "</td><td>" + (this.column+1) + "</td></tr>");
            }
            this.contenido.push(tmp.value)
        });
        if (environment.guardarArreglo(this.id, this)){
            throw new Error("<tr><td>semantico</td><td>Este nombre ["+this.id+"] ya existe en este ambito</td><td>" + (this.line) + "</td><td>" + (this.column+1) + "</td></tr>");
        };
    }

    public ast() {

    }
}
function metodo1(id:string):number {
    switch (id) {
        case "number":
            return 0
        case "string":
            return 1
        case "boolean":
            return 2 
        default:
            return 0
    }
}