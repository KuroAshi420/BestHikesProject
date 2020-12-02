const Publication = require('../models/category.model')

exports.createCategory = (req, res) => {
    let content = req.body.content
    let user = req.body.user
    let name = req.body.name
    let image = req.file.path
    console.log(name, image)
    const publication = new Publication({
        content:content,
        user:user,
        name: name,
        image: image
    })
    publication .save((err, category) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                errors: err.meesage
            })
        }
        return res.json({
            message: "Created category successfully",
            category
        })
    })

}

exports.getPublication = (req, res) => {

    Publication.find()
    .populate('user')
    .populate('comment.writer')
    .then((publications) => res.send(publications))
    .catch((err) => console.log(err));
}

exports.deletePublication = (req, res) => {
    const { _id } = req.params;
    Publication.findOneAndDelete({ _id: _id })
      .then((publication) => res.send(publication))
      .catch((err) => console.log(err));
  };

// .populate({
//     path: "blogs", // populate blogs
//     populate: {
//        path: "comments" // in blogs, populate comments
//     }
//  })
// exports.getComments = (req, res) => {

//     Publication.comment.find()
//     .populate("writer")
//     .then((comments) => res.send(comments))
//     .catch((err) => console.log(err));
// }



