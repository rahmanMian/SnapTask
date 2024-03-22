import React, { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import Column from "./Column";

export default function KanbanBoard({ notes, deleteNote, editNote, todos, addTodo, toggleTodo, deleteTodo, editTodo }) {
    const [boardNotes, setBoardNotes] = useState([]);

    // Initialize the board notes
    useEffect(() => {
        setBoardNotes(notes);
    }, [notes]);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
    
        // If dropped outside the list, return
        if (!destination) return;
    
        // If dropped in the same column and position, return
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    
        // Create a copy of the board notes
        const updatedNotes = Array.from(boardNotes);
    
        // Remove the dragged note from its original position
        const [reorderedItem] = updatedNotes.splice(source.index, 1);
    
        // Add the dragged note to the new position
        updatedNotes.splice(destination.index, 0, reorderedItem);
    
        // Update the status of the dragged note based on the destination column
        const updatedStatus = destination.droppableId;
        reorderedItem.status = updatedStatus;
    
   
    
        // Update the status of the dragged note in the external notes array
        const updatedExternalNotes = notes.map(note => {
            if (note.id === draggableId) {
                return { ...note, status: updatedStatus};
            }
            return note;
        });
    
        // Update the state of external notes
        setBoardNotes(updatedExternalNotes);
    };
    

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 style={{ textAlign: "center" }}>Progress Board</h2>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <Column
                    title="to-do"
                    id="to-do"
                    notes={boardNotes.filter(note => note.status === "to-do")}
                    deleteNote={deleteNote}
                    editNote={editNote}
                    todos={todos}
                    addTodo={addTodo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                />
                <Column
                    title="done"
                    id="done"
                    notes={boardNotes.filter(note => note.status === "done")}
                    deleteNote={deleteNote}
                    editNote={editNote}
                    todos={todos}
                    addTodo={addTodo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                />
                <Column
                    title="backlog"
                    id="backlog"
                    notes={boardNotes.filter(note => note.status === "backlog")}
                    deleteNote={deleteNote}
                    editNote={editNote}
                    todos={todos}
                    addTodo={addTodo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                />
            </div>
        </DragDropContext>
    );
}
