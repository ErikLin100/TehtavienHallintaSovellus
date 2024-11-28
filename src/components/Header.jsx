
import { FaDoorOpen } from "react-icons/fa"; // Import the door icon
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import { auth } from "../firebase"; // Import auth from your Firebase config

function Header() {
  const handleLogout = () => {
    signOut(auth).catch((err) => alert(err.message)); // Handle logout
  };

  return (
    <header className="bg-green-600 text-white p-6 flex justify-between items-center">
      <h1 className="text-4xl font-bold">Todo App</h1>
      <button onClick={handleLogout} className="text-white hover:text-gray-300">
        <FaDoorOpen size={24} /> {/* Door icon */}
      </button>
    </header>
  );
}

export default Header;