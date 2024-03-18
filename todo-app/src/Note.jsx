import {MdDeleteForever} from 'react-icons/md';
import { FaPlusCircle } from "react-icons/fa";
import { TodoItem } from "./TodoItem"
import { NewTodoForm } from './NewTodoForm';
import { NoteList } from './NoteList';
import { NoteTitle } from './NoteTitle';
import React, { useState } from 'react';

export function Note({note, deleteNote, editNote,todos, addTodo, toggleTodo, deleteTodo, editTodo}){



     

    return <div>
    
     <NoteTitle {...note} title = {note.title} key = {note.id} deleteNote={deleteNote} editNote = {editNote} todos={todos} addTodo={addTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />



    </div>
};




