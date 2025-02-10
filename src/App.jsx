import "./App.css";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AutoLogoutHandler from "./components/AutoLogoutHandler"; // Import the component

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Authenticating...</div>;
  }

  if (error) {
    console.error("Authentication error:", error);
    return <Navigate to="/login" />;
  }

  return (
    <>
      {user && <AutoLogoutHandler logoutTime={10 * 60 * 1000} />} 
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
