import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
dotenv.config();

//Local Disk storage for uploaded files
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file to include the timestamp
  },
});

//S3 client: requires these env variables to be pre-loaded into environment (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION)
const s3 = new S3Client({ apiVersion: "v3", region: process.env.AWS_REGION });
//S3 cloud storage for uploaded files
const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//Initialize Multer with the storage configuration
const upload = multer({ storage: s3Storage });

export default upload;
