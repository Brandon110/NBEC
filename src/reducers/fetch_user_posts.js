import { FETCH_USER_POSTS, FETCH_USER_POSTS_ERROR } from '../constants/fetch_user_posts';

export const fetchUserPosts = (state = { loading: true }, action) => {
    switch (action.type) {
        case FETCH_USER_POSTS:
            return action.posts;

        case FETCH_USER_POSTS_ERROR:
            return state;

        default:
            return state;
    }
}
