import { useCallback, useEffect, useReducer, useRef } from 'react';
import {
  AUTOPLAY,
  DIRECTION,
  INFINITE_LOOP,
  NEXT,
  PREVIOUS,
} from './carouselOptions';
import { carouselReducer, createInitialState } from './carouselReducer';
import { GO_TO, SET_OPTION, TOGGLE_OPTION } from './carouselReducerActions';

export function useCarousel(props) {
  const sliderContaineRef = useRef(null);
  const [state, dispatch] = useReducer(
    carouselReducer,
    props,
    createInitialState
  );

  const { activeIndex, lastIndex, options, childrenList } = state;

  const goToNext = useCallback(
    () => dispatch({ type: GO_TO, payload: { NEXT } }),
    []
  );
  const goToPrevious = useCallback(
    () => dispatch({ type: GO_TO, payload: { PREVIOUS } }),
    []
  );
  const goToIndex = useCallback(
    (index, animated = true) =>
      dispatch({ type: GO_TO, payload: { index, animated } }),
    []
  );

  // Options toggles
  const setAutoplay = useCallback(
    (boolean) => dispatch({ type: SET_OPTION, payload: { AUTOPLAY: boolean } }),
    []
  );
  const toggleAutoplay = useCallback(
    () => dispatch({ type: TOGGLE_OPTION, payload: AUTOPLAY }),
    []
  );
  const toggleInfiniteLoop = useCallback(
    () => dispatch({ type: TOGGLE_OPTION, payload: INFINITE_LOOP }),
    []
  );

  // Infinite loop effect
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
  }, [activeIndex, lastIndex, goToIndex]);

  // Switches autoplay direction if not infinite loop;
  useEffect(() => {
    if (!options.infiniteLoop) {
      if (activeIndex === lastIndex) {
        dispatch({ type: SET_OPTION, payload: { [DIRECTION]: 'left' } });
      } else if (activeIndex === 0) {
        dispatch({ type: SET_OPTION, payload: { [DIRECTION]: 'right' } });
      }
    }
  }, [options.infiniteLoop, activeIndex, lastIndex]);

  // Autoplay
  useEffect(() => {
    let interval;
    if (options.autoplay) {
      console.log('autoplay');
      if (options.direction === 'right') {
        interval = setInterval(() => goToNext(), options.autoplayInterval);
      } else if (options.direction === 'left') {
        interval = setInterval(() => goToPrevious(), options.autoplayInterval);
      }
    }

    return () => {
      return clearInterval(interval);
    };
  }, [
    options.direction,
    options.autoplay,
    options.autoplayInterval,
    goToNext,
    goToPrevious,
  ]);

  return {
    options,
    activeIndex,
    childrenList,
    sliderContaineRef,
    toggleAutoplay,
    toggleInfiniteLoop,
    setAutoplay,
    goToNext,
    goToPrevious,
    goToIndex,
  };
}
