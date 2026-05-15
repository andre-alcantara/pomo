import { useState } from 'react';
import Button, { type ButtonVariant } from './components/ui/Button';
import styles from './App.module.css';

const VARIANTS: ButtonVariant[] = ['start', 'pause', 'resume', 'reset'];
const LABELS: Record<ButtonVariant, string> = {
  start: 'START',
  pause: 'PAUSE',
  resume: 'RESUME',
  reset: 'RESET',
};

export default function App() {
  const [index, setIndex] = useState(0);
  const variant = VARIANTS[index];

  function cycle() {
    setIndex((i) => (i + 1) % VARIANTS.length);
  }

  return (
    <div className={styles.root}>
      <Button variant={variant} onClick={cycle}>
        {LABELS[variant]}
      </Button>
    </div>
  );
}
