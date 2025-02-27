import { useState } from "react";
import { useAppContext } from "@context/appContext";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import Wrapper from "@assets/wrappers/LogoutContainer";
function Logout() {
  const { user, logoutUser } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
}

export default Logout;
