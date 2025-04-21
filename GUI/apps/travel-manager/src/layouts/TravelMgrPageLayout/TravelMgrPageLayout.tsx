import { ReactNode } from 'react';
import styles from './TravelMgrPageLayout.module.scss';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export const TravelMgrPageLayout = ({ 
  title, 
  subtitle, 
  action,
  children 
}: PageLayoutProps) => {
  return (
    <div className={styles.pageLayout}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {action && (
            <div className={styles.action}>
              {action}
            </div>
          )}
        </div>
        {children}
      </main>
    </div>
  );
};