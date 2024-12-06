const redux = require('redux')
const axios = require('axios')
const thunkMiddleware = require('redux-thunk').default
const applyMiddleWare = redux.applyMiddleware
const initialState = {
    users:[],
    loading:false,
    error:''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = ()=>{
    return{
        type:FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users)=>{
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUserSFailure = (error)=>{
    return{
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:return{
            ...state,
            loading:true
        }
        case  FETCH_USERS_SUCCESS:return {
            ...state,
            users:action.payload,
            loading:false,
            error:""
        }
        case FETCH_USERS_FAILURE:return{
            ...state,
            error:action.payload,
            loading:false,
            users:[]
        }
    }
}

const fetchUsers = ()=>{
    return function(dispatch){
    dispatch(fetchUsersRequest())
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((res)=>dispatch(fetchUsersSuccess(res.data))).catch((err)=>dispatch(fetchUserSFailure(err.message)))
    }
}



const store = redux.createStore(reducer,applyMiddleWare(thunkMiddleware))
store.subscribe(()=>console.log("Updated State",store.getState()))
store.dispatch(fetchUsers())
