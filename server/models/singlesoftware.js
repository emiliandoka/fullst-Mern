import mongoose from "mongoose";

const softSchema = mongoose.Schema({
  softSlug: {
    type : String,
    required : true,
    unique: true,
  },
  creator : String,
  creatorId: String,
  title : String,
  description : String,
  dateCreated : {
    type : Date,
    default : new Date()
  },
  overallRating : Number,
  features: [String],
  referallUrl: String,
  status : {
    type: String,
    default : 'pending'
  },
  imgurl : Object,
})
const singlesoftware = mongoose.model("SingleSoftwareTemplate" , softSchema);

export default singlesoftware;
