import { useCallback, useState } from 'react';

export function useActiveIndex(initialIndex, maxLength, minLength) {
  const [activeIndex, setActiveIndex] = useState(() => initialIndex);

  const setNext = useCallback((callback) => {
    setActiveIndex(current => {
      const next = current + 1 > maxLength ? current : current + 1;
      callback && callback(next)
      return next;
    });
  }, [maxLength]);

  const setPrevious = useCallback((callback) => {
    setActiveIndex(current => {
      const previous = minLength > current - 1 ? minLength : current - 1
      callback && callback(previous);
      return previous
    });
  }, [minLength]);

  return { activeIndex, setNext, setPrevious, setActiveIndex };
}
