$(document).ready(function() {
   initDB();
});

// cadastra uma nota.
function cadastrar() {

    var titulo = document.getElementById("entrada_titulo").value;
    var nota = document.getElementById("entrada_nota").value;
    var data = document.getElementById("aData").value;
    var dataOut = data;

    // Verifica se o titulo está vazio, caso esteja envia notificação.
    if (verificaEntrada(titulo) == 1) {
        Materialize.toast("Título vazio", 4000);
        return;
    }

    // Verifica se a nota está vazia
    if (verificaEntrada(nota) == 1)
        nota = " ";

    // Verifica se a data está vazia
    if (verificaEntrada(data) == 1) {
        data = new Date()
        dataOut = data.getUTCDate() + (data.getMonth() + 1) + data.getFullYear();
    }

    var compromisso = {
        "titulo": titulo,
        "nota": nota,
        "data": dataOut
    };
    addItem(compromisso);

    Materialize.toast("Nota adicionada", 2000);

	limparListagem();
    atualizaLista();
	limpaCampos();

}

// limpa os campos.
function limpaCampos(){
    
    document.getElementById("entrada_titulo").value = "";
    document.getElementById("entrada_nota").value = "";
    document.getElementById("aData").value = "";

    
}

// limpa os campos da lista limpar.
function limparListagem(){
	
	document.getElementById("listar").innerHTML = "";
	
}

// Verifica se uma string esta vazia
function verificaEntrada(entrada) {

    if (entrada.length == 0) {
        return 1;
    } else {
        return 0;
    }

}

// Inicia localStorage
function initDB() {
    var bd = {
        itens: []
    }
    if (localStorage.getItem("notas") == null) {
        localStorage.setItem("notas", JSON.stringify(bd));
    } else
        atualizaLista();

}

// Adiciona um item no localStorage
function addItem(item) {
    var db = JSON.parse(localStorage.getItem("notas"));
    db.itens.push(item);
    localStorage.setItem("notas", JSON.stringify(db));
}

// Retorna todos os elementos do localStorage.
function getAll() {

    var db = JSON.parse(localStorage.getItem("notas"));

    for (i in db.itens)
        console.log(db.itens[i].nota)

    return db;
}

// Remove um item do localStorage
function remove(titulo){
    
    var db = JSON.parse(localStorage.getItem("notas"));

    for (i in db.itens){
        
        if(titulo == db.itens[i].titulo){
            db.itens.splice(i, 1);
            localStorage.setItem("notas", JSON.stringify(db));
        }
    }
        
    
}

// Cria uma lista dinamicamente com as tarefas.
function atualizaLista() {
	
	limparListagem();
    
    var lista = getAll();
    pai = document.getElementById("listar");

    for (i in lista.itens) {
        
        var div1 = document.createElement("div");
        div1.setAttribute("class", "col s12 listar1.1");
        //div1.onclick = deletar;
        
        var div11 = document.createElement("div");
        div11.setAttribute("class", "row");
        

        var div12 = document.createElement("div");
        div12.setAttribute("class", "col s12");
        

        var div13 = document.createElement("div");
        div13.setAttribute("class", "card-panel teal");
        
        var br = document.createElement("br");
        var spa = document.createElement("p");
        var spaText = document.createTextNode(lista.itens[i].titulo);
        spa.appendChild(spaText);
        
        var iElemento = document.createElement("i");
        var iText = document.createTextNode("close");
        iElemento.appendChild(iText);
        iElemento.setAttribute("class", "material-icons fechar");
        iElemento.addEventListener('click', deletar.bind(this), false); 
        spa.appendChild(iElemento);
        
        div13.appendChild(spa);

        spa = document.createElement("span");
        spa.setAttribute("class", "white-text");
        spaText = document.createTextNode(lista.itens[i].nota);
        spa.appendChild(spaText);
        div13.appendChild(spa);
        
        spa = document.createElement("p");
        spaText = document.createTextNode(lista.itens[i].data);
        spa.appendChild(spaText);
        div13.appendChild(spa);
        
        div12.appendChild(div13);
        
        div11.appendChild(div12);
        div1.appendChild(div11);
        pai.appendChild(div1);

    }


}

/*this.nome = 'Algo bom';
this.handleEvent = function(evento) {
console.log(this.nome); // 'Algo bom', porque this é o objeto Algo
    switch(evento.type) {
      case 'click':
        alert(evento.target.id);
        break;
      case 'dblclick':
        // some code here...
        break;
    }
  };*/

// Deletar o card-panel
function deletar(obj){
    
    // Pega o elemento pai.
    var pai = obj.target.parentNode;
    
    // Pega o título.
    var titulo = pai.textContent;
    titulo = titulo.replace("close", "");
    
    remove(titulo);
	//Materialize.toast("ola", 2000);
    
    atualizaLista();
    
    
	
}

// Manipula a data.
$(document).ready(function () {
    $('.datepicker').pickadate({
        format: 'mm/dd/yyyy',
        selectMonths: true, // Creates a dropdown to control month
    });
});

// Atualização
$('#botao_refresh').on('tap', function () {
    mRefresh.refresh();
});