import { useState } from 'react';
import Button, { type ButtonVariant } from './components/ui/Button';
import IconButton from './components/ui/IconButton';
import styles from './App.module.css';

const VARIANTS: ButtonVariant[] = ['start', 'pause', 'resume', 'reset'];
const LABELS: Record<ButtonVariant, string> = {
  start: 'START',
  pause: 'PAUSE',
  resume: 'RESUME',
  reset: 'RESET',
};

const THEMES = [
  { key: 'ink',     hex: '#341206' },
  { key: 'cobalt',  hex: '#0023AA' },
  { key: 'sienna',  hex: '#8C3513' },
  { key: 'emerald', hex: '#21C55B' },
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
    <div className={styles.root}>
      <div className={styles.iconSlot}>
        <IconButton aria-label="Settings">
          {/* icon type: atom has 8px inner padding → icon fills 32×32 */}
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
          <span className={styles.themeDot} style={{ backgroundColor: theme.hex }} />
        </IconButton>
      </div>
    </div>
  );
}
