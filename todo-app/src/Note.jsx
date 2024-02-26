import {MdDeleteForever} from 'react-icons/md';
import { TodoItem } from "./TodoItem"
import { NewTodoForm } from './NewTodoForm';

export function Note({todos, toggleTodo, deleteTodo, editTodo, newItem}){
    return <div className='note'>
        <span></span>
        <div className="note-footer">
        {todos.map(todo =>{
          return (<TodoItem {...todo} completed = {todo.completed} key ={todo.id}  title = {todo.title} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>
      )
     })}
            <small>2/23/24</small>
            <MdDeleteForever className='delete-icon' size="1.3rem" />
        </div>
    </div>
};

