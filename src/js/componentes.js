import { Todo } from '../classes'
import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo')
const clear_completed      = document.querySelector('.clear-completed');

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
    } else if (nameElement.includes('button')){
        todoList.deleteTodo(todoId);
        divTodoList.removeChild(todoElement);
    }

    console.log(todoList);
})

clear_completed.addEventListener('click', function(){
    
    todoList.deleteCompleteds();
    //console.log(todoList.todos);
    for(let i = divTodoList.children.length - 1; i >=0; i--){
        let child = divTodoList.children[i];
        if (divTodoList.children[i].className === 'completed'){
            divTodoList.removeChild(child);
        }
    }
    
});



