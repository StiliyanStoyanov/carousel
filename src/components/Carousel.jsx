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
    goToIndex,
    goToNext,
    goToPrevious,
  } = useCarousel(props);
  const prevBtnVisible = options.infiniteLoop || activeIndex !== 0;
  const nextBtnVisible =
    options.infiniteLoop || activeIndex !== childrenList.length - 1;
  const { autoplay, infiniteLoop, transitionDuration, autoplayInterval } =
    options;

  return (
    <div className="relative">
      <div className="option-controlls-container">
        <div>
          <b>Autoplay&nbsp;</b>
        </div>
        <Checkbox onChange={toggleAutoplay} checked={autoplay} />
      </div>
      <div className="option-controlls-container">
        <div>
          <b>Infinite Loop&nbsp;</b>
        </div>
        <Checkbox onChange={toggleInfiniteLoop} checked={infiniteLoop} />
      </div>
      <div className="carousel">
        <div
          ref={sliderContaineRef}
          className="carousel-slider"
          style={{
            transitionDuration: `${options.transitionDuration}ms`,
            transform: `translateX(${(-activeIndex - 1) * 100}%)`,
          }}
        >
          <div className="carousel-slide">
            {childrenList[childrenList.length - 1]}
          </div>
          {Children.map(childrenList, (child, index) => (
            <div
              className={`carousel-slide ${
                activeIndex === index ? 'is-active' : ''
              }`}
            >
              {child}
            </div>
          ))}
          <div className="carousel-slide">{childrenList[0]}</div>
        </div>
        {prevBtnVisible && (
          <button type="button" onClick={goToPrevious} className={'prev'}>
            ❮
          </button>
        )}
        {nextBtnVisible && (
          <button type="button" onClick={goToNext} className={'next'}>
            ❯
          </button>
        )}
      </div>
      <div className="carousel-navigation">
        {Children.map(childrenList, (_, index) => (
          <button
            className={`carousel-bullet ${
              mod(activeIndex, childrenList.length) === index ? 'is-active' : ''
            }`}
            onClick={(event) => goToIndex(index, event)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

Carousel.defaultProps = {
  initialIndex: 0,
  transitionDuration: 400,
  autoplay: false,
  autoplayInterval: 3000,
  infiniteLoop: true,
  onPageChange: (index) => {},
};
