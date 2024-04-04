"use client"

import Image from "next/image"
import { FreeMode, Navigation, Pagination, Thumbs, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

interface propsI {
   images: string[];
   title?: string;
   className?: string;
}

export const ProductSlideShowMobile = ({ className, images }:propsI) => {

   return (
      <div className={ `${ className }` }>
         <Swiper
            style={{
               height: "100vh",
            }}
            navigation={true}
            zoom={ true }
            pagination={{
               clickable: true,
            }}
            modules={[ FreeMode, Pagination,  Navigation, Thumbs, Zoom ]} //
            className="mySwiperMobil"
         >
            {
               images.map( ( i, index ) => (
                  <SwiperSlide key={index}  >
                     <div className="swiper-zoom-container" >
                        <Image 
                           src={ `/products/${ i }` }
                           alt={ `/products/${ i }` }
                           width={300}
                           height={250}
                        />
                     </div>
                  </SwiperSlide>
               ) )
            }
         </Swiper>
      </div>
   )
}
