/* 
- Inserir tarefa - OK
- Salvar tarefa - 
- Deletar uma tarefa - 
- Deletar todas as tarefas - 
- Marcar como concluída - 
- Editar - 
- Limitar quantidade de tarefa -
- Não pode repetir o nome - 
- Não pode enviar vazio - 
- Enviar pelo enter - 
- Primeira letra da tarefa sempre em uppercase -
*/

// Seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Funções 
function limpaInput () {
    todoInput.value = '';
    todoInput.focus();
}

const salvarTodo = (text) => {

    // cria div com a classe todo
    const todo = document.createElement('div');
    todo.classList.add('todo');

    // cria h4 com o text (título da tarefa) que vai para dentro da div
    const todoTitle = document.createElement('h4');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    // cria btn para finalizar tarefa que vai para dentro da div
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    // cria btn para editar tarefa que vai para dentro da div
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    // cria btn para deletar tarefa que vai para dentro da div
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    // coloca a div (todo) dentro da div (todoList)
    todoList.appendChild(todo);

    // chama essa função para limpar o input
    limpaInput();
}

const alternarForms = () => {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const atualizarTodo = (text) => {

    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        
        let todoTitle = todo.querySelector('h4');

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
}

// Eventos
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputValue = todoInput.value;
    
    if (inputValue) {
        salvarTodo(inputValue);
    }
});

document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('div');
    let todoTitle;

    if (parentEl && parentEl.querySelector('h4')) {
        todoTitle = parentEl.querySelector('h4').innerText;       
    }

    // btns finalizar, editar e remover tarefa
    if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done'); //poderia usar add, mas o mais adequado é o toggle
    }

    if (targetEl.classList.contains('edit-todo')) {
        alternarForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    if (targetEl.classList.contains('remove-todo')) {
        parentEl.remove();
    }
});

// btn cancelar edição de tarefa
cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    alternarForms();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        atualizarTodo(editInputValue);
    }

    alternarForms();
});