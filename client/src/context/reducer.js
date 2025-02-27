import {
    DISPLAY_ALERT, CLEAR_ALERT,
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
    GET_CURRENT_USER_SUCCESS
} from "./actions"

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'please provide all values'
        }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: ''
        }
    }
    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar
        }
    }
    if (action.type === GET_CURRENT_USER_BEGIN) {
        return {
            ...state,
            userLoading: true,
        }
    }
    if (action.type === GET_CURRENT_USER_SUCCESS) {
        return {
            ...state,
            userLoading: false,
            user: action.payload.user,
            userLocation: action.payload.userLocation,
            jobLocation: action.payload.userLocation
        }
    }
    if (action.type === SETUP_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === SETUP_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === SETUP_USER_SUCCESS) {
        const { user, userLocation, alertText } = action.payload;
        return {
            ...state,
            isLoading: false,
            user,
            userLocation,
            jobLocation: userLocation,
            showAlert: true,
            alertType: 'success',
            alertText,

        }
    }

    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.alertText
        }

    }
    if (action.type === LOGOUT_USER_SUCCESS) {
        const { user, userLocation, } = action.payload;
        return {
            ...state,
            isLoading: false,
            userLoading: false,
            user,
            userLocation,
            jobLocation: userLocation,
        }
    }
    if (action.type === CHANGE_STATE_INFO) {
        const { name, value } = action.payload;
        return {
            ...state,
            page: 1,
            [name]: value
        }
    }
    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditingJob: false,
            jobLocation: state.userLocation,
            editJobId: '',
            position: '',
            company: '',
            jobType: 'full-time',
            status: 'pending',
        }
        return {
            ...state,
            ...initialState
        }
    }
    if (action.type === GET_ALL_JOBS_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false
        }
    }
    if (action.type === GET_ALL_JOBS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            jobs: action.payload.jobs,
            totalJobs: action.payload.totalJobs,
            numOfPages: action.payload.numOfPages
        }
    }
    if (action.type === CREATE_JOB_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === CREATE_JOB_SUCCESS) {
        const { job } = action.payload;
        return {
            ...state,
            ...job,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Job Created'
        }
    }
    if (action.type === CREATE_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if (action.type === SET_EDIT_JOB) {
        const job = state.jobs.find((job) => job._id === action.payload.id);
        const { _id, position, company, jobLocation, jobType, status } = job;
        console.log(_id)
        return {
            ...state,
            isEditingJob: true,
            editJobId: _id,
            position,
            company,
            jobLocation,
            jobType,
            status
        }
    }
    if (action.type === DELETE_JOB_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === EDIT_JOB_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === EDIT_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Job Updated'
        }
    }
    if (action.type === EDIT_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }

    }
    if (action.type === GET_STATS_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === GET_STATS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            defaultStats: action.payload.defaultStats,
            monthlyApplications: action.payload.monthlyApplications
        }
    }
    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            search: '',
            searchStatus: 'all',
            searchType: 'all',
            sort: 'latest'
        }
    }

    if (action.type === CHANGE_PAGE) {
        return {
            ...state,
            page: action.payload.page
        }
    }
    throw new Error(`no such action : ${action.type}`)

}

export default reducer;