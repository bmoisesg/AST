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
        public condicion: boolean,      //push
        public condicionPop: boolean,    //pop
        line: number,
        column: number) {
        super(line, column);
    }
    public execute(environment: Environment) {
        //revisar que existe este array
        if (!environment.getExisteIdArray(this.id)) {
            throw new Error("<tr><td>semantico</td><td>Este array '" + this.id + "' no existe en el ambito actual</td><td>" + (this.line) + "</td><td>" + (this.column + 1) + "</td></tr>");
        }
        var arregloLocal_tmp = environment.getArray(this.id);
        var arregloLocal = environment.getArray(this.id)?.contenido as Array<any>;

        if (this.condicionPop) {
            //pop
            arregloLocal.pop();
            environment.updateArray(this.id, arregloLocal);
            var arregloLocalComprobar = environment.getArray(this.id)?.contenido as Array<String>;
            console.log("ahora el arreglo <" + this.id + "> tiene :", arregloLocalComprobar);
            return
        }

        if (this.condicion == false) {
            //asignacion normal
            if (this.array == null) {
                //asignacion a una posicion en especifico
                const runExpresionIndex = this.expresionIndex.execute(environment);
                const runExpresionAsignar = this.expresionAsignar.execute(environment);
                if (runExpresionIndex.type != 0) {
                    throw new Error("<tr><td>semantico</td><td>Tipo de dato de Index no valido , tiene que ser numerico </td><td>" + (this.line) + "</td><td>" + (this.column + 1) + "</td></tr>");
                }
                if (runExpresionAsignar.type != metodo1(arregloLocal_tmp?.tipo as string)) {
                    throw new Error("<tr><td>semantico</td><td>Este valor de asignacion no es del mismo tipo que el array,el array '" + this.id + "' es tipo [" + (arregloLocal_tmp?.tipo as string) + "] </td><td>" + (this.line) + "</td><td>" + (this.column + 1) + "</td></tr>");
                }
                arregloLocal[runExpresionIndex.value] = runExpresionAsignar.value;
            } else {
                //asignacion y meter un conjunto de datos
                var tmp: Array<any> = []
                this.array.forEach(element => {
                    const x = element.execute(environment);
                    if (x.type != metodo1(arregloLocal_tmp?.tipo as string)) {
                        throw new Error("<tr><td>semantico</td><td>Tipo no validao, el contenido de este array tiene que ser [" + arregloLocal_tmp?.tipo as string + "] </td><td>" + (this.line) + "</td><td>" + (this.column + 1) + "</td></tr>");
                    }
                    tmp.push(x.value);
                });
                arregloLocal = tmp;
            }
        } else {
            //tiene que hacer un push
            const tmp = this.expresionAsignar.execute(environment);
            //comprobar que el tipo es el correcto
            if (tmp.type != metodo1(arregloLocal_tmp?.tipo as string)) {
                throw new Error("<tr><td>semantico</td><td>Este valor no es del mismo tipo que el array,el array '" + this.id + "' es tipo [" + (arregloLocal_tmp?.tipo as string) + "] </td><td>" + (this.line) + "</td><td>" + (this.column + 1) + "</td></tr>");
            }
            arregloLocal.push(tmp.value)

        }
        environment.updateArray(this.id, arregloLocal);
        var arregloLocalComprobar = environment.getArray(this.id)?.contenido as Array<String>;
        console.log("ahora el arreglo <" + this.id + "> tiene :", arregloLocalComprobar);
    }

    public ast() {

    }
}

function metodo1(id: string): number {
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