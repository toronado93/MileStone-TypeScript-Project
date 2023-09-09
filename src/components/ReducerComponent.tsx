import { useReducer } from "react";

import ReducerCounterItem from "./ReducerCounterItem";

export type State = {
  counter1: number;
  counter2: number;
};

export type Action = {
  type: string;
  payload: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const TYPEOFACTION = {
  INCREMENT: "increment",
  DICREMENT: "dicrement",
};
// eslint-disable-next-line react-refresh/only-export-components
export const TYPEOFSTATE = {
  counter1: "counter1",
  counter2: "counter2",
};

const initialState: State = {
  counter1: 0,
  counter2: 1,
};

const reducer = (state: State, action: Action): State => {
  console.log("First Layer is triggered");
  switch (action.type) {
    case TYPEOFACTION.INCREMENT:
      console.log("Second Layer is triggered");
      if (action.payload == TYPEOFSTATE.counter1) {
        console.log("Third Layer is triggered");
        return {
          ...state,
          counter1: state.counter1 + 1,
        };
      } else if (action.payload == TYPEOFSTATE.counter2) {
        return { ...state, counter2: state.counter2 + 1 };
      }
      return state;

    case TYPEOFACTION.DICREMENT:
      if (action.payload === TYPEOFSTATE.counter1) {
        return {
          ...state,
          counter1: state.counter1 - 1,
        };
      } else if (action.payload === TYPEOFSTATE.counter2) {
        return { ...state, counter2: state.counter2 - 1 };
      }
      return state;

    default:
      return state;
  }
};

export default function ReducerComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Lesson 3</h2>
      <ReducerCounterItem
        state={TYPEOFSTATE.counter1}
        title={TYPEOFSTATE.counter1}
        value={state.counter1}
        dispatch={dispatch}
      ></ReducerCounterItem>
      <ReducerCounterItem
        state={TYPEOFSTATE.counter2}
        title={TYPEOFSTATE.counter2}
        value={state.counter2}
        dispatch={dispatch}
      ></ReducerCounterItem>
    </div>
  );
}
