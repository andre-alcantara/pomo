import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Button.module.css';
import cn from '../../lib/cn';

export type ButtonVariant = 'start' | 'pause' | 'resume' | 'reset';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: 'medium' | 'small';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const SHAPES = {
  medium: {
    active:  { width: 448, height: 64, borderRadius: 20 },
    pressed: { width: 444, height: 60, borderRadius: 20 },
  },
  small: {
    active:  { width: 448, height: 56, borderRadius: 16 },
    pressed: { width: 444, height: 52, borderRadius: 16 },
  },
};

const LABEL_SCALE = {
  medium: { active: 1, pressed: 15 / 16 },
  small:  { active: 1, pressed: 13 / 14 },
};

// Snappy press-in, spring bounce-back on release.
// duration: settle time in seconds — raise to slow down, lower to speed up.
// bounce: 0 = no overshoot, 0.3 = visible spring, max 1.
const PRESS_TRANSITION   = { duration: 0.12, ease: [0.4, 0, 1, 1] } as const;
const RELEASE_TRANSITION = { type: 'spring', duration: 0.5, bounce: 0.15 } as const;

// Slide transition for variant label changes — old exits up, new enters from below.
// bounce: slightly higher than the button (0.15) since text feels lighter.
const SLIDE_TRANSITION = {
  y:       { type: 'spring', duration: 0.45, bounce: 0.25 },
  opacity: { duration: 0.18, ease: 'easeOut' },
} as const;

export default function Button({
  variant = 'start',
  size = 'medium',
  onClick,
  disabled = false,
  children,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const shape      = SHAPES[size][isPressed ? 'pressed' : 'active'];
  const labelScale = LABEL_SCALE[size][isPressed ? 'pressed' : 'active'];
  const transition = isPressed ? PRESS_TRANSITION : RELEASE_TRANSITION;

  function handlePointerDown() {
    if (!disabled) setIsPressed(true);
  }

  function handlePointerUp() {
    setIsPressed(false);
  }

  return (
    <motion.button
      className={cn(
        styles.button,
        styles[variant],
        size === 'small' && styles.small,
        isPressed && styles.isPressed,
        disabled && styles.isDisabled,
      )}
      animate={shape}
      transition={transition}
      onClick={onClick}
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <AnimatePresence>
        <motion.span
          key={String(children)}
          className={styles.label}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1, scale: labelScale }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ ...SLIDE_TRANSITION, scale: transition }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
