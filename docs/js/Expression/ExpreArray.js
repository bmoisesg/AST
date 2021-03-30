
class ExpreArray extends Expression {
    constructor(id, condicionPop, condicionAsignacion, expresion, line, column) {
        super(line, column);
        this.id = id;
        this.condicionPop = condicionPop;
        this.condicionAsignacion = condicionAsignacion;
        this.expresion = expresion;
    }
    execute(environment) {
        let result;
        var objeto = environment.get_array(this.id);
        if (objeto == undefined) {
            throw new error("Semantico", `Este array '${this.id}' no existe `, this.line, this.column);
        }
        //return { type: 0, value: 0 }
        var array = objeto.contenido;
        if (this.condicionAsignacion) {
            //...= ID . [ Expre ]
            const expresion = this.expresion.execute(environment);
            if (expresion.type != Type.NUMBER)
                throw new error("Semantico", `El tipo de dato del index no valido, debe ser tipo [NUMBER]`, this.line, this.column);
            if (objeto.tipo == "string")
                result = { value: array[expresion.value], type: Type.STRING };
            else if (objeto.tipo == "number")
                result = { value: array[expresion.value], type: Type.NUMBER };
            else
                result = { value: array[expresion.value], type: Type.BOOLEAN };
            return result;
        }
        if (this.condicionPop) {
            var enviar = array.pop();
            environment.update_array(this.id, array);
            if (objeto.tipo == "string")
                result = { value: enviar, type: Type.STRING };
            else if (objeto.tipo == "number")
                result = { value: enviar, type: Type.NUMBER };
            else
                result = { value: enviar, type: Type.BOOLEAN };
        }
        else {
            //length
            result = { value: array.length, type: Type.NUMBER };
        }
        return result;
    }
    ast() {
        const name_nodo = `node_${this.line}_${this.column}_`;
        if (this.condicionAsignacion) {
            return `
            ${name_nodo};
            ${name_nodo}[label="${this.id}\\n<\\array\\> "];
            ${name_nodo}
            ${name_nodo}->${this.expresion.ast()}
            `;
        }
        if (this.condicionPop) {
            return `
            ${name_nodo};
            ${name_nodo}[label="${this.id}\\n<\\array pop\\> "];
            `;
        }
        else {
            return `
            ${name_nodo};
            ${name_nodo}[label="${this.id}\\n<\\array length\\> "];
            `;
        }
    }
}
