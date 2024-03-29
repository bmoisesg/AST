
class Incre extends Instruction {
    constructor(tipo, id, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id;
    }
    execute(env) {
        //primero traer la va variable de la tabla de simbolos
        const variable = env.get_variable(this.id);
        //verificar que exista, que sea editable y que sea del tipo number
        if (variable == null)
            throw new error("Semantico", `Variable '${this.id}' no encontrada `, this.line, this.column);
        if (!variable.edit)
            throw new error("Semantico", `La variable '${this.id}' es const y no es permitido cambiar su valor`, this.line, this.column);
        if (variable.type != Type.NUMBER)
            throw new error("Semantico", `La variable '${this.id}' tiene que ser de tipo [NUMBER] y se detecto ${get(variable.type)}`, this.line, this.column);
        this.tipo == "++" ? variable.value++ : variable.value--;
        env.actualizar_variable(this.id, variable.value);
    }
    ast() {
        const s = Singleton.getInstance();
        const name_node = `node_${this.line}_${this.column}_`;
        const label = this.tipo == "++" ? "Incremento" : "Decremento";
        s.add_ast(`
        ${name_node}[label="\\<Instruccion\\>\\n${label}"];
        ${name_node}1[label="{${this.id}}"];
        ${name_node}->${name_node}1;
        `);
    }
}
