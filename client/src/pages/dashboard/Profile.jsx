import { FormRow, Alert } from "@components";
import Wrapper from "@assets/wrappers/DashboardFormPage";
import { useAppContext } from "@context/appContext";
import { useEffect, useState } from "react";

function Profile() {
  const { user, updateUser, isLoading, showAlert } = useAppContext();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const inputChangeHandler = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { name, email, lastName, location } = userData;
    // if (!name || !email || !lastName || !location) {
    //   return displayAlert();
    // }
    updateUser({ name, email, lastName, location });
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Wrapper>
      <form
        key={userData._id || "default"}
        className="form"
        onSubmit={submitHandler}
      >
        <h4 className="form-title">Profile</h4>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name || ""}
            onChange={inputChangeHandler}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            value={userData.lastName || ""}
            onChange={inputChangeHandler}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email || ""}
            onChange={inputChangeHandler}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location || ""}
            onChange={inputChangeHandler}
          />
          <button type="submit" className="btn" disabled={isLoading}>
            Save Changes
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default Profile;
