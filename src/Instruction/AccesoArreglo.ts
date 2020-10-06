import { captureRejectionSymbol } from "events";
import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction"
import { Environment } from "../Symbol/Environment";

export class AccesoArreglo extends Instruction {

    constructor(
        public id: string,
        public array: Array<Expression>,
        public expresionIndex: Expression,
        public expresionAsignar: Expression,
        public condicion: boolean,
        public condicionPop:boolean,
        line: number,
        column: number) {
        super(line, column);
    }
    public execute(environment: Environment) {
        var arregloLocal = environment.getArray(this.id)?.contenido as Array<String>;
        if (this.condicionPop){
            arregloLocal.pop();
            environment.updateArray(this.id, arregloLocal);
            var arregloLocalComprobar = environment.getArray(this.id)?.contenido as Array<String>;
            console.log("ahora el arreglo <" + this.id + "> tiene :", arregloLocalComprobar);
            return
        }
        if (this.condicion == false) {
            if (this.array == null) {
                const runExpresionIndex = this.expresionIndex.execute(environment);
                const runExpresionAsignar = this.expresionAsignar.execute(environment);
                arregloLocal[runExpresionIndex.value] = runExpresionAsignar.value;
            } else {
                var tmp: Array<any> = []
                this.array.forEach(element => {
                    const x = element.execute(environment);
                    tmp.push(x.value);
                });
                arregloLocal = tmp;
            }
        }else{
            //tiene que hacer un push
            const tmp=this.expresionAsignar.execute(environment);
            arregloLocal.push(tmp.value)
            
        }
        environment.updateArray(this.id, arregloLocal);
        var arregloLocalComprobar = environment.getArray(this.id)?.contenido as Array<String>;
        console.log("ahora el arreglo <" + this.id + "> tiene :", arregloLocalComprobar);
    }

    public ast() {

    }
}