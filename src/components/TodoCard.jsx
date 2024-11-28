
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import PropTypes from 'prop-types'; // Add this for prop validation

function TodoCard({ id, title, priority, deadline, comments, time, status}) {
  const [user] = useAuthState(auth);

  if (!id || !title) {
    return null; // Don't render if essential props are missing
  }

  const deleteTodo = (id) => {
    if (!id || !user) return;
    deleteDoc(doc(db, `user/${user.uid}/todos/${id}`))
      .then(() => alert("Todo Deleted"))
      .catch((er) => alert(er.message));
  };

  const toggleStatus = async () => {
    if (!id || !user) return;
    try {
      await updateDoc(doc(db, `user/${user.uid}/todos/${id}`), {
        status: !status,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const priorityColor = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
    default: "bg-gray-500"
  };

  const formatDeadline = () => {
    if (!deadline) return "No deadline";
    try {
      if (typeof deadline === 'string') {
        return moment(new Date(deadline)).format("MM/DD/YYYY");
      }
      if (deadline.toDate && typeof deadline.toDate === 'function') {
        return moment(deadline.toDate()).format("MM/DD/YYYY");
      }
      if (deadline instanceof Date) {
        return moment(deadline).format("MM/DD/YYYY");
      }
      return "Invalid date";
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  const formatTime = () => {
    if (!time) return "";
    try {
      if (typeof time === 'string') {
        return moment(new Date(time)).format("LT");
      }
      if (time.toDate && typeof time.toDate === 'function') {
        return moment(time.toDate()).format("LT");
      }
      if (time instanceof Date) {
        return moment(time).format("LT");
      }
      return "";
    } catch (error) {
      console.error("Time formatting error:", error);
      return "";
    }
  };

  return (
    <div className={`flex justify-between items-center p-4 border-b ${status ? "bg-green-200" : "bg-white"}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={!!status}
          onChange={toggleStatus}
          className="mr-3"
        />
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${priorityColor[priority] || priorityColor.default} mr-2`} />
          <div>
            <p className="text-lg font-bold">{title}</p>
            <p className="text-sm">Deadline: {formatDeadline()}</p>
            <p className="text-sm">Comments: {comments || 'No comments'}</p>
            <p className="text-sm">{formatTime()}</p>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => deleteTodo(id)}
          className="bg-red-600 text-white rounded p-2 flex items-center"
        >
          <FaTrash className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
}

// Add PropTypes for type checking
TodoCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  priority: PropTypes.oneOf(['low', 'medium', 'high']),
  deadline: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.object // For Firestore Timestamp
  ]),
  comments: PropTypes.string,
  time: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.object // For Firestore Timestamp
  ]),
  status: PropTypes.bool,
  updateTodo: PropTypes.func
};

// Add default props
TodoCard.defaultProps = {
  priority: 'low',
  comments: '',
  status: false
};

export default TodoCard;