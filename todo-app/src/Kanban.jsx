import React, { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import Column from "./Column";

export default function KanbanBoard({ notes, deleteNote, editNote, todos, addTodo, toggleTodo, deleteTodo, editTodo }) {
    const [toDoNotes, setToDoNotes] = useState([]);
    const [doneNotes, setDoneNotes] = useState([]);
    const [backlogNotes, setBacklogNotes] = useState([]);

    // Initialize the notes in the respective columns
    useEffect(() => {
        const toDo = notes.filter(note => note.status === "To Do");
        const done = notes.filter(note => note.status === "Done");
        const backlog = notes.filter(note => note.status === "Backlog");

        setToDoNotes(toDo);
        setDoneNotes(done);
        setBacklogNotes(backlog);
    }, [notes]);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
    
        // If dropped outside the list, return
        if (!destination) return;
    
        // If dropped in the same column and position, return
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    
        // Find the dragged note
        const draggedNote = notes.find(note => note.id === draggableId);
        if (!draggedNote) return;
    
        // Update the status of the dragged note based on the destination column
        let updatedStatus;
        switch (destination.droppableId) {
            case "to-do":
                updatedStatus = "To Do";
                break;
            case "done":
                updatedStatus = "Done";
                break;
            case "backlog":
                updatedStatus = "Backlog";
                break;
            default:
                break;
        }
    
        // Update the status and order of the dragged note
        const updatedNotes = notes.map(note => {
            if (note.id === draggedNote.id) {
                return { ...note, status: updatedStatus };
            } else {
                return note;
            }
        });
    
        // Reorder the notes within the source and destination columns
        const sourceColumn = updatedNotes.filter(note => note.status === draggedNote.status);
        const destinationColumn = source.droppableId === destination.droppableId ? sourceColumn : updatedNotes.filter(note => note.status === updatedStatus);
        const updatedSource = Array.from(sourceColumn);
        const updatedDestination = Array.from(destinationColumn);
        updatedSource.splice(source.index, 1);
        updatedDestination.splice(destination.index, 0, draggedNote);
    
        // Update the state of notes
        const updatedNotesAfterReorder = updatedNotes.map(note => {
            if (updatedSource.find(n => n.id === note.id)) {
                return updatedSource.find(n => n.id === note.id);
            } else if (updatedDestination.find(n => n.id === note.id)) {
                return updatedDestination.find(n => n.id === note.id);
            } else {
                return note;
            }
        });
    
        // Update the state of notes
        setNotes(updatedNotesAfterReorder);
    
        // Update the state of columns
        switch (source.droppableId) {
            case "to-do":
                setToDoNotes(updatedSource);
                break;
            case "done":
                setDoneNotes(updatedSource);
                break;
            case "backlog":
                setBacklogNotes(updatedSource);
                break;
            default:
                break;
        }
        switch (destination.droppableId) {
            case "to-do":
                setToDoNotes(updatedDestination);
                break;
            case "done":
                setDoneNotes(updatedDestination);
                break;
            case "backlog":
                setBacklogNotes(updatedDestination);
                break;
            default:
                break;
        }
    };
    
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 style={{ textAlign: "center" }}>Progress Board</h2>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <Column
                    title="To Do"
                    id="to-do"
                    notes={toDoNotes}
                    deleteNote={deleteNote}
                    editNote={editNote}
                    todos={todos}
                    addTodo={addTodo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                />
                <Column
                    title="Done"
                    id="done"
                    notes={doneNotes}
                    deleteNote={deleteNote}
                    editNote={editNote}
                    todos={todos}
                    addTodo={addTodo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                />
                <Column
                    title="Backlog"
                    id="backlog"
                    notes={backlogNotes}
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
