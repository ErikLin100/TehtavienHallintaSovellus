
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="p-4 md:max-w-md sm:max-w-md">
        <LoginForm />
        <p className="text-xs text-center mt-4">
          Dont have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;