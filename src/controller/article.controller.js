import ArticleModel from "../model/article.model.js";
import articleModel from "../model/article.model.js";

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


export const getSingleArticle=async (req,res)=>{
    const {id} = req.params;
    try {
        const data = await articleModel.findById(id);
        if(!data){
           return  res.status(404).json({message:"No article with this id"});
        }
        res.status(200).json({message:"Article found successfully.",data:data});
    }catch(err){
        res.status(500).json({message:"Error getting article"});
    }
}

export const getAllArticles=async(req,res)=>{
    try {
        const data=await ArticleModel.find({})
        res.status(200).json({message:"Article list successfully.",data:data});
    }catch(err){
        res.status(500).json({message:"Error getting article"});
    }
}

export const updateArticle=async(req,res)=>{
    const {id} = req.params;
    const {title,description,image,category}=req.body
    try {
      const newData=await ArticleModel.findByIdAndUpdate(id,{
          title:title,
          description:description,
          image:image,
          category:category,
      })
        if(!newData){
          return   res.status(404).json({message:"Article not found."});
        }
        res.status(200).json({message:"Article updated successfully."});
    }catch(err){
     res.status(500).json({message:"Error updating article"});
    }
}


export const deleteArticle=async(req,res)=>{
    const {id} = req.params;
    try {
        const data=await ArticleModel.findByIdAndDelete(id)
        if(!data){
          return  res.status(404).json({message:"Article not found."});
        }
        res.status(200).json({message:"Article deleted successfully."});
    }catch(err){
        res.status(500).json({message:"Error deleting article"});
    }
}