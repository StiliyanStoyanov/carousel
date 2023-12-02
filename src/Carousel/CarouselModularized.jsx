import '../App.css';
import { useCarousel } from '../hooks/useCarousel/useCarousel';
import CarouselNavigation from './CarouselNavigation';
import CarouselSlider from './CarouselSlider';
import SlideChangeButton from './SlideChangeButton';

// Resources
// https://stackoverflow.com/questions/72690608/carousel-slideshow-with-infinite-loop
// https://www.w3schools.com/howto/howto_js_slideshow.asp
export default function CarouselModularized(props) {
  const {
    childrenList,
    options,
    activeIndex,
    sliderContaineRef,
    goToIndex,
    goToNext,
    goToPrevious,
  } = useCarousel(props);

  return (
    <div className="carousel">
      <CarouselSlider
        sliderContaineRef={sliderContaineRef}
        activeIndex={activeIndex}
        childrenList={childrenList}
        transitionDuration={options.transitionDuration}
      />

      <SlideChangeButton
        infiniteLoop={options.infiniteLoop}
        activeIndex={activeIndex}
        lastIndex={0}
        className={'prev'}
        onClick={goToPrevious}
      >
        ❮
      </SlideChangeButton>

      <SlideChangeButton
        infiniteLoop={options.infiniteLoop}
        activeIndex={activeIndex}
        lastIndex={childrenList.length - 1}
        className={'next'}
        onClick={goToNext}
      >
        ❯
      </SlideChangeButton>

      <CarouselNavigation
        childrenList={childrenList}
        activeIndex={activeIndex}
        onClick={goToIndex}
      />
    </div>
  );
}

CarouselModularized.defaultProps = {
  initialIndex: 0,
  transitionDuration: 400,
  autoplay: false,
  autoPlayInterval: 3000,
  infiniteLoop: true,
  onPageChange: (index) => {
    console.log(index);
  },
};
