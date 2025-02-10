import { useState } from "react";
import PropTypes from 'prop-types';

const AddTodoModal = ({ open = false, onClose, onAddTodo }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!deadline) {
      setError("Deadline is required");
      return false;
    }
    const selectedDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError("Deadline cannot be in the past");
      return false;
    }

    setError("");
    return true;
  };

  const handleAddTodo = () => {
    if (!validateInputs()) return;

    try {
      const formattedDeadline = new Date(deadline);
      
      if (isNaN(formattedDeadline.getTime())) {
        setError("Invalid date format");
        return;
      }

      onAddTodo({ 
        title: title.trim(), 
        priority, 
        deadline: formattedDeadline,
        comments: comments.trim() 
      });
      
      resetForm();
      onClose();
    } catch (err) {
      setError("Error adding todo: " + err.message);
    }
  };

  const resetForm = () => {
    setTitle("");
    setPriority("low");
    setDeadline("");
    setComments("");
    setError("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="border rounded p-2 w-full mb-4 bg-white text-black"
          maxLength={100}
          required
        />
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded p-2 w-full mb-4 bg-white text-black"
          required
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        
        <label htmlFor="deadline" className="block mb-2">Deadline</label> 
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border rounded p-2 w-full mb-4 text-black [color-scheme:light]"
          min={new Date().toISOString().split('T')[0]}
          required
        />
        
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Comments (optional)"
          className="border rounded p-2 w-full mb-4 bg-white text-black"
          maxLength={500}
        />
        
        <div className="flex justify-end">
          <button 
            onClick={() => {
              resetForm();
              onClose();
            }} 
            className="text-gray-600 hover:text-gray-800 mr-2 px-4 py-2 rounded"
            type="button"
          >
            Cancel
          </button>
          <button 
            onClick={handleAddTodo} 
            className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

AddTodoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddTodo: PropTypes.func.isRequired
};

export default AddTodoModal;