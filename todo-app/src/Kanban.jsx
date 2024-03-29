import React, { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import Column from "./Column";


export default function KanbanBoard({ toDoNotes, doneNotes, backlogNotes, setToDoNotes, setDoneNotes, setBacklogNotes, editStatusNote, deleteNote, editNote, todos, addTodo, toggleTodo, deleteTodo, editTodo }) {
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

        // Create a copy of the source column
        const updatedSource = Array.from(sourceColumn);
        // Remove the dragged note from the source column
        const [draggedNote] = updatedSource.splice(source.index, 1);

        // If the source and destination columns are different
        if (source.droppableId !== destination.droppableId) {
            // Update the state of the source column notes array
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

            // Create a copy of the destination column
            const updatedDestination = Array.from(destinationColumn);
            // Insert the dragged note at the new position in the destination column
            updatedDestination.splice(destination.index, 0, draggedNote);

            // Update the state of the destination column notes array
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
        } else {
            // If the source and destination columns are the same (note moved within the same column)
            // Insert the dragged note at the new position in the source column
            updatedSource.splice(destination.index, 0, draggedNote);

            // Update the state of the source column notes array
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
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
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
