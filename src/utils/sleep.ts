
export const sleep = ( time: number = 2 ) => new Promise( ( resolve ) => {
   const seconds = 1000 * time
   setTimeout( () => {
      resolve( true )
   }, seconds );
} )