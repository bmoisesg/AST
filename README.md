
##### Commands for install dependeces

```npm install ```

```
npm run jison
```
Compila el archivo .jison y crea un archivo grammar.js
```
npm run dev
```
Ejecuta el index de la aplicacion y se queda en escucha por si hay cambios.


`const`

Declara variables con la condicion de que no se puede editar su valor posteriormente. Si la variable no tiene un tipo de dato tomara automaticamente el tipo de dato que tiene la expresion.
```
const <name> = <expresion>
const <name> : <tipo> = <expresion>
```
Posibles errores:
- El nombre de la varible ya existe en el entorno local
- El tipo de dato de la expresion no coincide con el que se esta declarando 


`let`

Declara variables sin condicion, el valor de esta variable puede ser cambiada. Cuando la variable no tiene tipo de dato, la obtendra automaticamente de la expresion que se le asigne. Y si no tiene una expresion y tipo, entonces tomara el valor null
```
let <name> = <expresion>
let <name> : <tipo> = <expresion>
let <name> : <tipo>
let <name> 
```
Posibles errores:
- El nombre de la varible ya existe en el entorno local
- El tipo de dato de la expresion no coincide con el que se esta declarando(cuando se le indica un tipo a la variable)


`console`

Imprime valores de variables o expresiones
```
console.log(<expresion>)
console.log()
```



`While`
Instruccion ciclica que hace siempre un bloque de condiciones mientras se cumpla una condicion 

```
while(<expresion_booleana>){
	<instrucciones>
}
```

Posibles errores:
- La expresion no es de tipo booleana


`do-while`
Instruccion ciclica que hace siempre un bloque de condiciones mientras se cumpla una condicion , pero antes ejecuta el bloque de intrucciones

```
do{
	<instrucciones>
}while(<expresion_booleana>);
```

Posibles errores:
- La expresion no es de tipo booleana


