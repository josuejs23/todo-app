
export class TodoList {
    
    constructor(){
        this.loadLocalStorage();
    }

    newTodo(todo){
        this.todos.push(todo);
        this.saveLocalStorage();
    }

    deleteTodo(id){
        this.todos = this.todos.filter(todo => todo.id != id)
        this.saveLocalStorage();
    }

    toggleTodo(id){
        for(const todo of this.todos){
            console.log(id, todo.id);
            if( todo.id === id){
                todo.completed = ! todo.completed;
                this.saveLocalStorage();
                break;
            }
        }
    }

    deleteCompleteds(){
        this.todos = this.todos.filter(todo => !todo.completed )
        this.saveLocalStorage();
    }

    saveLocalStorage(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadLocalStorage(){
       this.todos = localStorage.getItem('todos') 
                    ? JSON.parse(localStorage.getItem('todos')) 
                    :  [];        
    }

    calcComplete(){
        let completed = this.todos.filter( function(todo){
            return todo.completed === false
        });
        return completed.length;
    }
}
