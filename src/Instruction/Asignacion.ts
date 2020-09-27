
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { env } from "process";
import { toNamespacedPath } from "path";


export class Asignacion extends Instruction {

    private id: string;
    private value: Expression;

    constructor(id: string, value: Expression, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public execute(environment: Environment) {
        const val = this.value.execute(environment);
        //revisar que exita la variable en el entorno

        var tmp2 = environment.getVar(this.id);
        if (tmp2 == null || tmp2 == undefined) {
            //no encontre la variable
            throw new Error("<tr><td>semantico</td><td>No encontre esta variable '" + this.id + "' en el entorno para poder asignar</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
        }
        //revisar que sean del mismo tiempo

        if (tmp2?.condicion == false) {
            //es una const
            throw new Error("<tr><td>semantico</td><td>Asignacion incorrecta, la variable '" + this.id + "' es una const '" + tmp2?.type + "'</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
        }
        if (tmp2?.type != val.type) {
            if (tmp2.type == -1) {
                environment.actualizar(this.id, val.value, val.type, true);
                return;
            } else {
                throw new Error("<tr><td>semantico</td><td>Asignacion incorrecta, la variable '" + this.id + "' es del tipo '" + tmp2?.type + "'</td><td>" + this.line + "</td><td>" + this.column + "</td></tr>");
            }
        }

        var condi = environment.actualizar(this.id, val.value, val.type, true);
        //console.log(condi);
    }
    public ast(){
        
    }
}