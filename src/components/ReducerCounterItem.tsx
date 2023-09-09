import { TYPEOFACTION } from "./ReducerComponent";
import { Action } from "./ReducerComponent";

type ReducerCounterItemProps = {
  state: string;
  title: string;
  value: number | string;
  dispatch: ({ type, payload }: Action) => void;
};

export default function ReducerCounterItem({
  state,
  title,
  value,
  dispatch,
}: ReducerCounterItemProps) {
  return (
    <>
      <h2>Counter:{title}</h2>
      <input type="text" value={value}></input>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            console.log("-", state);
            dispatch({
              type: TYPEOFACTION.DICREMENT,
              payload: state,
            });
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            console.log("+", state);
            dispatch({
              type: TYPEOFACTION.INCREMENT,
              payload: state,
            });
          }}
        >
          +
        </button>
      </div>
    </>
  );
}
