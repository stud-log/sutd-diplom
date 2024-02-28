import { FC, useEffect, useState } from 'react';

interface CurrentTimeProps {
  className?: string;
}

export const CurrentTime: FC<CurrentTimeProps> = ({ className }) => {
  const [ currentTime, setCurrentTime ] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
  
    updateTime();
  
    // Update the time every minute
    const intervalId = setInterval(updateTime, 1000 * 60);
  
    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className={className}>
      {currentTime}
    </div>
  );
};