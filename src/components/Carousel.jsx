import { Children } from 'react';
import { useCarousel } from '../hooks/useCarousel';
import { mod } from '../utils';
import { Checkbox } from './Checkbox';

// Resources
// https://stackoverflow.com/questions/72690608/carousel-slideshow-with-infinite-loop
// https://www.w3schools.com/howto/howto_js_slideshow.asp
export default function Carousel(props) {
  const {
    childrenList,
    options,
    activeIndex,
    sliderContaineRef,
    toggleAutoplay,
    toggleInfiniteLoop,
    setAutoplay,
    setTransitionDuration,
    setAutoplayInterval,
    goToIndex,
    goToNext,
    goToPrevious,
  } = useCarousel(props);
  const prevBtnVisible = (options.infiniteLoop || activeIndex !== 0);
  const nextBtnVisible = (options.infiniteLoop || activeIndex !== childrenList.length - 1);
  const { autoplay, infiniteLoop, transitionDuration, autoplayInterval, internalTransitionDuration } = options;

  return (
    <div className="relative">
      <div>
        <div><b>Transition Duration&nbsp;</b></div>
        <input 
         type="number"
         min={0} 
         value={transitionDuration} 
         onChange={e => setTransitionDuration(e.target.value)}
         onFocus={() => setAutoplay(false)}
        />
      </div>
      <div className="mb-4">
        <div><b>Autoplay Interval&nbsp;</b></div>
        <input type="number" min={0} value={autoplayInterval} onChange={e => setAutoplayInterval(e.target.value)} />
      </div>
      <div className="option-controlls-toggles-container">
        <div><b>Autoplay&nbsp;</b></div>
        <Checkbox onChange={toggleAutoplay} checked={autoplay} />
      </div>
      <div className="option-controlls-toggles-container">
        <div><b>Infinite Loop&nbsp;</b></div>
        <Checkbox onChange={toggleInfiniteLoop} checked={infiniteLoop} />
      </div>
      <div className="carousel" >
        <div
          ref={sliderContaineRef}
          className="carousel-slider"
          style={{
            transitionDuration: `${internalTransitionDuration}ms`,
            transform: `translateX(${(-activeIndex - 1) * 100}%)`
          }}
        >
          <div className="carousel-slide">{childrenList[childrenList.length - 1]}</div>
          {Children.map(childrenList, (child, index) => <div className={`carousel-slide ${activeIndex === index ? 'is-active' : ''}`}>{child}</div>)}
          <div className="carousel-slide" >{childrenList[0]}</div>
        </div>
        {prevBtnVisible && <button type="button" onClick={goToPrevious} className={'prev'}>❮</button>}
        {nextBtnVisible && <button type="button" onClick={goToNext} className={'next'}>❯</button>}
        <div className="carousel-navigation">
          {Children.map(childrenList, (_, index) => (
            <button
              className={`carousel-bullet ${mod(activeIndex, childrenList.length) === index ? 'is-active' : ''}`}
              onClick={(event) => goToIndex(index, event)}
              type="button"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

Carousel.defaultProps = {
  initialIndex: 0,
  transitionDuration: 100,
  autoplay: false,
  autoplayInterval: 500,
  infiniteLoop: true,
  onPageChange: (index) => { }
}