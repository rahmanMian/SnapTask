import { TodoItem } from "./TodoItem"

export function TodoList({todos, toggleTodo, deleteTodo}){
    return (
        <ul className="list">
      {todos.length === 0 && "No Todos"}

      {todos.map(todo =>{
          return (<TodoItem {...todo} completed = {todo.completed} key ={todo.id}  title = {todo.title} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      )
     })}
      
    </ul>
    )
}