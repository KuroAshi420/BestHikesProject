// const express = require('express');
// const router = express.Router();
// const { Comment } = require("../models/Comment");


//=================================
//             Subscribe
//=================================
// router.get("/", (req, res) => {
//     Comment.find()
//       .then((comment) => res.send(comment))
//       .catch((err) => console.log(err));
//   });


  

// router.post("/saveComment", (req, res) => {

//     const comment = new Comment(req.body)

//     comment.save((err, comment) => {
//         console.log(err)
//         if (err) return res.json({ success: false, err })

//         Comment.find({ '_id': comment._id })
//             .populate('writer')
//             .exec((err, result) => {
//                 if (err) return res.json({ success: false, err })
//                 return res.status(200).json({ success: true, result })
//             })
//     })
// })

// router.get("/getComments", (req, res) => {
//     Comment.find({ "eventId": req.body.eventId })
//     .populate('writer')
//     .exec((err, comments) => {
//         if (err) return res.status(400).send(err)
//         return res.status(200).json({ success: true, comments })
//     })
// });
// router.get("/getComments", (req, res) => {
//     var postId = req.body.postId;
  
//     Comment.find({
//         postId} ,{ content: 1 }
//     )
//     .distinct("content")
//       .then((comments) => res.send(comments))
//       .catch((err) => console.log(err));
//   });

// module.exports = router;
