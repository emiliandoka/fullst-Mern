import { json } from "express";
import singlesoftware from "../models/singlesoftware.js"
import cloudinary from '../utils/cloudinary.js' ;



export const getsoftwares = async (req,res)=>{
  const CreatorId = req.query.creatorId ? {'creatorId': req.query.creatorId } : ''
  try{
    const softwares = await singlesoftware.find({CreatorId}, ["softSlug", "title", "status" , "imgurl"] );
    res.send(softwares)
  }catch(error){
    res.status(404).json(error)
  }
}
export const updatesoftware = async (req,res)=>{
  const {title, description,overallRating, features , referallUrl, imgurl, postId, updatedImage} = req.body;
  let OldImage;
  if(!updatedImage){
    OldImage = await singlesoftware.findById(postId);
    OldImage = OldImage.imgurl
  }else{
    try{
     await cloudinary.uploader.upload(imgurl , {upload_preset : 'dashboard_upl'} , function(error, result) {
      OldImage = {
        width: result.width,
        height : result.height,
        url : result.url,
        secureUrl : result.secure_url
      }
     });
    }catch(error){
      res.status(409).json({message: error.message})
    }
  }
    try{
      const softwares = await singlesoftware.updateOne({postId}, {
        softSlug:  title.split(' ').join('-').toLowerCase(),
        creator : "Lani",
        creatorId: "dsgswdadwags",
        title : title,
        description : description,
        overallRating : overallRating,
        features: features,
        referallUrl: referallUrl,
        imgurl: OldImage,
        }
        );
      res.send(softwares)
    }catch(error){
      res.status(404).json(error)
    }
}



export const postSoftware = async (req,res)=>{
  const {title, description,overallRating, features , referallUrl, imgUrl} = req.body;
  let cloudinaryImgUrl;
  try{
   await cloudinary.uploader.upload(imgUrl , {upload_preset : 'dashboard_upl'} , function(error, result) {
    cloudinaryImgUrl = {
      width: result.width,
      height : result.height,
      url : result.url,
      secureUrl : result.secure_url
    }
   });
  }catch(error){
    res.status(409).json({message: error.message})
  }

  const NewSoftware = new singlesoftware({
    softSlug:  title.split(' ').join('-').toLowerCase(),
    creator : "Lani",
    creatorId: "dsgswdadwags",
    title : title,
    description : description,
    overallRating : overallRating,
    features: features,
    referallUrl: referallUrl,
    imgurl: cloudinaryImgUrl,
  })
  try{ 
    await NewSoftware.save();
    return res.status(201).json({res: 'post created sucessfully'})
  }catch(error){
    res.status(409).json({message : error.message})
  }
}

export const getSingleSoftware = async (req,res)=>{
  const softSlug ={'softSlug': req.params.slugSoft};
  try{
    const softwares = await singlesoftware.findOne(softSlug);
    res.send(JSON.stringify(softwares))
  }catch(error){
    res.status(404).json(error)
  }
}
export const deleteSingleSoftware = async (req,res)=>{
  const softSlug ={'softSlug': req.params.slugSoft};
  try{
    await singlesoftware.deleteOne(softSlug);
    res.status(200).json({res: 'post deleted sucessfully'})
  }catch(error){
    res.status(404).json(error)
  }
}