import React, { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import Column from "./Column";

export default function KanbanBoard({ notes, deleteNote, editNote, todos, addTodo, toggleTodo, deleteTodo, editTodo }) {
    const [toDoNotes, setToDoNotes] = useState([]);
    const [doneNotes, setDoneNotes] = useState([]);
    const [backlogNotes, setBacklogNotes] = useState([]);

    // Initialize the notes in each column from local storage or props
    useEffect(() => {
        const storedToDoNotes = JSON.parse(localStorage.getItem('toDoNotes')) || notes.filter(note => note.status === "to-do");
        const storedDoneNotes = JSON.parse(localStorage.getItem('doneNotes')) || notes.filter(note => note.status === "done");
        const storedBacklogNotes = JSON.parse(localStorage.getItem('backlogNotes')) || notes.filter(note => note.status === "backlog");
        
        setToDoNotes(storedToDoNotes);
        setDoneNotes(storedDoneNotes);
        setBacklogNotes(storedBacklogNotes);
    }, [notes]);

    // Update local storage whenever notes change
    useEffect(() => {
        localStorage.setItem('toDoNotes', JSON.stringify(toDoNotes));
        localStorage.setItem('doneNotes', JSON.stringify(doneNotes));
        localStorage.setItem('backlogNotes', JSON.stringify(backlogNotes));
    }, [toDoNotes, doneNotes, backlogNotes]);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // If dropped outside the list, return
        if (!destination) return;

        // If dropped in the same column and position, return
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        // Determine the source and destination columns based on droppableId
        let sourceColumn, destinationColumn;
        switch (source.droppableId) {
            case "to-do":
                sourceColumn = toDoNotes;
                break;
            case "done":
                sourceColumn = doneNotes;
                break;
            case "backlog":
                sourceColumn = backlogNotes;
                break;
            default:
                break;
        }

        switch (destination.droppableId) {
            case "to-do":
                destinationColumn = toDoNotes;
                break;
            case "done":
                destinationColumn = doneNotes;
                break;
            case "backlog":
                destinationColumn = backlogNotes;
                break;
            default:
                break;
        }

        // If the note is dragged within the same column
        if (source.droppableId === destination.droppableId) {
            // Create a copy of the source column
            const updatedColumn = Array.from(sourceColumn);
            // Remove the dragged note from its original position
            const [draggedNote] = updatedColumn.splice(source.index, 1);
            // Insert the dragged note at the new position
            updatedColumn.splice(destination.index, 0, draggedNote);
            // Update the state of the respective column notes array
            switch (source.droppableId) {
                case "to-do":
                    setToDoNotes(updatedColumn);
                    break;
                case "done":
                    setDoneNotes(updatedColumn);
                    break;
                case "backlog":
                    setBacklogNotes(updatedColumn);
                    break;
                default:
                    break;
            }
        } else {
            // If the note is dragged to a different column
            // Remove the dragged note from the source column
            const updatedSource = Array.from(sourceColumn);
            const [draggedNote] = updatedSource.splice(source.index, 1);
            // Add the dragged note to the destination column at the specified position
            const updatedDestination = Array.from(destinationColumn);
            updatedDestination.splice(destination.index, 0, draggedNote);
            // Update the state of the source and destination column notes arrays
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
