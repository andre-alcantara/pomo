import { useContext } from 'react';
import { TimerStateContext } from './TimerProvider';

export function useTimerState() {
  return useContext(TimerStateContext);
}
