import {MdDeleteForever} from 'react-icons/md';
import { FaPlusCircle } from "react-icons/fa";
import { TodoItem } from "./TodoItem"
import { NewTodoForm } from './NewTodoForm';
import { NoteList } from './NoteList';
import { NoteTitle } from './NoteTitle';
import React, { useState } from 'react';

export function Note({note, deleteNote, editNote,todos, addTodo, toggleTodo, deleteTodo, editTodo}){


    const [isClicked, setIsClicked] = useState(false);

    const handleDelete = () => {
        deleteNote(note.id);
      };

    const handleToDo = () => {
     addTodo("",note.id);
    };

      const currentDate = new Date();
     const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });


    return <div className='note'>
    
     <NoteTitle {...note} title = {note.title} key = {note.id} deleteNote={deleteNote} editNote = {editNote} />

     <FaPlusCircle className="add-icon" onClick={handleToDo} />

     {todos
    .filter((todo) => todo.noteID === note.id)
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
    ))
}

         
        
        <div className="note-footer">
            
            <small>{formattedDate}</small>
            <MdDeleteForever  className='delete-icon' size="1.3rem" onClick={handleDelete}/>
        </div>
    </div>
};

