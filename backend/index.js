import express from 'express'
import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { v2 as cloudinary } from 'cloudinary';
import path from "path"
import fs from "fs"
import cors from "cors"
import axios from "axios"
import mongoose from 'mongoose';
import Image from './models.js';
import router from './routes.js';
const PORT = process.env.PORT || 3000
cloudinary.config({ 
  cloud_name: 'dlga0brem', 
  api_key: '214639394316956', 
  api_secret: 'DQlHQorlCd2r-JhxRn-hPgeSIgc' 
});

mongoose.connect("mongodb+srv://oreki:orekiftw@cluster0.cvktl.mongodb.net/walls-collection")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error('MongoDB connection error:', err))



const app = express()
app.use(express.json())
app.use(cors())

app.use("/", router)

const bot = new Telegraf("8184121274:AAE8aTcPqgvrqmqhmLz_crBBBtMEtyvX1TU")
bot.on(message("document"), async (ctx) => {
  try {
    const document = ctx.message.document;
    const caption = ctx.message.caption
    const hashtags = caption.replace("#","")
    
    
    const fileLink = await ctx.telegram.getFileLink(document.file_id);
    console.log(fileLink.href)
    
    // Download the document
    const result = await cloudinary.uploader.upload(fileLink.toString(), {
      resource_type: "auto",
      quality: "auto", 
      fetch_format: "auto", 
      width: "auto", 
      dpr: "auto", 
      crop: "scale", 
      format: "webp",
      optimization: true 
    });
    
    
    const optimizedUrl = cloudinary.url(result.public_id, {
      transformation: [
        { width: 600, height: 400, crop: 'fill' },
        { quality: 'auto:low' },
        { fetch_format: 'auto' },
        { loading: 'lazy' }
      ]
    });
    
    const newImage = new Image({
      originalUrl: result.secure_url,
      publicId: result.public_id,
      type: hashtags,
      optimizedUrl: optimizedUrl,
      downloadUrl: fileLink.href
    })
    console.log(newImage)
    try {
        const savedImage = await newImage.save();
        console.log('Image saved:', savedImage);
    } catch (error) {
        console.error('Error saving image:', error);
    }
    
    

    console.log(result)
    console.log("Upload successful:", optimizedUrl);
    ctx.reply("Document uploaded successfully to Cloudinary!");
    
  } catch (error) {
    console.error("Error processing document:", error);
    ctx.reply("Sorry, there was an error processing your document.");
  }
});

// Start the bot
bot.launch();
console.log("Bot is running...");
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`)
})
