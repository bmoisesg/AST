
  class If extends Instruction {
    constructor(condition, code, elsSt, line, column) {
        super(line, column);
        this.condition = condition;
        this.code = code;
        this.elsSt = elsSt;
    }
    execute(env) {
        var _a;
        const expresion = this.condition.execute(env);
        if (expresion.type != Type.BOOLEAN)
            throw new error("Semantico", `La condicion de la instruccion if tiene que ser tipo [BOOLEAN] y se reconocio el tipo [${get(expresion.type)}}]]`, this.line, this.column);
        if (expresion.value)
            this.code.execute(env);
        else
            (_a = this.elsSt) === null || _a === void 0 ? void 0 : _a.execute(env);
    }
    ast() {
        const s = Singleton.getInstance();
        const name_node = `node_${this.line}_${this.column}_`;
        s.add_ast(`
        ${name_node}[label="\\<Instruccion\\>\\nif"];
        ${name_node}1[label="\\<True\\>"];
        ${name_node}2[label="\\<Else\\>"];
        ${name_node}->${name_node}1;
        ${name_node}->${name_node}2;
        ${name_node}1->node_${this.code.line}_${this.code.column}_;`);
        this.code.ast();
        if (this.elsSt != null) {
            s.add_ast(`${name_node}2->node_${this.elsSt.line}_${this.elsSt.column}_`);
            this.elsSt.ast();
        }
    }
}
