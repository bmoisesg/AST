import { Environment } from "../Symbol/Environment";

export abstract class Instruction {

    constructor(public line: number, public column: number) {
        this.line = line
        this.column = column + 1
    }

    public abstract execute(environment: Environment): any
    public abstract ast(): void

}