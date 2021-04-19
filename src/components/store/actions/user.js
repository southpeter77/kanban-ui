//Actions
const START_WITH_GIVEN_NAME = "START_WITH_GIVEN_NAME";

//Action Creators
const startWithGivenName = (data) => {
    return {
        type:START_WITH_GIVEN_NAME,
        data
    }
}

//Action Thunk
export const loadCurrentUser = () => async (dispatch) => {
    const userInformation = window.localStorage.getItem(START_WITH_GIVEN_NAME);
    if (userInformation) {
        dispatch(startWithGivenName(userInformation));
    }
};

export const start_with_given_name = (payload) => async(dispatch) => {
    const response = await fetch("/v1/users");
    const data = await response.json();
    let createUser = false;
    if (data.users.length> 0) {
        const name = data.users.filter(each=>{
            let {firstName, lastName} = each
            if (firstName === payload.firstName && lastName === payload.lastName){
                return each
            }
        })
        if (name.length === 0) {
            createUser = true;
        }else {
            //use current
            const reduxData = name[0]._id
            dispatch(startWithGivenName(reduxData));
            window.localStorage.setItem(START_WITH_GIVEN_NAME, reduxData)

        }
    }else {
        createUser = true;
    }

    if (createUser) {
        //create new
        const response = await fetch("/v1/users",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(payload)
        })
        const data = await response.json();
        const reduxData = data.user._id
        dispatch(startWithGivenName(reduxData));
        window.localStorage.setItem(START_WITH_GIVEN_NAME, reduxData)
        //{_id, firstName:'fe', lastName:"asdf"}
    }
}


//Reducer
export default function reducer(state={}, action) {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
        case START_WITH_GIVEN_NAME:
            newState["current_user"] = action.data
            return newState;
        default:
            return state;
    }
}