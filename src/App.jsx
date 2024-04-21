/* eslint-disable react/jsx-key */
import { Fragment, useState } from 'react';
import './App.css';
import Carousel from './components/Carousel';


const iframes = [
  <iframe src="https://www.youtube.com/embed/iLmBy-HKIAw?si=QRtRn1u_L9K0kPpI" allowFullScreen></iframe>,
  <iframe src="https://www.youtube.com/embed/r6tH55syq0o?si=qcWYFzOYkmphI30p" allowFullScreen></iframe>,
  <iframe src="https://www.youtube.com/embed/-yIsQPp31L0?si=XO0DOmPwpAQB30A0" allowFullScreen></iframe>
]


function App() {
  const [images, setImages] = useState([
    <img src="https://via.placeholder.com/800x350/0bf?text=image1" alt="Image 1" />,
    <img src="https://via.placeholder.com/800x350/fb0?text=image2" alt="Image 2" />,
    <img src="https://via.placeholder.com/800x350/b0f?text=image3" alt="Image 3" />,
  ]);

  return (
    <>
      <Carousel>
        {images.map((item, index) =>
          <Fragment key={index}>
            {item}
          </Fragment>
        )}
      </Carousel>

    </>
  )
}

export default App
