import { Instruction } from "./Abstract/Instruction";
import { Environment } from "./Symbol/Environment";

const parser = require('./Grammar/Grammar');
const fs = require('fs');

try {

    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

    if (true) {

        const entrada = fs.readFileSync('./entrada.txt');
        const ast = parser.parse(entrada.toString());
        const env = new Environment(null);
        //console.log(ast)
        //console.log(parser.Lista_errores);

        for (const instr of ast) {
            try {
                instr.execute(env);
            } catch (error) {
                //console.error(error);  
                parser.Lista_errores.push(error.message);
            }
        }
        //console.log(env)
        console.log("Errores:", parser.Lista_errores);
        console.log("Consola:",parser.consola);
    }
}
catch (error) {
    console.log(error);
}