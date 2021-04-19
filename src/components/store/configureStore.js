import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({

})

const configureStore = (initialState) => {
    return createStore(
        reducer,
        initialState,
        composeEnhancer(applyMiddleware(thunk))
    )
}

export default configureStore;