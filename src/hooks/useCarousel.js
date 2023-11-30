import { useState, useEffect, useRef } from "react";

const setInitial = (index, maxLength) => {
  if (index > maxLength) return maxLength
  else if (index < 0) return 0;
  else return index;
}

export function useCarousel(props) {
  // too much states, a reducer might be more appropriate here
  const [activeIndex, setActiveIndex] = useState(() => setInitial(props.initialIndex, props.children.length - 1));
  const [options, setOptions] = useState({
    infiniteLoop: props.infiniteLoop,
    autoplay: props.autoplay,
    autoPlayInterval: props.autoPlayInterval,
    transitionDuration: props.transitionDuration
  });
  const [childrenList, setChildrenList] = useState(props.children);
  const [direction, setDirection] = useState(activeIndex < childrenList.length - 1 ? 'right' : 'left');
  const sliderContaineRef = useRef(null);
  const lastIndex = childrenList.length - 1;

  const goToNext = () => {
    setOptions(prev => ({ ...prev, transitionDuration: props.transitionDuration }));
    setActiveIndex(prev => {
      // prevents animation side effects using the buttons by waiting for the animation to finish before updating index
      const nextIndex = prev + 1 > lastIndex + 1 ? prev : prev + 1;
      props.onPageChange(nextIndex);
      return nextIndex
    });
  }

  const goToPrevious = () => {
    setOptions(prevOptions => ({ ...prevOptions, transitionDuration: props.transitionDuration }))
    setActiveIndex(prev => {
      // prevents animation side effects using the buttons by waiting for the animation to finish before updating index
      const prevIndex = -1 > prev - 1 ? -1 : prev - 1;
      props.onPageChange(prevIndex);
      return prevIndex;
    })
  }

  const goToIndex = (index, animated = true) => {
    setOptions(prevOptions => ({ ...prevOptions, transitionDuration: animated ? props.transitionDuration : 0 }))
    setActiveIndex(index);
    props.onPageChange(index);
  }

  // Options toggles
  const setAutoPlay = (boolean) => setOptions(prev => ({...prev, autoplay: boolean}));
  const toggleAutoPlay = () => setOptions(prev => ({ ...prev, autoplay: !prev.autoplay }));
  const toggleInfiniteLoop = () => setOptions(prev => ({ ...prev, infiniteLoop: !prev.infiniteLoop }));

  // Infinite loop effect
  useEffect(() => {
    const ref = sliderContaineRef.current
    const handleTransition = () => {
      if (activeIndex <= -1) goToIndex(lastIndex, false);
      if (activeIndex >= lastIndex + 1) goToIndex(0, false);
    }

    ref.addEventListener("transitionend", handleTransition);
    return () => {
      ref.removeEventListener("transitionend", handleTransition);
    }
  }, [activeIndex, lastIndex]);


  // Switches autoplay direction if not infinite loop;
  useEffect(() => {
    if (!options.infiniteLoop) {
      if (activeIndex === lastIndex) {
        setDirection('left');
      } else if (activeIndex === 0) {
        setDirection('right');
      }
    }
  }, [options.infiniteLoop, activeIndex, lastIndex]);

  // Autoplay
  useEffect(() => {
    let interval;
    if (options.autoplay) {
      if (direction === 'right') {
        interval = setInterval(() => goToNext(), options.autoPlayInterval);
      } else if (direction === 'left') {
        interval = setInterval(() => goToPrevious(), options.autoPlayInterval);
      }
    }

    return () => {
      return clearInterval(interval);
    }
  }, [direction, options.autoplay, options.autoPlayInterval]);

  return {
    options,
    activeIndex,
    childrenList,
    sliderContaineRef,
    toggleAutoPlay,
    toggleInfiniteLoop,
    setAutoPlay,
    goToNext,
    goToPrevious,
    goToIndex
  }
}