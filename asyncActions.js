const redux = require('redux')
const applyMiddleWare = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const createStore = redux.createStore
const axios = require('axios')
const inititalState = {
    loading:false,
    users:[],
    error:""
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'


const fetchUsersRequest =()=>{
    return{
    type:FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users)=>{
    return {
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUsersFailure =()=>{
    return {
        type:FETCH_USERS_FAILURE
    }
}

const reducer = (state=inititalState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST: return{
            ...state,
            loading:true
        }
        case FETCH_USERS_SUCCESS: return{
            ...state,
            loading:false,
            users:action.payload,
            error:""
        }
        case FETCH_USERS_FAILURE:return {
            ...state,
            loading:false,
            users:[],
            error:action.payload
        }
    }
}

const fetchUsers =()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest)
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((res)=>{
            dispatch(fetchUsersSuccess(res.data))
        })
        .catch((err)=>{
            dispatch(fetchUsersFailure(err.message))
        })
    }
}

const store = createStore(reducer,applyMiddleWare(thunkMiddleware))
store.subscribe(()=>console.log('initial state',store.getState()))
store.dispatch(fetchUsers()) 