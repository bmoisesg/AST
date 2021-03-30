
class ArregloAcciones extends Instruction {
    constructor(nombre, expre, push, //push
        pop, //pop
        line, column) {
        super(line, column);
        this.nombre = nombre;
        this.expre = expre;
        this.push = push;
        this.pop = pop;
    }
    execute(env) {
        //revisar que existe este array
        let objeto = env.get_array(this.nombre);
        if (objeto == undefined)
            throw new error("Semantico", `Este array '${this.nombre}' no se pudo encontrar`, this.line, this.column);
        let array = objeto.contenido;
        if (this.pop) {
            array.pop();
        }
        else {
            const tmp = this.expre.execute(env);
            if (tmp.type != get_num(objeto.tipo))
                throw new error("Semantico", `La expresion tiene que ser del mismo tipo que el array, el array '${this.nombre}' es tipo [${objeto.tipo}] y se detecto el tipo [${get(tmp.type)}]`, this.line, this.column);
            array.push(tmp.value);
        }
        env.update_array(this.nombre, array);
    }
    ast() {
        const s = Singleton.getInstance();
        const name_node = `node_${this.line}_${this.column}_`;
        const name = this.push ? "push" : "pop";
        s.add_ast(`
        ${name_node}[label="\\<Instruccion\\> \\n ${name}"];
        `);
        if (this.push) {
            s.add_ast(`
            ${name_node}[label="\\<Instruccion\\> \\n ${name}"];
            ${name_node}->${this.expre.ast()}
            `);
        }
    }
}
