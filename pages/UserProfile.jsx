const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { userService } from "../services/user.service.js"

import { updateUser } from "../store/actions/user.actions.js"


export function UserProfile() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        if (loggedInUser) loadUser()
    }, [])

    function loadUser() {
        userService.getUserById(loggedInUser._id)
            .then(user => {
                setUserDetails({
                    fullname: user.fullname || '',
                    color: user.pref.color || '#CFCD55',
                    bgColor: user.pref.bgColor || '#A3A4B7',
                    activities: user.activities || []
                })
            })
    }

    function handleInput({ target }) {
        const field = target.name
        const value = target.value

        setUserDetails(prevUserDetails => ({ ...prevUserDetails, [field]: value }))
    }

    function onEditUser(ev) {
        ev.preventDefault()
        updateUser(userDetails)
        //from userReducer
    }

    function getActivityTime(activity) {
        const timeDiff = new Date(Date.now - activity.at)
        const atByMins = timeDiff.getMinutes()

        if (atByMins < 60) return atByMins + 'minutes ago:'
        else if (atByMins > 60) 'Couple of hours ago'
        else if (atByMins > 60 * 24) return 'A day or more ago: '

    }

    if (!loggedInUser || !userDetails) return <div>No user</div>
    return (
        <div className="user-profile-container">
            <h1>Profile</h1>
            <form className="activities-form" onSubmit={onEditUser}>
                <label htmlFor="fullname">Name:</label>
                <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={userDetails.fullname}
                    onChange={handleInput}
                />
                <label htmlFor="color">Color:</label>
                <input
                    type="color"
                    name="color"
                    id="color"
                    value={userDetails.color}
                    onChange={handleInput}
                />
                <label htmlFor="bgColor">Bg Color:</label>
                <input
                    type="color"
                    name="bgColor"
                    id="bgColor"
                    value={userDetails.bgColor}
                    onChange={handleInput}
                />
                <button type="submit" className="btn">Save</button>
            </form>

            {userDetails.activities &&
                <ul className="activities-list clean-list">
                    {userDetails.activities.map(activity => (
                        <li key={activity.at}>
                            {getActivityTime(activity)}
                            {activity.txt}
                        </li>
                    ))}
                </ul>
            }

        </div>
    )
}

