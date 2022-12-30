const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

// Actions
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function ordercake() {
    return {   
    type: CAKE_ORDERED,
    payload: 1
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIcecream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockeIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20,
// }

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20,
}

// Reducers
// (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED: 
            return {
                ...state,
                numOfCakes: state.numOfCakes -1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default: 
            return state
    }
}


const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams -1,
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload,
            }
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})

const store = createStore(rootReducer)
console.log('Initial state', store.getState())

// Store listener
const unsubscribe = store.subscribe(() => 
console.log ('Update state', store.getState()))

// store.dispatch(ordercake())
// store.dispatch(ordercake())
// store.dispatch(ordercake())
// store.dispatch(restockCake(3))

const actions = bindActionCreators({ ordercake, restockCake, orderIcecream, restockeIcecream}, store.dispatch)
actions.ordercake()
actions.ordercake()
actions.ordercake()
actions.restockCake(3)
actions.orderIcecream()
actions.orderIcecream()
actions.restockeIcecream(2)

unsubscribe()