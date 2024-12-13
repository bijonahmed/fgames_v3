import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';

export default function App() {
  // Array of slide data
  const slides = [
    {
      title: 'Explore More',
      text: 'Join Us Today',
      amount: 'UP TO 30000 USD',
      image: '/images/sliders/02.jpg', // Path to your image
    },
    {
      title: 'Stay Untamed',
      text: 'Sign Up & Get',
      amount: 'UP TO 20000 USD',
      image: '/images/sliders/01.jpg', // Path to your image
    },
   
    {
      title: 'Adventure Awaits',
      text: 'Discover New Horizons',
      amount: 'UP TO 25000 USD',
      image: '/images/sliders/03.jpg', // Path to your image
    }, {
      title: 'Adventure Awaits',
      text: 'Discover New Horizons',
      amount: 'UP TO 25000 USD',
      image: '/images/sliders/04.jpg', // Path to your image
    },
    // Add more slides as needed
  ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="banner_img">
              <div className="banner_content">
                {/* <h2>{slide.title}</h2> */}
                <div className="banner_text">
                  {/* <h6 className="wow fadeIn">{slide.text}</h6> */}
                  {/* <p>{slide.amount}</p> */}
                </div>
              </div>
              <img src={slide.image} alt={slide.title} className="img-fluid w-100 border-0" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
