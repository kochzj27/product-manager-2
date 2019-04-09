import {
  // combineReducers,
  createStore,
} from 'redux';


//ACTIONS
export const addState = (value) => ({
  type: 'ADD_STATE',
  value                        // <-- action.type
});

export const updateSelectedItem = (value) => ({
  type: 'UPDATE_SELECTED_ITEM',
  value
});


///REDUCERS
export const reducers = (state = initialState1, action) => {
  switch (action.type) {

    case 'ADD_STATE':
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- ADD_STATE | state: ", state)
      console.log(" -- REDUCER -- ADD_STATE | action", action)
      return Object.assign(
        {},
        state,
        {
          products: action.value,
          selectedProduct: null,
        }
      );

    // case 'UPDATE_SELECTED_ITEM':
    //   console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
    //   console.log(" -- REDUCER -- UPDATE_SELECTED_ITEM | state: ", state)
    //   console.log(" -- REDUCER -- UPDATE_SELECTED_ITEM | action: ", action)
    //   console.log(" -- REDUCER -- UPDATE_SELECTED_ITEM | action.type: ", action.type)
    //   console.log(" -- REDUCER -- UPDATE_SELECTED_ITEM | action.value: ", action.value)
    //   return Object.assign(
    //     {},
    //     state,
    //     { selectedProduct: action.value }
    //   );

    // case 'DELETE_TASK':
    //   console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
    //   console.log(" -- REDUCER -- DELETE_TASK | state: ", state)
    //   console.log(" -- REDUCER -- DELETE_TASK | action", action)
    //   console.log(" -- REDUCER -- DELETE_TASK | action.value: ", action.value)
    //   let idx = state.tasks.findIndex((element) => { return element.id === action.value });
    //   if (state.tasks.length === 1) {

    //     return { ...state, tasks: [] }

    //   } else {

    //     return { ...state, tasks: [...state.tasks.slice(0, idx), ...state.tasks.slice(idx + 1)] }

    //   }

    // case 'UPDATE_STATUS':
    //   console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
    //   console.log(" -- REDUCER -- UPDATE_STATUS | state: ", state)
    //   console.log(" -- REDUCER -- UPDATE_STATUS | action", action)
    //   let idx2 = state.tasks.findIndex((element) => { return element.id === action.value });
    //   // console.log(idx);
    //   let newStatus = !state.tasks[idx2].active;
    //   if (idx2 === 0) {
    //     return { ...state, tasks: [Object.assign({}, state.tasks[idx2], { active: newStatus }), ...state.tasks.slice(idx2 + 1)] }
    //   } else {
    //     return {
    //       ...state, tasks: [...state.tasks.slice(0, idx2),
    //       Object.assign({}, state.tasks[idx2], { active: newStatus })
    //         , ...state.tasks.slice(idx2 + 1)]
    //     }
    //   }

    // case 'EDIT_TASK':
    //   console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
    //   console.log(" -- REDUCER -- UPDATE_TASK | state: ", state)
    //   console.log(" -- REDUCER -- UPDATE_TASK | action", action)
    //   let idx3 = state.tasks.findIndex((element) => { return element.id === action.id });
    //   // console.log(idx);
    //   if (idx3 === 0) {
    //     return {
    //       ...state,
    //       tasks: [Object.assign({}, state.tasks[idx3], { text: action.value }), ...state.tasks.slice(idx3 + 1)],
    //     }
    //   } else {
    //     return {
    //       ...state,
    //       tasks: [...state.tasks.slice(0, idx3),
    //       Object.assign({}, state.tasks[idx3], { text: action.value })
    //         , ...state.tasks.slice(idx3 + 1)],
    //     };
    //   }

    default:
      return state;
  }
}


// Initial State
// Minimal representation of the data in the app
let id = 3;
const initialState1 = {
  products: [
    { id: 1, title: 'Product 1', url: 'image1', price: 500, quantity: 4 },
    { id: 2, title: 'Product 2', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Strawberry_ice_cream_cone_%285076899310%29.jpg/220px-Strawberry_ice_cream_cone_%285076899310%29.jpg', price: 50, quantity: 40 }

  ],
  selectedProduct: null,
};


// COMBINE ALL REDUCERS INTO 1 OBJECT
// export const reducers = combineReducers({
//     tasks
// });


// STORE -- store.js
export function configureStore(initialState = initialState1) { // initialState = initialState | {}
  const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  console.log(store);
  return store;
};


export const store = configureStore();
