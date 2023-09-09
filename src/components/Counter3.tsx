import { ChangeEvent, useReducer } from "react";

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DICREMENT,
  NEW_INPUT,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

type State = {
  counter: number;
  text: string;
};

const initialState: State = {
  counter: 0,
  text: "",
};

// As you now reducer return new states
const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      // The reason why do we use spread operator bcoz , we wanna create new object in order to avoid side effects
      return { ...state, counter: state.counter + 1 };
    case REDUCER_ACTION_TYPE.DICREMENT:
      return { ...state, counter: state.counter - 1 };
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      // in order to avoid undefined error use nullish coalescing operator what it does is basically if payload comes undefined we give empty string instead of undefined via this operator.
      return { ...state, text: action.payload ?? "" };

    default:
      throw new Error();
  }
};

export default function Counter3() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //   Distructure of State
  const { counter, text } = state;

  //   Dispatchs
  const increment = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  };
  const dicrement = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.DICREMENT });
  };
  const enterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.NEW_INPUT,
      payload: e.target.value,
    });
  };

  return (
    <>
      <h1>Example of useReducer from Tutor Eye</h1>
      <h2> Counter currently on:{counter}</h2>
      <h2> When you click enter you will see "{text}" here</h2>

      <button onClick={dicrement}>-</button>
      <button onClick={increment}>+</button>
      <input type="text" value={text} onChange={enterHandler}></input>
    </>
  );
}

// EXTRA EXAMPLE
// Example of creating new array and object from existing once using spread operator

const originalArray = [1, 2, 3, 4, 5];

// Creating a new array with the spread operator
const newArray = [...originalArray];

console.log(newArray); // Output: [1, 2, 3, 4, 5]

const originalObject = { name: "John", age: 30 };

// Creating a new object with the spread operator
const newObject = { ...originalObject, city: "New York" };

console.log(newObject);
// Output: { name: "John", age: 30, city: "New York" }
