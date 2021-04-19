const GET_ALL_TASKS = "GET_ALL_TASKS"

const getAllTasks = (data) => {
    return {
        type:GET_ALL_TASKS,
        data
    }
}


export const createNewTaskThunk = (payload) => async(dispatch) => {
    let response = await fetch("/v1/tasks", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(payload)
    })

    dispatch(getAllTasksThunk())

}

export const getAllTasksThunk = () => async(dispatch) => {
    const response = await fetch("/v1/tasks");
    const data = await response.json()
    dispatch(getAllTasks(data.tasks))
}

export default function reducer(state={}, action) {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case GET_ALL_TASKS:
            console.log(action.data);
            //['TO DO', 'IN PROGRESS', 'COMPLETE', 'IN REVIEW']
            let map = {TO_DO:[],IN_PROGRESS:[],COMPLETE:[], IN_REVIEW:[]};
            action.data.forEach(each=>{
                if (each.type === "TO DO"){
                    map["TO_DO"].push(each)
                }else if(each.type == "IN PROGRESS"){
                    map["IN_PROGRESS"].push(each)
                }else if (each.type == "COMPLETE"){
                    map["COMPLETE"].push(each)
                }else {
                    map['IN_REVIEW'].push(each);
                }
            })
            newState["allTasks"] = map
            return newState;
        default:
            return state;
    }
}