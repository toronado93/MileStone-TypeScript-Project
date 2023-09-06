import Heading from "./components/Heading";
import Section from "./components/Section";
import Counter from "./components/Counter";
import List from "./components/List";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState<number>(1);

  const array: string[] = ["WakeUp", "Eat", "Sleep"];

  return (
    <>
      <Heading title={"Hello"}></Heading>
      <Section title="Test01">
        <p>Children</p>
      </Section>
      <Counter setCounter={setCounter} counter={counter}>
        {" "}
        This counter is send as children {counter}
      </Counter>
      <List
        items={array}
        render={(item: string) => {
          return <span className="bold">{item}</span>;
        }}
      ></List>
    </>
  );
}

export default App;
