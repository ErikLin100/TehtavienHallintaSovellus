import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

function LoginPage() {
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <div className="grid place-items-center h-screen">
            <div className="p-4 md:max-w-md sm:max-w-md">
                {!showSignUp ? (
                    <>
                        <LoginForm />
                        <p className="text-xs text-center mt-4">
                            Dont have an account? <a href="#" onClick={() => setShowSignUp(true)}>Sign up</a>
                        </p>
                    </>
                ) : (
                    <>
                        <SignUpForm />
                        <p className="text-xs text-center mt-4">
                            Already have an account? <a href="#" onClick={() => setShowSignUp(false)}>Log in</a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default LoginPage;