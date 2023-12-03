import { Children } from 'react';
function CarouselSlider({activeIndex, list, transitionDuration, sliderContaineRef}) {
    return (
        <div
            ref={sliderContaineRef}
            className="carousel-slider"
            style={{
                transitionDuration: `${transitionDuration}ms`,
                transform: `translateX(${(-activeIndex - 1) * 100}%)`
            }}
        >
        <div className="carousel-slide">{list[list.length - 1]}</div>
        {Children.map(list, (child, index) => <div className={`carousel-slide ${activeIndex === index ? 'is-active' : ''}`}>{child}</div>)}
        <div className="carousel-slide">{list[0]}</div>
        </div>
    );
}

export default CarouselSlider;