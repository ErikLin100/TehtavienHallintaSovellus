import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Password validation logic
    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*]/.test(password);
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Optionally redirect or show a success message
        } catch (err) {
            if (err.message.includes("auth/email-already-in-use")) {
                setError('Email already in use.');
            } else {
                setError(err.message); // Firebase error message
            }
        }
    };

    return (
        <div className="p-4 md:max-w-md sm:max-w-md">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold mb-6 text-center">Sign Up!</h1>
                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-white w-full px-3 py-2 border rounded-lg"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) {
                                    setError(''); // Clear error if user changes the password field
                                }
                            }}
                            required
                        />
                        {error && (
                            <p className="text-red-500 text-xs mt-1">
                                {error}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 w-full py-3 rounded-lg text-sm font-bold text-white hover:scale-110 transition-all duration-200 ease-in-out"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;