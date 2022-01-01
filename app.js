const form = document.getElementById('form');
const input = document.getElementById('input');
const deleteBtn = document.getElementById('deleteBtn');
const todosUL = document.getElementById('todos');
const todos = JSON.parse(localStorage.getItem('todos'));

deleteBtn.addEventListener('click', ()=>{
    let todosList = document.querySelectorAll('li');

    if(todosList){
        todosList.forEach(el => {
            el.remove();
        })
        updateLS();
    }

})

if(todos){
    todos.forEach( todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo){
    let todoText = input.value;
    if(todo){
        todoText = todo.text;
    }
    if(todoText){
        const todoEl = document.createElement('li');
        if(todo && todo.completed){
            todoEl.classList.add('completed');
        }
        todoEl.innerHTML = todoText;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });
        
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);

        input.value = '';

        updateLS();
    }
}

function updateLS(){
    let todosList = document.querySelectorAll('li');

    const todos = [];

    todosList.forEach( el => todos.push({
        text: el.innerText,
        completed: el.classList.contains('completed')
    }));

    localStorage.setItem('todos', JSON.stringify(todos) )
}

