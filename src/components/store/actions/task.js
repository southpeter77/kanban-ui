const GET_ALL_TASKS = "GET_ALL_TASKS"
const UPDATE_ORDER = "UPDATE_ORDER";
const REMOVE_FROM_SOURCE_LIST= "REMOVE_FROM_SOURCE_LIST"
const ADD_FROM_DESTINATION_LIST = "ADD_FROM_DESTINATION_LIST"
const DELETE_TASK = "DELETE_TASK"

const getAllTasks = (data) => {
    return {
        type:GET_ALL_TASKS,
        data
    }
}

const updateOrder = (data) => {
    return {
        type:UPDATE_ORDER,
        data
    }
}

const removeFromSourceList = (data) => {
    return {
        type: REMOVE_FROM_SOURCE_LIST,
        data
    }
}

const addFromDestinationList = (data) => {
    return {
        type: ADD_FROM_DESTINATION_LIST,
        data
    }
}

const deleteTask = (data) => {
    return {
        type:DELETE_TASK,
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

export const updateTaskStatusThunk = (task) => async(dispatch) =>{
    const response = await fetch("/v1/tasks",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(task)
    })
    const data =await response.json();

}

export const updateOrderThunk = (updatedData) => async(dispatch) =>{
    dispatch(updateOrder(updatedData))
}

export const getAllTasksThunk = () => async(dispatch) => {
    const response = await fetch("/v1/tasks");
    const data = await response.json()
    dispatch(getAllTasks(data.tasks))
}

export const removeFromSourceListThunk = (payload) => (dispatch) => {
    dispatch(removeFromSourceList(payload))
}

export const addFromDestinationListThunk = (payload) => dispatch => {
    dispatch(addFromDestinationList(payload));
}

export const deletetaskThunk = (payload)=> async(dispatch) => {

    await fetch("/v1/tasks", {
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
    })
    dispatch(getAllTasksThunk())
}

export default function reducer(state={}, action) {
    Object.freeze(state);
    let newState = Object.assign({}, state,);
    switch (action.type) {
        case GET_ALL_TASKS:
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

        case UPDATE_ORDER:
            newState["allTasks"]=action.data
            return newState

        case REMOVE_FROM_SOURCE_LIST:
            newState["allTasks"][action.data.source].splice(action.data.sourceIndex, 1)
            return newState

        case ADD_FROM_DESTINATION_LIST:
            let newData = action.data.removed;
            newData.type = action.data.destination
            newState["allTasks"][action.data.destination].splice(action.data.destinationIndex, 0, newData)
            return newState


        default:
            return state;
    }
}