import { TodoList, Todo } from './classes/index';
import { crearTodoHtml } from './js/componentes';


import './styles.css';


export const todoList = new TodoList();
const task  = new Todo("Go to Gym");
todoList.newTodo(task);
console.log(todoList);
console.log(task);


crearTodoHtml( task );