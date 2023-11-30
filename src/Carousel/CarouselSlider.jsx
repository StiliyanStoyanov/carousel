import {Children} from 'react';
function CarouselSlider({activeIndex, childrenList, transitionDuration, sliderContaineRef}) {
    return (
        <div
            ref={sliderContaineRef}
            className="carousel-slider"
            style={{
                transitionDuration: `${transitionDuration}ms`,
                transform: `translateX(${(-activeIndex - 1) * 100}%)`
            }}
        >
            {<div className="carousel-slide">{childrenList[childrenList.length - 1]}</div>}
            {Children.map(childrenList, (child, index) => <div className={`carousel-slide ${activeIndex === index ? 'is-active' : ''}`}>{child}</div>)}
            {<div className="carousel-slide">{childrenList[0]}</div>}
        </div>
    );
}

export default CarouselSlider;