Homework - Carousel
The assignment purpose is to implement a simple Carousel in React with following features:

Support Autoplay

Infinite Loop of Items

Support Image and video as Item

The component should expose the following props as configuration options:

initialIndex?: number, defaults to 0

transitionDuration?: number, defaults to 400ms

autoplay?: boolean, defaults to true

autoplayInterval?: number, defaults to 3000ms

infiniteLoop?: boolean, defaults to true

onPageChange?(index: number): void;