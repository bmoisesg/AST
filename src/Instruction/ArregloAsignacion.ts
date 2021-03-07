import { Expression } from "../Abstract/Expression"
import { Instruction } from "../Abstract/Instruction"
import { Environment } from "../Symbol/Environment"
import { error } from "../tool/error"

export class ArregloAsignacion extends Instruction {

    constructor(
        public nombre: string,
        public array: Array<Expression>,
        public expresionIndex: Expression,
        public expresionAsignar: Expression,
        line: number,
        column: number
    ) {
        super(line, column)
    }
    public execute(env: Environment) {
        /*
                //revisar que existe este array
                let array = env.get_array(this.nombre)
                if (array == undefined) throw new error("Semantico", `Este array '${this.nombre}' no se pudo encontrar`, this.line, this.column)
        
                var arregloLocal = array.contenido as Array<any>
        
                if (this.push == false) {
                    //asignacion normal
                    if (this.array == null) {
                        //asignacion a una posicion en especifico
                        const runExpresionIndex = this.expresionIndex.execute(env);
                        const runExpresionAsignar = this.expresionAsignar.execute(env);
                        if (runExpresionIndex.type != 0) {
                            throw new Error("<tr><td>semantico</td><td>Tipo de dato de Index no valido , tiene que ser numerico </td><td>" + (this.line) + "</td><td>" + (this.column + 1) + "</td></tr>");
                        }
                        if (runExpresionAsignar.type != metodo1(array.tipo as string)) {
                            throw new Error("<tr><td>semantico</td><td>Este valor de asignacion no es del mismo tipo que el array,el array '" + this.nombre + "' es tipo [" + (arregloLocal_tmp?.tipo as string) + "] </td><td>" + (this.line) + "</td><td>" + (this.column + 1) + "</td></tr>");
                        }
                        arregloLocal[runExpresionIndex.value] = runExpresionAsignar.value;
                    } else {
                        //asignacion y meter un conjunto de datos
                        var tmp: Array<any> = []
                        this.array.forEach(element => {
                            const x = element.execute(env);
                            if (x.type != metodo1(array?.tipo as string)) {
                                throw new Error("<tr><td>semantico</td><td>Tipo no validao, el contenido de este array tiene que ser [" + arregloLocal_tmp?.tipo as string + "] </td><td>" + (this.line) + "</td><td>" + (this.column + 1) + "</td></tr>");
                            }
                            tmp.push(x.value);
                        });
                        arregloLocal = tmp;
                    }
                } else {
                   
                }
                env.updateArray(this.nombre, arregloLocal);
                var arregloLocalComprobar = env.getArray(this.nombre)?.contenido as Array<String>;
                //console.log("ahora el arreglo <" + this.nombre + "> tiene :", arregloLocalComprobar);
           */
    }

    public ast() {

    }
}

