import { ReactElement, ReactNode } from "react";
import { useCounter } from "./CounterContext";
import { useCounterText } from "./CounterContext";

// type for our component function

// Tutor here send a children with function
type ChildrenType = {
  children: (num: number) => ReactNode | ReactElement;
};

export const Counter4 = ({ children }: ChildrenType) => {
  // We distructure custom components here

  const { counter, increment, dicrement } = useCounter();
  const { text, enterHandler } = useCounterText();

  return (
    <>
      <h1>CONTEXT API</h1>
      <h2> Counter currently on:{counter}</h2>
      <h2> When you type something , you will see "{text}" here</h2>
      <button onClick={dicrement}>-</button>
      <button onClick={increment}>+</button>
      <input type="text" value={text} onChange={enterHandler}></input>
      <h2>Children Comes last</h2>
      {/* If children passed as a function you need to invoke it... */}
      {children(counter)}
    </>
  );
};
