
import { Router } from "express";

import { Product } from "../mongoose/schema/ProductSchema.js";
import { Cart } from "../mongoose/schema/CartSchema.js";

const router = Router();

router.post("/api/cart/add", async (request, response) => {

    try {
        const userId = request.user._id;

        if (!request.isAuthenticated()) {
            return response.status(401).send({ message: "Error occured in authentication" });
        }
        
        const { productId } = request.body;

        const product = await Product.findById(productId);

        if (!product) {
            return response.status(400).send({ message: "Product not found" });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            const newCart = new Cart({ user: userId, items: [{ product: productId, quantity: 1 }], updatedAt: new Date() });
            const savedCart = await newCart.save();
            return response.status(200).send({ savedCart });
        }
        else {

            const productIndex = cart.items.findIndex((item) => item.product.toString() === productId);

            if (productIndex > -1) {
                cart.items[productIndex].quantity++;
            }
            else {
                cart.items.push({ product: productId, quantity: 1 });
            }

            await cart.save();
            return response.status(200).send({ cart });
        }
    }
    catch (error) {
        return response.status(500).json({ error: error });
    }
});

router.get("/api/cart", async (request, response) => {

    try {
        const userId = request.user?._id;

        if (!request.isAuthenticated()) {
            return response.status(401).json({ message: "User UnAuthenticated" });
        }

        const cartList = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cartList || cartList.items.length === 0) {
            return response.status(200).json({
                items: [],
                totalPrice: 0,
                totalItems: 0
            });
        }

        let totalPrice = 0;
        let totalItems = 0;

        cartList.items.forEach(item => {
            totalItems += item.quantity;
            totalPrice += (item.product.price * item.quantity);
        })

        return response.status(200).json({
            items : cartList.items,
            totalItems ,
            totalPrice
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Failed to fetch from cart" });
    }

});

router.put("/api/cart/update", async (request, response) => {

    try {
        if (!request.isAuthenticated()) {
            return response.status(401).json({ message: "User not authenticated" });
        }

        const { productId, action } = request.body;
        if (!productId || !action) {
            return response.status(400).json({ message: "Invalid request data" });
        }

        const userId = request.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return response.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (productIndex == -1) {
            return response.status(404).json({ message: "Product not in cart" });
        }

        if (action == "increase") {
            cart.items[productIndex].quantity++;
        }
        else if (action == "decrease") {
            if (cart.items[productIndex].quantity > 1) {
                cart.items[productIndex].quantity--;
            }
            else {
                cart.items.splice(productIndex, 1);
            }
        }
        else {
            return response.status(400).json({ message: "Invalid action" });
        }
        cart.updatedAt = new Date();

        const updatedCart = await cart.save();
        return response.status(200).json(updatedCart);

    }
    catch (error) {
        return response.status(500).json({ error: error });
    }
});


router.delete("/api/cart/remove/:id", async (request, response) => {

    try {
        if (!request.isAuthenticated()) {
            return response.status(401).json({ message: "User not authenticated" });
        }

        const productId = request.params.id;
        const userId = request.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return response.status(500).json({ message: "Cart not found" });
        }


        const productIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (productIndex == -1) {
            return response.status(500).json({ message: "Product not in cart" });
        }


        cart.items.splice(productIndex, 1);
        cart.updatedAt = new Date();
        const savedCart = await cart.save();
        return response.status(200).json(savedCart);
    }
    catch (error) {
        return response.status(500).json({ error: error });
    }
});


export default router;