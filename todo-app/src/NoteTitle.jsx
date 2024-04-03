
import { useState, useEffect } from "react";
import {MdDeleteForever} from 'react-icons/md';
import { FaPlusCircle } from "react-icons/fa";
import { TodoItem } from "./TodoItem"
import { NewTodoForm } from './NewTodoForm';
import { Draggable } from "react-beautiful-dnd";



export function NoteTitle({ title,status, id, deleteNote, editNote, todos, addTodo, toggleTodo, deleteTodo, editTodo, index }) {
    const [newItem, setNewItem] = useState(title);

    const handleEdit = (e) => {
        const newTitle = e.target.value;
        setNewItem(newTitle);
        editNote(id, newTitle, status);
    };

    const handleDelete = () => {
        deleteNote(id, status);
    };

    useEffect(() => {
        const textarea = document.getElementById("textarea_" + id);
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.width = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
            textarea.style.width = newItem.length * 20 + "px";
        }
    }, [newItem]);

    
    const [isClicked, setIsClicked] = useState(false);

    const handleDeleteNote = () => {
        deleteNote(id, status);
      };

    const handleToDo = () => {
     addTodo("",id);
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });


    return (
        <Draggable draggableId={id} key={id} index={index}>
        {(provided, snapshot) =>(
         <div className="container" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>  
        <div className="note" >
            <span id="textPan">
                <textarea className="titleInput" id={"textarea_" + id} type="text" value={newItem} onChange={handleEdit} />
            </span>

            <div className="todoContainer">
                {todos
                    .filter((todo) => todo.noteID === id)
                    .map((todo) => (
                        <TodoItem
                            key={todo.id}
                            completed={todo.completed}
                            id={todo.id}
                            title={todo.title}
                            toggleTodo={toggleTodo}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                            noteId={todo.noteID}
                        />
                    ))}
            </div>
            <FaPlusCircle className="add-icon" onClick={handleToDo} />
        
        <div className="note-footer">
            
            <small>{formattedDate}</small>
            <MdDeleteForever  className='delete-icon' size="1.3rem" onClick={handleDeleteNote}/>
        </div>
        </div>
        {provided.placeholder}
        </div> 
        )}
        </Draggable>
    );
}
