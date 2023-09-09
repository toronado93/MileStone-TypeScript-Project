import Heading from "./components/Heading";
import Section from "./components/Section";
import Counter from "./components/Counter";
import List from "./components/List";
import Counter2 from "./components/Counter2";
import Counter3 from "./components/Counter3";
import { Counter4 } from "./components/Counter4";
import { CounterProvider } from "./components/CounterContext";
import { initialState } from "./components/CounterContext";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReducerComponent from "./components/ReducerComponent";

function App() {
  // Lesson-1 States
  const [counter, setCounter] = useState<number>(1);
  const array: string[] = ["WakeUp", "Eat", "Sleep"];

  // Lesson-2 States

  interface User {
    id: number;
    username: string;
  }

  //useState is a generic function provided by React that allows you to manage state in functional components.
  // <User[] | null> is used as a type parameter for useState. It tells TypeScript what type of data users and setUsers can hold and operate on.

  // This explicit(next to usestate means i am gonnaa use this hook for this purpose)
  // usestate<number> count(variable you can see left side will be a number)
  // usestate<Usser[] | null users variable will be either user type of array or null>
  const [count, setCount] = useState<number>(0);
  const [users] = useState<User[] | null>(null);

  // useeffect mostly deal with side effects , we use it when we fetch data in stuff and etc.

  useEffect(() => {
    console.log("mounting is applied...");
    console.log("Users: ", users);

    // Useeffect also can have return value
    return console.log("unmounting");
  }, [users]);

  // USECALLBACK

  // The useCallback hook is a hook in React that is used to memoize functions. It's often used to optimize the performance of functional components, especially when you need to pass functions as props to child components.

  // If we need to use e , we can specifly type them
  const increase = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      // We get information about target
      console.log(e);
      setCount((prev) => {
        return prev + 1;
      });
    },
    []
  );

  // USEMEMO
  type Fibo = (n: number) => number;

  const fiboFunc: Fibo = (n) => {
    if (n < 2) return n;
    return fiboFunc(n - 1) + fiboFunc(n - 2);
  };

  const mynum: number = 39;

  const memo = useMemo<number>((): number => {
    return fiboFunc(mynum);
  }, [mynum]);

  return (
    <>
      <div style={{ border: "solid 2px white", borderRadius: "0.5em" }}>
        <h1>Lesson-1</h1>
        <Heading title={"Hello"}></Heading>
        <Section title="Test01">
          <p>Children</p>
        </Section>
        <Counter setCounter={setCounter} counter={counter}>
          This counter is send as children {counter}
        </Counter>
        <List
          items={array}
          render={(item: string) => {
            return <span className="bold">{item}</span>;
          }}
        ></List>
      </div>
      <div style={{ border: "solid 2px white", borderRadius: "0.5em" }}>
        <Counter2
          title={"Lesson2"}
          count={count}
          onClick={increase}
          memonumber={memo}
        ></Counter2>
      </div>

      <div style={{ border: "solid 2px white", borderRadius: "0.5em" }}>
        <ReducerComponent></ReducerComponent>
      </div>

      <div style={{ border: "solid 2px white", borderRadius: "0.5em" }}>
        <Counter3></Counter3>
      </div>

      <div style={{ border: "solid 2px white", borderRadius: "0.5em" }}>
        <CounterProvider
          counter={initialState.counter}
          text={initialState.text}
        >
          <Counter4>
            {(num: number) => {
              return (
                <>
                  This is a children which is passed as a function and counter
                  is {num}
                </>
              );
            }}
          </Counter4>
        </CounterProvider>
      </div>
    </>
  );
}

export default App;
