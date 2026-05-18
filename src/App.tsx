import { useState } from 'react';
import Button, { type ButtonVariant } from './components/ui/Button';
import IconButton from './components/ui/IconButton';
import TimerDisplay from './components/TimerDisplay';
import Logo from './components/Logo';
import HeaderCopy from './components/HeaderCopy';
import styles from './App.module.css';

const VARIANTS: ButtonVariant[] = ['start', 'pause', 'resume', 'reset'];
const LABELS: Record<ButtonVariant, string> = {
  start: 'START',
  pause: 'PAUSE',
  resume: 'RESUME',
  reset: 'RESET',
};

const THEMES = [
  { key: 'ink',     color: 'var(--color-ink)' },
  { key: 'cobalt',  color: 'var(--color-cobalt)' },
  { key: 'sienna',  color: 'var(--color-sienna)' },
  { key: 'emerald', color: 'var(--color-emerald)' },
] as const;

export default function App() {
  const [index, setIndex] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);

  const variant = VARIANTS[index];
  const theme = THEMES[themeIndex];

  function cycle() {
    setIndex((i) => (i + 1) % VARIANTS.length);
  }

  function cycleTheme() {
    setThemeIndex((i) => (i + 1) % THEMES.length);
  }

  return (
    <>
      <div className={styles.header}>
        <Logo />
        <HeaderCopy copy="START YOUR CYCLE" />
      </div>

      {/* Timer row — vertically centered in viewport */}
      <div className={styles.timerRow}>
        <div className={styles.iconSlot}>
          <IconButton aria-label="Subtract 5 minutes">-5</IconButton>
        </div>

        <TimerDisplay color={theme.color} />

        <div className={styles.iconSlot}>
          <IconButton aria-label="Add 5 minutes">+5</IconButton>
        </div>
      </div>

      {/* Control bar — pinned to bottom */}
      <div className={styles.controlBar}>
        <div className={styles.iconSlot}>
          <IconButton aria-label="Settings">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
              <path
                d="M16 10v6l4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        </div>

        <Button variant={variant} onClick={cycle}>
          {LABELS[variant]}
        </Button>

        <div className={styles.iconSlot}>
          <IconButton aria-label="Theme" onClick={cycleTheme}>
            <span className={styles.themeDot} style={{ backgroundColor: theme.color }} />
          </IconButton>
        </div>
      </div>
    </>
  );
}
