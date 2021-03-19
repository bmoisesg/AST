import { Expression } from "../Abstract/Expression";
export class ExpreArray extends Expression {
    constructor(id, condicionPop, condicionAsignacion, expresion, line, column) {
        super(line, column);
        this.id = id;
        this.condicionPop = condicionPop;
        this.condicionAsignacion = condicionAsignacion;
        this.expresion = expresion;
    }
    execute(environment) {
        let result;
        return { type: 0, value: 0 };
        /*
        var condicion = environment.getExisteIdArray(this.id)
        // console.log(condicion);
        if (condicion == false) {
            throw new Error("<tr><td>semantico</td><td>Este array '" + this.id + "' no existe </td><td>" + (this.line) + "</td><td>" + (this.column + 1) + "</td></tr>");
        }


        //desde este punto si existe el array
        var arregloLocal_tmp = environment.getArray(this.id);
        var arregloLocal = environment.getArray(this.id)?.contenido as Array<any>;


        if (this.condicionAsignacion) {
            const expresion = this.expresion.execute(environment);
            if (expresion.type != 0) {
                throw new Error("<tr><td>semantico</td><td>Tipo de dato de Index no valido , tiene que ser numerico </td><td>" + (this.line) + "</td><td>" + (this.column + 1) + "</td></tr>");
            }
            //ya si es numerico el index ahora solo es de ir a traer el dato y entregarlo

            if (arregloLocal_tmp?.tipo == "string") result = { value: arregloLocal[expresion.value], type: Type.STRING };
            else if (arregloLocal_tmp?.tipo == "number") result = { value: arregloLocal[expresion.value], type: Type.NUMBER };
            else result = { value: arregloLocal[expresion.value], type: Type.BOOLEAN };
            return result;
        }



        if (this.condicionPop) {
            //pop
            var enviar = arregloLocal.pop();
            environment.updateArray(this.id, arregloLocal);
            var arregloLocalComprobar = environment.getArray(this.id)?.contenido as Array<String>;
            //console.log("ahora el arreglo <" + this.id + "> tiene :", arregloLocalComprobar);
            if (arregloLocal_tmp?.tipo == "string") result = { value: enviar, type: Type.STRING };
            else if (arregloLocal_tmp?.tipo == "number") result = { value: enviar, type: Type.NUMBER };
            else result = { value: enviar, type: Type.BOOLEAN };
            return result;
        } else {
            //legth
            result = { value: arregloLocal.length, type: Type.NUMBER };
            return result;
        }*/
    }
    ast() {
        return "";
    }
}
