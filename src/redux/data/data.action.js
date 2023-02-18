import axios from "axios";
import {
    ADD_DATA_ERROR,
    ADD_DATA_LOADING,
    ADD_DATA_SUCCESS,
    DELETE_DATA_ERROR,
    DELETE_DATA_LOADING,
    DELETE_DATA_SUCCESS,
    GET_DATA_ERROR,
    GET_DATA_LOADING,
    GET_DATA_SUCCESS,
} from "./data.type";

export const getData = () => async (dispatch) => {
    try {
        dispatch({ type: GET_DATA_LOADING });
        let res = await axios.get(`http://localhost:7879/data`);
        dispatch({ type: GET_DATA_SUCCESS, payload: res.data });
    } catch (e) {
        console.log("ERROR GET:", e);
        dispatch({ type: GET_DATA_ERROR, payload: e.response.data });
    }
};

export const getDataFilter =
    ({ gender, page, limit, ageL, ageR, country, name, sortName }) =>
        async (dispatch) => {
            // console.log('name:', name)
            console.log(
                "gender, page, limit, ageL, ageR, country, name:",
                gender,
                page,
                limit,
                ageL,
                ageR,
                country,
                name
            );
            // console.log("page getdata reducer:", page)
            try {
                dispatch({ type: GET_DATA_LOADING });
                let res = await axios.get(
                    `http://localhost:7879/data/filter?gender=${gender || ""}&page=${page || 1
                    }&limit=${limit || 10}&name=${name || ""}&ageL=${ageL || 100}&ageR=${ageR || 0
                    }&country=${country || ""}&&sortName=${sortName || ""}`
                );
                dispatch({ type: GET_DATA_SUCCESS, payload: res.data });
            } catch (e) {
                console.log("ERROR GET:", e);
                dispatch({ type: GET_DATA_ERROR, payload: e.response.data });
            }
        };

export const addData = () => async (dispatch) => {
    try {
        dispatch({ type: ADD_DATA_LOADING });
        let res = await axios.post(`http://localhost:7879/data`);
        dispatch({ type: ADD_DATA_SUCCESS, payload: res.data });
    } catch (e) {
        console.log("ERROR GET:", e);
        dispatch({ type: ADD_DATA_ERROR, payload: e.response.data });
    }
};

export const deleteData = () => async (dispatch) => {
    try {
        dispatch({ type: DELETE_DATA_LOADING });
        let res = await axios.delete(`http://localhost:7879/data`);
        dispatch({ type: DELETE_DATA_SUCCESS, payload: res.data });
    } catch (e) {
        console.log("ERROR GET:", e);
        dispatch({ type: DELETE_DATA_ERROR, payload: e.response.data });
    }
};
