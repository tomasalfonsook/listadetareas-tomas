function saveLocalStorage(posicion, texto, fecha, ubicacion, estado){
    if (typeof(Storage) !== 'undefined') {
        console.log("La ubicacion que llega es: "+ubicacion);
        var objetos = {"texto": texto, "fecha": fecha, "ubicacion": ubicacion, "estado": estado};
        localStorage.setItem(posicion, JSON.stringify(objetos));
        console.log(localStorage);
    } else {
        alert("Su navegador no es compatible con el almacenamiento web offline");
    }
}

function cargarPagina(){
    var modal = document.getElementById("preloader");
    modal.style.display = "block";
    obtenerUbicacion();
    //setTimeout(cerrarModal,2000);
    readLocalStorage();
}

function webShare(element){
    var id = element.id;
    var cortar = id.split("btn_share");
    id = cortar[1];
    if (navigator.share) {
        var contenido = document.getElementById("text"+id).value;
        var shareData = {
            title: 'Tarea!',
            text: contenido,
            url: '',
        }
        navigator.share(shareData);
    } else {
      // No está disponible, es necesario implementar una alternativa
    }
}

function borrarTodo(){
    localStorage.clear();
    location.reload();
}

function cerrarModal(){
    var modal = document.getElementById("preloader");
    modal.style.display = "none";
}

function updateLocalStorage(element){
    var posicion = element.id;
    var cortar = posicion.split("text");
    posicion = cortar[1];
    var texto = element.value;
    var fecha = document.getElementById("fecha"+posicion).textContent;
    console.log(fecha);
    
    var vacio = (texto === "");
        
    if(vacio == false) {
        var hora = fecha.split("a las");
        hora = hora[1];
        hora = hora.split("en");
        hora = hora[0];

        var ubicacion = fecha.split("en ");
        ubicacion = ubicacion[1];
        
        fecha = fecha.split("el ");
        fecha = fecha[1];
        fecha = fecha.split(" a");
        fecha = fecha[0];

        var fechaHora = fecha + "" + hora;
        
        var estado = document.getElementById("state"+posicion).value;
               
        saveLocalStorage(posicion, texto, fechaHora, ubicacion, estado);
    }
}

function readLocalStorage(){
    console.log(localStorage);
    if(localStorage.length > 0){
        var i = 1;
    while(i < localStorage.length + 1){
        var posicion = String(i);
        var arreglo = JSON.parse(localStorage.getItem(posicion));
        console.log(arreglo);
        
        var destino = document.getElementById("tasks");
        var textoEntrada = arreglo.texto;
        
        var contador = 0;
        contador = document.getElementById("contador").value;
        contador++;
        
        document.getElementById("tareas_activas").value++;

        document.getElementById("contador").value = contador;    

        var div = document.createElement("div");
        div.id = "task"+contador;
        div.className = "task-group";
        destino.appendChild(div);

        var div = document.createElement("div");
        div.id = "date"+contador;
        div.className = "date";
        destino.appendChild(div);    
        
        destino = document.getElementById("task"+contador);    

        var estadoCheck = false;
        if(arreglo.estado == 1){
            estadoCheck = true;
        }
        
        var new_state = document.createElement("input");
        new_state.type = "hidden";
        new_state.id = "state"+contador;
        destino.appendChild(new_state);
        
        var new_checkbox = document.createElement("input");
        new_checkbox.type = "checkbox";
        new_checkbox.id = "check"+contador;
        new_checkbox.checked = estadoCheck;
        new_checkbox.setAttribute("onchange", "changeState(obtenerId(this));");
        destino.appendChild(new_checkbox);
    
        var new_label = document.createElement("label");
        new_label.setAttribute("for", "check"+contador);
        new_label.id = "label"+contador;
        destino.appendChild(new_label);

        var new_task = document.createElement("textarea");
        new_task.id = "text"+contador;
        new_task.value = textoEntrada;
        new_task.className = "task task-text";
        new_task.setAttribute("onkeyup", "updateLocalStorage(this)");
        destino.appendChild(new_task);
        
        var new_btn = document.createElement("a");
        new_btn.id = "btn_copy"+contador;
        new_btn.className = "task-btn fa fa-clipboard";
        new_btn.setAttribute("onclick", "copyText(this)");
        destino.appendChild(new_btn);

        var new_btn = document.createElement("a");
        new_btn.id = "btn_share"+contador;
        new_btn.setAttribute("onclick","webShare(this)");
        new_btn.className = "task-btn fa fa-share";
        destino.appendChild(new_btn);

        var new_btn = document.createElement("a");
        new_btn.id = "btn"+contador;
        new_btn.className = "task-btn fa fa-trash";
        new_btn.setAttribute("onclick", "deleteElement(this)");
        destino.appendChild(new_btn);

        destino = document.getElementById("btn"+contador);

        infoReport();

        destino = document.getElementById("date"+contador);    

        var fecha = document.createElement("p");
        fecha.id = "fecha"+contador;
        
        var obtenerDia = arreglo.fecha;
        obtenerDia = obtenerDia.split(" ");
        var obtenerHora = obtenerDia[1];
        obtenerDia = obtenerDia[0];

        var contenido = "Guardado el " + obtenerDia + " a las " + obtenerHora + " en " + arreglo.ubicacion;
        
        var contenido = document.createTextNode(contenido);

        fecha.appendChild(contenido);

        destino.appendChild(fecha);    
        
        console.log("estado"+estadoCheck);
        
        if(estadoCheck == true){
            changeState(posicion);
        }
        
        i++;
    }
    }
}

function addElement(){
    
    var destino = document.getElementById("tasks");
    
    var entrada = document.getElementById("newElement");
    
    var textoEntrada = entrada.value;
    
    if(textoEntrada == ""){
        
    } else {
    
    var contador = 0;
    contador = document.getElementById("contador").value;
    contador++;
    
    document.getElementById("contador").value = contador;    
        
    var div = document.createElement("div");
    div.id = "task"+contador;
    div.className = "task-group";
    destino.appendChild(div);
    
    var div = document.createElement("div");
    div.id = "date"+contador;
    div.className = "date";
    destino.appendChild(div);    
        
    destino = document.getElementById("task"+contador);    
    
    var new_state = document.createElement("input");
    new_state.type = "hidden";
    new_state.id = "state"+contador;
    new_state.value = 0;
    destino.appendChild(new_state);
       
    var new_checkbox = document.createElement("input");
    new_checkbox.type = "checkbox";
    new_checkbox.id = "check"+contador;
    new_checkbox.setAttribute("onchange", "changeState(obtenerId(this));");
    destino.appendChild(new_checkbox);
    
    var new_label = document.createElement("label");
    new_label.setAttribute("for", "check"+contador);
    new_label.id = "label"+contador;
    destino.appendChild(new_label);
    
    var new_task = document.createElement("textarea");
    new_task.id = "text"+contador;
    new_task.value = textoEntrada;
    new_task.className = "task task-text";
    new_task.setAttribute("onkeyup", "updateLocalStorage(this)");
    destino.appendChild(new_task);
                
    var new_btn = document.createElement("a");
    new_btn.id = "btn_copy"+contador;
    new_btn.className = "task-btn fa fa-clipboard";
    new_btn.setAttribute("onclick", "copyText(this)");
    destino.appendChild(new_btn);
        
    var new_btn = document.createElement("a");
    new_btn.id = "btn_share"+contador;
    new_btn.className = "task-btn fa fa-share";
    new_btn.setAttribute("onclick","webShare(this)");
    destino.appendChild(new_btn);
        
    var new_btn = document.createElement("a");
    new_btn.id = "btn"+contador;
    new_btn.className = "task-btn fa fa-trash";
    new_btn.setAttribute("onclick", "deleteElement(this)");
    destino.appendChild(new_btn);
        
    destino = document.getElementById("btn"+contador);
    
    
    document.getElementById("newElement").value = "";
    
    document.getElementById("tareas_activas").value++;
    
    infoReport();
    
    destino = document.getElementById("date"+contador);    
    
    
    var fecha = document.createElement("p");
    fecha.id = "fecha"+contador;
        
    var obtenerFecha = new Date(); 
    var obtenerDia = obtenerFecha.getDate() + '-' + ( obtenerFecha.getMonth() + 1 ) + '-' + obtenerFecha.getFullYear();
    var obtenerHora = obtenerFecha.getHours() + ':' + obtenerFecha.getMinutes() + ':' + obtenerFecha.getSeconds();
        
    var latitud = document.getElementById("latitud").value;
    var longitud = document.getElementById("longitud").value;
        
    var fechaCompleta = obtenerDia + " " + obtenerHora;
    var ubicacionCompleta = "Lat: " + latitud + " Long: " + longitud;
        
    var contenido = "Guardado el " + obtenerDia + " a las " + obtenerHora + " en Lat: " + latitud + " Long: " + longitud;
        
    console.log("La ubi: "+ubicacionCompleta);

        
    var contenido = document.createTextNode(contenido);
        
    fecha.appendChild(contenido);
        
    destino.appendChild(fecha);    
        
    var estado = 0;
        
    saveLocalStorage(contador, textoEntrada, fechaCompleta, ubicacionCompleta, estado);    
        
    }
    
}

function deleteElement(task){
    var id = task.id;
    var cortar = id.split("btn");
    id = cortar[1];
    
    var task_group = document.getElementById("tasks");
    
    var task = document.getElementById("task"+id);
    
    var date = document.getElementById("date"+id);
        
    task_group.removeChild(task);
    task_group.removeChild(date);
    
    contador = document.getElementById("contador").value;
    
    document.getElementById("contador").value = contador-1;
    
    document.getElementById("tareas_activas").value--;
    
    localStorage.removeItem(id);
    console.log(localStorage);
    
    infoReport();
    
}

function copyText(element){
    var id = element.id;
    var cortar = id.split("btn_copy");
    id = cortar[1];
    
    var texto =  document.getElementById("text"+id).value;
    navigator.clipboard.writeText(texto);
    
}

function obtenerId(element){
    var id = element.id;
    var cortar = id.split("check");
    id = cortar[1];
    return id;
}

function changeState(id){    
    var element = document.getElementById("text"+id);
        
    if(document.getElementById("state"+id).value == 0){
        document.getElementById("task"+id).className = "task-group-disabled";
        document.getElementById("text"+id).className = "task task-text-disabled";
        document.getElementById("btn"+id).className = "task-btn fa fa-trash";
        document.getElementById("date"+id).className = "date date-disabled";
        document.getElementById("state"+id).value = 1;
        document.getElementById("tareas_activas").value--;
    } else{
        document.getElementById("task"+id).className = "task-group";
        document.getElementById("text"+id).className = "task task-text";
        document.getElementById("btn"+id).className = "task-btn fa fa-trash";
        document.getElementById("date"+id).className = "date";
        document.getElementById("state"+id).value = 0;
        document.getElementById("tareas_activas").value++;
    }
        
    updateLocalStorage(element);
    infoReport();
}

function infoReport(){
    var contador = document.getElementById("contador").value;
    var tareas_activas = document.getElementById("tareas_activas").value;
    
    if(contador == 0){
        document.getElementById("info").style.display = "flex"; 
        document.getElementById("info-text").innerText = "Actualmente no hay ninguna tarea! Podés crear una en el recuadro de arriba.";
        document.getElementById("tareas-activas").value = "Tareas activas: "+tareas_activas+"";
        document.getElementById("tareas-total").value = "Total de tareas: "+contador+"";
    } else{
        document.getElementById("info").style.display = "none";
        document.getElementById("tareas-activas").value = "Tareas activas: "+tareas_activas+"";
        document.getElementById("tareas-total").value = "Total de tareas: "+contador+"";
    }
    
}

function obtenerUbicacion(){
	var objetivo = document.getElementById("location");

	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(function(objPosition)
		{
			var lon = objPosition.coords.longitude;
			var lat = objPosition.coords.latitude;
            
            cerrarModal();
            
            document.getElementById("latitud").value = lat;
            document.getElementById("longitud").value = lon;

			objetivo.innerHTML = 'Su ubicación es: ' + lat + ', ' + lon + '';;

		}, function(objPositionError)
		{
			switch (objPositionError.code)
			{
				case objPositionError.PERMISSION_DENIED:
					objetivo.innerHTML = "No se ha permitido el acceso a la posición.";
                    cerrarModal();
				break;
				case objPositionError.POSITION_UNAVAILABLE:
					objetivo.innerHTML = "No se ha podido acceder a su posición.";
                    cerrarModal();
				break;
				case objPositionError.TIMEOUT:
					objetivo.innerHTML = "Se ha agotado el tiempo de respuesta.";
                    cerrarModal();
				break;
				default:
					objetivo.innerHTML = "Error desconocido.";
                    cerrarModal();
			}
		}, {
			maximumAge: 75000,
			timeout: 15000
		});
	}
	else
	{
		content.innerHTML = "Su navegador no soporta la API de geolocalización.";
	}
}


function launchFullScreen(element) {
    if(element.requestFullScreen) {
        element.requestFullScreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
    boton = document.getElementById("btn-fullscreen");
    boton.className = "btn-primary fa fa-compress-arrows-alt";
    boton.setAttribute("onclick", "cancelFullScreen()");
}

function cancelFullScreen() {
    if(document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    boton = document.getElementById("btn-fullscreen");
    boton.className = "btn-primary fa fa-expand-arrows-alt";
    boton.setAttribute("onclick", "launchFullScreen(document.documentElement)");
}

function pressKey(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        var boton = document.getElementById("btn-agregar");
        boton.click();
    }
}

