import { Children } from 'react';
import { mod } from '../utils';

function CarouselNavigation({ childrenList, activeIndex, onClick }) {
  return (
    <div className="carousel-navigation">
      {Children.map(childrenList, (_, index) => (
        <button
          className={`carousel-bullet ${mod(activeIndex, childrenList.length) === index ? 'is-active' : ''}`}
          onClick={(event) => onClick(index, event)}
          type="button"
        />
      ))}
    </div>
  );
}

export default CarouselNavigation;