import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  CHANGE_STATE_INFO,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_ALL_JOBS_BEGIN,
  GET_ALL_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  GET_STATS_BEGIN,
  GET_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  LOGOUT_USER_SUCCESS,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./actions";

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: false,
  user: null,
  userLocation: "",
  isEditingJob: false,
  jobLocation: "",
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  defaultStats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const authFetch = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true,
  });

  authFetch.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const setupUser = async ({ currentUser, endpoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await authFetch.post(`/auth/${endpoint}`, currentUser);
      const { user, userLocation } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          userLocation,
          alertText,
        },
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { alertText: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({
      type: LOGOUT_USER_SUCCESS,
      payload: { user: null, userLocation: "", jobLocation: "" },
    });
    clearAlert();
  };

  const updateUser = async (currentUser) => {
    // I used the same reducer for updating data becuase i will get the same data
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, userLocation } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          userLocation,
          jobLocation: userLocation,
          alertText: "Successfuly updated data!",
        },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: SETUP_USER_ERROR,
          payload: {
            alertText: error.response.data.msg,
          },
        });
      }
    }
    clearAlert();
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch("/auth/getCurrentUser");
      const { user, userLocation } = data;
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, userLocation },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const stateChangeHandler = ({ name, value }) => {
    dispatch({ type: CHANGE_STATE_INFO, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobType, status, jobLocation } = state;
      const data = await authFetch.post("/jobs/create", {
        position,
        company,
        jobType,
        status,
        jobLocation,
      });
      dispatch({ type: CREATE_JOB_SUCCESS, payload: { job: data.job } });
      clearValues();
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: CREATE_JOB_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const getJobs = async () => {
    const { search, searchType, searchStatus, sort, page } = state;
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_ALL_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_ALL_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
    } catch {
      logoutUser();
    }
  };

  const setEditJob = (jobId) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id: jobId } });
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch {
      logoutUser();
    }
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobType, status, jobLocation, editJobId } =
        state;
      console.log(editJobId);
      await authFetch.patch(`/jobs/${editJobId}`, {
        position,
        company,
        jobType,
        status,
        jobLocation,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: EDIT_JOB_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }

    clearAlert();
  };

  const showStats = async () => {
    dispatch({ type: GET_STATS_BEGIN });
    try {
      const { data } = await authFetch("jobs/stats");
      dispatch({
        type: GET_STATS_SUCCESS,
        payload: {
          defaultStats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch {
      logoutUser();
    }
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (pageNumber) => {
    dispatch({ type: CHANGE_PAGE, payload: { page: pageNumber } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        stateChangeHandler,
        clearValues,
        createJob,
        getJobs,
        deleteJob,
        setEditJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
