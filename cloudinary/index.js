const crypto = require("crypto");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "drakarzamael",
  api_key: "383474676418929",
  api_secret: "OxeGDjgcf4p2JD-BcYyMQPyW_Ic",
});
const storage = new CloudinaryStorage({
  cloudinary,
  folder: "market",
  allowedFormats: ["jpeg", "jpg", "png"],
  params: async function (req, file, cb) {
    let buf = crypto.randomBytes(16);
    buf = buf.toString("hex");
    let uniqFileName = file.originalName.replace(/\.jpeg|\.jpg|\.png/gi, "");
    uniqFileName += buf;
    console.log(uniqFileName, "desde midle");
    return {
      folder: "market",
      format: "jpeg",
      public_id: uniqFileName,
    };
    //cb(undefined, uniqFileName);
  },
});
const uploadCloud = multer({ storage: storage });
module.exports = uploadCloud;
