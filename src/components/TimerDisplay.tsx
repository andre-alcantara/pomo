import { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { formatTime } from '../lib/formatTime';
import styles from './TimerDisplay.module.css';

// Spring for y and layout — no bounce, settles in ~420ms
const SPRING = { type: 'spring', bounce: 0, duration: 0.42 } as const;

// Enter: fade in quickly so the digit is visible as it slides in
const DIGIT_TRANSITION = {
  y:       SPRING,
  opacity: { duration: 0.1, ease: 'easeOut' },
} as const;

const minuteVariants = {
  enter: (dir: number) => ({ y: `${dir * 100}%`, opacity: 0 }),
  center:               { y: '0%',               opacity: 1 },
  // Exit: opacity collapses near-instantly so the digit disappears
  // before it reaches the clip edge of minutesWrapper
  exit: (dir: number) => ({
    y: `${dir * -100}%`,
    opacity: 0,
    transition: {
      y:       SPRING,
      opacity: { duration: 0.05, ease: [0.4, 0, 1, 1] as const },
    },
  }),
};

interface TimerDisplayProps {
  remainingMs: number;
  color?: string;
}

export default function TimerDisplay({ remainingMs, color }: TimerDisplayProps) {
  const prevMsRef    = useRef(remainingMs);
  const directionRef = useRef(0);

  if (remainingMs !== prevMsRef.current) {
    directionRef.current = remainingMs > prevMsRef.current ? 1 : -1;
    prevMsRef.current    = remainingMs;
  }

  const { minutes, seconds } = formatTime(remainingMs);
  const direction = directionRef.current;

  return (
    <div className={styles.root}>
      <div className={styles.numeral} style={color ? { color } : undefined}>
        <motion.span
          layout
          className={styles.minutesWrapper}
          transition={{ layout: SPRING }}
        >
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.span
              key={minutes}
              className={styles.minutesValue}
              custom={direction}
              variants={minuteVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={DIGIT_TRANSITION}
            >
              {minutes}
            </motion.span>
          </AnimatePresence>
        </motion.span>
        <motion.span
          layout="position"
          className={styles.colonSeconds}
          transition={{ layout: SPRING }}
        >
          :{seconds}
        </motion.span>
      </div>
    </div>
  );
}
