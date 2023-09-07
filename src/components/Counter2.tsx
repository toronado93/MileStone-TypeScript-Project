import { ReactNode } from "react";
import { useRef } from "react";

interface Counter2Props {
  title: string;
  count: ReactNode;
  onClick: (arg: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  memonumber: number;
}

const Counter2 = ({ title, count, onClick, memonumber }: Counter2Props) => {
  // USEREF
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(inputRef?.current?.value);

  return (
    <>
      <h1>{title}</h1>
      <p>{count}</p>
      <button onClick={(e) => onClick(e)}>+</button>
      <p>Magic Number is {memonumber}</p>
      <label> Example Input for useRef</label>
      <input ref={inputRef} type="text"></input>
    </>
  );
};

export default Counter2;
