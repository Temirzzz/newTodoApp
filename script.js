//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event Listener
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);




//Functions
function addTodo (event) {
    event.preventDefault();
    // Check if empty
    if (todoInput.value != '') {       
        // Create Li
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
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
        // Clear todoInput value
        todoInput.value = '';
    } 
    else {
        alert('Enter todo')
    }
}

function deleteCheck (event) {
    console.log(event.target);
    const item = event.target;

    // Delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
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