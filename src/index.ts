import { Instruction } from "./Abstract/Instruction";
import { Environment } from "./Symbol/Environment";

const parser = require('./Grammar/Grammar');
const fs = require('fs');

try {
    const entrada = fs.readFileSync('./entrada.txt');
    const ast = parser.parse(entrada.toString());
    const env = new Environment(null);
    //console.log(ast)
    for(const instr of ast){
        try {
            instr.execute(env);
            
        } catch (error) {
            console.error(error);        
        }
    }
    //console.log(env)
} 
catch (error) {
    console.log(error);
}