import cn from '../lib/cn';
import styles from './HeaderCopy.module.css';

interface HeaderCopyProps {
  copy: string;
  theme?: 'brand' | 'light';
  size?: 'medium' | 'small';
}

export default function HeaderCopy({ copy, theme = 'brand', size = 'medium' }: HeaderCopyProps) {
  const isLight = theme === 'light';
  const isSmall = size === 'small';

  return (
    <div className={cn(styles.container, isSmall && styles.small)}>
      <p className={cn(styles.copy, isLight && styles.light, isSmall && styles.small)}>
        {copy}
      </p>
      <div className={styles.indicator}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={cn(styles.lineAccent, isLight && styles.light)} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
    </div>
  );
}
