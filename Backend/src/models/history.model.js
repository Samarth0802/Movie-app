import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Auth",
      required:true
    },

    movieId:{
      type:String,
      required:true
    },

    title:String,
    posterUrl:String
  },
  {
    timestamps:true
  }
);

const historyModel = mongoose.model("History",historySchema);

export default historyModel;