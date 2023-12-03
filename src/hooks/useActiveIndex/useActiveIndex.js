import { useCallback, useState } from 'react';

export function useActiveIndex(initialIndex, maxLength, minLength) {
  const [activeIndex, setActiveIndex] = useState(() => initialIndex);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1 > maxLength ? prev : prev + 1));
  }, [maxLength]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (minLength > prev - 1 ? minLength : prev - 1));
  }, [minLength]);

  return { activeIndex, goToNext, goToPrevious, setActiveIndex };
}
