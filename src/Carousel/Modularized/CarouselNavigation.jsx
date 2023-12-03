import { Children } from 'react';
import { mod } from '../../utils';

function CarouselNavigation({ activeIndex, onBulletClick, list }) {
  return (
    <div className="carousel-navigation">
      {Children.map(list, (_, index) => (
        <button
          className={`carousel-bullet ${
            mod(activeIndex, list.length) === index ? 'is-active' : ''
          }`}
          onClick={(event) => onBulletClick(index, event)}
          type="button"
        />
      ))}
    </div>
  );
}

export default CarouselNavigation;
