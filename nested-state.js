const redux = require('redux')
const produce = require('immer').produce

// State
const initialState = {
    name: 'Vishwas',
    address: {
        street: '123 Main st',
        city: 'Boston',
        state: 'MA',
    },
}
// Actions
const STREET_UPDATED = 'STREET_UPDATED'
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street,
    }
}
// define reducer to handle actions 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload,
            //     },
            // }
        // using immer:produce
        return produce(state, (draft) => {
            draft.address.street = action.payload
        })
        default: {
            return state
        }
    }
}
// Create Store
const store = redux.createStore(reducer)
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState())
})
store.dispatch(updateStreet('456 Main St'))
unsubscribe()