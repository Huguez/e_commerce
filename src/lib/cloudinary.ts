import { v2 as cloudinary } from 'cloudinary';

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET, } = process.env
      
const cloud =  cloudinary.config({ 
  cloud_name: `${ CLOUD_NAME }`, 
  api_key:    `${ CLOUD_API_KEY }`, 
  api_secret: `${ CLOUD_API_SECRET }` 
});

export const { upload, destroy } = cloudinary.uploader
