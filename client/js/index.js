import { Singleton } from "./Singleton/Singleton";
import { exec } from "child_process";
import { Environment } from "./Symbol/Environment";
 
try {
    if (true) {
        const entrada = fs.readFileSync('src/entrada.txt');
        const ast = parser.parse(entrada.toString());
        const env = new Environment(null);
        const s = Singleton.getInstance();
        s.add_ast(`nodeOriginal[label="<\\Lista_Instrucciones\\>"];`);
        //generar el ast primero
        for (const instr of ast) {
            try {
                instr.ast();
                s.add_ast(`nodeOriginal->node_${instr.line}_${instr.column}_;`);
            }
            catch (error) {
            }
        }
        //recorrer las instrucciones y ejecutarlas
        for (const instruccion of ast) {
            try {
                instruccion.execute(env);
            }
            catch (error) {
                s.add_error(error);
            }
        }
        exec('mkdir out/');
        console.log(s.get_consola());
        createFile("out/errores.html", s.get_error());
        createFile("out/entornos.html", s.get_entorno());
        createFile("out/ast.dot", "digraph G {\nnode[shape=box];" + s.get_ast() + "\n}");
        exec('dot -Tpng out/ast.dot -o out/ast.png ');
    }
}
catch (error) {
    console.log(error);
}
function createFile(nameFile, data) {
    fs.writeFile(nameFile, data, () => {
        console.log('>> The file ' + nameFile + ' has been saved!');
    });
}
