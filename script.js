//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodo (event) {
    event.preventDefault();
    // Check if empty
    if (todoInput.value != '') {       
        // Create Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Add todos to list
        saveLocalTodos (todoInput.value);
        // Complete Button
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add('completed-btn');
        todoDiv.appendChild(completedBtn);
        // Trash button
        const trashdBtn = document.createElement('button');
        trashdBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashdBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashdBtn);
        // Append to todoList
        todoList.appendChild(todoDiv);
        // Clear todoInput value
        todoInput.value = '';
    } 
    else {
        alert('Enter todo')
    }
}

function deleteCheck (event) {
    //console.log(event.target);
    const item = event.target;

    // Delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        // Deleting todos
        removeLocalTodos (todo)
        // setTimeout(() => {
        //     todo.remove();
        // },1000);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    // Check mark
    if (item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
    
}

// Filter todos

function filterTodo (event) {
    const todos = todoList.childNodes;
    //console.log(todos);    
    todos.forEach((todo) => {
        switch(event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}


// Saving todos
function saveLocalTodos (todo) {
    // Check if todos already exist
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


// Get todos
function getTodos () {    
    // Check if todos already exist
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((todo) => {
        // Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Complete Button
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add('completed-btn');
        todoDiv.appendChild(completedBtn);
        // Trash button
        const trashdBtn = document.createElement('button');
        trashdBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashdBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashdBtn);
        // Append to todoList
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos (todo) {
    // Check if todos already exist
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText; // [0] - Index of the first children = li
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}