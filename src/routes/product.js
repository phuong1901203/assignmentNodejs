import express from "express";
import {create, get, getAll, remove,update} from "../controllers/product";


const router = express.Router();

router.get("/products",getAll);
router.get("/product/:id",get);
router.post("/products", create);
router.delete("/products/:id", remove);
router.patch("/products/:id", update);
export default router;