"use client"
import Image from "next/image"
import React, { useState } from "react";

import { SwiperSlide, Swiper } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs, Zoom } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';


import "./ProductSliceShow.css"

interface propsI {
   images: string[];
   title?: string;
   className?: string;
}

export const ProductSlideShow = ( { images, className = "" }:propsI ) => {
   const [thumbsSwiper, setThumbsSwiper] = useState<any>( null );
   

   return (
      <>
         <div className={ `relative  ${ className }` }>
            {/* <IoSearch  className="text-blue-600 absolute top-3 right-3 z-10 cursor-pointer " size={25} onClick={ hanldeZoom } /> */}
            <Swiper
               style={{
                  '--swiper-pagination-color': '#2563eb',
               } as React.CSSProperties }
               spaceBetween={10}
               navigation={true}
               
               zoom={ true }
               thumbs={{ swiper: thumbsSwiper }}
               modules={[ FreeMode, Navigation, Thumbs, Zoom ]} //
            >
               {
                  images.map( ( i, index ) => (
                     <SwiperSlide key={index}  >
                        <div className="rounded-lg swiper-zoom-container" >
                           <Image 
                              src={ `/products/${ i }` }
                              alt={ `/products/${ i }` }
                              width={ 1024 }
                              height={ 800 }
                           />
                        </div>
                     </SwiperSlide>
                  ) )
               }
            </Swiper>
            <Swiper
               onSwiper={ setThumbsSwiper }
               spaceBetween={10}
               slidesPerView={4}
               freeMode={true}
               watchSlidesProgress={true}
               modules={[FreeMode, Navigation, Thumbs]}
               className="mySwiper"
            >
               {
                  images.map( ( i, index ) => (
                     <SwiperSlide key={index} >
                        <Image 
                           src={ `/products/${ i }` }
                           alt={ `/products/${ i }` }
                           width={ 300 }
                           height={ 300 }
                        />
                     </SwiperSlide>
                  ) )
               }
            </Swiper>
         </div>
      </>
   )
}