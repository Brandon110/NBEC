import { SHOW_ALERT, HIDE_ALERT } from '../constants/toggle_alert';

export const showAlert = () => {
    return {
        type: SHOW_ALERT
    }
}

export const hideAlert = () => {
    return {
        type: HIDE_ALERT
    }
}
