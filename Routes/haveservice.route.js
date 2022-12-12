const Haveservice = require("../models/haveservice.model"); //mongoose-schema

const express = require("express");
const router = express.Router();

//Multer til håndtering af filer fx images
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      /* cb(null, Date.now()+ '-' + file.originalname) */
      cb(
        null,
        file.originalname
      ); /*her risiker du at få to filer af samme navn */
    },
  }),
});

//GET ALL til endpoint people
router.get("/", async (req, res) => {
  console.log("route people GET");

  try {
    let haveservice = await Haveservice.find();

    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Der er sket en fejl" + error.message });
  }
});

//GET by ID til endpoint people (: betyder det er et parameter)
router.get("/:id", async (req, res) => {
  console.log("route people GET by id");
  try {
    /* let id = req.params.id; */

    let haveservice = await Haveservice.findById(req.params.id);

    if (haveservice == null) {
      return res.status(404).json({ message: " der findes ingen" });
    }

    return res.status(200).json(haveservice);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Der er sket en fejl" + error.message });
  }
});

//POST til endpoint people
router.post("/", upload.single("image"), async (req, res) => {
  //skal kunne modtage fil/img
  console.log("route product POST");

  try {
    let haveservice = new Haveservice(req.body);

    haveservice.image = req.file.filename;

    await haveservice.save();
    return res
      .status(201)
      .json({ message: "ny er oprettet - Post", created: haveservice });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Der er sket en fejl" + error.message });
  }
});

//PUT til endpoint product
router.put("/:id", upload.single("image"), async (req, res) => {
  console.log("route product PUT");

  try {
    if (req.file) {
      req.body.image = req.file.filename;
    } else {
      let p = await Haveservice.findById(req.params.id);
      req.body.image = p.image; //bevare nuværende image
    }

    let haveservice = await Haveservice.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (people == null) {
      return res.status(404).json({ message: "kunne ikke finde" });
    }

    return res
      .status(200)
      .json({ message: "der er rettet", updateted: haveservice });
  } catch (error) {
    return res.status(404).json({ message: "der er sket en fejl" });
  }
  return res.status(201).json({ message: "der er rettet - Put" });
});

//DELETE til endpoint people
router.delete("/:id", async (req, res) => {
  console.log("route product delete");

  try {
    let haveservice = await Haveservice.findByIdAndDelete(req.params.id);

    if (product == null) {
      return res
        .status(404)
        .json({ message: "Data kunne ikke findes/slettes" });
    }
    return res.status(200).json({ message: "der er slettet" });
  } catch (error) {
    return res.status(404).json({ message: "Der skete en fejl" });
  }
});

module.exports = router;
