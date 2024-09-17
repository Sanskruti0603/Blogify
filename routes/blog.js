const express = require('express');
const router=express.Router();
const Blog=require('../models/blog');
const multer=require('multer');
const path=require('path');
const Comment=require('../models/comment');

const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,path.resolve(`./public/images/uploads`));
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const upload=multer({storage});

router.get('/add-new',(req,res)=>{
    res.render("addBlog",{
        user: req.user
    })
})

router.post("/add-new",upload.single('coverImage'),async(req,res)=>{   // '/'-/blog
    // console.log(req.body);
    // console.log(req.file);
    const {title,body}=req.body;
   const blog= await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`);
});


//for comment
router.post("/comment/:blogId", async (req, res) => {
    await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  });

router.get('/:id',async(req,res)=>{
    const blog=await Blog.findById(req.params.id).populate("createdBy");
    const comments=await Comment.find({blogId:req.params.id}).populate("createdBy");
    console.log(blog);
    console.log(comments);
    return res.render('blog',{
        user:req.user,
        blog,
        comments
    })
});

module.exports = router;