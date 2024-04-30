"use client"

import React, { useState } from "react";

import { SwiperSlide, Swiper } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';


import "./ProductSliceShow.css"
import { ProductImage } from "@/components";

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
                           <ProductImage 
                              src={ i }
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
                        <ProductImage 
                           src={ i }
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