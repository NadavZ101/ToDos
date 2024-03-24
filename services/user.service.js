import { storageService } from "./async-storage.service.js"

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedInUser'

export const userService = {
    getEmptyCredentails,
    login,
    signup,
    logout,
    getLoggedInUser,
    getUserById,
    getDefaultPrefs,
    updateUserPrefs,
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
        pref: getDefaultPrefs(),
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

function getUserById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function getEmptyCredentails() {
    return {
        username: '',
        password: '',
        fullname: '',
    }
}

function getDefaultPrefs() {
    return { color: '#eeeeee', bgColor: "#191919" }
}

function updateUserPrefs(userToUpdate) {
    const loggedInUserId = getLoggedInUser()._id
    return getUserById(loggedInUserId)
        .then(user => {
            user.fullname = userToUpdate.fullname
            user.pref.color = userToUpdate.color
            user.pref.bgColor = userToUpdate.bgColor
            return storageService.put(STORAGE_KEY, user)
                .then((savedUser) => {
                    _setLoggedInUser(savedUser)
                    return savedUser
                })
        })
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
    pref: getDefaultPrefs(),
    activities: [{ txt: 'Added a Todo', at: 1523873242735 }]
}