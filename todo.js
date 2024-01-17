//Choosing elements

const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const todoList = document.querySelector(".list-group");
const filter = document.getElementById("filter");
const clearButton = document.getElementById("clear-todos");

eventListener();

function eventListener() {

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(){
    if(confirm("Are you sure you want to delete all todos?"))
    {
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
        showAlert("primary", "All todos are deleted successfully")
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if(text.indexOf(filterValue) === -1){  //filter value does not match the text value
            listItem.setAttribute("style", "display: none !important");
        }
        else{
            listItem.setAttribute("style", " display: block");
        }
    })
}

function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("danger", "Todo deleted successfully")
    }

}

function deleteTodoFromStorage(deleteTodo){
    let todos = getItemFromLocalStorage();

    todos.forEach(function(todo, index){
        if(todo === deleteTodo){
            todos.splice(index,1);  //Deleting item from array
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getItemFromLocalStorage();

    todos.forEach(function(todo){
        addTodoToUi(todo);
    });
}

function addTodo(e) {

    let newTodo = todoInput.value.trim();

    if(newTodo === ""){
        showAlert("danger", "Please add Todo..");
    }
    else{
        addTodoToUi(newTodo);
        showAlert("success", "Todo added successfully")
    }
    
    addTodoLocalStorage(newTodo);
    
    e.preventDefault();
}

function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.innerText = message;

    firstCardBody.appendChild(alert);
    
    setTimeout(function(){
        alert.remove();
    },1000);
}

function addTodoToUi(newTodo) {   //String value add to UI as list item

    //list Item    
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    //link 
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    //Add Text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //List Item add to TodoList
    todoList.appendChild(listItem);
    todoInput.value = ""; 
}

function getItemFromLocalStorage(){  //Getting Items from Local Storage
   
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function addTodoLocalStorage(newTodo){

 let todos = getItemFromLocalStorage();

 todos.push(newTodo);

 localStorage.setItem("todos", JSON.stringify(todos));

}