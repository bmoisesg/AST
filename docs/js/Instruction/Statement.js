
  class Statement extends Instruction {
    constructor(code, line, column) {
        super(line, column);
        this.code = code;
    }
    execute(env) {
        const newEnv = new Environment(env);
        //recorrer primero las instrucciones buscando funciones
        for (const x of this.code) {
            if (x instanceof InsFuncion) {
                x.execute(newEnv);
            }
        }
        //recorrer las instrucciones restantes
        for (const x of this.code) {
            if (x instanceof InsFuncion) { }
            else if (x.toString() != ";") {
                const instruccion = x.execute(newEnv);
            }
        }
    }
    ast() {
        const s = Singleton.getInstance();
        const name_node = `node_${this.line}_${this.column}_`;
        s.add_ast(`
        ${name_node}[label="Lista Instrucciones"];        
        `);
        this.code.forEach(x => {
            s.add_ast(`${name_node}->node_${x.line}_${x.column}_;`);
            x.ast();
        });
    }
}
