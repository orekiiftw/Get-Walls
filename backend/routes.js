import express from "express"
import Images from "./models.js"
const router = express.Router()

router.get("/walls", async (req,res) => {
  try {
   
    const documents = await Images.find().exec();
    
   
    const response = documents.map(doc => {
      return {
        optimizedUrls: doc.optimizedUrl,
        type: doc.type,
        downloadUrl: doc.downloadUrl
      }
    });
    
    
    res.send({
      response: response
    })
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

export default router