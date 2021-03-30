
 class Literal extends Expression {
    constructor(value, type, line, column) {
        super(line, column);
        this.value = value;
        this.type = type;
    }
    execute() {
        if (this.type == Type.NUMBER)
            return { value: Number(this.value), type: Type.NUMBER };
        else if (this.type == Type.STRING)
            return { value: this.value, type: Type.STRING };
        else if (this.type == Type.BOOLEAN) {
            if (this.value == "true") {
                return { value: Boolean(true), type: Type.BOOLEAN };
            }
            else {
                return { value: Boolean(false), type: Type.BOOLEAN };
            }
        }
        else
            return { value: this.value, type: Type.error };
    }
    ast() {
        const nombre = `node_${this.line}_${this.column}_`;
        if (this.type == Type.STRING)
            return `
        ${nombre};
        ${nombre}[label="\\"${this.value.toString()}\\""];`;
        else
            return `
        ${nombre};
        ${nombre}[label="${this.value.toString()}"];`;
    }
}
