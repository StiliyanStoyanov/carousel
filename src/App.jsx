/* eslint-disable react/jsx-key */
import './App.css'
import { Fragment, useState } from 'react'
import Carousel from './Carousel/Carousel'
import CarouselModularized from './Carousel/CarouselModularized'

function App() {
  const [images, setImages] = useState([
    <img src="https://via.placeholder.com/800x350/0bf?text=image1" alt="Image 1" />,
    <img src="https://via.placeholder.com/800x350/fb0?text=image2" alt="Image 2" />,
    <img src="https://via.placeholder.com/800x350/b0f?text=image3" alt="Image 3" />,
    // <img src="https://via.placeholder.com/800x350/0bf?text=image4" alt="Image 4" />,
    // <img src="https://via.placeholder.com/800x350/0fb?text=image5" alt="Image 5" />,
    // <img src="https://via.placeholder.com/800x350/f0b?text=image6" alt="Image 6" />,
  ]);

  const [iframes, setIframes] = useState([
    <iframe src="https://www.youtube.com/embed/iLmBy-HKIAw?si=QRtRn1u_L9K0kPpI" allowFullScreen></iframe>,
    <iframe src="https://www.youtube.com/embed/r6tH55syq0o?si=qcWYFzOYkmphI30p" allowFullScreen></iframe>,
    <iframe src="https://www.youtube.com/embed/-yIsQPp31L0?si=XO0DOmPwpAQB30A0" allowFullScreen></iframe>
  ])

  return (
    <>
      <Carousel>
        {images.map((image, index) =>
          <Fragment key={index}>
            {image}
          </Fragment>
        )}
      </Carousel>

      <CarouselModularized>
        {iframes.map((iframe, index) =>
          <Fragment key={index}>
            {iframe}
          </Fragment>
        )}
      </CarouselModularized>
    </>
  )
}

export default App
