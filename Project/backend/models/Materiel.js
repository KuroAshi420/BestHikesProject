const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaterielSchema = new Schema({
  type: { type: String },
  marque: { type: String },
  price: { type: String },
  quantity: { type: String },
  lieux: { type: String },
  disponible: {type : Boolean, default:true },
  image: { type: String,
    trim: true,
    required: true },
  name :{type: String,
    trim: true,
    required: true},
  descreption: { type: String },
  dateofcreation: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
});
module.exports = Materiel = mongoose.model("materiel", MaterielSchema);
