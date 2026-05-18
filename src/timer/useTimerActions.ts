import { useCallback, useContext } from 'react';
import { TimerDispatchContext } from './TimerProvider';

export function useTimerActions() {
  const dispatch = useContext(TimerDispatchContext);
  return {
    addFive:      useCallback(() => dispatch({ type: 'ADD_FIVE' }),      [dispatch]),
    subtractFive: useCallback(() => dispatch({ type: 'SUBTRACT_FIVE' }), [dispatch]),
  };
}
