import { useCallback, useState } from 'react';

export function useOptions(props) {
  const [options, setOptions] = useState(props);

  const toggleOption = useCallback((key) => {
    setOptions(prev => ({...prev, [key]: !prev[key]}));
  }, []);

  const setOption = useCallback((option) => {
    setOptions(prev => ({...prev, ...option}));
  }, []);

  return {options, setOption, toggleOption};
}
