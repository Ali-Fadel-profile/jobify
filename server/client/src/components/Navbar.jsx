import Wrapper from "@assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import { Logo } from "@components/index";
import { useAppContext } from "@context/appContext";
import Logout from "./Logout";
function Navbar() {
  const { toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => {
            toggleSidebar();
          }}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <Logout />
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
