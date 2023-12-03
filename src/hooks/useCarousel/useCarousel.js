import { useCallback, useEffect, useRef } from 'react';
import { setInitialBounds } from '../../utils';
import { useActiveIndex } from '../useActiveIndex/useActiveIndex';
import { useOptions } from '../useOptions/useOptions';

export function useCarousel(props) {
  const { onPageChange, transitionDuration: defaultTransitionDuration } = props;
  const lastIndex = props.children.length - 1;
  const sliderContaineRef = useRef(null);
  const { options, setOption, toggleOption } = useOptions(() => ({
    autoplay: props.autoplay,
    autoplayInterval: props.autoplayInterval,
    infiniteLoop: props.infiniteLoop,
    transitionDuration: props.transitionDuration,
    direction: lastIndex > props.initialIndex ? 'right' : 'left',
  }));
  const {
    activeIndex,
    goToNext,
    goToPrevious,
    setActiveIndex,
  } = useActiveIndex(setInitialBounds(props.initialIndex), props.children.length, -1);

  const {autoplay, autoplayInterval, infiniteLoop, direction, transitionDuration} = options

  const goToIndex = useCallback((index, animated = true) => {
    setOption({ transitionDuration: animated ? defaultTransitionDuration : 0 });
    setActiveIndex(index);
  }, [defaultTransitionDuration]);

  // Options toggles/setters
  const setTransitionDuration = useCallback((transitionDuration) => setOption({transitionDuration}), [])
  const setAutoplay = useCallback((boolean) => setOption({ autoplay: boolean }), []);
  const toggleAutoplay = useCallback(() => toggleOption('autoplay'), []);
  const toggleInfiniteLoop = useCallback(() => toggleOption('infiniteLoop'), []);

  // infinite loop effect
  useEffect(() => {
    const ref = sliderContaineRef.current;
    const handleTransition = () => {
      if (activeIndex <= -1) goToIndex(lastIndex, false);
      if (activeIndex >= lastIndex + 1) goToIndex(0, false);
    };

    ref.addEventListener('transitionend', handleTransition);
    return () => {
      ref.removeEventListener('transitionend', handleTransition);
    };
  }, [activeIndex, lastIndex]);

  // switches autoplay direction and onPageChange trigger;
  useEffect(() => {
    onPageChange(activeIndex);
    if (!infiniteLoop) {
      if (activeIndex === lastIndex) {
        setOption({ direction: 'left' });
      } else if (activeIndex === 0) {
        setOption({ direction: 'right' });
      }
    }
  }, [infiniteLoop, activeIndex, lastIndex, onPageChange]);

  // autoplay
  useEffect(() => {
    let interval;
    if (autoplay) {
      if (direction === 'right') {
        interval = setInterval(() => goToNext(), autoplayInterval);
      } else if (direction === 'left') {
        interval = setInterval(() => goToPrevious(), autoplayInterval);
      }
    }

    return () => {
      return clearInterval(interval);
    };
  }, [direction, autoplay, autoplayInterval]);

  return {
    options,
    activeIndex,
    childrenList: props.children,
    sliderContaineRef,
    toggleAutoplay,
    toggleInfiniteLoop,
    setAutoplay,
    setTransitionDuration,
    goToNext,
    goToPrevious,
    goToIndex,
  };
}
