const redux = require('redux')
const redux_logger = require('redux-logger')
const combineRecuer =  redux.combineReducers
const BUY_CAKES = 'BUY_CAKES'
const BUY_ICECREAMS = 'BUY_ICECREAMS'
const logger = redux_logger.createLogger()
const applyMiddleware = redux.applyMiddleware
const initialCakeState ={
    numOfCakes:10
}
const initialIceCreamState ={
    numOfIceCreams:20
}

const buyCakes = ()=>{
    return {
        type:BUY_CAKES,
    }
}

const buyIceCreams =()=>{
    return {
        type:BUY_ICECREAMS
    }
}

const cakeReducer = (state=initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKES:return{
            ...state,
            numOfCakes:state.numOfCakes-1
        }
        default: return state
    }
}

const iceCreamReducer = (state=initialIceCreamState,action)=>{
    switch(action.type){
        case BUY_ICECREAMS:return{
            ...state,
            numOfIceCreams:state.numOfIceCreams-1
        }
        default:return state
    }
}

const combinedReducer = combineRecuer({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})

const store = redux.createStore(combinedReducer,applyMiddleware(logger))
// console.log("initial state",store.getState())
store.dispatch(buyCakes())
store.dispatch(buyCakes(),buyIceCreams())
store.dispatch(buyIceCreams())

