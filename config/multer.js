import multer from "multer";

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   },
// });

// export const upload = multer({ storage });
const upload = multer({ dest: './public/uploads/' })

export default upload
