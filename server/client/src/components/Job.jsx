import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import Wrapper from "@assets/wrappers/Job";
import { Link } from "react-router-dom";
import { useAppContext } from "@context/appContext";
import { JobInfo } from "@components/index";
function Job({
  _id,
  position,
  jobLocation,
  jobType,
  status,
  company,
  createdAt,
  isLoading,
}) {
  const { deleteJob, setEditJob } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMMM Do YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>{" "}
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer className="actions">
          <Link
            to={`/add-job`}
            className="btn edit-btn"
            onClick={() => setEditJob(_id)}
          >
            Edit
          </Link>
          <form>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteJob(_id)}
              disabled={isLoading}
            >
              Delete
            </button>
          </form>
        </footer>
      </div>
    </Wrapper>
  );
}

export default Job;
