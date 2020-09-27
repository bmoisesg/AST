 
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
    const {Let} = require('../Instruction/let');
    const {Asignacion} = require('../Instruction/Asignacion');
    const {OperadorTernario} = require('../Instruction/OperadorTernario');
    const {DoWhile} = require('../Instruction/Dowhile');
    const {InstFor} = require('../Instruction/InstFor');
    const {Incre} = require('../Instruction/Incre');
    const {Function} = require('../Instruction/Function');
    const {Call} = require('../Instruction/Call');
    const {Ret} =require('../Instruction/Ret');

    var Lista_errores=[];
    var pila_funciones=[];
    var tmp="";
    var consola="";
    var ast="";
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
"++"                    return '++'
"--"                    return '--'
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"%"                     return '%'
";"                     return ';'
":"                     return ':'
"."                     return '.'
"?"                     return '?'
","                     return ','

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
"number"                return 't_number'
"string"                return 't_string'
"boolean"               return 't_boolean'
"let"                   return 't_let'
"do"                    return 't_do'
"for"                   return 't_for'
"console"               return 'CONSOLE'
"log"                   return 'LOG'
"function"              return 't_function'
"return"                return 't_return'

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
%right AUX1
%right AUX2

%start Init

%%

Init    
    : Instructions EOF  {
        exports.Lista_errores= Lista_errores;
        exports.pila_funciones= pila_funciones;
        exports.consola= consola;
        exports.ast= ast;
        return $1;  }
;

Instructions
    : Instructions Instruction  { $1.push($2); $$ = $1; }
    | Instruction               { $$ = [$1];            }
;

Instruction
    : IfSt                 {  $$ = $1;  }
    | WhileSt              {  $$ = $1;  }
    | Statement            {  $$ = $1;  }
    | FOR                  {  $$ = $1;  }
    | FUNCION              {  $$ = $1;  }
    | PrintSt          ';' {  $$ = $1;  }
    | Declaration1     ';' {  $$ = $1;  }
    | Declaration2     ';' {  $$ = $1;  }
    | Asignacion       ';' {  $$ = $1;  }
    | CALLFUNCION      ';' {  $$ = $1;  }
    | CALLFUNCION          {  $$ = $1;  }
    | INCREMENTO           {  $$ = $1;  }
    
    | RETORNO          ';' {  $$ = $1;  } 
    | OperadorTernario ';'  {  $$ = $1;  }

    | DOWHILE          ';' {  $$ = $1;  }
    | error            ';' {  console.log("error sintactico en linea " + (yylineno+1) );} //Lista_errores.push("<tr><td>sintactico</td><td>" + `El caracter ${(this.terminals_[symbol] || symbol)} no se esperaba en esta posicion</td><td>` + yyloc.last_line + "</td><td>" + (yyloc.last_column+1) + '</td></tr>');                  
    //| error            '}' {  console.log("error sintactico en linea " + (yylineno+1) );} //Lista_errores.push("<tr><td>sintactico</td><td>" + `El caracter ${(this.terminals_[symbol] || symbol)} no se esperaba en esta posicion</td><td>` + yyloc.last_line + "</td><td>" + (yyloc.last_column+1) + '</td></tr>');                  
;

RETORNO
    :'t_return'      { $$= new Ret(null,@1.first_line, @1.first_column);}
    |'t_return' Expr { $$= new Ret($2  ,@1.first_line, @1.first_column);}
;

CALLFUNCION
    : ID '(' ')' {
        $$ = new Call($1, [], @1.first_line, @1.first_column);
    }
    | ID '(' ListaExpr ')' {
        $$ = new Call($1, $3, @1.first_line, @1.first_column);
    }
;

ListaExpr 
    : ListaExpr ',' Expr{
        $1.push($3);
        $$ = $1;
    }
    | Expr{
        $$ = [$1];
    }
;    


FUNCION
    : 't_function' ID '(' ')' Statement {
        $$ = new Function($2, $5, [], "",@1.first_line, @1.first_column);
    }
    | 't_function' ID '(' Parametros ')' Statement {
        $$ = new Function($2, $6, $4, "",@1.first_line, @1.first_column);
    }
    |'t_function' ID '(' ')' ':' TIPOS Statement  {
        $$ = new Function($2, $7, [], $6,@1.first_line, @1.first_column);
    }
    | 't_function' ID '(' Parametros ')' ':' TIPOS  Statement {
        $$ = new Function($2, $8, $4, $7 ,@1.first_line, @1.first_column);
    }
;

Parametros
    : Parametros ',' ID ':' TIPOS {
        $1.push($3+","+$5);
        $$ = $1;
    }
    | ID ':' TIPOS{
        $$ = [$1+","+$3];
    }
;

TIPOS
    :t_boolean {$$=$1;}
    |t_string  {$$=$1;}
    |t_number  {$$=$1;}
;

FOR
    : 't_for' '(' for1 ';' Expr ';' for2 ')' Statement{
            $$=new InstFor($3, $5, $7 , $9, @1.first_line, @1.first_column );
    }
;
for1 
    : Declaration1   {$$=$1;} 
    | Declaration2   {$$=$1;} 
    | Asignacion     {$$=$1;} 
;
for2
    : Asignacion  {$$=$1;}
    | INCREMENTO  {$$=$1;}
;

OperadorTernario
    : Expr '?' ParaOperadorTernario ':' ParaOperadorTernario {
            $$=new OperadorTernario($1, $3, $5 ,@2.first_line, @2.first_column );
    } 
;

ParaOperadorTernario
    :PrintSt          { $$=$1; }
    |Asignacion       { $$=$1; }
    |   '++' ID     { $$= new Incre($1,$2,@2.first_line,@2.first_column);}
    |   ID  '++'   { $$= new Incre($2,$1,@1.first_line,@1.first_column);}
    |   ID  '--'   { $$= new Incre($2,$1,@1.first_line,@1.first_column);}
    |   '--' ID    { $$= new Incre($1,$2,@2.first_line,@2.first_column);}
;

Asignacion
    : ID '=' Expr { 
          $$ = new Asignacion($1, $3, @1.first_line, @1.first_column);
    }
;

INCREMENTO
    :   '++' ID  ';'  { $$= new Incre($1,$2,@2.first_line,@2.first_column);}
    |   ID  '++' ';'  { $$= new Incre($2,$1,@1.first_line,@1.first_column);}
    |   ID  '--' ';'  { $$= new Incre($2,$1,@1.first_line,@1.first_column);}
    |   '--' ID  ';'  { $$= new Incre($1,$2,@2.first_line,@2.first_column);}
;

Declaration2
    : 't_let' ID '=' Expr {
        $$ = new Let($2, $4, null, @1.first_line, @1.first_column);
    }
    | 't_let' ID ':' 't_boolean' '='  Expr {
        $$ = new Let($2, $6, $4, @1.first_line, @1.first_column);
    }
    | 't_let' ID ':' 't_string' '='  Expr {
        $$ = new Let($2, $6, $4, @1.first_line, @1.first_column);
    }
    | 't_let' ID ':' 't_number' '='  Expr {
        $$ = new Let($2, $6, $4, @1.first_line, @1.first_column);
    }
    | 't_let' ID ':' 't_boolean'  {
        $$ = new Let($2, null, $4, @1.first_line, @1.first_column);
    }
    | 't_let' ID ':' 't_string'  {
        $$ = new Let($2, null, $4, @1.first_line, @1.first_column);
    }
    | 't_let' ID ':' 't_number' {
        $$ = new Let($2, null, $4, @1.first_line, @1.first_column);
    }
    | 't_let' ID  {
        $$ = new Let($2, null, null, @1.first_line, @1.first_column);
    }

;

Declaration1 
    : 'const' ID '=' Expr {
        $$ = new Declaration($2, $4, null, @1.first_line, @1.first_column);
    }
    | 'const' ID ':' 't_boolean' '='  Expr {
        $$ = new Declaration($2, $6, $4, @1.first_line, @1.first_column);
    }
    | 'const' ID ':' 't_string' '='  Expr {
        $$ = new Declaration($2, $6, $4, @1.first_line, @1.first_column);
    }
    | 'const' ID ':' 't_number' '='  Expr {
        $$ = new Declaration($2, $6, $4, @1.first_line, @1.first_column);
    }

;

IfSt : 'IF' '(' Expr ')' Statement ElseSt{
      $$ = new If($3, $5, $6, @1.first_line, @1.first_column);  }
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

DOWHILE
    : 't_do' Statement 'WHILE' '(' Expr ')'  {  $$ = new DoWhile($5, $2, @5.first_line, @5.first_column);    }
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
    : 'CONSOLE' '.' 'LOG' '(' Expr ')'  {
        $$ = new Print($5, @1.first_line, @1.first_column);
    }
    |'CONSOLE' '.' 'LOG' '('  ')'  {
        $$ = new Print(null, @1.first_line, @1.first_column);
    }
;

Expr /*aritmeticas*/
    : '-'  Expr %prec UMENOS { $$ = new Arithmetic($2, $2, ArithmeticOption.NEGACION,  @1.first_line, @1.first_column); }       
    | ID  '++'               { $$ = new Arithmetic($1, $1, ArithmeticOption.INCREMENTO1, $1, @1.first_line, @1.first_column); } 
    | '++' ID                { $$ = new Arithmetic($2, $2, ArithmeticOption.INCREMENTO2, $2, @2.first_line, @2.first_column); } 
    | ID  '--'               { $$ = new Arithmetic($1, $1, ArithmeticOption.DECREMENTO1, $1, @1.first_line, @1.first_column); } 
    | '--' ID                { $$ = new Arithmetic($2, $2, ArithmeticOption.DECREMENTO2, $2, @2.first_line, @2.first_column); } 
   
    | Expr '+'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.PLUS,  "", @2.first_line, @2.first_column); }       
    | Expr '-'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.MINUS, "", @2.first_line, @2.first_column); }
    | Expr '*'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.TIMES, "", @2.first_line, @2.first_column); }       
    | Expr '/'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.DIV,   "", @2.first_line, @2.first_column); }
    | Expr '%'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.MODULO,"", @2.first_line, @2.first_column); }
    | Expr '**' Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.POT,   "", @2.first_line, @2.first_column); }
    
    | F  {  $$ = $1; }
    
    /*relacionales*/
    | Expr '<'  Expr { $$ = new Relational($1, $3,RelationalOption.MENOR,           @2.first_line, @2.first_column); }
    | Expr '<=' Expr { $$ = new Relational($1, $3,RelationalOption.MENORIGUAL,      @2.first_line, @2.first_column); }
    | Expr '>'  Expr { $$ = new Relational($1, $3,RelationalOption.MAYOR,           @2.first_line, @2.first_column); }
    | Expr '>=' Expr { $$ = new Relational($1, $3,RelationalOption.MAYORIGUAL,      @2.first_line, @2.first_column); }
    | Expr '==' Expr { $$ = new Relational($1, $3,RelationalOption.IGUAL ,          @2.first_line, @2.first_column); }
    | Expr '!=' Expr { $$ = new Relational($1, $3,RelationalOption.DIFERENCIACION , @2.first_line, @2.first_column); }

    /*logicas*/
    | Expr '&&' Expr { $$ = new Relational($1, $3,RelationalOption.AND  , @2.first_line, @2.first_column); }
    | Expr '||' Expr { $$ = new Relational($1, $3,RelationalOption.OR   , @2.first_line, @2.first_column); }
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