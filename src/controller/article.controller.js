import ArticleModel from "../model/article.model.js";

export const createArticlepost=async (req,res)=>{
    try {
        const newPost=new ArticleModel({
            ...req.body,
        })
        await newPost.save();
        res.status(201).json({message:"Article created successfully."});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error creating new article"});
    }
}