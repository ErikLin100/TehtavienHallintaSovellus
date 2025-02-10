import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Authenticating...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a required node
};

export default ProtectedRoute;