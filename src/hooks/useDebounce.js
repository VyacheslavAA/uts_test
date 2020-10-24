import { useEffect, useState, useRef } from 'react';

export const useDebounce = (callback, initialTimerValue) => {
  const intervalId = useRef(null);
  const [timerValue, setTimerValue] = useState(initialTimerValue);
  const [isReadyToUse, setIsReadyToUse] = useState(true);

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    }
  }, []);

  useEffect(() => {
    if (timerValue === 0) {
      setTimerValue(initialTimerValue);
      setIsReadyToUse(true);
      clearInterval(intervalId.current);
    }
  }, [timerValue, initialTimerValue]);

  const debouncedCallback = () => {
    if (isReadyToUse) {
      callback();
      setIsReadyToUse(false);
      
      intervalId.current = setInterval(() => {
        setTimerValue((currentVal) => currentVal - 1);
      }, 1e3);
    }
  };

  return {
    callback: debouncedCallback,
    timerValue,
    isReadyToUse
  };
};
