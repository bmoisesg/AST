
class Arreglo extends Instruction {
    constructor(id, arrayExpresiones, tipo, contenido, //EL OBJETO que guarda los elementos del array
        line, column) {
        super(line, column);
        this.id = id;
        this.arrayExpresiones = arrayExpresiones;
        this.tipo = tipo;
        this.contenido = contenido;
        this.tam = -1;
    }
    execute(env) {
        this.arrayExpresiones.forEach(element => {
            const expre = element.execute(env);
            if (expre.type != get_num(this.tipo))
                throw new error("Semantico", `Tipo no valido, el contenido de este array tiene que ser tipo [${this.tipo}] `, this.line, this.column);
            this.contenido.push(expre.value);
        });
        if (!env.guardar_arreglo(this.id, this))
            throw new error("Semantico", `Este nombre {${this.id}} ya existe en este ambito`, this.line, this.column);
        this.tam = this.arrayExpresiones.length;
    }
    ast() {
        const s = Singleton.getInstance();
        const name_node = `node_${this.line}_${this.column}_`;
        s.add_ast(`
        ${name_node}[label="\\<Instruccion\\>\\nArray Declaracion"];
        ${name_node}1[label="\\<Nombre\\>\\n{${this.id}}"];
        ${name_node}2[label="\\<Tipo\\>\\n${this.tipo}"];
        ${name_node}3[label="\\<Contenido\\>"];
        ${name_node}->${name_node}1;
        ${name_node}->${name_node}2;
        ${name_node}->${name_node}3;
        `);
        this.arrayExpresiones.forEach(element => {
            s.add_ast(`
            ${name_node}3->${element.ast()}
            `);
        });
    }
}
/**
 * Retorna un numero segun el tipo
 * @param id
 * @returns
 */
 function get_num(id) {
    switch (id) {
        case "number":
            return 0;
        case "string":
            return 1;
        case "boolean":
            return 2;
        default:
            return 0;
    }
}
