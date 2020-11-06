function addElement(){
    
    var destino = document.getElementById("tasks");
    
    var entrada = document.getElementById("newElement");
    
    if(entrada.value == ""){
        
    } else {
    
    var contador = 0;
    contador = document.getElementById("contador").value;
    contador++;
    
    document.getElementById("contador").value = contador;    
        
    var div = document.createElement("div");
    div.id = "task"+contador;
    div.className = "task-group";
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
    new_checkbox.setAttribute("onchange", "changeState(this);");
    destino.appendChild(new_checkbox);
    
    var new_label = document.createElement("label");
    new_label.setAttribute("for", "check"+contador);
    new_label.id = "label"+contador;
    destino.appendChild(new_label);
    
    var new_task = document.createElement("input");
    new_task.type = "text";
    new_task.id = "text"+contador;
    new_task.value = entrada.value;
    new_task.className = "task task-text";
    destino.appendChild(new_task);
    
    var new_btn = document.createElement("a");
    new_btn.id = "btn"+contador;
    new_btn.className = "task-btn";
    new_btn.setAttribute("onclick", "deleteElement(this)");
    destino.appendChild(new_btn);
    
    destino = document.getElementById("btn"+contador);
    
    var new_icon = document.createElement("i");
    new_icon.id = "icon"+contador;
    new_icon.className = "fa fa-minus";
    destino.appendChild(new_icon);
    
    document.getElementById("newElement").value = "";
    
    document.getElementById("tareas_activas").value++;
    
    infoReport();
        
    }
    
}

function deleteElement(task){
    var id = task.id;
    var cortar = id.split("btn");
    id = cortar[1];
    
    var task_group = document.getElementById("tasks");
    
    var task = document.getElementById("task"+id);
    
    task_group.removeChild(task);
    
    contador = document.getElementById("contador").value;
    
    document.getElementById("contador").value = contador-1;
    
    document.getElementById("tareas_activas").value--;
    
    infoReport();
    
}

function changeState(task){
    var id = task.id;
    var cortar = id.split("check");
    id = cortar[1];
    
    if(document.getElementById("state"+id).value == 0){
        document.getElementById("task"+id).className = "task-group-disabled";
        document.getElementById("text"+id).className = "task task-text-disabled";
        document.getElementById("btn"+id).className = "task-btn-disabled";
        document.getElementById("state"+id).value = 1;
        document.getElementById("tareas_activas").value--;
    } else{
        document.getElementById("task"+id).className = "task-group";
        document.getElementById("text"+id).className = "task task-text";
        document.getElementById("btn"+id).className = "task-btn";
        document.getElementById("state"+id).value = 0;
        document.getElementById("tareas_activas").value++;
    }
    
    infoReport();
}

function infoReport(){
    var contador = document.getElementById("contador").value;
    var tareas_activas = document.getElementById("tareas_activas").value;
    
    console.log(contador);
    
    if(contador == 0){
        document.getElementById("info-text").value = "Actualmente no hay ninguna tarea! Podés crear una en el recuadro de arriba.";
    } else{
        document.getElementById("info-text").value = "Cantidad de tareas: "+contador+" Tareas activas: "+tareas_activas;
    }
    
}