const express = require("express");
// Import post model
const Post = require('../models/post');

const router = express.Router();

// so this will only get call on localhost:3000/posts
// This is pretty much the api
router.get('', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Post fetched successfully',
        posts: documents
      });
      // console.log(documents);
    }).catch(error => {
      console.log(error);
    });
});

router.get('/:id', (req, res, next)=> {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!'});
    }
  })
});


router.post('', (req, res, next) => {
  // create a post object first
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // saves the data in the database.
  // Ty mongoose
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});



//updates post using updateOne
router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id:req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Update Successful!"});
  })
});

// deleting a post
router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result => {
      // console.log(result);
      res.status(200).json({ message: 'Post Deleted!'});
    });
});

module.exports = router;
