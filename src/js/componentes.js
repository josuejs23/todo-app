import { Todo } from '../classes'
import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo')
const clear_completed      = document.querySelector('.clear-completed');
const ulFilters   = document.querySelector('.filters');
const pedents = document.querySelector('.todo-count');
const anchorsFilters = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) =>{
    const htmlTodo = `
    <li class="${ (todo.completed) ? 'completed':''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completed) ? 'checked':''}>
            <label>${ todo.task }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div;
}

//Eventos
txtInput.addEventListener('keyup', function (e) {
    if (e.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        const newTodo = new Todo(txtInput.value);
        todoList.newTodo(newTodo);
        crearTodoHtml(newTodo);
        txtInput.value = '';
        pedents.children[0].innerText = todoList.calcComplete();
    }
});

divTodoList.addEventListener('click', (event)=>{
    const nameElement = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId      = 1 * todoElement.getAttribute('data-id');
    console.log(todoId);
    if(nameElement.includes('input')){
        todoList.toggleTodo(todoId);
        todoElement.classList.toggle('completed');
        pedents.children[0].innerText = todoList.calcComplete();
    } else if (nameElement.includes('button')){
        todoList.deleteTodo(todoId);
        divTodoList.removeChild(todoElement);
        pedents.children[0].innerText = todoList.calcComplete();
    }

    console.log(todoList);
})

clear_completed.addEventListener('click', function(){
    
    todoList.deleteCompleteds();
    //console.log(todoList.todos);
    for(let i = divTodoList.children.length - 1; i >=0; i--){
        let child = divTodoList.children[i];
        if (child.classList.contains('completed')){
            divTodoList.removeChild(child);
        }
    }
    
});

ulFilters.addEventListener('click', function(event){
    const filter = event.target.text;
    if (!filter) return;

    anchorsFilters.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const element of divTodoList.children){
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');
        
        switch (filter) {
            case 'Pendientes':
                if(completed){
                    element.classList.add('hidden')
                }
                break;
            
            case 'Completados':
                if (!completed) {
                    element.classList.add('hidden')
                }
                break;
        
            default:
                break;
        }
    }
})

document.addEventListener('ready', function(){
    console.log('hello');
    pedents.children[0].innerText = todoList.calcComplete();
} )

