import '../App.css';
import { useCarousel } from '../../hooks/useCarousel/useCarousel';
import CarouselSlider from '../CarouselSlider';
import CarouselNavigation from './CarouselNavigation';

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

  const { infiniteLoop, transitionDuration } = options;

  const prevBtnVisible = infiniteLoop || activeIndex !== 0;
  const nextBtnVisible =
    infiniteLoop || activeIndex !== childrenList.length - 1;

  return (
    <div className="carousel">
      <CarouselSlider
        sliderContaineRef={sliderContaineRef}
        activeIndex={activeIndex}
        list={childrenList}
        transitionDuration={transitionDuration}
      />
      {prevBtnVisible && <button className='prev' onClick={goToPrevious}>❮</button>}
      {nextBtnVisible && <button className={'next'} onClick={goToNext}>❮</button>}
      <CarouselNavigation list={childrenList} onBulletClick={goToIndex}/>
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
