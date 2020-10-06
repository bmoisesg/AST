import { Instruction } from "../Abstract/Instruction"
import { Environment } from "../Symbol/Environment";

export class Arreglo extends Instruction {
    
    private elemento:Array<any>;
    private id:string;

    constructor(
        id:string,
        array: Array<any>,
        line: number,
        column: number) {
        super(line, column);
        this.elemento= array;
        this.id=id;
    }
    public execute(environment: Environment) {
        console.log(this.elemento);
    }

    public ast(){

    }
}