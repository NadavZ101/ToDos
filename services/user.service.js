import { storageService } from "./async-storage.service.js"

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedInUser'

export const userService = {
    getEmptyCredentails,
    login,
    signup,
    logout,
    getLoggedInUser,
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) {
                console.log('login -> user', user)
                return _setLoggedInUser(user)
            }
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user =
    {
        username,
        password,
        fullname,
        balance: 0,
        activities: [{ txt: '', at: '' }]
    }

    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedInUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedInUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
    console.log("Retrieved user from sessionStorage:", user)
    return user
}

function getEmptyCredentails() {
    return {
        username: '',
        password: '',
        fullname: '',
    }
}

function _setLoggedInUser(user) {
    const userToStore = { ...user }
    delete userToStore.password
    console.log('userService ->_setLoggedInUser ', userToStore)
    //saving the loggedIn user in local storage (without sensetive details)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToStore))
    return userToStore
}

const userModel =
{
    username: 'muki',
    password: 'muki1',
    fullname: 'Muki Ja',
    balance: 10000,
    activities: [{ txt: 'Added a Todo', at: 1523873242735 }]
}