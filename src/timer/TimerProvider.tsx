import { createContext, useReducer, type Dispatch, type ReactNode } from 'react';
import { reducer, INITIAL_STATE } from './reducer';
import type { TimerState, Action } from './types';

export const TimerStateContext = createContext<TimerState>(INITIAL_STATE);
export const TimerDispatchContext = createContext<Dispatch<Action>>(() => {});

export default function TimerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <TimerStateContext.Provider value={state}>
      <TimerDispatchContext.Provider value={dispatch}>
        {children}
      </TimerDispatchContext.Provider>
    </TimerStateContext.Provider>
  );
}
