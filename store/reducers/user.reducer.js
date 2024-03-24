import { userService } from "../../services/user.service.js"

//* User
export const SET_USER = 'SET_USER'

const initialState = {
    loggedInUser: userService.getLoggedInUser()
}
export function userReducer(state = initialState, action = {}) {

    switch (action.type) {
        //* User
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }

        default:
            return state;
    }
}
