import { FETCH_USER, FETCH_USER_ERROR } from '../constants/fetch_user';
import axios from 'axios';

export const fetchUser = () => {
    return(dispatch) => {
        return axios.get('/user').then(response => {
            dispatch(fetchUserData(response.data));
        })
        .catch(err => {
            dispatch(fetchUserError(err));
        })
    }
}

export const fetchUserData = (user) => {
    return {
        type: FETCH_USER,
        user
    }
}

export const fetchUserError = (err) => {
    return {
        type: FETCH_USER_ERROR, 
        err
    }
}