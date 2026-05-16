import styles from './TimerDisplay.module.css';

interface TimerDisplayProps {
  minutes?: string;
  seconds?: string;
  color?: string;
}

export default function TimerDisplay({ minutes = '25', seconds = '00', color }: TimerDisplayProps) {
  return (
    <div className={styles.root}>
      <span className={styles.numeral} style={color ? { color } : undefined}>
        {minutes}:{seconds}
      </span>
    </div>
  );
}
