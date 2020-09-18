/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var Grammar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,13],$V1=[1,9],$V2=[1,10],$V3=[1,11],$V4=[1,12],$V5=[5,12,16,21,22,23,24],$V6=[1,35],$V7=[1,27],$V8=[1,23],$V9=[1,24],$Va=[1,26],$Vb=[1,28],$Vc=[1,29],$Vd=[1,30],$Ve=[1,31],$Vf=[1,32],$Vg=[1,33],$Vh=[1,34],$Vi=[5,12,16,20,21,22,23,24],$Vj=[1,42],$Vk=[1,41],$Vl=[1,43],$Vm=[1,44],$Vn=[1,45],$Vo=[1,46],$Vp=[1,47],$Vq=[1,48],$Vr=[1,49],$Vs=[1,50],$Vt=[1,51],$Vu=[1,52],$Vv=[1,53],$Vw=[1,54],$Vx=[15,18,27,28,29,30,31,32,34,35,36,37,38,39,40,41],$Vy=[15,18,27,28,34,35,36,37,38,39,40,41],$Vz=[15,18,27,28,29,30,34,35,36,37,38,39,40,41],$VA=[15,18,34,35,36,37,38,39,40,41],$VB=[15,18,38,39,40,41];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"Init":3,"Instructions":4,"EOF":5,"Instruction":6,"IfSt":7,"WhileSt":8,"Statement":9,"PrintSt":10,"Declaration":11,"ID":12,"=":13,"Expr":14,";":15,"IF":16,"(":17,")":18,"ElseSt":19,"ELSE":20,"WHILE":21,"{":22,"}":23,"CONSOLE":24,".":25,"LOG":26,"-":27,"+":28,"*":29,"/":30,"%":31,"**":32,"F":33,"<":34,"<=":35,">":36,">=":37,"==":38,"!=":39,"&&":40,"||":41,"!":42,"DECIMAL":43,"NUMBER":44,"STRING":45,"STRINGG":46,"STRINGGG":47,"true":48,"false":49,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",12:"ID",13:"=",15:";",16:"IF",17:"(",18:")",20:"ELSE",21:"WHILE",22:"{",23:"}",24:"CONSOLE",25:".",26:"LOG",27:"-",28:"+",29:"*",30:"/",31:"%",32:"**",34:"<",35:"<=",36:">",37:">=",38:"==",39:"!=",40:"&&",41:"||",42:"!",43:"DECIMAL",44:"NUMBER",45:"STRING",46:"STRINGG",47:"STRINGGG",48:"true",49:"false"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[6,1],[11,4],[7,6],[19,2],[19,2],[19,0],[8,5],[9,3],[9,2],[10,7],[14,2],[14,2],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,1],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,2],[33,3],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1],[33,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

        return $$[$0-1];
    
break;
case 2:

        $$[$0-1].push($$[$0]);
        this.$ = $$[$0-1];
    
break;
case 3:

        this.$ = [$$[$0]];
    
break;
case 4: case 5: case 6: case 7: case 8: case 11: case 12:

        this.$ = $$[$0];
    
break;
case 9:

        this.$ = new Declaration($$[$0-3], $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column);
    
break;
case 10:

        this.$ = new If($$[$0-3], $$[$0-1], $$[$0], _$[$0-5].first_line, _$[$0-5].first_column);
    
break;
case 13:

        this.$ = null;
    
break;
case 14:

        this.$ = new While($$[$0-4], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column);
    
break;
case 15:

        this.$ = new Statement($$[$0-1], _$[$0-2].first_line, _$[$0-2].first_column);
    
break;
case 16:

        this.$ = new Statement(new Array(), _$[$0-1].first_line, _$[$0-1].first_column);
    
break;
case 17:

        this.$ = new Print($$[$0-2], _$[$0-6].first_line, _$[$0-6].first_column);
    
break;
case 18:
 this.$ = new Arithmetic($$[$0], $$[$0], ArithmeticOption.NEGACION,  _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 19:
 this.$ = new Arithmetic($$[$0], $$[$0], ArithmeticOption.MAS,       _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 20:
 this.$ = new Arithmetic($$[$0-2], $$[$0], ArithmeticOption.PLUS,   _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 21:
 this.$ = new Arithmetic($$[$0-2], $$[$0], ArithmeticOption.MINUS,  _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 22:
 this.$ = new Arithmetic($$[$0-2], $$[$0], ArithmeticOption.TIMES,  _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 23:
 this.$ = new Arithmetic($$[$0-2], $$[$0], ArithmeticOption.DIV,    _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 24:
 this.$ = new Arithmetic($$[$0-2], $$[$0], ArithmeticOption.MODULO, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 25:
 this.$ = new Arithmetic($$[$0-2], $$[$0], ArithmeticOption.POT,    _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 26:
  this.$ = $$[$0]; 
break;
case 27:
 this.$ = new Relational($$[$0-2], $$[$0],RelationalOption.MENOR,           _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 28:
 this.$ = new Relational($$[$0-2], $$[$0],RelationalOption.MENORIGUAL,      _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 29:
 this.$ = new Relational($$[$0-2], $$[$0],RelationalOption.MAYOR,           _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 30:
 this.$ = new Relational($$[$0-2], $$[$0],RelationalOption.MAYORIGUAL,      _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 31:
 this.$ = new Relational($$[$0-2], $$[$0],RelationalOption.IGUAL ,          _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 32:
 this.$ = new Relational($$[$0-2], $$[$0],RelationalOption.DIFERENCIACION , _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 33:
 this.$ = new Relational($$[$0-2], $$[$0],RelationalOption.AND  , _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 34:
 this.$ = new Relational($$[$0-2], $$[$0],RelationalOption.OR   , _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 35:
 this.$ = new Relational($$[$0], $$[$0],RelationalOption.NOT  , _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 36:
  this.$ = $$[$0-1]; 
break;
case 37:
  this.$ = new Literal($$[$0],                   _$[$0].first_line, _$[$0].first_column, 0); 
break;
case 38:
  this.$ = new Literal($$[$0],                   _$[$0].first_line, _$[$0].first_column, 1); 
break;
case 39:
  this.$ = new Literal($$[$0].replace(/\"/g,""), _$[$0].first_line, _$[$0].first_column, 2); 
break;
case 40:
  this.$ = new Literal($$[$0].replace(/\'/g,""), _$[$0].first_line, _$[$0].first_column, 2); 
break;
case 41:
  this.$ = new Literal($$[$0].replace(/\`/g,""), _$[$0].first_line, _$[$0].first_column, 2); 
break;
case 42: case 43:
  this.$ = new Literal($$[$0],                   _$[$0].first_line, _$[$0].first_column, 3); 
break;
case 44:
  this.$ = new Access($$[$0],                    _$[$0].first_line, _$[$0].first_column);    
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:8,12:$V0,16:$V1,21:$V2,22:$V3,24:$V4},{1:[3]},{5:[1,14],6:15,7:4,8:5,9:6,10:7,11:8,12:$V0,16:$V1,21:$V2,22:$V3,24:$V4},o($V5,[2,3]),o($V5,[2,4]),o($V5,[2,5]),o($V5,[2,6]),o($V5,[2,7]),o($V5,[2,8]),{17:[1,16]},{17:[1,17]},{4:18,6:3,7:4,8:5,9:6,10:7,11:8,12:$V0,16:$V1,21:$V2,22:$V3,23:[1,19],24:$V4},{25:[1,20]},{13:[1,21]},{1:[2,1]},o($V5,[2,2]),{12:$V6,14:22,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:36,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{6:15,7:4,8:5,9:6,10:7,11:8,12:$V0,16:$V1,21:$V2,22:$V3,23:[1,37],24:$V4},o($Vi,[2,16]),{26:[1,38]},{12:$V6,14:39,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{18:[1,40],27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,34:$Vp,35:$Vq,36:$Vr,37:$Vs,38:$Vt,39:$Vu,40:$Vv,41:$Vw},{12:$V6,14:55,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:56,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},o($Vx,[2,26]),{12:$V6,14:57,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:58,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},o($Vx,[2,37]),o($Vx,[2,38]),o($Vx,[2,39]),o($Vx,[2,40]),o($Vx,[2,41]),o($Vx,[2,42]),o($Vx,[2,43]),o($Vx,[2,44]),{18:[1,59],27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,34:$Vp,35:$Vq,36:$Vr,37:$Vs,38:$Vt,39:$Vu,40:$Vv,41:$Vw},o($Vi,[2,15]),{17:[1,60]},{15:[1,61],27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,34:$Vp,35:$Vq,36:$Vr,37:$Vs,38:$Vt,39:$Vu,40:$Vv,41:$Vw},{9:62,22:$V3},{12:$V6,14:63,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:64,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:65,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:66,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:67,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:68,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:69,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:70,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:71,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:72,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:73,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:74,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:75,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},{12:$V6,14:76,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},o($Vy,[2,18],{29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vy,[2,19],{29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vx,[2,35]),{18:[1,77],27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,34:$Vp,35:$Vq,36:$Vr,37:$Vs,38:$Vt,39:$Vu,40:$Vv,41:$Vw},{9:78,22:$V3},{12:$V6,14:79,17:$V7,27:$V8,28:$V9,33:25,42:$Va,43:$Vb,44:$Vc,45:$Vd,46:$Ve,47:$Vf,48:$Vg,49:$Vh},o($V5,[2,9]),o($V5,[2,13],{19:80,20:[1,81]}),o($Vy,[2,20],{29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vy,[2,21],{29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vz,[2,22],{31:$Vn,32:$Vo}),o($Vz,[2,23],{31:$Vn,32:$Vo}),o($Vx,[2,24]),o($Vx,[2,25]),o($VA,[2,27],{27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($VA,[2,28],{27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($VA,[2,29],{27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($VA,[2,30],{27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($VB,[2,31],{27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,34:$Vp,35:$Vq,36:$Vr,37:$Vs}),o($VB,[2,32],{27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,34:$Vp,35:$Vq,36:$Vr,37:$Vs}),o([15,18,40,41],[2,33],{27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,34:$Vp,35:$Vq,36:$Vr,37:$Vs,38:$Vt,39:$Vu}),o([15,18,41],[2,34],{27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,34:$Vp,35:$Vq,36:$Vr,37:$Vs,38:$Vt,39:$Vu,40:$Vv}),o($Vx,[2,36]),o($V5,[2,14]),{18:[1,82],27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,34:$Vp,35:$Vq,36:$Vr,37:$Vs,38:$Vt,39:$Vu,40:$Vv,41:$Vw},o($V5,[2,10]),{7:84,9:83,16:$V1,22:$V3},{15:[1,85]},o($V5,[2,11]),o($V5,[2,12]),o($V5,[2,17])],
defaultActions: {14:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const {Arithmetic, ArithmeticOption} = require('../Expression/Arithmetic');
    const {Relational, RelationalOption} = require('../Expression/Relational');
    const {Access} = require('../Expression/Access');
    const {Literal} = require('../Expression/Literal');
    const {If} = require('../Instruction/If');
    const {Print} = require('../Instruction/Print');
    const {Statement} = require('../Instruction/Statement');
    const {While} = require('../Instruction/While');
    const {Declaration} = require('../Instruction/Declaration');
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:// comentario simple línea
break;
case 2:// comentario multiple líneas
break;
case 3:return 48
break;
case 4:return 49
break;
case 5:return 43
break;
case 6:return 44
break;
case 7:return 45
break;
case 8:return 46
break;
case 9:return 47
break;
case 10:return 32
break;
case 11:return 28
break;
case 12:return 27
break;
case 13:return 29
break;
case 14:return 30
break;
case 15:return 31
break;
case 16:return 15
break;
case 17:return 25
break;
case 18:return 35
break;
case 19:return 37
break;
case 20:return 34
break;
case 21:return 36
break;
case 22:return 38
break;
case 23:return 39
break;
case 24:return 41
break;
case 25:return 40
break;
case 26:return 42
break;
case 27:return 13
break;
case 28:return 17
break;
case 29:return 18 
break;
case 30:return 22
break;
case 31:return 23
break;
case 32:return 16
break;
case 33:return 20
break;
case 34:return 21
break;
case 35:return 24
break;
case 36:return 26
break;
case 37:return 12;
break;
case 38:return 5
break;
}
},
rules: [/^(?:\s+)/i,/^(?:\/\/.*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:(([0-9]+)\.([0-9]+)))/i,/^(?:([0-9]+))/i,/^(?:([\"][^"]*[\"]))/i,/^(?:([\'][^']*[\']))/i,/^(?:([\`][^`]*[\`]))/i,/^(?:\*\*)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:;)/i,/^(?:\.)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:!)/i,/^(?:=)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\{)/i,/^(?:\})/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:while\b)/i,/^(?:console\b)/i,/^(?:log\b)/i,/^(?:([a-zA-Z_])[a-zA-Z0-9_ñÑ]*)/i,/^(?:$)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = Grammar;
exports.Parser = Grammar.Parser;
exports.parse = function () { return Grammar.parse.apply(Grammar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}