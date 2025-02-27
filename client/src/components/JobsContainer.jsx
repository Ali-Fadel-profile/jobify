import { Loading, Job, PaginationContainer } from "@components/index";
import { useAppContext } from "@context/appContext";
import { useEffect } from "react";
import Wrapper from "@assets/wrappers/JobsContainer";
function JobsContainer() {
  const {
    searchType,
    searchStatus,
    sort,
    search,
    isLoading,
    getJobs,
    jobs,
    totalJobs,
    numOfPages,
    page,
  } = useAppContext();

  useEffect(() => {
    getJobs();
  }, [searchType, searchStatus, sort, search, page]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>Total jobs: {totalJobs} found</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages && <PaginationContainer />}
    </Wrapper>
  );
}

export default JobsContainer;
