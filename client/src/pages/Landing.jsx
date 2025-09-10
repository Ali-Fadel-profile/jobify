import Wrapper from "@assets/wrappers/LandingPage";
import main from "@assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "@components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
        Stay organized and in control of your career search with our job tracking app. 
        Easily manage applications, monitor progress, and keep all job-related details 
        in one place. Designed to save time and reduce stress, it helps you focus on 
        landing your next opportunity.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn register-link">
            login
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;

