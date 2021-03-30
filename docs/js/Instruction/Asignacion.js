
 class Asignacion extends Instruction {
    constructor(nombre, value, line, column) {
        super(line, column);
        this.nombre = nombre;
        this.value = value;
    }
    execute(env) {
        const expresion = this.value.execute(env);
        var variable = env.get_variable(this.nombre);
        //validar que todo este bien antes de actualizar la variable
        if (variable == null || variable == undefined)
            throw new error("Semantico", `No encontre una variable con este nombre '${this.nombre}'`, this.line, this.column);
        if (!(variable === null || variable === void 0 ? void 0 : variable.edit))
            throw new error("Semantico", `Asignacion incorrecta, la variable con nombre '${this.nombre}' es una const y no puede cambiar valor`, this.line, this.column);
        if ((variable === null || variable === void 0 ? void 0 : variable.type) != expresion.type)
            throw new error("Semantico", `Asignacion incorrecta, la variable con nombre '${this.nombre}' es de tipo [${get(variable === null || variable === void 0 ? void 0 : variable.type)}] y se le esta tratando de asignar un tipo [${get(expresion.type)}]`, this.line, this.column);
        env.actualizar_variable(this.nombre, expresion.value);
    }
    ast() {
        const s = Singleton.getInstance();
        const nombre_nodo = `node_${this.line}_${this.column}_`;
        s.add_ast(`
        ${nombre_nodo}[label="\\<Instruccion\\>\\nAsignacion"];
        ${nombre_nodo}1[label="\\<Nombre\\>\\n${this.nombre}"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${this.value.ast()}
        `);
    }
}
