const redux = require('redux')

const createStore = redux.createStore
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'
const buyCake = ()=>{
    return {
        type:BUY_CAKE,
        info:"first redux action"
    }
    
}
const buyIceCream = ()=>{
    return {
        type:BUY_ICECREAM
    }
}

// (previousState,action)=>newState

const initialState = {
    numOfCakes:10,
    numOfIceCreams:100
}

const reducer = (state = initialState,action)=>{
    switch(action.type){
        case BUY_CAKE:
            return{
                ...state,
                numOfCakes: state.numOfCakes-1
            };
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams:state.numOfIceCreams-1
        }
        default: return state
    }
}

const store = createStore(reducer)
console.log('Initial state',store.getState())
const unsubscribe = store.subscribe(()=>console.log('updated State',store.getState()))
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
unsubscribe()