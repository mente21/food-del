import express from "express";
import { addCategory, listCategories, removeCategory, updateCategory } from "../controllers/categoryController.js";
import multer from "multer";

const categoryRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "/tmp",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

categoryRouter.post("/add", upload.single("image"), addCategory);
categoryRouter.post("/update", upload.single("image"), updateCategory);
categoryRouter.get("/list", listCategories);
categoryRouter.post("/remove", removeCategory);

export default categoryRouter;
