
import {auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function LoginForm() {
 const signInUser = (e) => {
   e.preventDefault();
   signInWithPopup(auth, provider).catch((err) => alert(err.message));
 };
  return (
   <div className="p-4 md:max-w-md sm:max-w-md">
     <div className="p-6 bg-white rounded-lg shadow-md">
       <h1 className="text-4xl font-bold mb-6 text-center">My Todo App</h1>
       <button
         onClick={signInUser}
         className="bg-green-500 w-full py-3 rounded-lg text-sm font-bold text-white hover:scale-110 transition-all duration-200 ease-in-out mb-4"
       >
         Sign in with Google
       </button>
       <form>
         <div className="mb-4">
           <label className="block text-sm font-bold mb-2" htmlFor="email">
             Email
           </label>
           <input
             type="email"
             id="email"
             className="bg-white w-full px-3 py-2 border rounded-lg"
             placeholder="Enter your email"
           />
         </div>
         <div className="mb-6">
           <label className="block text-sm font-bold mb-2" htmlFor="password">
             Password
           </label>
           <input
             type="password"
             id="password"
             className="bg-white w-full px-3 py-2 border rounded-lg"
             placeholder="Enter your password"
           />
         </div>
         <button
           type="submit"
           className="bg-blue-500 w-full py-3 rounded-lg text-sm font-bold text-white hover:scale-110 transition-all duration-200 ease-in-out"
         >
           Sign in with Email
         </button>
       </form>
     </div>
   </div>
 );
}
export default LoginForm;