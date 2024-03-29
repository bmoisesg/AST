
  class Declaration extends Instruction {
    constructor(nombre, value, //siempre tiene que tener una expresion como es una declaracion CONST
    tipo, line, column) {
        super(line, column);
        this.nombre = nombre;
        this.value = value;
        this.tipo = tipo;
    }
    execute(env) {
        const expression = this.value.execute(env);
        if (this.tipo == null) {
            //cuando la declaracion no tiene un tipo de dato definido
            const c = env.guardar_variable(this.nombre, expression.value, expression.type, false);
            if (!c)
                throw new error("Semantico", `La variable '${this.nombre}' ya existe en el entorno actual`, this.line, this.column);
        }
        else {
            //cuando la declaracion si tiene un tipo de dato definido
            if (expression.type == Type.NUMBER && this.tipo == "number" ||
                expression.type == Type.STRING && this.tipo == "string" ||
                expression.type == Type.BOOLEAN && this.tipo == "boolean") {
                const c = env.guardar_variable(this.nombre, expression.value, expression.type, false);
                if (!c)
                    throw new error("Semantico", `La variable '${this.nombre}' ya existe en el entorno actual`, this.line, this.column);
            }
            else
                throw new error("Semantico", `El tipo de dato de la expresion [${get(expression.type)}] no es compatible con [${this.tipo}]`, this.line, this.column);
        }
    }
    ast() {
        const s = Singleton.getInstance();
        const nombreNodo = `node_${this.line}_${this.column}_`;
        s.add_ast(`
        ${nombreNodo}[label="\\<Instruccion\\>\\nDeclaracion const"];
        ${nombreNodo}1[label="\\<Nombre\\>\\n${this.nombre}"];
        ${nombreNodo}2[label="\\<Tipo\\>\\n${this.tipo}"];
        ${nombreNodo}->${nombreNodo}1
        ${nombreNodo}->${nombreNodo}2
        ${nombreNodo}->${this.value.ast()}`);
    }
}
