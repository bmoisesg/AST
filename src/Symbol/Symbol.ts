import { Type } from "../Abstract/Retorno";

export class Symbol{
    public valor :any;
    public id : string;
    public type : Type;
    public condicion :boolean;

    constructor(valor: any, id: string, type: Type, condicion:boolean){
        this.valor = valor;
        this.id = id;
        this.type = type;
        this.condicion= condicion;
    }
}