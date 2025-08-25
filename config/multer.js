// import multer from "multer";

// 1
// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   },
// });

// export const upload = multer({ storage });

// 2
// const upload = multer({ dest: './public/uploads/' })

// export default upload

// 3
import multer from "multer";
import path from "path";
import fs from "fs";

// Use /tmp directory instead
const uploadPath = "/uploads";

// Ensure /uploads exists
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export default upload = multer({ storage });