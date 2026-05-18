import type { TimerState, Action } from './types';

export const MIN_FOCUS_MS = 25 * 60 * 1000;
export const MAX_FOCUS_MS = 60 * 60 * 1000;
const FIVE_MIN_MS = 5 * 60 * 1000;

export const INITIAL_STATE: TimerState = {
  sessionType: 'focus',
  status: 'idle',
  focusDurationMs: MIN_FOCUS_MS,
  cyclePosition: 1,
  startedAt: null,
  elapsedBeforePause: 0,
};

export function reducer(state: TimerState, action: Action): TimerState {
  switch (action.type) {
    case 'ADD_FIVE': {
      if (state.sessionType !== 'focus') return state;
      if (state.status === 'completed') return state;
      return {
        ...state,
        focusDurationMs: Math.min(state.focusDurationMs + FIVE_MIN_MS, MAX_FOCUS_MS),
      };
    }
    case 'SUBTRACT_FIVE': {
      if (state.sessionType !== 'focus') return state;
      if (state.status !== 'idle') return state;
      if (state.focusDurationMs <= MIN_FOCUS_MS) return state;
      return {
        ...state,
        focusDurationMs: Math.max(state.focusDurationMs - FIVE_MIN_MS, MIN_FOCUS_MS),
      };
    }
    default:
      return state;
  }
}
