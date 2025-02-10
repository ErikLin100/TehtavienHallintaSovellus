import { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { auth } from "../firebase";

function AutoLogoutHandler({ logoutTime = 15 * 60 * 1000 }) {
  const logoutTimer = useRef(null);


  const handleAutoLogout = useCallback(() => {
    auth.signOut().then(() => {
      console.log("User logged out due to inactivity.");
      window.location.href = "/login"; 
    });
  }, []); 

 
  const resetLogoutTimer = useCallback(() => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
    logoutTimer.current = setTimeout(handleAutoLogout, logoutTime);
  }, [logoutTime, handleAutoLogout]); 

  useEffect(() => {
    const events = ["mousemove", "keypress", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetLogoutTimer));

    resetLogoutTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetLogoutTimer));
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
  }, [resetLogoutTimer]);

  return null; 
}


AutoLogoutHandler.propTypes = {
  logoutTime: PropTypes.number, 
};

export default AutoLogoutHandler;



