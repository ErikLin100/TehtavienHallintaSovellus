
import { FaDoorOpen } from "react-icons/fa"; 
import { signOut } from "firebase/auth"; 
import { auth } from "../firebase"; 

function Header() {
  const handleLogout = () => {
    signOut(auth).catch((err) => alert(err.message)); 
  };

  return (
    <header className="bg-green-600 text-white p-6 flex justify-between items-center">
      <h1 className="text-4xl font-bold">Todo App</h1>
      <button onClick={handleLogout} className="text-white hover:text-gray-300">
        <FaDoorOpen size={24} /> 
      </button>
    </header>
  );
}

export default Header;