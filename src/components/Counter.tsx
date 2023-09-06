import { ReactNode } from "react";

type CounterProps = {
  counter: number;
  children: ReactNode;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  //   CounterHandler: (symbol: string) => void;
};

const Counter = ({ counter, setCounter, children }: CounterProps) => {
  return (
    <>
      <div>
        <p>
          This Counter is send as a props and currently on{" "}
          <span>{counter}</span>
        </p>
        <button
          onClick={() => {
            setCounter((crr) => crr - 1);
          }}
        >
          Decrement
        </button>
        <button
          onClick={() => {
            setCounter((crr) => crr + 1);
          }}
        >
          Increment
        </button>
      </div>
      {children}
    </>
  );
};
export default Counter;
