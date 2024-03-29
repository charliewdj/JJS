import axios from 'axios';
import { toast } from 'react-toastify'
import {
    DELETE_JOB_FAIL,
    DELETE_JOB_REQUEST,
    DELETE_JOB_SUCCESS,
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
    JOB_LOAD_SINGLE_FAIL,
    JOB_LOAD_SINGLE_REQUEST,
    JOB_LOAD_SINGLE_SUCCESS,
    JOB_LOAD_SUCCESS,
    REGISTER_JOB_FAIL,
    REGISTER_JOB_REQUEST,
    REGISTER_JOB_SUCCESS
} from "../constants/jobconstant"


export const jobLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`)
        dispatch({
            type: JOB_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// single job action
export const jobLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/job/${id}`);
        dispatch({
            type: JOB_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}


//delete single job action
export const deleteSingleJobAction = (job_id) => async (dispatch) => {
    dispatch({ type: DELETE_JOB_REQUEST });
    try {
        const { data } = await axios.delete(`/api/job/delete/${job_id}`);
        dispatch({
            type: DELETE_JOB_SUCCESS,
            payload: data
        });
        toast.success("Job deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// register job action
export const registerAjobAction = (job, file_pdf, file_image) => async (dispatch) => {
    dispatch({ type: REGISTER_JOB_REQUEST })

    try {
        // const formData = new FormData();
        // formData.append('job', JSON.stringify(job)); // Convert job object to string
        // formData.append('file', file);

        // const { data } = await axios.post("/api/job/create", formData, {
        //     headers: { "Content-Type": "multipart/form-data" },
        // });
        const { data } = await axios.post("/api/job/create", job)
        dispatch({
            type: REGISTER_JOB_SUCCESS,
            payload: data
        })
        toast.success("Job created successfully");

    } catch (error) {
        dispatch({
            type: REGISTER_JOB_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }

    try {
        const { data } = await axios.post("/api/uploadfile", file_pdf, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        dispatch({
            type: REGISTER_JOB_SUCCESS,
            payload: data
        })
        toast.success("PDF file uploaded successfully");

    } catch (error) {
        dispatch({
            type: REGISTER_JOB_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }

    try {
        const { data } = await axios.post("/api/uploadfile", file_image, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        dispatch({
            type: REGISTER_JOB_SUCCESS,
            payload: data
        })
        toast.success("Image file uploaded successfully");

    } catch (error) {
        dispatch({
            type: REGISTER_JOB_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }


}


// export const uploadFileAction = (job) => async (dispatch) => {
//     dispatch({ type: REGISTER_JOB_REQUEST })

//     try {
//         const { data } = await axios.post("/api/uploadfile", job, {
//             headers: { "Content-Type": "multipart/form-data" },
//         })
//         dispatch({
//             type: REGISTER_JOB_SUCCESS,
//             payload: data
//         })
//         toast.success("file uploaded successfully");

//     } catch (error) {
//         dispatch({
//             type: REGISTER_JOB_FAIL,
//             payload: error.response.data.error
//         })
//         toast.error(error.response.data.error);
//     }
// }