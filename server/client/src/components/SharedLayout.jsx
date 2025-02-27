import { Link, Outlet } from "react-router-dom";
import { SmallSidebar, BigSidebar, Navbar } from "@components/index";
import Wrapper from "@assets/wrappers/Dashboard";

function SharedLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />{" "}
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
}

export default SharedLayout;
