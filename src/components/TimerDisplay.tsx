import styles from './TimerDisplay.module.css';

interface TimerDisplayProps {
  minutes?: string;
  seconds?: string;
}

export default function TimerDisplay({ minutes = '25', seconds = '00' }: TimerDisplayProps) {
  return (
    <div className={styles.root}>
      <span className={styles.numeral}>
        {minutes}:{seconds}
      </span>
    </div>
  );
}
