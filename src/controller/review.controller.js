import ReviewModel from "../model/review.model.js";
import ArticleModel from "../model/article.model.js";

export const PostReview=async(req,res)=>{
    try {
        const {comment,ratting,userID,articleID}=req.body;

        if(!comment || !userID || !articleID || ratting === undefined){
            return res.status(400).json({message:"Missing required parameters"});
        }

        const existingReview=await ReviewModel.findOne({userID,articleID})
        if(existingReview){
            existingReview.ratting=ratting
            existingReview.comment=comment
            await existingReview.save()
        }else {
            const review=new ReviewModel({comment,ratting,userID,articleID})
            await review.save()
        }
        const reviews=await ReviewModel.find({articleID}).sort({updatedAt:-1})

        if(reviews.length > 0){
            const totalRatting=reviews.reduce((accum,review)=>accum+review.ratting,0)
            const averageRating=totalRatting/reviews.length

            const Articledata=await ArticleModel.findById(articleID)
            if(Articledata){
                Articledata.ratting=averageRating
                await Articledata.save({validateBeforeSave:false})
            }else {
                res.status(404).json({message:"No review found"})
            }
        }
        res.status(200).json({message:"Reviews posted successfully"})
    }catch(err){

    }
}


export const getAllReviews=async(req,res)=>{
    const {userID}=req.params;
    try {
        const data=await ReviewModel.find({userID:userID}).sort({createdAt:-1})
        if(data.length === 0){
            return res.status(404).json({message:"No review found"})
        }
        res.status(200).json({message:"Reviews founded successfully",data:data})
    }catch(err){
        res.status(404).json({message:"No review found"})
    }
}


export const deleteReview=async(req,res)=>{
    const {id}=req.params;
    try {
        const data=await ReviewModel.findByIdAndDelete(id);
        if(!data){
            return res.status(404).json({message:"No review found"})
        }
        res.status(200).json({message:"Review deleted"})
    }catch(err){
        res.status(404).json({message:"No review found"})
    }
}