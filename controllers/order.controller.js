import Order from "../models/order.model.js";
import Product from "../models/product.modal.js";

// Place order: /api/order/place

export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.user;
        const { items, address } = req.body;
        if (!items || !address) {
            return res.status(400).json({
                message: "Items and Address are required",
                success: false
            })
        }
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // Add 2% tax
        amount += (amount * 2) / 100;

        await Order.create({
            userId,
            items,
            address,
            amount,
            paymentType: "COD",
            isPaid: false
        })

        return res.status(201).json({
            message: "Order Placed successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}


// order details for individual user: /api/order/user

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: 'COD' }, { isPaid: true }]
        })
            .populate("items.product address")
            .sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

// get all orders (for admin): /api/order/all

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: 'COD' }, { isPaid: true }]
        })
            .populate("items.product address")
            .sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}