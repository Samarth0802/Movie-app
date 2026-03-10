
import dotenv from 'dotenv'
import fs from 'fs';
import ImageKit, { toFile } from '@imagekit/nodejs';

dotenv.config()


const client = new ImageKit({
  privateKey: process.env.IMAGE_PRIVATE_KEY, 
});

async function uploadImage(buffer){
    const file  = await client.files.upload({
            file: await toFile(Buffer.from(buffer), 'file'),
            fileName:'poster_url' + Date.now(),
            folder: "/movie/poster"
    });

    return file
}

export default uploadImage