import { combineReducers } from 'redux';
import { fetchUser } from './fetch_user';
import { fetchUserPosts } from './fetch_user_posts';
import { toggleAlert } from './toggle_alert';

export default combineReducers({
    user: fetchUser,
    posts: fetchUserPosts,
    toggleAlert: toggleAlert 
});