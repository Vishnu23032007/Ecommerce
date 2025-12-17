import productRouter from "./productRoutes.js";
import cartRouter from "./CartRouter.js";

import {Router} from "express";

const router = Router();

router.use(productRouter);
router.use(cartRouter);

export default router;