
class Access extends Expression {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    execute(environment) {
        //traer la variable
        const value = environment.get_variable(this.id);
        if (value == null) {
            //verificar si es un array
            const tmp = environment.get_array(this.id);
            if (tmp != null)
                return { value: tmp.contenido, type: Type.STRING };
            throw new error("Semantico", `Variable '${this.id}' no encontrada `, this.line, this.column);
        }
        return { value: value.value, type: value.type };
    }
    ast() {
        const name_nodo = `node_${this.line}_${this.column}_`;
        return `
        ${name_nodo};
        ${name_nodo}[label="{${this.id}}"];
        `;
    }
}
