/* 
- inserir task - ok 
- deletar uma task - ok
- deletar todas as tasks - ok
- marcar como concluída - ok
- editar (se possivel) - ~~
- limitar quantidade de task - ok
- não pode repetir o nome - ok
- não pode enviar vazio - pelo enter não aparece o erro
- enviar pelo enter - ok
*/

const textoInput = document.getElementById('input-new-task')
const btnInsert = document.getElementById('btn-new-task')
const btnDeleteAll = document.getElementById('btn-del-task')
const listaCompleta = document.getElementById('to-do-list')

let minhaListaDeItens = []

function validateIfExistsNewTask()
{
    let values      = JSON.parse(localStorage.getItem('lista', JSON.stringify
    (minhaListaDeItens)));
    let inputValue  = document.getElementById('input-new-task').value;
    let exists      = values.find(x => x.tarefa == inputValue);
    return !exists ? false : true;
}

textoInput.addEventListener('keypress', e => {
    if (e.key == 'Enter' && textoInput.value != '') {
        addNovaTarefa()
    }
})

function addNovaTarefa() {
    textoInput.style.border = ''

    if (!textoInput.value) {
        textoInput.style.border = '1px solid red'
        alert('Digite algo para inserir na sua lista de tarefas!')
    }
    else if (minhaListaDeItens.length >= 10) {
        alert('Limite máximo de 10 itens atingido!')
    }
    else if(validateIfExistsNewTask()) 
    {
        alert('Já existe uma tarefa com essa descrição')
    }
    else {
        minhaListaDeItens.push({
            tarefa: textoInput.value,
            concluida: false
        })
        mostrarTarefas()
    }
    textoInput.value = ''
}

function mostrarTarefas() {
    let novaLi = ''

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi =
            novaLi +
            `
                    <li class="task ${item.concluida && 'done'}">

                        <button id='btn-checked' alt="check-na-tarefa" onclick="concluirTarefa(${posicao})" title="Marcar tarefa como concluída"><i class="bi bi-check-lg"></i></button>

                        <p>${item.tarefa}</p>

                        <button id='btn-trash' alt="tarefa-pro-lixo" onclick="deletarItem(${posicao})" title="Excluir tarefa"><i class="bi bi-trash3"></i></button>

                `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify
        (minhaListaDeItens))
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens
    [posicao].concluida

    mostrarTarefas()
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()
}

function deletarItems() {
    minhaListaDeItens = []

    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()
btnInsert.addEventListener('click', addNovaTarefa)
btnDeleteAll.addEventListener('click', deletarItems)