export enum LogicalOption {
    AND,
    OR,
    NOT
}

export function OptionToSymbol(option: LogicalOption): string {
    switch (option) {
        case 0:
            return "&&"
        case 1:
            return "\\|\\|"
        case 2:
            return "!"
        default:
            return ""
    }
}

export function optionToString(objeto: LogicalOption): string {
    switch (objeto) {
        case 0:
            return "AND"
        case 1:
            return "OR"
        case 2:
            return "NOT"
        default:
            return ""
    }
}