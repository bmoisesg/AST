 
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
    var Lista_errores=[];
    var tmp="";
%}

%lex
%options case-insensitive
decimal {number}"."{number}
number  [0-9]+

stringsimple     [\'][^']* [\']
stringplantilla  [\`][^`]* [\`]
%s  string 
%%

<INITIAL>["]   {this.begin('string');/*console.log("+entre en el estado string");*/ tmp="";}

<string>[^"\\]      { /*console.log("dentro del estado string: "+yytext);*/  tmp= tmp+yytext;   this.begin('string'); }
<string>[\\][n]     { tmp= tmp+yytext;   this.begin('string'); }
<string>[\\][t]     { tmp= tmp+yytext;   this.begin('string'); }
<string>[\\][r]     { tmp= tmp+yytext;   this.begin('string'); }
<string>[\\]["]     { tmp= tmp+yytext;   this.begin('string'); }
<string>[\\][\\]    { tmp= tmp+yytext;   this.begin('string'); }
<string>[\"]        {
                    //console.log("-saliendo del estado string->" +tmp);
                    this.begin('INITIAL');
                    yytext= tmp;
                    return 'STRING'
                    }




\s+                   /* skip whitespace */
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas

"true"                  return 'true'
"false"                 return 'false'
{decimal}               return 'DECIMAL'
{number}                return 'NUMBER'

{stringsimple}          return 'STRINGG'
{stringplantilla}       return 'STRINGGG'

"**"                    return '**'
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"%"                     return '%'
";"                     return ';'
"."                     return '.'

"<="                    return '<='
">="                    return '>='
"<"                     return '<'
">"                     return '>'
"=="                    return '=='
"!="                    return '!='
"||"                    return '||'
"&&"                    return '&&'
"!"                     return '!'
"="                     return '='

"("                     return '('
")"                     return ')' 
"{"                     return '{'
"}"                     return '}'
"if"                    return 'IF'
"else"                  return 'ELSE'
"while"                 return 'WHILE'
"const"                 return 'const'


"console"               return 'CONSOLE'
"log"                   return 'LOG'

([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID';
<<EOF>>		            return 'EOF'
.      {Lista_errores.push("<tr><td>lexico</td><td>No se reconoce el caracter "+yytext + '</td><td>' + (yylineno+1) +'</td><td>'+(yylloc.first_column+1)+'</td></tr>');	}
/lex

%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
%left '**' '%'
%right '!'
%start Init

%%

Init    
    : Instructions EOF  {
        exports.Lista_errores= Lista_errores;
        return $1;  }
;

Instructions
    : Instructions Instruction  { $1.push($2); $$ = $1; }
    | Instruction               { $$ = [$1];            }
;

Instruction
    : IfSt          {  $$ = $1;    }
    | WhileSt       {  $$ = $1;    }
    | Statement     {  $$ = $1;    }
    | PrintSt       {  $$ = $1;    }
    | Declaration1  {  $$ = $1;    }
    | error ';'     { console.log("error sintactico en linea " + (yylineno+1) );}
      //Lista_errores.push("<tr><td>sintactico</td><td>" + `El caracter ${(this.terminals_[symbol] || symbol)} no se esperaba en esta posicion</td><td>` + yyloc.last_line + "</td><td>" + (yyloc.last_column+1) + '</td></tr>');
                      
;

Declaration1 
    : 'const' ID '=' Expr ';'{
        $$ = new Declaration($2, $4, @1.first_line, @1.first_column);
    }
;

IfSt : 'IF' '(' Expr ')' Statement ElseSt{  $$ = new If($3, $5, $6, @1.first_line, @1.first_column);    };

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
    : 'WHILE' '(' Expr ')' Statement {  $$ = new While($3, $5, @1.first_line, @1.first_column);    }
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
    : '-'  Expr %prec UMENOS { $$ = new Arithmetic($2, $2, ArithmeticOption.NEGACION,  @1.first_line, @1.first_column); }       
    | '+'  Expr %prec UMENOS { $$ = new Arithmetic($2, $2, ArithmeticOption.MAS,       @1.first_line, @1.first_column); }       
    | Expr '+'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.PLUS,   @1.first_line, @1.first_column); }       
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

    /*logicas*/
    | Expr '&&' Expr { $$ = new Relational($1, $3,RelationalOption.AND  , @1.first_line, @1.first_column); }
    | Expr '||' Expr { $$ = new Relational($1, $3,RelationalOption.OR   , @1.first_line, @1.first_column); }
    | '!' Expr       { $$ = new Relational($2, $2,RelationalOption.NOT  , @1.first_line, @1.first_column); }

;


F   : '(' Expr ')'  {  $$ = $2; }
    /*numeros*/
    | DECIMAL       {  $$ = new Literal($1,                   @1.first_line, @1.first_column, 0); }
    | NUMBER        {  $$ = new Literal($1,                   @1.first_line, @1.first_column, 1); }
    /*strings*/
    | STRING        {  $$ = new Literal($1.replace(/\"/g,""), @1.first_line, @1.first_column, 2); }
    | STRINGG       {  $$ = new Literal($1.replace(/\'/g,""), @1.first_line, @1.first_column, 2); }
    | STRINGGG      {  $$ = new Literal($1.replace(/\`/g,""), @1.first_line, @1.first_column, 2); }
    /*boolean*/
    | true          {  $$ = new Literal($1,                   @1.first_line, @1.first_column, 3); }
    | false         {  $$ = new Literal($1,                   @1.first_line, @1.first_column, 3); }

    | ID            {  $$ = new Access($1,                    @1.first_line, @1.first_column);    }
;