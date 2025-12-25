import express from "express";
import multer from "multer";
import {
  addFood,
  listFood,
  removeFood,
  updateFood,
} from "../controllers/FoodController.js";

const foodRouter = express.Router();
//image  storage enginne

const storage = multer.diskStorage({
  destination: "/tmp",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.array("image", 5), addFood);
foodRouter.post("/update", upload.array("image", 5), updateFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
