
var contador = 0;                   //cuantas pestañas estan vivas
var ventana_focus = "pestana1";     //nombre de la pestaña que esta activa
var lista_pos = new Array();

/* ----------------------------------------  FUNCIONES PARA TEXTAREA ---------------------------------------- */

function get_data_textarea() {
    return document.getElementById(get_name_vent()).value;
}

function set_data_textarea(content) {
    var textarea = document.getElementById(ventana_focus)
    textarea.text = content
}

function action_print_data_textarea() {
    alert(get_data_textarea());
}

/* ---------------------------------------- FUNCIONES PARA TAB ---------------------------------------- */

function remove_tab(tab) {
    $('body #pestana' + tab.id.replace("pestana", "")).remove();

    var pos = lista_pos.indexOf(Number(tab.id.replace("pestana", "")))
    if (pos + 1 != lista_pos.length) {
        lista_pos.splice(pos, 1)
        index("pestana" + lista_pos[pos])
    } else {
        lista_pos.splice(pos, 1)
        index("pestana" + lista_pos[pos - 1])
    }

}

function get_name_vent() {
    return ventana_focus;
}

function set_name_vent(vent) {
    ventana_focus = vent;
}

function get_next_contador() {
    return contador++;
}


function add_tab() {
    var x = get_next_contador();
    lista_pos.push(x);
    console.log(lista_pos)

    // traer el div que tiene la lista de pestañas (lista desordenada <ul>)
    var ul = document.getElementById("lista_pestanas");

    // creamos un nuevo: elemento para la lista (<li>) 
    var li = document.createElement("li");
    li.setAttribute('id', 'pestana' + x);

    // creamos los elementos (<a> <button>) dentro del nuevo <li>
    var a = document.createElement("a");
    a.setAttribute('id', 'a' + x);
    a.setAttribute('href', 'javascript:index("pestana' + x + '")');
    a.text = 'tab ' + x;  //nombre que muestra al usuario

    li.appendChild(a);
    //boton para cerrar pestaña
    li.innerHTML += '&nbsp;&nbsp;&nbsp;<button id="pestana' + x + '" class="button_cerrar" onclick="remove_tab(this);">x</button>'
    ul.appendChild(li);

    var div_textareas = document.getElementById("contenidopestanas");
    var div_new = document.createElement("div");
    div_new.setAttribute('id', 'cpestana' + x);               //identificador de cada div
    var textarea = document.createElement("textarea");
    textarea.setAttribute('id', 'textarea' + x);              //identificador de cada textarea 
    textarea.setAttribute('name', 'textarea' + x);
    textarea.setAttribute('class', 'textarea');
    textarea.setAttribute('style', 'display:none');
    textarea.cols = 123;                                      //dimensiones del text
    textarea.rows = 30;

    div_new.appendChild(textarea);
    div_textareas.appendChild(div_new);

    index("pestana" + x);

}

function index(pestania) {
    var id = pestania.replace('pestana', '');
    set_name_vent('textarea' + id);

    var tab = document.getElementById(pestania);                            //es un <li>
    var div_pestanas = document.getElementById("pestanas");                 //es un <div> que tiene <ul>
    var cont_pestana = document.getElementById('c' + pestania);             //es un <div> y adentro tiene el <textarea>
    var div_cont_pestanas = document.getElementById('contenidopestanas');  //es un <div> de <div>'s 

    var i = 0;
    while (typeof div_cont_pestanas.getElementsByTagName('div')[i] != 'undefined') {
        $(document).ready(function () {
            $(div_cont_pestanas.getElementsByTagName('div')[i]).css('display', 'none');
            $(div_pestanas.getElementsByTagName('li')[i]).css('background', '');
            $(div_pestanas.getElementsByTagName('li')[i]).css('padding-bottom', '');
        });
        i += 1;
    }

    $(document).ready(function () {
        $(cont_pestana).css('display', '');
        $(tab).css('background', 'dimgray');
        $(tab).css('padding-bottom', '2px');
    });

    try {
        var div_cont_pestana = document.getElementById('cpestana' + id);
        var textarea = document.getElementById('textarea' + id);

        while (div_cont_pestana.firstChild) {
            div_cont_pestana.removeChild(div_cont_pestana.firstChild);
        }
        //mostreamos el textarea correspondiente
        div_cont_pestana.appendChild(textarea);

        var editor = CodeMirror(div_cont_pestana, {
            lineNumbers: true,
            value: textarea.value,   //se pone la data de ese textarea
            matchBrackets: true,
            styleActiveLine: true,
            theme: "ambiance",
            mode: "javascript"
        }).on('change', editor => {
            textarea.value = editor.getValue();
        });
    } catch (error) { }
}

function ejecutarParser() {
import { parser } from '../src/Grammar/Grammar';
  //get_data_textarea();
  const entrada=get_data_textarea()
  const ast = parser.parse(entrada);
  const env = new Environment(null);                     
  const s= Singleton.getInstance();

  s.add_ast(`nodeOriginal[label="<\\Lista_Instrucciones\\>"];`)

  //generar el ast primero
  for (const instr of ast) {
      try {
          instr.ast();
          s.add_ast(`nodeOriginal->node_${instr.line}_${instr.column}_;`)
      } catch (error) {
      }
  }

  //recorrer las instrucciones y ejecutarlas
  for (const instruccion of ast) {
      try {
          instruccion.execute(env);
      } catch (error) {
          s.add_error(error)
      }
  }
}