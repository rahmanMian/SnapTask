import React, { useState, useEffect } from "react";
import { MdClear } from 'react-icons/md';

export function TodoItem({completed, id, title, toggleTodo, deleteTodo, editTodo }) {
  const [newItem, setNewItem] = useState(title || "");
  const [clearButtonVisible, setClearButtonVisible] = useState(false);
  const [tickMarkVisible, setTickMarkVisible] = useState(completed);

  const handleEdit = (e) => {
    const newTitle = e.target.value;
    setNewItem(newTitle);
    editTodo(id, newTitle);
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  const handleTextareaClick = () => {
    // Show the clear button when clicking on the textarea
    setClearButtonVisible(true);
  };

  useEffect(() => {
    // Add event listener to document for clicks outside the textarea
    const handleClickOutside = (event) => {
      const textarea = document.getElementById("textarea_" + id);
      if (!textarea.contains(event.target)) {
        // Clicked outside the textarea
        setClearButtonVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      // Cleanup: remove event listener
      document.removeEventListener("click", handleClickOutside);
    };
  }, [id]);

  const handleTickMark = (checked) => {
    setTickMarkVisible(checked);
  };

  return (
    <li>
      <input
        id={"checkInput" + id}
        className="singleInput"
        type="checkbox"
        checked={completed}
        onChange={(e) => {
          toggleTodo(id, e.target.checked);
          handleTickMark(e.target.checked);
        }}
      />
      <label htmlFor={"checkInput" + id} className="checkbox-label">
        {tickMarkVisible && <span>&#x2713;</span>}
      </label>

      <span className="singleInput" id="textPan">
        <textarea
          id={"textarea_" + id}
          type="text"
          value={newItem}
          onChange={handleEdit}
          onClick={handleTextareaClick} // Show clear button when clicking on the textarea
        />
      </span>

      {clearButtonVisible && (
        <MdClear
          className="clear"
          id={id + "todo"}
          size="1.8rem"
          onClick={handleDelete}
        />
      )}
    </li>
  );
}
