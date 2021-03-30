
  class InsFuncion extends Instruction {
    constructor(name, bloque, parametros, tipo, line, column) {
        super(line, column);
        this.name = name;
        this.bloque = bloque;
        this.parametros = parametros;
        this.tipo = tipo;
    }
    execute(env) {
        let c = env.revisarRepetido(this.name);
        if (c)
            throw new error("Semantico", `La funcion que se quiere guardar ya tiene el nombre '${this.name}' registrado como funcion, variable o array `, this.line, this.column);
        //revisar que el nombre de los parametros no se repitan, para eso los metere todos los nombres de los parametros en un array
        let array_parametro = [];
        this.parametros.forEach(x => {
            let tmp = x.split(",");
            array_parametro.push(tmp[0]); //almaceno el nombre del parametro
        });
        var i = 0;
        array_parametro.forEach(x => {
            if (i != array_parametro.indexOf(x) //que no sea el mismo, porque ira a buscar el nombre a todo el array
                && array_parametro.indexOf(x) >= 0) {
                throw new error("Semantico", `La funcion  '${this.name}' tiene un parametro repetido llamado '${x}'`, this.line, this.column);
            }
            i++;
        });
        //todo esta listo para guardarla en la tabla de simbolos
        env.guardar_funcion(this.name, this);
    }
    ast() {
        const s = Singleton.getInstance();
        const nombre_nodo = `node_${this.line}_${this.column}_`;
        s.add_ast(`
        ${nombre_nodo} [label="\\<Instruccion\\>\\nFuncion"];
        ${nombre_nodo}1[label="\\<Nombre\\>\\n${this.name}"];
        ${nombre_nodo}2[label="\\<Parametros\\>"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${nombre_nodo}2;
        ${nombre_nodo}->node_${this.bloque.line}_${this.bloque.column}_;
        `);
        this.bloque.ast();
        let tmp = 5; //empiezo desde 5 porque ya esta ocupado 1 y 2
        this.parametros.forEach(x => {
            s.add_ast(`
            ${nombre_nodo}${tmp}[label="\\<Nombre,Tipo\\>\\n${x}"];
            ${nombre_nodo}2->${nombre_nodo}${tmp};
            `);
            tmp++;
        });
    }
}
