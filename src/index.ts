
import { exec } from "child_process";
import { Environment } from "./Symbol/Environment";
const parser = require('./Grammar/Grammar');
const fs = require('fs');

try {

    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

    if (true) {

        const entrada = fs.readFileSync('src/entrada.txt');
        const ast = parser.parse(entrada.toString());
        const env = new Environment(null);                      //environment padre

        parser.ast = 'nodeOriginal[label="Lista_Instrucciones"];\n'
        for (const instr of ast) {
            try {
                instr.ast();
                parser.ast += 'nodeOriginal->node' + instr.line + '_' + instr.column + ";\n";
            } catch (error) {
                parser.Lista_errores.push(error.message);
            }
        }

        for (const instruccion of ast) {
            try {
                instruccion.execute(env);
            } catch (error) {
                parser.Lista_errores.push(error.message);
            }
        }

        //TODO hacerlas un singleton
        exec('mkdir out/')
        console.log(parser.consola);
        createFile("out/errores.html", parser.Lista_errores)
        createFile("out/entornos.html", parser.graficarTS)
        createFile("out/ast.dot", "digraph G {\n" + parser.ast + "\n}")
        exec('dot -Tpng out/ast.dot -o out/ast.png ')
    }
}
catch (error) {
    console.log(error);
}

function createFile(nameFile: string, data: string) {
    fs.writeFile(nameFile, data, () => {
        console.log('>> The file ' + nameFile + ' has been saved!');
    });
}