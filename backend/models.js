import mongoose from "mongoose";


const ImageSchema = new mongoose.Schema({
  
  originalUrl: String,
  publicId: String,
  type: String,
  optimizedUrl: String,
  downloadUrl: String
})

const Image = mongoose.model("Image", ImageSchema)

export default Image