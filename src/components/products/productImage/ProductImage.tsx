import Image  from "next/image"
import React from "react";

interface Props {
   src: string | null;
   alt:  string;
   className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
   width:  number;
   height: number;
   style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
   priority?: boolean;
}

export const ProductImage = ( { style = {}, src, alt, className, width, height, priority = false }:Props ) => {
   
   const localSrc = ( src ) ? 
         src.startsWith("http") ? src :  `/products/${ src }` 
      : `/imgs/placeholder.jpg`

   return (
      <>
         <Image 
            src={ localSrc }
            alt={ alt }
            width={ width }
            height={ height }
            className={ className }
            style={ style }
            priority={ priority }
         />
      </>
   )
}
