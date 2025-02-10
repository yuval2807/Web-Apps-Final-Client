import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import authenticateToken from "../middleware/jwt";

dotenv.config();

const router = express.Router();

const base = "http://" + "localhost" + ":" + process.env.PORT + "/"; //TODO domain should change when uploaded to VM
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname
      .split(".")
      .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
      .slice(1)
      .join(".");
    cb(null, Date.now() + "." + ext);
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), function (req, res) {
  res.status(200).send({ url: base + req.file.path });
});

export = router;
