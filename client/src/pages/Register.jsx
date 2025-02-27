import Wrapper from "@assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, Alert } from "@components";
import { useEffect, useState } from "react";
import { useAppContext } from "@context/appContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { showAlert, displayAlert, isLoading, user, setupUser } =
    useAppContext();
  const currentPath = location.pathname;

  const intialValues = {
    name: "",
    email: "",
    password: "",
    isMember: currentPath === "/register" ? false : true,
  };
  const [values, setValues] = useState(intialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    if (isMember) {
      setupUser({
        currentUser: { email, password },
        endpoint: "login",
        alertText: "Login Successful! Rediracting...",
      });
    } else {
      setupUser({
        currentUser: { name, email, password },
        endpoint: "register",
        alertText: "User Created! Rediracting...",
      });
    }
  };
  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <Logo />
        <h4>{values.isMember ? "Login" : "Register"}</h4>{" "}
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            onChange={changeHandler}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          onChange={changeHandler}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          onChange={changeHandler}
        />
        <button type="submit" className={`btn btn-block`} disabled={isLoading}>
          {isLoading ? "Loading..." : values.isMember ? "Login" : "Register"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <a
            to="/register"
            className="member-btn"
            style={{ cursor: "pointer" }}
            onClick={() => setValues({ ...values, isMember: !values.isMember })}
          >
            {values.isMember ? "Register" : "Login"}
          </a>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
