import Wrapper from "@assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "@components/index";
import { useAppContext } from "../context/appContext";
import { useState, useEffect } from "react";
import useDebounce from "@hooks/useDebounce";

function SearchContainer() {
  const {
    isLoading,
    searchType,
    searchStatus,
    jobTypeOptions,
    statusOptions,
    sort,
    sortOptions,
    stateChangeHandler,
    clearFilters,
  } = useAppContext();

  const [localSearch, setLocalSearch] = useState("");
  const debouncedSearch = useDebounce(localSearch, 700);

  useEffect(() => {
    stateChangeHandler({ name: "search", value: debouncedSearch });
  }, [debouncedSearch]);

  const handleChange = (e) => {
    if (isLoading) return;
    const { name, value } = e.target;

    if (name === "search") {
      setLocalSearch(value);
    } else {
      stateChangeHandler({ name, value });
    }
  };

  return (
    <Wrapper>
      <form className="form">
        <h4 className="form-title">search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            onChange={handleChange}
          />
          <FormRowSelect
            name="searchStatus"
            labelText="status"
            value={searchStatus}
            list={["all", ...statusOptions]}
            onChange={handleChange}
          />
          <FormRowSelect
            name="searchType"
            labelText="job type"
            value={searchType}
            list={["all", ...jobTypeOptions]}
            onChange={handleChange}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            list={sortOptions}
            onChange={handleChange}
          />
          <div className="btn-container">
            <button
              className="btn btn-block btn-danger"
              disabled={isLoading}
              onClick={clearFilters}
              type="button"
            >
              clear filters
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default SearchContainer;
