import { SHOW_ALERT, HIDE_ALERT } from '../constants/toggle_alert';

export const toggleAlert = (state = { display: true }, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return { display: true };

        case HIDE_ALERT:
            return { display: false };

        default:
            return state;

    }
}