
import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { Product } from "../mongoose/schema/ProductSchema.js";

import { addProductValidationSchema } from "../utils/validationSchemas.js";

const router = Router();

router.post("/api/products", checkSchema(addProductValidationSchema), async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).send({ error: errors.array() });
    }

    const body = matchedData(request);

    const newProduct = new Product(body);

    try {
        const savedProduct = await newProduct.save();

        return response.status(200).send(savedProduct);
    }
    catch (error) {
        return response.status(400).send({ error: error.message});
    }
});

router.get("/api/products", async (request, response) => {
    try {
        const products = await Product.find();
        response.status(200).send(products);
    }
    catch (error) {
        response.status(400).send({ error: error.message });
    }
});

router.get("/api/products/:id", async (request, response) => {
    const { id } = request.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return response.status(400).send({ error: "Product not found" });
        }
        response.status(200).json(product);
    } catch (error) {
        response.status(400).send({ error: error.message });
    }
});

router.put("/api/products/:id" ,async (request, response) => {
    const {id} = request.params;

    try{
        const savedProduct = await Product.findByIdAndUpdate(
            id,
            request.body,
            {new : true, runValidators : true}
        );
        if(!savedProduct){
            return response.status(400).send({error : "Prouduct not found"});
        }
        return response.status(200).send(savedProduct);
    }   
    catch(error){
        response.status(400).send({error : error.message});
    }
});

router.delete("/api/products/:id" ,async (request,response) => {
    const {id} = request.params;

    try{
        const deletedProduct = await Product.findByIdAndDelete(id);

        if(!deletedProduct){
            return response.status(400).send({error : "Product not found"});
        }
        return response.status(200).send({message : "Product deleted successfully"});
    }
    catch(error){
        return response.status(400).send({error : error.message});
    }
});
export default router;
