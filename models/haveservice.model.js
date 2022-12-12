const mongoose = require("mongoose");
const haveserviceSchema = new mongoose.Schema({
  titel: {
    type: String,
    required: [true, "indtast en titel"],
  },
  beskrivelse: {
    type: String,
    required: [true, "indtast en beskrivelse"],
  },
  image: {
    type: String,
    default: "image-comming-soon",
  },
});

module.exports = mongoose.model(
  "haveservice",
  haveserviceSchema,
  "haveservice"
);
