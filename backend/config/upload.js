import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
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

// Function to delete file
async function deleteFile(fileKey) {
  if (fileKey)
    try {
      const deleteParams = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileKey, // File key (name) in the S3 bucket
      };

      await s3.send(new DeleteObjectCommand(deleteParams));
      console.log("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file: ", error);
    }
}

const deleteByUrl = async fileUrl => {
  if (fileUrl)
    try {
      const url = new URL(fileUrl);
      const fileKey = decodeURIComponent(url.pathname.slice(1)); // Remove leading slash

      const deleteParams = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileKey,
      };

      const command = new DeleteObjectCommand(deleteParams);
      await s3.send(command); // Send the command to delete the object

      console.log(`File ${fileKey} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
    }
};

//Initialize Multer with the storage configuration
const upload = multer({ storage: s3Storage });

export default upload;
export { deleteFile, deleteByUrl };
