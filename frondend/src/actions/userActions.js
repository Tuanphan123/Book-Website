import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL, 
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

import axios from 'axios'

//Login 
export const login = (email, password) => async (dispatch) => {
    try{

        dispatch({type: LOGIN_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/v1/login', {email, password}, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user 
        })

    } catch(err){
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.message 
        })
    }
}

//Register user 
export const register = (userData) => async (dispatch) => {
    try{

        dispatch({type: REGISTER_USER_REQUEST})
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const {data} = await axios.post('/api/v1/register', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS ,
            payload: data.user 
        })

    } catch(error){
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message 
        })
    }
}

//update profile
export const updateProfile = (userData) => async (dispatch) => {
    try{

        dispatch({type: UPDATE_PROFILE_REQUEST})
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const {data} = await axios.put('/api/v1/me/update', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS ,
            payload: data.success
        })

    } catch(error){
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message 
        })
    }
}

//load user 
export const loadUser = () => async (dispatch) => {
    try{

        dispatch({type: LOAD_USER_REQUEST})
        
        const {data} = await axios.get('/api/v1/me')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user 
        })

    } catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message 
        })
    }
}

//logout user 
export const logout = () => async (dispatch) => {
    try{
        
        await axios.get('/api/v1/logout')

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch(error){
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message 
        })
    }
}

//update password
export const updatePassword = (passwords) => async (dispatch) => {
    try{

        dispatch({type: UPDATE_PASSWORD_REQUEST})
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put('/api/v1/password/update', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS ,
            payload: data.success
        })

    } catch(error){
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message 
        })
    }
}

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try{

        dispatch({type: FORGOT_PASSWORD_REQUEST})
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/v1/password/forgot', email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS ,
            payload: data.message
        })

    } catch(error){
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message 
        })
    }
}

//new password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try{

        dispatch({type: NEW_PASSWORD_REQUEST})
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS ,
            payload: data.success
        })

    } catch(error){
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message 
        })
    }
}

//clear errors 
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

