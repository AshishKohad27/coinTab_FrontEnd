import { ADD_DATA_ERROR, ADD_DATA_LOADING, ADD_DATA_SUCCESS, DELETE_DATA_ERROR, DELETE_DATA_LOADING, DELETE_DATA_SUCCESS, GET_DATA_ERROR, GET_DATA_LOADING, GET_DATA_SUCCESS } from "./data.type"

const initialState = {
    loading: false,
    error: false,
    message: "",
    errorMessage: "",
    data: [],
    length: {},
    filter: {},
    list: {},
}


export const dataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_DATA_LOADING: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case GET_DATA_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                data: payload.data,
                length: payload.length,
                filter: payload.filter,
                list: payload.list,
                message: payload.message,

            }
        }
        case GET_DATA_ERROR: {
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: payload.message
            }
        }

        case ADD_DATA_LOADING: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case ADD_DATA_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                data: payload.data,
                message: payload.message,
            }
        }
        case ADD_DATA_ERROR: {
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: payload.message
            }
        }

        case DELETE_DATA_LOADING: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case DELETE_DATA_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                data: payload.data,
                message: payload.message,
            }
        }
        case DELETE_DATA_ERROR: {
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: payload.message
            }
        }
        default: return state
    }
}