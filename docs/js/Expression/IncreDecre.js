
 class IncreDecre extends Expression {
    constructor(type, nombrevariable, line, column) {
        super(line, column);
        this.type = type;
        this.nombrevariable = nombrevariable;
    }
    execute(env) {
        let result = { value: null, type: Type.NUMBER };
        const variable = env.get_variable(this.nombrevariable);
        //validar que exista, que sea editable y que su tipo sea numero
        if (variable == null)
            throw new error("Semantico", `La variable '${this.nombrevariable}' no encontrada`, this.line, this.column);
        if (!variable.edit)
            throw new error("Semantico", `La variable '${this.nombrevariable}' no se puede editar porque es const`, this.line, this.column);
        if (variable.type != Type.NUMBER)
            throw new error("Semantico", `La variable '${this.nombrevariable}' tiene que ser de tipo numero para incrementar o decrementar`, this.line, this.column);
        switch (this.type) {
            case IncreDecreOption.INCREMENTO1:
                result.value = variable.value;
                variable.value++;
                break;
            case IncreDecreOption.INCREMENTO2:
                variable.value++;
                result.value = variable.value;
                break;
            case IncreDecreOption.DECREMENTO1:
                result.value = variable.value;
                variable.value--;
                break;
            case IncreDecreOption.DECREMENTO2:
                variable.value--;
                result.value = variable.value;
                break;
            default:
                break;
        }
        //actualiza en la tabla de simbolos 
        env.actualizar_variable(this.nombrevariable, variable.value);
        return result;
    }
    ast() {
        const s = Singleton.getInstance();
        const nombre_nodo = `node_${this.line}_${this.column}_`;
        return `
        /**/${nombre_nodo}1;
        ${nombre_nodo}1[label="{${this.nombrevariable}}"];
        ${nombre_nodo}[label="${getsimbol(this.type)}"];
        ${nombre_nodo}1->${nombre_nodo};
        `;
    }
}
