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
const deleteAllBtn = document.querySelector("#delete-all");

let oldInputValue;

// Funções 
const clearInput = () => {
    todoInput.value = '';
    todoInput.focus();
};

const saveTodo = (text, done = 0, save = 1) => {

    todoInput.style.border = '2px solid var(--color-yellow)';

    // Cria div com a classe todo
    const todo = document.createElement('div');
    todo.classList.add('todo');

    // Cria h4 com o text (título da tarefa) que vai para dentro da div
    const todoTitle = document.createElement('h4');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    // Cria btn para finalizar tarefa que vai para dentro da div
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.setAttribute('title', 'Concluir tarefa');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    // Cria btn para editar tarefa que vai para dentro da div
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.setAttribute('title', 'Editar tarefa');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    // Cria btn para deletar tarefa que vai para dentro da div
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo');
    deleteBtn.setAttribute('title', 'Apagar tarefa');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    // Utilizando dados da localStorage
    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({ text, done: 0 });
    }

    // Coloca a div (todo) dentro da div (todoList)
    todoList.appendChild(todo);

    // Chama essa função para limpar o input
    clearInput();
};

const toggleForms = () => {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
};

const updateTodo = (text) => {

    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector('h4');

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

            // Utilizando dados da localStorage
            updateTodoLocalStorage(oldInputValue, text);
        }
    });
};

const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h4").innerText.toLowerCase();

        todo.style.display = "flex";

        if (!todoTitle.includes(search)) {
            todo.style.display = "none";
        }
    });
};

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch (filterValue) {
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));

            break;

        case "done":
            todos.forEach((todo) =>
                todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );

            break;

        case "todo":
            todos.forEach((todo) =>
                !todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );

            break;

        default:
            break;
    }
};

// Eventos
// Salvar todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (!todoInput.value) {
        todoInput.style.border = '2px solid red';
        alert('Digite algo para inserir na sua lista de tarefas!');

        return;
    } else if (inputValue) {
        saveTodo(inputValue);
    }

});

document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('div');
    let todoTitle;

    if (parentEl && parentEl.querySelector('h4')) {
        todoTitle = parentEl.querySelector('h4').innerText || '';
    }

    // Btns finalizar, editar e remover tarefa
    if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done');

        // Utilizando dados da localStorage
        updateTodoStatusLocalStorage(todoTitle);
    }

    if (targetEl.classList.contains('edit-todo')) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    if (targetEl.classList.contains('remove-todo')) {
        parentEl.remove();

        // Utilizando dados da localStorage
        removeTodoLocalStorage(todoTitle);
    }
});

// Btn cancelar edição de tarefa
cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForms();
});

// Btn editar tarefa
editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchedTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});

// Local Storage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text != todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoText ? (todo.done = !todo.done) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoOldText ? (todo.text = todoNewText) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeAllTodoLocalStorage = () => {
    let todos = getTodosLocalStorage();
    todos = [];

    localStorage.setItem("todos", JSON.stringify(todos));
}

deleteAllBtn.addEventListener('click', (e) => {
    removeAllTodoLocalStorage();
});

loadTodos();