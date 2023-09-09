import {
  ChangeEvent,
  ReactElement,
  createContext,
  useReducer,
  useCallback,
  useContext,
} from "react";

// EPISODE-1 CREATING TYPES AND ENUMS IN ORDER TO CREATE OUR REDUCER AND CUSTOM HOOKS

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

// eslint-disable-next-line react-refresh/only-export-components
export const initialState: State = {
  counter: 0,
  text: "",
};

// EPISODE-2 CREATE REDUCER

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

// EPISODE-3  CREATE CUSTOM HOOK THIS CUSTOM HOOK WILL HAVE OUR STATES AND HANDLER LOGIC
// We create custom hooks to handle all logic state logic and handler staff
// we use to put them in component function but now we are trying to simplify component function

const useCounterContext = (initialState: State) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // EPISODE-3.5 IF YOU HAVE DISPACTH AND HANDLER FUNCTIONS WILL NOT CHANGE , YOU CAN WRAP THEM INSIDE OF USECALLBACK IN ORDER TO HAVE PERFORMANCE INCREASE
  const increment = useCallback(() => {
    return dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  }, []);

  const dicrement = useCallback(() => {
    dispatch({ type: REDUCER_ACTION_TYPE.DICREMENT });
  }, []);
  const enterHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.NEW_INPUT,
      payload: e.target.value,
    });
  }, []);

  //   Our hooks needs to return some value in order to pass actual component

  return { state, increment, dicrement, enterHandler };
};

// EPISODE-4 CREATE A RETURN TYPE  FROM CUSTOM HOOK USING RETURN UTILITY TYPE
type UseCounterContextType = ReturnType<typeof useCounterContext>;

// EPISODE-5
// WE NEED TO SEND OUR STATE AND HANDLER FUNCTION TO CONSUMER COMPONENTS , THEREFORE WE SEND ALL STATES INCLUDE FUNCTION IN OBJECT FORMAT WHICH WE STRICTLY TYPED FROM CUSTOM HOOK (USECOUNTERCONTEXTTYPE)- HERE WE ARE INITIALING OUR STATES , THEY WILL BE SEND INTO PROVIDER COMPONENT IN ORDER TO BE USED IN CHILD COMPONENTS
const initContextState: UseCounterContextType = {
  state: initialState,
  increment: () => {},
  dicrement: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enterHandler: (e: ChangeEvent<HTMLInputElement>) => {},
};

//EPISODE-6 CREATING COUNTERCONTEXT and SEND INTO INITIALIZED ELEMENTS(STATE,INCREMENT ETC....)
// CHILDREN COMPONENTS WILL REACH ALL STATE INFORMATION VIA THIS COUNTERCONTEXT
export const CounterContext =
  createContext<UseCounterContextType>(initContextState);

// EPISODE 6,5 WE ALSO NEED TO CREATE A TYPE FOR CHILDREN WHICH WILL BE USED IN CONTEXTPROVIDER
// THIS CHILDREN REPRESENT THE CHILDREN BETWEEN COMPONENT TAGS , AND WE  HAVE TO NEED THIS

// if we need to send more than one children we need to also add reactelement[] | undefined
type ChildrenType = {
  children?: ReactElement | undefined;
};

//EPISODE-7 CREATING TO PROVIDE COMPONENT // THE ASPECTS YOU GOING TO BE CAREFULL ARE we need to argument here children and initial states we compined their types using & , and also provider component take only one value property , we send our hook function there , this function creates all value we need (state,increment,dicrement,enterhandler)
export const CounterProvider = ({
  children,
  ...initialState
}: ChildrenType & State): ReactElement => {
  return (
    <CounterContext.Provider value={useCounterContext(initialState)}>
      {children}
    </CounterContext.Provider>
  );
};

// EPISODE-8a CUSTOM HOOKS FOR CONSUMER COMPONENTS (this one doesnt include text , we wanted to seperate them)

type UseCounterHookType = {
  counter: number;
  increment: () => void;
  dicrement: () => void;
};

export const useCounter = (): UseCounterHookType => {
  // we only need counter here so we only extract it
  const {
    state: { counter },
    increment,
    dicrement,
  } = useContext(CounterContext);

  return { counter, increment, dicrement };
};

// EPISODE-8b CUSTOM HOOKS FOR CONSUMER COMPONENTS (this one doesnt include counter only text , we wanted to seperate them)

type UseCounterHookTypeText = {
  text: string;
  enterHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useCounterText = (): UseCounterHookTypeText => {
  const {
    state: { text },
    enterHandler,
  } = useContext(CounterContext);

  return { text, enterHandler };
};
