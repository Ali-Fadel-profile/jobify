import { Link } from "react-router-dom";
import Wrapper from "@assets/wrappers/ErrorPage";
import img from "@assets/images/not-found.svg";
const Error = () => {
  return (
    <Wrapper>
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! page not found</h3>
        <p>we can't seem to find the page you are looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
