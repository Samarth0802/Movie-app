import historyModel from "../models/history.model.js";



async function addHistory(req,res,next){
  try{

    const {movieId,title,posterUrl} = req.body;

    const history = await historyModel.create({
      userId:req.user.id,
      movieId,
      title,
      posterUrl
    })

    res.status(201).json({
      success:true,
      history
    })

  }catch(err){
    next(err)
  }
}

async function getHistory(req,res,next){
  try{

    const history = await historyModel
      .find({userId:req.user.id})
      .sort({createdAt:-1})

    res.status(200).json({
      success:true,
      history
    })

  }catch(err){
    next(err)
  }
}

export {getHistory,addHistory}