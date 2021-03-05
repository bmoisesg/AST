 
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
    const {Ret} =require('../Instruction/Ret');
    const {GraficarTablaSimbolos} = require('../Instruction/Gr');
    const {Arreglo} = require('../Instruction/Arreglo');
    const {AccesoArreglo} = require('../Instruction/AccesoArreglo');
    const {ExpreArray} = require('../Expression/ExpreArray');
    const {ArithmeticOption} = require('../Expression/ArithmeticOption');
    const {IncreDecre} = require('../Expression/IncreDecre')
    const {IncreDecreOption} = require('../Expression/IncreDecreOption')
    const {Type} = require('../Abstract/Retorno')
    const {Logical} = require('../Expression/Logical')
    const {LogicalOption} = require('../Expression/LogicalOption')
    var Lista_errores=[];
    var pila_funciones=[];
    var tmp="";
    var consola="";
    var ast="";
    var graficarTS="";
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
"length"                return 't_length'
"push"                  return 't_push'
"pop"                   return 't_pop'
"Array"                 return 't_array'
"if"                    return 'IF'
"else"                  return 'ELSE'
"while"                 return 'WHILE'
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
        exports.graficarTS= graficarTS;
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
    | INSTARRAR        ';' {  $$ = $1;  }
    | FUNCIONN             {  $$ = $1;  }
    | PrintSt          ';' {  $$ = $1;  }
    | PrintSt              {  $$ = $1;  }
    | CONST            ';' {  $$ = $1;  }
    | LET              ';' {  $$ = $1;  }
    | ASIGNACION       ';' {  $$ = $1;  }
    | CALLFUNCION      ';' {  $$ = $1;  }
    | CALLFUNCION          {  $$ = $1;  }
    | INCREMENTO           {  $$ = $1;  }
    | GRAFICAR         ';' {  $$ = $1;  } 
    | GRAFICAR             {  $$ = $1;  }
    | INSARRREGLO          {  $$ = $1;  }
    | RETORNO          ';' {  $$ = $1;  } 
    | OperadorTernario ';' {  $$ = $1;  }
    | DOWHILE          ';' {  $$ = $1;  }
    | error            ';' {  console.log("error sintactico en linea " + (yylineno+1) );} //Lista_errores.push("<tr><td>sintactico</td><td>" + `El caracter ${(this.terminals_[symbol] || symbol)} no se esperaba en esta posicion</td><td>` + yyloc.last_line + "</td><td>" + (yyloc.last_column+1) + '</td></tr>');                  
    //| error            '}' {  console.log("error sintactico en linea " + (yylineno+1) );} //Lista_errores.push("<tr><td>sintactico</td><td>" + `El caracter ${(this.terminals_[symbol] || symbol)} no se esperaba en esta posicion</td><td>` + yyloc.last_line + "</td><td>" + (yyloc.last_column+1) + '</td></tr>');                  
;


INSARRREGLO
    : ID '[' Expr ']' '='  Expr     ';' { $$=new AccesoArreglo($1,null,$3, $6  ,false,false, @1.first_line, @1.first_column );}
    | ID '=' '[' ContenidoArray ']' ';' { $$=new AccesoArreglo($1,$4,null, null,false,false, @1.first_line, @1.first_column );}
    | ID '.' 't_push' '(' Expr ')'  ';' { $$=new AccesoArreglo($1,null,null,$5 ,true ,false, @1.first_line, @1.first_column);}
    | ID '.' 't_pop'  '(' ')'       ';' { $$=new AccesoArreglo($1,null,null,$5 ,true ,true , @1.first_line, @1.first_column);}
;

INSTARRAR
    :'t_let' ID ':' TIPOS '[' ']' '=' '[' ContenidoArray ']'          { $$= new Arreglo($2,$9  ,$4,[], @1.first_line, @1.first_column );}
    |'t_let' ID ':' t_array '<' TIPOS '>' '=' '[' ContenidoArray ']'  { $$= new Arreglo($2,$10 ,$6,[], @1.first_line, @1.first_column );}   
    |'t_let' ID ':' TIPOS '[' ']'                                     { $$= new Arreglo($2,null,$4,[], @1.first_line, @1.first_column );}
    |'t_let' ID ':' t_array '<' TIPOS '>'                             { $$= new Arreglo($2,null,$6,[], @1.first_line, @1.first_column );}
;

ContenidoArray
    : ContenidoArray ',' Expr  {   $1.push($3);  $$ = $1;}
    | Expr                     { $$=[$1]; }
;

GRAFICAR
    : t_graficar_ts '(' ')' {$$= new GraficarTablaSimbolos(@1.first_line, @1.first_column);}
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


FUNCIONN
    : 't_function' ID '(' ')' Statement {
       
        $$ = new InsFuncion($2, $5, [], "",@1.first_line, @1.first_column);
    }
    | 't_function' ID '(' Parametros ')' Statement {
        $$ = new InsFuncion($2, $6, $4, "",@1.first_line, @1.first_column);
    }
    |'t_function' ID '(' ')' ':' TIPOS Statement  {
        $$ = new InsFuncion($2, $7, [], $6,@1.first_line, @1.first_column);
    }
    | 't_function' ID '(' Parametros ')' ':' TIPOS  Statement {
        $$ = new InsFuncion($2, $8, $4, $7 ,@1.first_line, @1.first_column);
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
    :t_boolean { $$=$1; }
    |t_string  { $$=$1; }
    |t_number  { $$=$1; }
;

FOR
    : 't_for' '(' for1 ';' Expr ';' for2 ')' Statement{
            $$=new InstFor($3, $5, $7 , $9, @1.first_line, @1.first_column );
    }
;
for1 
    : CONST   {$$=$1;} 
    | LET   {$$=$1;} 
    | Asignacion     {$$=$1;} 
;
for2
    : Asignacion  {$$=$1;}
    //| INCREMENTO  {$$=$1;}
    |   '++' ID    { $$= new Incre($1,$2,@2.first_line,@2.first_column);}
    |   ID  '++'   { $$= new Incre($2,$1,@1.first_line,@1.first_column);}
    |   ID  '--'   { $$= new Incre($2,$1,@1.first_line,@1.first_column);}
    |   '--' ID    { $$= new Incre($1,$2,@2.first_line,@2.first_column);}
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

INCREMENTO
    :   '++' ID  ';'  { $$= new Incre($1,$2,@2.first_line,@2.first_column);}
    |   ID  '++' ';'  { $$= new Incre($2,$1,@1.first_line,@1.first_column);}
    |   ID  '--' ';'  { $$= new Incre($2,$1,@1.first_line,@1.first_column);}
    |   '--' ID  ';'  { $$= new Incre($1,$2,@2.first_line,@2.first_column);}
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
    : 't_do' Statement 'WHILE' '(' Expr ')'  {  $$ = new DoWhile($5, $2, @1.first_line, @1.first_column);    }
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
/*---------------------------------  imprimir  -------------------------------------------*/

PrintSt 
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
    | Expr '*'  Expr { $$ = new Arithmetic($1, $3, ArithmeticOption.MULTIPLICACION , @2.first_line, @2.first_column); }       
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