// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
// Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
// Functions
// Lisää tehtävä
function addTodo(event){
    // Estää sivun refresh toiminnon
    event.preventDefault();
    // Tarkistaa onko syöte tyhjä tai liian lyhyt
    if (todoInput.value.trim() === "" || todoInput.value.trim().length < 3) {
        // virheilmoitus
        todoInput.classList.add = ("error-border");
        todoInput.placeholder = "At least 3 marks.";
        todoInput.value = "";
        return;
    }
    todoInput.classList.remove("error-border");
    todoInput.placeholder = "";
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; // todoInput.value = kenttään kirjoitettu teksti
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Local storage
    saveLocal(todoInput.value);
    // Checked button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
    // Deleted button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);
    // Append to list
    todoList.appendChild(todoDiv);
    // Pyyhkii edellisen syötetyn arvon tekstikentästä
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // Delete todo
    if (item.classList[0] === "trash-button") {
        const todo = item.parentElement;
        removeLocal(todo);
        todo.remove();
    }

    // Yliviivausnappi
    if (item.classList[0] === "complete-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
// Tallentaa syötetyt tehtävät muistiin
function saveLocal(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Sivu lataa kaikki aiemmin tallennetut tehtävät
function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; // todoInput.value = kenttään kirjoitettu teksti
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Checked button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
    // Deleted button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);
    // Append to list
    todoList.appendChild(todoDiv);
    });
}
// Käyttäjä poistaa tehtävän listalta, poistaa samalla sen välimuistista
function removeLocal(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}