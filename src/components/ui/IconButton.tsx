import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './IconButton.module.css';
import cn from '../../lib/cn';

interface IconButtonProps {
  size?: 'medium' | 'small';
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
  children: React.ReactNode;
}

const SHAPES = {
  medium: {
    active:  { width: 64, height: 64, borderRadius: 20 },
    pressed: { width: 62, height: 62, borderRadius: 20 },
  },
  small: {
    active:  { width: 56, height: 56, borderRadius: 16 },
    pressed: { width: 54, height: 54, borderRadius: 16 },
  },
};

const CONTENT_SCALE = {
  medium: { active: 1, pressed: 15 / 16 },
  small:  { active: 1, pressed: 13 / 14 },
};

const PRESS_TRANSITION   = { duration: 0.12, ease: [0.4, 0, 1, 1] } as const;
const RELEASE_TRANSITION = { type: 'spring', duration: 0.5, bounce: 0.15 } as const;

export default function IconButton({
  size = 'medium',
  onClick,
  disabled = false,
  children,
  'aria-label': ariaLabel,
}: IconButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const shape        = SHAPES[size][isPressed ? 'pressed' : 'active'];
  const contentScale = CONTENT_SCALE[size][isPressed ? 'pressed' : 'active'];
  const transition   = isPressed ? PRESS_TRANSITION : RELEASE_TRANSITION;

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
        size === 'small' && styles.small,
        isPressed && styles.isPressed,
        disabled && styles.isDisabled,
      )}
      animate={shape}
      transition={transition}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <motion.span
        className={styles.content}
        animate={{ scale: contentScale }}
        transition={transition}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
