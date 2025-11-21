React useReducer — 

What is useReducer?
The useReducer hook is a powerful alternative to useState, especially 
for components that manage complex or interrelated state. 

It works much like reducers in Redux but inside your component!

Basic Theory

useReducer replaces useState when updates need custom logic, 
many variables, or actions that depend on previous state.

You define a reducer function: function reducer(state, action) { ... }, 
"describing how state changes in response to dispatched actions.

Call dispatch(action) anywhere to trigger a state change.

1. Basic Counter Example
jsx
import React, { useReducer } from 'react';

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  //state will be object and count will be one value 
  // dispatch is a dispatch functionfrom here type need to be passed.
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
Explanation:

The reducer decides how state changes.

Call dispatch({ type: ... }) to update.

State transitions are predictable and centralized.
************************************************************
2. State as Arrays: Shopping List Example
jsx
import React, { useReducer, useRef } from 'react';

const initialList = [];

function listReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, { id: Date.now(), name: action.name }];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
}

function ShoppingList() {
  const [items, dispatch] = useReducer(listReducer, initialList);
  const inputRef = useRef();
  
  function handleAdd(e) {
    e.preventDefault();
    if (inputRef.current.value.trim()) {
      dispatch({ type: 'ADD_ITEM', name: inputRef.current.value });
      inputRef.current.value = '';
    }
  }
  return (
    <form onSubmit={handleAdd}>
      <input ref={inputRef} />
      <button type="submit">Add the Item</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}>Remove</button>
          </li>
        ))}
      </ul>
    </form>
  );
}
Explanation:

The reducer returns a new array for each action, so React detects updates.

Multiple actions can be handled: add/remove.


****************************************************************************



****************************************************************************


******************************************************************************
import React, { useReducer } from 'react';

// 1. Define the initial state for your form
const initialFormState = {
  username: '',
  email: '',
  password: '',
  hasConsented: false,
};

// 2. Create a reducer function to handle state changes
function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET_FORM':        
      return initialFormState;
    case 'TOGGLE_CONSENT':
      return {
        ...state,
        hasConsented: !state.hasConsented,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function UserRegistrationForm() {
  // 3. Initialize useReducer
  const [formData, dispatch] = useReducer(formReducer, initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({
      type: 'UPDATE_FIELD',
      field: name,
      value: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // You would typically send this data to a server here
    dispatch({ type: 'RESET_FORM' }); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="hasConsented">I agree to the terms and conditions:</label>
        <input
          type="checkbox"
          id="hasConsented"
          name="hasConsented"
          checked={formData.hasConsented}
          onChange={() => dispatch({ type: 'TOGGLE_CONSENT' })}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default UserRegistrationForm;