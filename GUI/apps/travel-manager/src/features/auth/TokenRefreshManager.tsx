import { useEffect, useState } from 'react';
import { AuthService } from '@corporate-travel-frontend/api/services/authServices';
import { getToken, isTokenExpiringSoon } from '@corporate-travel-frontend/api/utils/tokenStorage';

// Time in seconds to check token status
const CHECK_INTERVAL = 60;
// Events to track for user activity
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'scroll', 'touchstart'];

export const TokenRefreshManager: React.FC = () => {
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // Track user activity
  const handleUserActivity = () => {
    setLastActivity(Date.now());
  };

  useEffect(() => {
    // Register activity event listeners
    ACTIVITY_EVENTS.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    // Periodic check for token status
    const intervalId = setInterval(async () => {
      const token = getToken();
      
      // If user is active and token is about to expire, refresh it
      const isUserActive = Date.now() - lastActivity < 30 * 60 * 1000; // 30 minutes
      
      if (token && isUserActive && isTokenExpiringSoon()) {
        try {
          await AuthService.refreshToken();
        } catch (error) {
          console.error('Failed to refresh token:', error);
        }
      }
    }, CHECK_INTERVAL * 1000);

    // Cleanup
    return () => {
      ACTIVITY_EVENTS.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearInterval(intervalId);
    };
  }, [lastActivity]);

  // This component doesn't render anything
  return null;
};