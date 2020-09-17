 
%{
    const {Arithmetic, ArithmeticOption} = require('../Expression/Arithmetic');
    const {Relational, RelationalOption} = require('../Expression/Relational');
    const {Access} = require('../Expression/Access');
    const {Literal} = require('../Expression/Literal');
    const {If} = require('../Instruction/If');
    const {Print} = require('../Instruction/Print');
    const {Statement} = require('../Instruction/Statement');
    const {While} = require('../Instruction/While');
    const {Declaration} = require('../Instruction/Declaration');
%}

%lex
%options case-insensitive
number  [0-9]+
decimal {entero}"."{entero}
string          (\"[^"]*\")
stringsimple    (\'[^']*\')
stringplantilla (\`[^`]*\`)
%%
\s+                   /* skip whitespace */
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas

"true"                  return 'true'
"false"                 return 'false'
{number}                return 'NUMBER'
{decimal}               return 'DECIMAL'
{string}                return 'STRING'
{stringsimple}          return 'STRINGG'
{stringplantilla}       return 'STRINGGG'

"**"                    return '**'
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"/"                     return '/'
"%"                     return '%'
";"                     return ';'
"."                     return '.'

"<="                  return '<='
">="                  return '>='
"<"                   return '<'
">"                   return '>'
"=="                  return '=='
"!="                  return '!='
"||"                  return '||'
"&&"                  return '&&'
"!"                   return '!'
"="                   return '='

"("                     return '('
")"                     return ')' 
"{"                     return '{'
"}"                     return '}'
"if"                    return 'IF'
"else"                  return 'ELSE'
"while"                 return 'WHILE'
"print"                 return 'PRINT'
"console"               return 'CONSOLE'
"log"                   return 'LOG'

([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID';
<<EOF>>		            return 'EOF'


/lex

%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
%left '**' '%'

%start Init

%%

Init    
    : Instructions EOF 
    {
        return $1;
    } 
;

Instructions
    : Instructions Instruction{
        $1.push($2);
        $$ = $1;
    }
    | Instruction{
        $$ = [$1];
    }
;

Instruction
    : IfSt {
        $$ = $1;
    }
    | WhileSt {
        $$ = $1;
    }
    | Statement {
        $$ = $1;
    }
    | PrintSt {
        $$ = $1;
    }
    | Declaration{
        $$ = $1;
    }
;

Declaration 
    : ID '=' Expr ';'{
        $$ = new Declaration($1, $3, @1.first_line, @1.first_column);
    }
;

IfSt
    : 'IF' '(' Expr ')' Statement ElseSt{
        $$ = new If($3, $5, $6, @1.first_line, @1.first_column);
    }
;

ElseSt
    : 'ELSE' Statement {
        $$ = $2;
    }
    | 'ELSE' IfSt {
        $$ = $2;
    }
    | /* epsilon */
    {
        $$ = null;
    }
;

WhileSt
    : 'WHILE' '(' Expr ')' Statement{
        $$ = new While($1, $5, @1.first_line, @1.first_column);
    }
;

Statement
    : '{' Instructions '}' {
        $$ = new Statement($2, @1.first_line, @1.first_column);
    }
    | '{' '}' {
        $$ = new Statement(new Array(), @1.first_line, @1.first_column);
    }
;

PrintSt 
    : 'CONSOLE' '.' 'LOG' '(' Expr ')' ';' {
        $$ = new Print($5, @1.first_line, @1.first_column);
    }
;

Expr /*aritmeticas*/
    : Expr '+'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.PLUS,   @1.first_line, @1.first_column); }       
    | Expr '-'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.MINUS,  @1.first_line, @1.first_column); }
    | Expr '*'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.TIMES,  @1.first_line, @1.first_column); }       
    | Expr '/'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.DIV,    @1.first_line, @1.first_column); }
    | Expr '%'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.MODULO, @1.first_line, @1.first_column); }
    | Expr '**' Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.POT,    @1.first_line, @1.first_column); }
    
    | F  {  $$ = $1; }
    
    /*relacionales*/
    | Expr '<'  Expr { $$ = new Relational($1, $3,RelationalOption.MENOR,           @1.first_line, @1.first_column); }
    | Expr '<=' Expr { $$ = new Relational($1, $3,RelationalOption.MENORIGUAL,      @1.first_line, @1.first_column); }
    | Expr '>'  Expr { $$ = new Relational($1, $3,RelationalOption.MAYOR,           @1.first_line, @1.first_column); }
    | Expr '>=' Expr { $$ = new Relational($1, $3,RelationalOption.MAYORIGUAL,      @1.first_line, @1.first_column); }
    | Expr '==' Expr { $$ = new Relational($1, $3,RelationalOption.IGUAL ,          @1.first_line, @1.first_column); }
    | Expr '!=' Expr { $$ = new Relational($1, $3,RelationalOption.DIFERENCIACION , @1.first_line, @1.first_column); }
;


F   : '(' Expr ')'  {  $$ = $2; }
    | DECIMAL       {  $$ = new Literal($1,                   @1.first_line, @1.first_column, 0); }
    | NUMBER        {  $$ = new Literal($1,                   @1.first_line, @1.first_column, 1); }
    | STRING        {  $$ = new Literal($1.replace(/\"/g,""), @1.first_line, @1.first_column, 2); }
    | STRINGG       {  $$ = new Literal($1.replace(/\'/g,""), @1.first_line, @1.first_column, 2); }
    | STRINGGG      {  $$ = new Literal($1.replace(/\`/g,""), @1.first_line, @1.first_column, 2); }
    | true          {  $$ = new Literal($1,                   @1.first_line, @1.first_column, 3); }
    | false         {  $$ = new Literal($1,                   @1.first_line, @1.first_column, 3); }
    | ID            {  $$ = new Access($1,                    @1.first_line, @1.first_column);    }
;