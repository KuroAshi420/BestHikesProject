const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  participantEvent: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  NombrePlace: { type: Number, default: 0 },
  dateofcreation: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = Participant = mongoose.model("participant", ParticipantSchema);
