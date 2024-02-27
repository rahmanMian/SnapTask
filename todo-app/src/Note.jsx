import {MdDeleteForever} from 'react-icons/md';
import { TodoItem } from "./TodoItem"
import { NewTodoForm } from './NewTodoForm';
import { NoteList } from './NoteList';
import { NoteTitle } from './NoteTitle';

export function Note({notes, todos, toggleTodo, deleteTodo, editTodo}){
    return <div className='note'>
        {notes.map(note =>{
        return (<NoteTitle {...note} title = {note.title}/>
        )
        })}
        <span>
        {todos.map(todo =>{
          return (<TodoItem {...todo} completed = {todo.completed} key ={todo.id}  title = {todo.title} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>
      )
     })}
     </span>
        <div className="note-footer">
      
            <small>2/23/24</small>
            <MdDeleteForever  className='delete-icon' size="1.3rem" />
        </div>
    </div>
};

