import { setInitialBounds } from '../../utils';
import { GO_TO, SET_OPTION, TOGGLE_OPTION } from './carouselReducerActions';

export function createInitialState({
  initialIndex,
  autoplay,
  autoplayInterval,
  infiniteLoop,
  transitionDuration,
  onPageChange,
  children,
}) {
  const lastIndex = children.length - 1;
  return {
    defaultOptions: {
      initialIndex,
      transitionDuration,
      autoplayInterval,
    },
    options: {
      autoplay,
      transitionDuration,
      autoplayInterval,
      infiniteLoop,
      direction: lastIndex > initialIndex ? 'right' : 'left',
    },
    activeIndex: setInitialBounds(initialIndex, lastIndex),
    lastIndex,
    onPageChange,
    childrenList: children,
  };
}

export function carouselReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case GO_TO: {
      const { NEXT, index, animated = true } = payload;
      const { activeIndex, lastIndex } = state;

      const next =
        activeIndex + 1 > lastIndex + 1 ? activeIndex : activeIndex + 1;
      const previous = -1 > activeIndex - 1 ? -1 : activeIndex - 1;
      const nextIndex = index ?? (NEXT ? next : previous);
      const nextTransitionDuration = animated
        ? state.defaultOptions.transitionDuration
        : 0;

      state.onPageChange(nextIndex);

      return {
        ...state,
        options: {
          ...state.options,
          transitionDuration: nextTransitionDuration,
        },
        activeIndex: nextIndex,
      };
    }
    case SET_OPTION: {
      return {
        ...state,
        options: {
          ...state.options,
          ...payload,
        },
      };
    }
    case TOGGLE_OPTION: {
      const option = payload;
      return {
        ...state,
        options: {
          ...state.options,
          [option]: !state.options[option],
        },
      };
    }
    default: {
      return state;
    }
  }
}
