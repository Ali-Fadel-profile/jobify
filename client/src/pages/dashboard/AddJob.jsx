import { FormRow, Alert, FormRowSelect } from "@components/index";
import Wrapper from "@assets/wrappers/DashboardFormPage";
import { useAppContext } from "@context/appContext";

function AddJob() {
  const {
    isEditingJob,
    jobLocation,
    position,
    company,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    showAlert,
    displayAlert,
    stateChangeHandler,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const inputChangeHandler = (event) => {
    stateChangeHandler({ name: event.target.name, value: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
    }
    if (isEditingJob) {
      return editJob();
    }
    createJob();
  };
  return (
    <Wrapper>
      <form method="post" className="form" onSubmit={submitHandler}>
        <h4 className="form-title">{isEditingJob ? "edit job" : "add job"}</h4>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            onChange={inputChangeHandler}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            onChange={inputChangeHandler}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            onChange={inputChangeHandler}
          />
          <FormRowSelect
            name="status"
            labelText="job status"
            value={status}
            list={statusOptions}
            onChange={inputChangeHandler}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            list={jobTypeOptions}
            onChange={inputChangeHandler}
          />

          <div className="btn-container">
            <button type="submit" className="btn  submit-btn">
              submit
            </button>
            <button
              type="button"
              className="btn  clear-btn"
              onClick={clearValues}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default AddJob;
