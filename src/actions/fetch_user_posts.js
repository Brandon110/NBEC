import { FETCH_USER_POSTS, FETCH_USER_POSTS_ERROR } from '../constants/fetch_user_posts';
import axios from 'axios';

export const fetchUserPosts = () => {
    return (dispatch) => {
        return axios.get('/user/posts').then(function(response) {
                dispatch(fetchUserPostsData(response.data));
            })
            .catch(err => {
                dispatch(fetchUserPostsError(err));
            });
    }
}

export const fetchUserPostsData = (posts) => {
    return {
        type: FETCH_USER_POSTS,
        posts
    }
}

export const fetchUserPostsError = (err) => {
    return {
        type: FETCH_USER_POSTS_ERROR,
        err
    }
}
