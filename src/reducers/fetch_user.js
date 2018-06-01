import { FETCH_USER, FETCH_USER_ERROR } from '../constants/fetch_user';

export const fetchUser = (state = { loading: true }, action) => {
    switch (action.type) {
        case FETCH_USER:
            return action.user;

        case FETCH_USER_ERROR:
            return null;

        default:
            return state;
    }
}