
import { InsFuncion } from "./Instruction/InsFuncion";
import { Environment } from "./Symbol/Environment";
const parser = require('./Grammar/Grammar');
const fs = require('fs');

try {

    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

    if (true) {

        const entrada = "{"+fs.readFileSync('./entrada.txt')+"}";
        const ast = parser.parse(entrada.toString());
        const env = new Environment(null);
        //console.log(ast)
        //console.log(parser.Lista_errores);
        parser.ast = 'nodeOriginal[label="Lista_Instrucciones"];\n'
        for (const instr of ast) {
            try {
                instr.ast();
                parser.ast += 'nodeOriginal->node' + instr.line + '_' + instr.column + ";\n";
            } catch (error) {
                //console.error(error);  
                parser.Lista_errores.push(error.message);
            }
        }

        for (const instr of ast) {
            try {
                instr.execute(env);
                
            } catch (error) {
                //console.error(error);  
                parser.Lista_errores.push(error.message);
            }
        }
        //console.log(env)
        console.log("Errores:\n", parser.Lista_errores);
        console.log("Consola:\n", parser.consola);
        console.log("Entornos:\n", parser.graficarTS);
        //console.log("ast:\n\n", parser.ast.replace("\n",""));
    }
}
catch (error) {
    console.log(error);
}