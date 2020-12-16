const Materiel = require("../models/Materiel");

exports.createMateriel = (req, res) => {
    const {
  type,
  marque,
  price,
  quantity,
  lieux,
  name,
  descreption,
  user
 
      } = req.body;
      let image = req.file.path
    const newMateriel = new Materiel({
  type,
  marque,
  price,
  quantity,
  lieux,
  image,
  name,
  descreption,
  user
    });
    newMateriel .save((err, materiel) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                errors: err.meesage
            })
        }
        return res.json({
            message: "Created materiel successfully",
            materiel
        })
    })

}

exports.getMateriels = (req, res) => {

    Materiel.find()
    .then((materiel) => res.send(materiel))
    .catch((err) => console.log(err));
}

exports.getMateriel = (req, res) => {
    const { _id } = req.params;
    Materiel.findOne({ _id })
    .then((materiel) => res.send(materiel))
    .catch((err) => console.log(err));
}

exports.deleteMateriel = (req, res) => {
  const { _id } = req.params;
  Materiel.findOneAndDelete({ _id: _id })
    .then((materiel) => res.send(materiel))
    .catch((err) => console.log(err));
};

// update disponible 
exports.updateDisponible = (req, res) => {
    const _id = req.params._id;
    const disponible = req.params.disponible;
  
    Materiel.findOneAndUpdate(
      { _id },
      {
        $set: { disponible },
      },
      { new: true }
    )
      .then((materiel) => res.json(materiel))
      .catch((err) => res.json(err));
  };


exports.getMaterielType = (req, res) => {
  Materiel.find(null, { type: 1 })
    .distinct("type")
    .then((mat) => res.send(mat))
    .catch((err) => console.log(err));
};


exports.getMaterielMarque = (req, res) => {
  Materiel.find(null, { marque: 1 })
    .then((mat) => res.send(mat))
    .catch((err) => console.log(err));
};

exports.getMaterielLieu = (req, res) => {
  Materiel.find(null, { lieux: 1 })
    .distinct("lieux")
    .then((mat) => res.send(mat))
    .catch((err) => console.log(err));
};


exports.filterMateriels = (req, res) => {
  var query = req.params.query;

  Materiel.find({
    $or: [
      { type: query },
      { marque: query },
      { lieux: query },
    ],
  })
    .then((materiel) => res.send(materiel))
    .catch((err) => console.log(err));
};