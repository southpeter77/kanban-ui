//Actions
const START_WITH_GIVEN_NAME = "START_WITH_GIVEN_NAME";
const START_WITH_GIVEN_NAME_LOAD = "START_WITH_GIVEN_NAME_LOAD"
const LOG_OUT = "LOG_OUT"

//Action Creators
const startWithGivenName = (data) => {
    return {
        type: START_WITH_GIVEN_NAME,
        data
    }
}
const startWithGivenNameLoad = (data) => {
    return {
        type: START_WITH_GIVEN_NAME_LOAD,
        data
    }
}

const logOutUser = () => {
    return {
        type: LOG_OUT,
    }
}

//Action Thunk
export const loadCurrentUser = () => async (dispatch) => {
    const userInformation = window.localStorage.getItem(START_WITH_GIVEN_NAME);
    if (userInformation) {
        dispatch(startWithGivenNameLoad(userInformation));
    }
};

export const logOut = () => (dispatch) => {
    dispatch(logOutUser());
    window.localStorage.removeItem(START_WITH_GIVEN_NAME);
}

export const start_with_given_name = (payload) => async (dispatch) => {
    const response = await fetch("/v1/users");
    const data = await response.json();
    let createUser = false;
    if (data.users.length > 0) {
        const name = data.users.filter(each => {
            let { firstName, lastName } = each
            if (firstName === payload.firstName && lastName === payload.lastName) {
                return each
            }
        })
        if (name.length === 0) {
            createUser = true;
        } else {
            //use current
            const reduxData = name[0]
            dispatch(startWithGivenName(reduxData));
            window.localStorage.setItem(START_WITH_GIVEN_NAME, JSON.stringify(reduxData))

        }
    } else {
        createUser = true;
    }

    if (createUser) {
        //create new
        const response = await fetch("/v1/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        const data = await response.json();
        const reduxData = data.user
        dispatch(startWithGivenName(reduxData));
        window.localStorage.setItem(START_WITH_GIVEN_NAME, JSON.stringify(reduxData))
        //{_id, firstName:'fe', lastName:"asdf"}
    }
}


//Reducer
export default function reducer(state = {}, action) {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case START_WITH_GIVEN_NAME:

            newState["current_user"] = action.data

            return newState;
        case START_WITH_GIVEN_NAME_LOAD:

            newState["current_user"] = JSON.parse(action.data)

            return newState;

        case LOG_OUT:
            newState["current_user"] = false
            return newState
        default:
            return state;
    }
}