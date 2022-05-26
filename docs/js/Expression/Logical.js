
 class Logical extends Expression {
    constructor(left, right, type, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.type = type;
    }
    execute(env) {
        const valueIzq = this.left.execute(env);
        //asegurarse que el tipo es boolean
        if (valueIzq.type != Type.BOOLEAN) {
            throw new error("Semantico", `Error tipos en operando ${optionToString(this.type)}, tipo [${get(valueIzq.type)}] debe ser [BOLEAN]`, this.line, this.column);
        }
        //corto circuito operador AND y OR
        if (Boolean(valueIzq.value) == false && this.type == LogicalOption.AND) {
            return { value: false, type: Type.BOOLEAN };
        }
        else if (Boolean(valueIzq.value) == true && this.type == LogicalOption.OR) {
            return { value: true, type: Type.BOOLEAN };
        }
        const valueDer = this.right.execute(env);
        //asegurarse que el tipo es boolean
        if (valueDer.type != Type.BOOLEAN) {
            throw new error("Semantico", `Error tipos en operando ${optionToString(this.type)}, tipo [${get(valueDer.type)}] debe ser [BOLEAN]`, this.line, this.column);
        }
        switch (this.type) {
            case LogicalOption.AND:
                return { value: valueIzq.value && valueDer.value, type: Type.BOOLEAN };
            case LogicalOption.OR:
                return { value: valueIzq.value || valueDer.value, type: Type.BOOLEAN };
            case LogicalOption.NOT:
                return { value: !valueDer.value, type: Type.BOOLEAN };
            default:
                return { value: null, type: Type.error };
        }
    }
    ast() {
        const nombreNodo = `node_${this.line}_${this.column}_`;
        return `
        ${nombreNodo};
        ${nombreNodo}[label="${OptionToSymbol(this.type)}"];
        ${nombreNodo}->${this.left.ast()}
        ${nombreNodo}->${this.right.ast()}
        `;
    }
}
