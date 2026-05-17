import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './Logo.module.css';

export type LogoVariant = 'brand' | 'light' | 'symbol';

interface LogoProps {
  variant?: LogoVariant;
  onClick?: () => void;
}

// Path data inlined from src/assets — wordmark shared between brand and light variants
const WORDMARK_PATH =
  'M31.4398 0C38.5269 0 43.1524 4.5334 43.1525 11.4993C43.1525 18.4353 38.5269 23 31.4398 23C24.3827 23 19.7285 18.4353 19.7285 11.4993C19.7287 4.53344 24.3829 6.25037e-05 31.4398 0ZM84.2888 0C91.3759 0 96 4.5334 96 11.4993C96 18.4353 91.3759 23 84.2888 23C77.2317 23 72.5775 18.4353 72.5775 11.4993C72.5777 4.5334 77.2317 2.8674e-06 84.2888 0ZM10.7809 0.689727C16.1863 0.689727 19.3697 3.57246 19.37 8.40633C19.37 13.2704 16.2768 16.1529 11.0819 16.1532H7.80846V22.3089H0V0.689727H10.7809ZM57.8766 13.5411H57.9356L62.0198 0.689727H71.99V22.3089H65.083V9.27748H65.0241L60.7294 22.3089H55.0236L50.7291 9.27748H50.6687V22.3089H43.7617V0.689727H53.8514L57.8766 13.5411ZM7.83871 10.7491H9.3091C10.7505 10.7491 11.5615 9.90762 11.5615 8.40633C11.5613 6.93537 10.7804 6.09524 9.3091 6.09524H7.80846L7.83871 10.7491Z';

const CIRCLE_PATH =
  'M11.9992 0C19.2607 0 23.9998 4.7305 24 11.9993C24 19.2368 19.2607 24 11.9992 24C4.76863 24 0 19.2368 0 11.9993C0.000151097 4.73055 4.76878 6.52212e-05 11.9992 0Z';

const VIEWBOXES: Record<LogoVariant, string> = {
  brand:  '0 0 96 23',
  light:  '0 0 96 23',
  symbol: '0 0 24 24',
};

const PATHS: Record<LogoVariant, string> = {
  brand:  WORDMARK_PATH,
  light:  WORDMARK_PATH,
  symbol: CIRCLE_PATH,
};

const FILLS: Record<LogoVariant, { active: string; pressed: string }> = {
  brand:  { active: '#e25822', pressed: '#e46634' },
  light:  { active: '#f2eee4', pressed: '#f2eee4' },
  symbol: { active: '#e25822', pressed: '#e46634' },
};

// 2px narrower on press → ~0.979 scale for the 96px wordmark
const SCALE_PRESSED = 94 / 96;

const PRESS_TRANSITION   = { duration: 0.12, ease: [0.4, 0, 1, 1] } as const;
const RELEASE_TRANSITION = { type: 'spring', duration: 0.5, bounce: 0.15 } as const;

export default function Logo({ variant = 'brand', onClick }: LogoProps) {
  const [isPressed, setIsPressed] = useState(false);

  const fills     = FILLS[variant];
  const transition = isPressed ? PRESS_TRANSITION : RELEASE_TRANSITION;

  function handlePointerDown() { setIsPressed(true); }
  function handlePointerUp()   { setIsPressed(false); }

  return (
    <motion.svg
      className={styles[variant]}
      viewBox={VIEWBOXES[variant]}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="POMO"
      animate={{ scale: isPressed ? SCALE_PRESSED : 1 }}
      transition={transition}
      style={{ transformOrigin: 'center center' }}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <motion.path
        d={PATHS[variant]}
        animate={{ fill: isPressed ? fills.pressed : fills.active }}
        transition={transition}
      />
    </motion.svg>
  );
}
