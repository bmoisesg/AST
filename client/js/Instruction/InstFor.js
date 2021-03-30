
  class InstFor extends Instruction {
    constructor(declaracion, condicion_seguir, iterador, code, line, column) {
        super(line, column);
        this.declaracion = declaracion;
        this.condicion_seguir = condicion_seguir;
        this.iterador = iterador;
        this.code = code;
    }
    execute(env) {
        //crear un nuevo entorno para ejecutar solo la variable del for 
        const newEnv = new Environment(env);
        //ejecuta la declacion o podria ser una asignacion
        this.declaracion.execute(newEnv);
        let condicion = this.condicion_seguir.execute(newEnv);
        //verificar que la expresion sea de tipo boolean
        if (condicion.type != Type.BOOLEAN)
            throw new error("Semantico", `La instruccion for necesita una expresion booleana para ejecutarse y se reconocio el typo [${get(condicion.type)}] en la expresion`, this.line, this.column);
        while (condicion.value) {
            this.code.execute(newEnv);
            this.iterador.execute(newEnv);
            //ejecutar la condicion otra vez para saber si seguir o salir 
            condicion = this.condicion_seguir.execute(newEnv);
        }
    }
    ast() {
        const s = Singleton.getInstance();
        const name_node = `node_${this.line}_${this.column}_`;
        s.add_ast(`
        ${name_node}[label="\\<Instruccion\\>\\nFor"];
        ${name_node}->node_${this.declaracion.line}_${this.declaracion.column}_;
        ${name_node}->node_${this.iterador.line}_${this.iterador.column}_;
        ${name_node}->node_${this.code.line}_${this.code.column}_;
        ${name_node}->${this.condicion_seguir.ast()}
        `);
        this.declaracion.ast();
        this.iterador.ast();
        this.code.ast();
    }
}
