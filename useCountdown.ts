import { useState, useEffect } from 'react';

interface CountdownReturn {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  progress: number;  // 0 to 100 representing percentage completion
}

export const useCountdown = (endTimeStr: string): CountdownReturn => {
  const calculateTimeLeft = (): CountdownReturn => {
    const endTime = new Date(endTimeStr).getTime();
    const now = new Date().getTime();
    const timeLeft = endTime - now;
    
    const startTime = endTime - (7 * 24 * 60 * 60 * 1000); // Assuming 7 days auction duration
    const totalDuration = endTime - startTime;
    const elapsed = now - startTime;
    const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

    if (timeLeft <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, progress: 100 };
    }
    
    // Calculate time components
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds, isExpired: false, progress };
  };
  
  const [timeLeft, setTimeLeft] = useState<CountdownReturn>(calculateTimeLeft());
  
  useEffect(() => {
    if (timeLeft.isExpired) return;
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft.isExpired]);
  
  return timeLeft;
};