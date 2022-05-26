 
%{
    const {Arithmetic} = require('../Expression/Arithmetic');
    const {Relational} = require('../Expression/Relational');
    const {RelationalOption} = require ('../Expression/RelationalOpcion')
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
    const {InsFuncion} = require('../Instruction/InsFuncion');
    const {Call} = require('../Instruction/Call');
    const {GraficarTablaSimbolos} = require('../Instruction/Gr');
    const {Arreglo} = require('../Instruction/Arreglo');
    const {ArregloAsignacion} = require('../Instruction/ArregloAsignacion');
    const {ExpreArray} = require('../Expression/ExpreArray');
    const {ArithmeticOption} = require('../Expression/ArithmeticOption');
    const {IncreDecre} = require('../Expression/IncreDecre')
    const {IncreDecreOption} = require('../Expression/IncreDecreOption')
    const {Type} = require('../Abstract/Retorno')
    const {Logical} = require('../Expression/Logical')
    const {LogicalOption} = require('../Expression/LogicalOption')
    const {ArregloAcciones} = require('../Instruction/ArregloAcciones')
    
    const { Singleton}=  require("../Singleton/Singleton")
    const { error } =require("../tool/error")
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
"["                     return '['
"]"                     return ']'

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
"void"                  return 't_void'
"length"                return 't_length'
"push"                  return 't_push'
"pop"                   return 't_pop'
"array"                 return 't_array'
"if"                    return 't_if'
"else"                  return 't_else'
"while"                 return 't_while'
"const"                 return 't_const'
"number"                return 't_number'
"string"                return 't_string'
"boolean"               return 't_boolean'
"let"                   return 't_let'
"do"                    return 't_do'
"for"                   return 't_for'
"console.log"           return 't_console'
"function"              return 't_function'
"return"                return 't_return'
"graficar_ts"           return 't_graficar_ts'

([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID';
<<EOF>>		            return 'EOF'
.      { 
            let s= Singleton.getInstance()
            s.add_error(new error("Lexico","No se reconoce el caracter "+yytext,yylineno+1,yylloc.first_column+1));
    }




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
    : Instructions EOF  {  return $1;  }
;

Instructions
    : Instructions Instruction  { $1.push($2); $$ = $1; }
    | Instruction               { $$ = [$1];            }
;

Instruction
    : BLOQUE                {  $$ = $1;  }
    | CONST             ';' {  $$ = $1;  }
    | LET               ';' {  $$ = $1;  }
    | ASIGNACION        ';' {  $$ = $1;  }
    | INCREDECRE        ';' {  $$ = $1;  }
    | PRINT_ST          ';' {  $$ = $1;  }
    | IF_ST                 {  $$ = $1;  }
    | WHILE_ST              {  $$ = $1;  }
    | FOR                   {  $$ = $1;  }
    | DOWHILE           ';' {  $$ = $1;  }
    | OP_TERNARIO       ';' {  $$ = $1;  }
    | FUNCION               {  $$ = $1;  }
    | CALLFUNCION       ';' {  $$ = $1;  }
    | ARRAY_DECLARACION ';' {  $$ = $1;  }
    | ARRAY_MANEJO      ';' {  $$ = $1;  }
    | GRAFICAR_TS       ';' {  $$ = $1;  } 

    | error            ';'  {  
                                console.log("error sintactico en linea " + (yylineno+1) );
                                //colocar el siguiente codigo en el archivo grammar.js en el= if(!recovering) como penultima instruccion
                                //let s=Singleton.getInstance();
                                //s.add_error(new error("Sintactico", `El caracter ${(this.terminals_[symbol] || symbol)} no se esperaba en esta posicion`, yyloc.last_line, yyloc.last_column+1))                  
                            } 
;

/* --------------------------------------- array instruccion --------------------------------------- */

ARRAY_DECLARACION
    :'t_let' ID ':' TIPOS '[' ']'  '=' '[' CALLFUNCION_PARAMETROS ']'  { $$= new Arreglo($2, $9  , $4, [], @1.first_line, @1.first_column ); }
    |'t_let' ID ':' TIPOS '[' ']'                                      { $$= new Arreglo($2, []  , $4, [], @1.first_line, @1.first_column ); }
    |'t_let' ID ':' TIPOS '[' ']'  '=' '['                        ']'  { $$= new Arreglo($2, []  , $4, [], @1.first_line, @1.first_column ); }
;

ARRAY_MANEJO
    : ID '.' 't_push' '(' Expr ')'                        { $$=new ArregloAcciones($1, $5  , true ,false, @1.first_line, @1.first_column); }
    | ID '.' 't_pop'  '(' ')'                             { $$=new ArregloAcciones($1, null, false,true , @1.first_line, @1.first_column); }
    | ID              '=' '[' CALLFUNCION_PARAMETROS ']'  { $$=new ArregloAsignacion($1, $4  , null, null, @1.first_line, @1.first_column); }
    | ID '[' Expr ']' '='  Expr                           { $$=new ArregloAsignacion($1, null, $3  , $6  , @1.first_line, @1.first_column); }
;

/*--------------------------------------- graficar tabla de simbolos --------------------------------------- */

GRAFICAR_TS
    : 't_graficar_ts' '(' ')' { $$= new GraficarTablaSimbolos(@1.first_line, @1.first_column); }
;

/* --------------------------------------- funcion   -------------------------------------  */

FUNCION
    : 't_function' ID '('            ')'              BLOQUE { $$ = new InsFuncion($2, $5, [], "void", @1.first_line, @1.first_column); }
    | 't_function' ID '(' PARAMETROS ')'              BLOQUE { $$ = new InsFuncion($2, $6, $4, "void", @1.first_line, @1.first_column); }
    | 't_function' ID '('            ')' ':' 't_void' BLOQUE { $$ = new InsFuncion($2, $5, [], "void", @1.first_line, @1.first_column); }
    | 't_function' ID '(' PARAMETROS ')' ':' 't_void' BLOQUE { $$ = new InsFuncion($2, $6, $4, "void", @1.first_line, @1.first_column); }
    | 't_function' ID '('            ')' ':' TIPOS    BLOQUE { $$ = new InsFuncion($2, $7, [], $6    , @1.first_line, @1.first_column); }
    | 't_function' ID '(' PARAMETROS ')' ':' TIPOS    BLOQUE { $$ = new InsFuncion($2, $8, $4, $7    , @1.first_line, @1.first_column); } 
;

PARAMETROS
    : PARAMETROS ',' ID ':' TIPOS  { $1.push($3+","+$5); $$ = $1;  }
    |                ID ':' TIPOS  { $$ = [$1+","+$3];             }
;

TIPOS
    : t_boolean { $$=$1; }
    | t_string  { $$=$1; }
    | t_number  { $$=$1; }
;

CALLFUNCION
    : ID '('                        ')' { $$ = new Call($1, [], @1.first_line, @1.first_column);  }
    | ID '(' CALLFUNCION_PARAMETROS ')' { $$ = new Call($1, $3, @1.first_line, @1.first_column);  }
;

CALLFUNCION_PARAMETROS 
    : CALLFUNCION_PARAMETROS ',' Expr  {    $1.push($3);    $$ = $1;   }
    |                            Expr  {    $$ = [$1];                 }
;    


/* ---------------------- Operador ternario como instruccion ---------------------- */

OP_TERNARIO
    : '(' Expr  ')' '?' OP_TERNARIO_ST ':' OP_TERNARIO_ST { $$=new OperadorTernario($2, $5, $7 ,@4.first_line, @4.first_column ); } 
;

OP_TERNARIO_ST
    : PRINT_ST   { $$=$1; }
    | ASIGNACION { $$=$1; }
    | INCREDECRE { $$=$1; }
;

/* ---------------------- incremento y decremento como instruction ---------------------- */

INCREDECRE
    :   '++' ID   { $$= new Incre($1,$2,@2.first_line,@2.first_column); }
    |   ID  '++'  { $$= new Incre($2,$1,@1.first_line,@1.first_column); }
    |   ID  '--'  { $$= new Incre($2,$1,@1.first_line,@1.first_column); }
    |   '--' ID   { $$= new Incre($1,$2,@2.first_line,@2.first_column); }
;

/*------------------------  Declaracion de variables (let y const)  -----------------------  */

LET
    : 't_let' ID           '=' Expr { $$ = new Let($2, $4  , null, @1.first_line, @1.first_column); }
    | 't_let' ID ':' TIPOS '=' Expr { $$ = new Let($2, $6  , $4  , @1.first_line, @1.first_column); }
    | 't_let' ID ':' TIPOS          { $$ = new Let($2, null, $4  , @1.first_line, @1.first_column); }
    | 't_let' ID                    { $$ = new Let($2, null, null, @1.first_line, @1.first_column); }
;

CONST
    : 't_const' ID           '=' Expr { $$ = new Declaration($2, $4, null, @1.first_line, @1.first_column); }
    | 't_const' ID ':' TIPOS '=' Expr { $$ = new Declaration($2, $6, $4  , @1.first_line, @1.first_column); }
;

/*------------------------------    Asignacion de variables  ------------------------------  */

ASIGNACION
    : ID '=' Expr { $$ = new Asignacion($1, $3, @1.first_line, @1.first_column);  }
;

/*---------------------------------   condicionantes    ---------------------------------*/

IF_ST : 
    't_if' '(' Expr ')' BLOQUE ELSE_ST { $$ = new If($3, $5, $6, @1.first_line, @1.first_column);  }
;

ELSE_ST
    : 't_else' BLOQUE { $$ = $2;   }
    | 't_else' IF_ST  { $$ = $2;   }
    |                 { $$ = null; }
;
/* --------------------------------- ciclos --------------------------------- */

DOWHILE
    : 't_do' BLOQUE 't_while' '(' Expr ')'  {  $$ = new DoWhile($5, $2, @1.first_line, @1.first_column);    }
;

WHILE_ST
    : 't_while' '(' Expr ')' BLOQUE { $$ = new While($3, $5, @1.first_line, @1.first_column);    }
;

FOR
    : 't_for' '(' FOR_DECLA ';' Expr ';' FOR_ITERADOR ')' BLOQUE { $$=new InstFor($3, $5, $7 , $9, @1.first_line, @1.first_column );   }
;

FOR_DECLA 
    : LET        { $$=$1; } 
    | ASIGNACION { $$=$1; } 
;

FOR_ITERADOR
    : ASIGNACION  { $$=$1; }
    | INCREDECRE  { $$=$1; }
   ;


/*--------------------------------- bloque de instrucciones ---------------------------------*/

BLOQUE
    : '{' Instructions '}' { $$ = new Statement($2         , @1.first_line, @1.first_column); }
    | '{'              '}' { $$ = new Statement(new Array(), @1.first_line, @1.first_column); }
;

/*---------------------------------  imprimir  -------------------------------------------*/

PRINT_ST 
    : 't_console' '(' Expr ')'  { $$ = new Print($3  , @1.first_line, @1.first_column); }
    | 't_console' '('      ')'  { $$ = new Print(null, @1.first_line, @1.first_column); }
;

/*--------------------------------   Expresion -------------------------------------------*/

Expr 
    : '-'  Expr %prec UMENOS { $$ = new Arithmetic($2, $2, ArithmeticOption.NEGACION,        @1.first_line, @1.first_column); }       
    | ID  '++'               { $$ = new IncreDecre(IncreDecreOption.INCREMENTO1, $1, @1.first_line, @1.first_column); } 
    | '++' ID                { $$ = new IncreDecre(IncreDecreOption.INCREMENTO2, $2, @2.first_line, @2.first_column); } 
    | ID  '--'               { $$ = new IncreDecre(IncreDecreOption.DECREMENTO1, $1, @1.first_line, @1.first_column); } 
    | '--' ID                { $$ = new IncreDecre(IncreDecreOption.DECREMENTO2, $2, @2.first_line, @2.first_column); } 
   
    | Expr '+'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.MAS            , @2.first_line, @2.first_column); }       
    | Expr '-'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.MENOS          , @2.first_line, @2.first_column); }
    | Expr '*'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.MULT , @2.first_line, @2.first_column); }       
    | Expr '/'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.DIV            , @2.first_line, @2.first_column); }
    | Expr '%'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.MODULO         , @2.first_line, @2.first_column); }
    | Expr '**' Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.POT            , @2.first_line, @2.first_column); }
    
    
    | Expr '<'  Expr { $$ = new Relational($1, $3, RelationalOption.MENOR          , @2.first_line, @2.first_column); }
    | Expr '<=' Expr { $$ = new Relational($1, $3, RelationalOption.MENORIGUAL     , @2.first_line, @2.first_column); }
    | Expr '>'  Expr { $$ = new Relational($1, $3, RelationalOption.MAYOR          , @2.first_line, @2.first_column); }
    | Expr '>=' Expr { $$ = new Relational($1, $3, RelationalOption.MAYORIGUAL     , @2.first_line, @2.first_column); }
    | Expr '==' Expr { $$ = new Relational($1, $3, RelationalOption.IGUAL          , @2.first_line, @2.first_column); }
    | Expr '!=' Expr { $$ = new Relational($1, $3, RelationalOption.DIFERENCIACION , @2.first_line, @2.first_column); }

    | Expr '&&' Expr { $$ = new Logical($1, $3,LogicalOption.AND  , @2.first_line, @2.first_column); }
    | Expr '||' Expr { $$ = new Logical($1, $3,LogicalOption.OR   , @2.first_line, @2.first_column); }
    | '!' Expr       { $$ = new Logical($2, $2,LogicalOption.NOT  , @1.first_line, @1.first_column); }
   
    | F  {  $$ = $1; }
    | ID '.' 't_length'          { $$= new ExpreArray($1,false,false,null,@1.first_line, @1.first_column); }
    | ID '.' 't_pop'    '(' ')'  { $$= new ExpreArray($1,true ,false,null,@1.first_line, @1.first_column); }
    | ID '['  Expr ']'           { $$= new ExpreArray($1,true ,true ,$3  ,@1.first_line, @1.first_column); }
;

F   
    : '(' Expr ')'  {  $$ = $2; } 
    | DECIMAL       {  $$ = new Literal($1,                   Type.NUMBER , @1.first_line, @1.first_column); }
    | NUMBER        {  $$ = new Literal($1,                   Type.NUMBER , @1.first_line, @1.first_column); }
    | STRING        {  $$ = new Literal($1.replace(/\"/g,""), Type.STRING , @1.first_line, @1.first_column); }
    | STRINGG       {  $$ = new Literal($1.replace(/\'/g,""), Type.STRING , @1.first_line, @1.first_column); }
    | STRINGGG      {  $$ = new Literal($1.replace(/\`/g,""), Type.STRING , @1.first_line, @1.first_column); }
    | true          {  $$ = new Literal($1,                   Type.BOOLEAN, @1.first_line, @1.first_column); }
    | false         {  $$ = new Literal($1,                   Type.BOOLEAN, @1.first_line, @1.first_column); }

    | ID            {  $$ = new Access($1,@1.first_line, @1.first_column);  }
;